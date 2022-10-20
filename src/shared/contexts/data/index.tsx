import { createContext, useState } from "react";

import { GlobalComponentProps } from "@/shared/types/react";

import { DataContextProps, RemoteFile } from "./types";
import { RemoteFiles } from "./constants";

export const DataContext = createContext({} as unknown as DataContextProps);

export function DataProvider({ children }: GlobalComponentProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [remoteFiles, setRemoteFiles] = useState<RemoteFile[]>(() => [
    ...RemoteFiles,
  ]);
  const [isRunning, setIsRunning] = useState(false);

  function changeFiles(files: File[]) {
    setFiles(files);
  }

  function changeRemoteFiles(remoteFile: RemoteFile) {
    setRemoteFiles([...remoteFiles, remoteFile]);
  }

  return (
    <DataContext.Provider
      value={{
        changeFiles,
        files,
        isRunning,
        remoteFiles,
        changeRemoteFiles,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
