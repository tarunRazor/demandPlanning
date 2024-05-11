import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import DownArrow from "../../assets/icons/downArrow";
import CheckIcon from "../../assets/icons/CheckIcon";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FilterDropdown({
  listValue,
  selectedFilter,
  setSelectedFilter,
  defaultFilterValue,
  items,
}) {
  const [selected, setSelected] = useState(defaultFilterValue);
  useEffect(() => {
    setSelectedFilter(selected);
  }, [selected]);

  return (
    <>
     
      <Listbox value={selectedFilter ? selectedFilter : null} onChange={setSelected ? setSelected : null}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium leading-6 text-textColor"></Listbox.Label>
            <div className="relative  w-full">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-textColor border border-border-subtle focus:outline-none text-subtitle sm:leading-6">
                <span className="block truncate">{selected} </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <DownArrow
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
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-small shadow-xl  border border-border-subtle  px-1">
                  {listValue(items).map((filter) => (
                    <Listbox.Option
                      key={filter}
                      value={filter}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-background-alt" : "text-textColor",
                          "relative cursor-default select-none py-2 px-2 rounded"
                        )
                      }
                    >
                      {({ selectedFilter, active }) => (
                        <>
                          <span
                            className={classNames(
                              selectedFilter ? "font-semibold" : "font-medium",
                              "block truncate"
                            )}
                          >
                            {filter}
                          </span>

                          {selectedFilter ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
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
