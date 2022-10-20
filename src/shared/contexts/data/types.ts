import { Table } from "apache-arrow";

export type RemoteFile = {
  url: string;
  name: string;
  id: string;
};

export type DataContextProps = {
  remoteFiles: RemoteFile[];
  selectedFile: RemoteFile | null;
  codeData: string;
  resultTable: Table | null;
  setCodeData: (codeData: string) => void;
  runQuery: () => void;
  addRemoteFile: (file: RemoteFile) => void;
  removeRemoteFile: (id: string) => void;
  changeSelectedFile: (id: string) => void;
  isRunning: boolean;
};
