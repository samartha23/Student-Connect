import React from "react";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";

const Modal = ({ title, children, openModal, setOpenModal, modalClasses }) => {
  if (openModal) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }

  return (
    <div>
      <div
        className={twMerge(
          `fixed bottom-0 left-0 right-0 top-0 z-40 cursor-pointer bg-gray-700 opacity-40 dark:bg-gray-100
           ${openModal ? "" : "hidden"}`,
        )}
        onClick={() => {
          setOpenModal(false);
        }}
      ></div>
      <div
        className={twMerge(
          `fixed left-1/2 top-1/2 z-50 max-h-screen w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 transform overflow-y-scroll rounded-lg bg-white p-1 shadow dark:bg-gray-800 ${modalClasses} ${
            openModal ? "" : "hidden"
          }`,
        )}
      >
        <div className="relative rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-5">
          <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <X />
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
