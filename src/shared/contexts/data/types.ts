export type RemoteFile = {
  url: string;
  name: string;
};

export type DataContextProps = {
  files: File[];
  changeFiles: (files: File[]) => void;
  remoteFiles: RemoteFile[];
  changeRemoteFiles: (remoteFile: RemoteFile) => void;
  isRunning: boolean;
};
