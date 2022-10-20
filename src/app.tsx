import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { AgGridReact } from "ag-grid-react";

import { Layout } from "@/components/core/layout";
import { Card } from "@/components/layout/card";
import { UploadTableModal } from "./components/core/upload-table-modal";

import { useData } from "@/shared/hooks/use-data";

export function App() {
  const [showModal, setShowModal] = useState(false);
  const {
    remoteFiles,
    changeSelectedFile,
    selectedFile,
    setCodeData,
    codeData,
    runQuery,
    resultTable,
    isRunning,
  } = useData();

  const tableData = useMemo(() => resultTable?.toArray(), [resultTable]);

  const columnDefs = useMemo(
    () =>
      resultTable?.schema.fields.map(field => ({
        field: field.name,
        headerName: field.name,
        width: 150,
      })),
    [resultTable]
  );

  const rowData = useMemo(
    () =>
      tableData?.map((row, index) => ({
        id: index,
        ...row,
      })),
    [tableData]
  );

  return (
    <Layout>
      <main className="flex flex-col space-y-12">
        <section className="flex flex-col">
          <h2 className="font-semibold text-gray-500 mb-4">
            Select your database
          </h2>
          <div className="flex flex-wrap space-x-4">
            {remoteFiles.map(file => (
              <Card
                key={file.url}
                onClick={() => {
                  changeSelectedFile(file.id);
                }}
                isSelected={selectedFile?.id === file.id}
              >
                <h2>{file.name}</h2>
              </Card>
            ))}
            <button
              className="flex items-center border-2 border-dashed border-gray-600 rounded-xl px-12 py-4 text-gray-600 gap-1 hover:brightness-110 active:brightness-90 transition"
              onClick={() => setShowModal(!showModal)}
            >
              <FiPlus />
              <span className="font-semibold text-sm">Add table</span>
            </button>
          </div>
          <UploadTableModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          />
        </section>
        <section>
          <div className="flex items-start justify-between space-x-8">
            <div className="flex-1 space-y-4">
              <h2 className="font-semibold text-gray-500">
                Insert your query (SQL)
              </h2>
              {/* Create alert */}
              <div
                className="p-4 mb-4 text-sm text-yellow-700 bg-yellow-200 rounded-lg dark:bg-blue-200 dark:text-blue-800"
                role="alert"
              >
                Use <span className="font-semibold">sample_table</span> as table
                name in your query, it will be replaced with the selected table.
              </div>
              <CodeEditor
                className="rounded-xl h-96 bg-gray-800 text-white"
                language="sql"
                value={codeData}
                onChange={e => setCodeData(e.target.value)}
                style={{
                  fontSize: "0.875rem",
                  fontFamily: "monospace",
                }}
              />
              <button
                className="flex items-center justify-center bg-blue-500 rounded-xl px-12 py-4 text-white font-semibold gap-2 ml-auto hover:brightness-110 active:brightness-90 transition min-w-[12rem]"
                onClick={runQuery}
              >
                {isRunning ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <>
                    <FaPlay />
                    Run query
                  </>
                )}
              </button>
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-gray-500 mb-4">Preview</h2>
              <div className="flex flex-col">
                {tableData ? (
                  <div className="ag-theme-alpine-dark w-full h-[40em]">
                    <AgGridReact columnDefs={columnDefs} rowData={rowData} />
                  </div>
                ) : (
                  <p className="text-gray-500">No data loaded</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
