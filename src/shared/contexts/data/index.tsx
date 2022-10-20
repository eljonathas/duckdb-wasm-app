import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Table } from "apache-arrow";

import { GlobalComponentProps } from "@/shared/types/react";
import { useDuckDB } from "@/shared/hooks/user-duck-db";

import { LoadingIcon } from "@/shared/assets/icons/loading";

import { RemoteFiles } from "./constants";

import { DataContextProps, RemoteFile } from "./types";

export const DataContext = createContext({} as unknown as DataContextProps);

export function DataProvider({ children }: GlobalComponentProps) {
  const [remoteFiles, setRemoteFiles] = useState<RemoteFile[]>(() => [
    ...RemoteFiles,
  ]);
  const [selectedFile, setSelectedFile] = useState<RemoteFile | null>(null);

  const [isRunning, setIsRunning] = useState(false);
  const [codeData, setCodeData] = useState("");

  const [resultTable, setResultTable] = useState<Table | null>(null);
  const [resultError, setResultError] = useState("");

  const db = useDuckDB();

  function addRemoteFile(file: RemoteFile) {
    if (remoteFiles.find(f => f.url === file.url)) {
      return;
    }

    setRemoteFiles([...remoteFiles, file]);
  }

  function removeRemoteFile(id: string) {
    setRemoteFiles(remoteFiles.filter(f => f.id !== id));
  }

  async function changeSelectedFile(id: string) {
    const file = remoteFiles.find(f => f.id === id);

    if (!file) {
      return;
    }

    if (db) {
      await db.query(`DROP TABLE IF EXISTS ${file.name};`);
      await db.query(
        `CREATE TABLE ${file.name} AS SELECT * FROM "${file.url}";`
      );

      const table = await db.query(`SELECT * FROM ${file.name};`);

      toast.success(`Loaded table ${file.name}`);
      setResultTable(table);
      setSelectedFile(file);
    } else {
      toast.error(
        "Error when loading table. Database is not initialized, please refresh the page."
      );
    }
  }

  async function runQuery() {
    setResultError("");

    if (selectedFile && codeData && db) {
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
        selectedFile,
        codeData,
        resultTable,
        runQuery,
        setCodeData,
        addRemoteFile,
        removeRemoteFile,
        changeSelectedFile,
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
