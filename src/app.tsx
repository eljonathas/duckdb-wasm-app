import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import CodeEditor from "@uiw/react-textarea-code-editor";

import { Layout } from "@/components/core/layout";
import { Card } from "@/components/layout/card";
import { UploadTableModal } from "./components/core/upload-table-modal";

export function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout>
      <main className="flex flex-col space-y-12">
        <section className="flex flex-col">
          <h2 className="font-semibold text-gray-500 mb-4">
            Select your database
          </h2>
          <div className="flex flex-wrap space-x-4">
            <Card>
              <h3 className="text-sm">mocked_customer_data.parquet</h3>
            </Card>
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
              <CodeEditor
                className="rounded-xl h-80 bg-gray-800"
                language="sql"
                style={{
                  fontSize: "0.875rem",
                  fontFamily: "monospace",
                }}
              />
              <button className="flex items-center justify-center bg-blue-500 rounded-xl px-12 py-4 text-white font-semibold gap-2 ml-auto hover:brightness-110 active:brightness-90 transition">
                <FaPlay />
                Run query
              </button>
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-gray-500 mb-4">Preview</h2>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
