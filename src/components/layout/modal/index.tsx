import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

import { FadeAnimation } from "./animations";
import { ModalProps } from "./types";

export function Modal({ children, onClose, title }: ModalProps) {
  return (
    <motion.div
      key="modal"
      className="modal modal-overlay left-0 top-0 fixed w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50 ,
  "
      {...FadeAnimation}
    >
      <div className="modal-box relative bg-gray-800 rounded-xl flex flex-col p-8 space-y-4 min-w-[30rem]">
        <div className="modal-box-header flex items-center w-full justify-between">
          {title && <h1 className="font-semibold text-lg">{title}</h1>}
          <button
            className="modal-close bg-gray-900 p-2 rounded-full ml-auto"
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>
        {children}
      </div>
    </motion.div>
  );
}
