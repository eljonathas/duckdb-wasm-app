import { FormEvent, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

import { Dropzone } from "@/components/layout/dropzone";
import { Modal } from "@/components/layout/modal";

import { useData } from "@/shared/hooks/use-data";

import { UploadTableModalProps } from "./types";
import { generateRandomId } from "@/shared/utils/generators";

export function UploadTableModal({ isOpen, onClose }: UploadTableModalProps) {
  const [uploadType, setUploadType] = useState("url");
  const [files, setFiles] = useState<File[]>([]);

  const [remoteFile, setRemoteFile] = useState("");
  const [remoteFileName, setRemoteFileName] = useState("");

  const { addRemoteFile } = useData();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!remoteFileName) return toast.error("Please enter a name for the file");

    if (uploadType === "url") {
      if (!remoteFile) return toast.error("Please enter a valid URL");

      const { ok } = await fetch(remoteFile);

      if (!ok) return toast.error("The URL is not valid");

      addRemoteFile({
        id: generateRandomId(),
        name: remoteFileName,
        url: remoteFile,
      });
    } else {
      if (!files.length) return toast.error("Please select a file");

      const url = URL.createObjectURL(files[0]);

      addRemoteFile({
        id: generateRandomId(),
        name: remoteFileName,
        url,
      });
    }

    onClose?.();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal title="Add a new table" onClose={onClose}>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col">
              <div className="flex flex-col space-y-2 mb-4">
                <label htmlFor="database-name" className="text-sm">
                  Table name
                </label>
                <input
                  id="database-name"
                  className="border-2 border-gray-700 rounded-xl px-4 py-3 bg-gray-900 focus:outline-none focus:border-blue-500 placeholder:text-gray-600 transition disabled:bg-gray-700"
                  type="text"
                  placeholder="database"
                  value={remoteFileName}
                  onChange={e => setRemoteFileName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="url-upload-type"
                    name="upload-type"
                    value="url"
                    className="w-4 h-4"
                    checked={uploadType === "url"}
                    onChange={() => setUploadType("url")}
                  />
                  <label htmlFor="url-upload-type" className="text-sm">
                    Table url
                  </label>
                </div>
                <input
                  className="border-2 border-gray-700 rounded-xl px-4 py-3 bg-gray-900 focus:outline-none focus:border-blue-500 placeholder:text-gray-600 transition disabled:bg-gray-700"
                  type="text"
                  placeholder="https://storage.com/table.parquet"
                  value={remoteFile}
                  onChange={e => setRemoteFile(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-2 mb-8">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="table-upload"
                    name="upload-type"
                    value="table"
                    className="w-4 h-4"
                    checked={uploadType === "file"}
                    onChange={() => setUploadType("file")}
                  />
                  <label htmlFor="table-upload" className="text-sm">
                    Upload the table
                  </label>
                </div>
                <Dropzone
                  accept={{
                    "application/parquet": [".parquet"],
                  }}
                  onDrop={files => setFiles(files)}
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center bg-blue-500 rounded-xl px-12 py-4 text-white font-semibold gap-2 w-full hover:brightness-110 active:brightness-90 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>
      )}
    </AnimatePresence>
  );
}
