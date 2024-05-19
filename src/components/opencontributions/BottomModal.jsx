import React from "react";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useSearchParams } from "react-router-dom";

const BottomModal = ({ children, openModal, setOpenModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // const removeQueryParams = () => {
  //   const param = searchParams.get("taskId");

  //   if (param) {
  //     searchParams.delete("taskId");

  //     setSearchParams(searchParams);
  //   }
  // };

  if (openModal) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }

  return (
    <div>
      <div
        className={twMerge(
          `fixed bottom-0 left-0 right-0 top-0 z-10 cursor-pointer bg-black opacity-40 dark:bg-gray-500 ${
            openModal ? "" : "hidden"
          }`,
        )}
        onClick={() => {
          setOpenModal(false);
        }}
      ></div>
      <div
        className={twMerge(
          `fixed bottom-0 left-0 right-0 z-50 h-[80vh] w-screen overflow-y-scroll rounded-tl-3xl rounded-tr-3xl bg-white shadow dark:bg-gray-800 sm:p-1 lg:px-40 ${
            openModal ? "" : "hidden"
          }`,
        )}
      >
        <div className="relative h-full bg-white p-4 dark:bg-gray-800 sm:p-5">
          <div className="mb-4 flex items-center justify-between rounded-t pb-4 sm:mb-5">
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

export default BottomModal;
