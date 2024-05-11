import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import ChevronUpDownIcon from "../../assets/icons/ChevronUpDownIcon";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectBox({
  listValue,
  defaultText,
  selected,
  setSelected,
  isSubmitted,
}) {
  const onChange = (value) => {
    if (setSelected) {
      setSelected(value);
    }
  };
  return (
    <>
      <input type="hidden" value={selected} name="UserRole" />
      <Listbox value={selected} onChange={onChange}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium leading-6 text-textColor"></Listbox.Label>
            <div className="relative mt-2">
              <Listbox.Button
                className={`relative w-full cursor-default rounded-md bg-white py-1 pl-3 pr-10 text-left text-textColor border  focus:outline-none text-subtitle sm:leading-6 ${
                  isSubmitted && !selected
                    ? "border-warning"
                    : "border-border-subtle"
                }`}
              >
                <span className="block truncate capitalize">
                  {selected || defaultText}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-textColor"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-subtitle shadow-xl  border border-border-subtle  px-1">
                  {listValue.map((list) => (
                    <Listbox.Option
                      key={list}
                      className={({ active, selected }) =>
                        classNames(
                          selected ? "bg-background-alt" : "text-textColor",
                          "relative cursor-default select-none py-1 mb-1 px-2 capitalize rounded"
                        )
                      }
                      value={list}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold " : "font-medium",
                              "block truncate "
                            )}
                          >
                            {list}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-primary",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            ></span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </>
  );
}
