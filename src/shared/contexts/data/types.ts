import { Table } from "apache-arrow";

export type RemoteFile = {
  url: string;
  name: string;
  id: string;
};

export type DataContextProps = {
  remoteFiles: RemoteFile[];
  selectedFiles: RemoteFile[];
  codeData: string;
  resultTable: Table | null;
  resultError: string;
  setCodeData: (codeData: string) => void;
  runQuery: () => void;
  addRemoteFile: (file: RemoteFile) => void;
  removeRemoteFile: (id: string) => void;
  toggleRemoteFile: (id: string) => void;
  isRunning: boolean;
};
