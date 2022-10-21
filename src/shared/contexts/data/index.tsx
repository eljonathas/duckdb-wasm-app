import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { Table } from "apache-arrow";

import { GlobalComponentProps } from "@/shared/types/react";
import { useDuckDB } from "@/shared/hooks/user-duck-db";

import { LoadingIcon } from "@/shared/assets/icons/loading";

import { DataContextProps, RemoteFile } from "./types";

export const DataContext = createContext({} as unknown as DataContextProps);

export function DataProvider({ children }: GlobalComponentProps) {
  const [remoteFiles, setRemoteFiles] = useState<RemoteFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<RemoteFile[]>([]);

  const [isRunning, setIsRunning] = useState(false);
  const [codeData, setCodeData] = useState("");

  const [resultTable, setResultTable] = useState<Table | null>(null);
  const [resultError, setResultError] = useState("");

  const db = useDuckDB();

  async function toggleRemoteFile(id: string) {
    const file = remoteFiles.find(file => file.id === id);

    if (file) {
      if (selectedFiles.includes(file)) {
        await db?.query(`DROP TABLE IF EXISTS ${file.name};`);
        setSelectedFiles(prev => prev.filter(f => f !== file));
        toast.success(`Table ${file.name} dropped`);
      } else {
        await db?.query(
          `CREATE TABLE ${file.name} AS SELECT * FROM "${file.url}";`
        );
        setSelectedFiles(prev => [...prev, file]);
        toast.success(`Loaded table ${file.name}`);
      }
    } else {
      toast.error("File not found");
    }
  }

  function addRemoteFile(file: RemoteFile) {
    if (remoteFiles.find(f => f.url === file.url)) {
      return;
    }

    setRemoteFiles([...remoteFiles, file]);
  }

  function removeRemoteFile(id: string) {
    setRemoteFiles(remoteFiles.filter(f => f.id !== id));
  }

  async function runQuery() {
    setResultError("");

    if (codeData && db) {
      setIsRunning(true);

      try {
        const data = await db.query(codeData);

        setResultTable(data);
      } catch (e) {
        setResultError((e as Error).message);
        toast.error("Error when running query. Please check your query.");
      }

      setIsRunning(false);
    }
  }

  return (
    <DataContext.Provider
      value={{
        isRunning,
        resultError,
        remoteFiles,
        selectedFiles,
        codeData,
        resultTable,
        runQuery,
        setCodeData,
        addRemoteFile,
        removeRemoteFile,
        toggleRemoteFile,
      }}
    >
      {db ? (
        children
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center space-y-2">
            <LoadingIcon />
            <h2 className="font-semibold text-gray-500">Loading modules...</h2>
          </div>
        </div>
      )}
    </DataContext.Provider>
  );
}
