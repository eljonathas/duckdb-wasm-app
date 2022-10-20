import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { Dropzone } from "@/components/layout/dropzone";
import { Modal } from "@/components/layout/modal";

import { UploadTableModalProps } from "./types";

export function UploadTableModal({ isOpen, onClose }: UploadTableModalProps) {
  const [uploadType, setUploadType] = useState("file");

  function changeFiles(files: File[]) {
    setFiles(files);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal title="Add a new table" onClose={onClose}>
          <form>
            <div className="flex flex-col">
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
