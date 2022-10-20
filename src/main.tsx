import React from "react";
import ReactDOM from "react-dom/client";
import { AnimatePresence } from "framer-motion";

import { App } from "@/app";

import { DataProvider } from "@/shared/contexts/data";

import "@/shared/styles/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DataProvider>
      <AnimatePresence>
        <App />
      </AnimatePresence>
    </DataProvider>
  </React.StrictMode>
);
