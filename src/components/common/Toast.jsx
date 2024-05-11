import { Fragment, useState, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import SuccessCheck  from  '../../assets/icons/SuccessCheck'


export default function Notification({onClose, duration = 3000,  isVisible,text}) {

  if (!isVisible) return null

  useEffect(() => {
    if (isVisible){
    const timer = setTimeout(() => {
      onClose()
    }, duration)
    return () => clearTimeout(timer)
  }
  },[isVisible, onClose, duration]);


  return (
    <>

      <div
        aria-live="assertive"
        className="pointer-events-none fixed top-auto bottom-0 inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
      
          <Transition
            show={isVisible}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-success-bg text-success-text shadow-card ">
              <div className="p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <SuccessCheck  aria-hidden="true" />
                  </div>
                  <div className="ml-3 w-0 flex-1 ">
                    <p className="text-sm font-medium text-success-text">{text}</p>
                 
                  </div>
                  <div className="ml-4 flex ">
                    <button
                      type="button"
                      className="inline-flex text-sm font-semibold uppercase text-success-text  focus:outline-none "
                      onClick={() => {
                        onClose()
                      }}
                    >
                      <span className="">Close</span>
                      
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}
