import { Fragment, useState,React,useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Close from "../../assets/icons/Close";
import User from "../../assets/icons/User";

import { AppContext } from "../../contexts/AppContext";
import ToggleSwitch from "./Toggle";

export default function ApproveUser({
  item,
  setDialogOpen,
  open,
  setToast
}) {
  if (!open) return null;
 
  const handleSubmit = () =>{
    setDialogOpen(false);
    setToast(true);
  }
  return (

    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[999]"
        onClose={() => setDialogOpen(false)}
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
                    <p className="text-sm">
                    Approve request to join &nbsp;
                      <span className="font-semibold">
                        {item.app} team.
                      </span>
                    </p>

                    <span
                      className="cursor-pointer"
                      onClick={() => setDialogOpen(false)}
                    >
                      <Close />
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between flex-wrap text-subtitle border-b border-border-subtle pb-5">
                    <div className="flex  items-center justify-center rounded-full">
                      <User className="h-6 w-6" aria-hidden="true" />
                      <p className="ml-2">{item.name}(You)</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="flex items-center">
                        Email : {item.email}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 ">
                    <p className="text-subtitle "><span className="font-bold">Requested User Role : </span> <span>{item.role}</span></p> 
                    
                  </div>
                  {item.proxy && item.proxy.length > 0 && (
                  
                    <div className="mt-4 flex items-center">
                    {item.proxy.map((proxy, index) => (
          <div key={index}  className="flex items-center">
            {proxy.VendorProxy &&
            <div className="flex items-center"> 
            <p className="mr-2">Vendor Proxy </p> <ToggleSwitch />  </div> }
          
            {proxy.InventoryProxy &&  <div className="flex ml-6 items-center">     <p className="mr-2">Can invite an external vendor </p>  <ToggleSwitch /></div>}
          </div>
        ))}
                       
                     
                     
                
                
                 </div>
                  )} 
                  
                </div>
                <div className="mt-8 sm:mt-6 flex justify-end">
                  <button
                    className="btn btn-secondary mr-2"
                    onClick={() => setDialogOpen(false)}
                  >
                  Reject
                  </button>
                  <button 
                  onClick={handleSubmit}
                  type="button" className="btn btn-primary">
                    Request Access
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
