import { Fragment, useState, React, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Close from "../../assets/icons/Close";

export default function UserDialog({ handleCloseDialog, item, open, setOpen }) {
  if (!open) return null;

  const handleSubmit = () => {
    setOpen(false);
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[999]"
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                <div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm h1">Finalise Assignments</p>

                    <span
                      className="cursor-pointer"
                      onClick={() => setOpen(false)}
                    >
                      <Close />
                    </span>
                  </div>
                  <div className="mt-1 flex justify-between flex-wrap text-subtitle  pb-5">
                    Do you approve the number of items assigned to reviewers?
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 flex justify-end">
                  <button
                    className="btn btn-secondary mr-2"
                    onClick={() => setOpen(false)}
                  >
                    Not Yet
                  </button>
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="btn btn-primary"
                  >
                    Approve
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
