import React from "react";
import ReactDOM from "react-dom/client";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import "react-toastify/dist/ReactToastify.css";

import { App } from "@/app";

import { DataProvider } from "@/shared/contexts/data";

import "@/shared/styles/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DataProvider>
      <AnimatePresence>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          theme="dark"
        />
      </AnimatePresence>
    </DataProvider>
  </React.StrictMode>
);
