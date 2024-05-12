import React, { useLayoutEffect, useRef, useState } from "react";
import StatusBadge from "./StatusBadge";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function formatDateString(dateString) {
  if (!dateString) return "-";
  // Check if the dateString is a Unix timestamp (a string of digits)
  const isUnixTimestamp = /^\d+$/.test(dateString);

  // Convert Unix timestamp from seconds to milliseconds if necessary
  const date = new Date(
    isUnixTimestamp ? parseInt(dateString, 10) * 1000 : dateString
  );

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
export default function Table({
  TableData,
  TableHeaderData,
  handleAccept,
  handleReject,
  isCheckbox,
  object,
  delta,
  selectedAsin,
  handleInputChange,
}) {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [inputValues, setInputValues] = useState({});

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedPeople.length > 0 && selectedPeople.length < TableData.length;
    setChecked(selectedPeople.length === TableData.length);
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedPeople, TableData]);

  function toggleAll() {
    setSelectedPeople(checked || indeterminate ? [] : TableData);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <div className="">
      <div className="flow-root">
        <div className="inline-block min-w-full align-middle ">
          <table
            className={`min-w-full divide-y ${
              object ? "rounded-b-lg" : "rounded-lg"
            }   h-max relative bg-white  shadow-sm ring-1 ring-border-subtle overflow-hidden whitespace-pre-wrap`}
          >
            <thead className="py-2 rounded-tl-lg rounded-tr-lg px-3  bg-background-alt border-b border-border-subtle">
              <tr>
                {isCheckbox && (
                  <th
                    scope="col"
                    className="px-4 py-3 text-center text-xs font-medium text-gray-500 capitalize tracking-wider"
                  >
                    <input
                      type="checkbox"
                      className="rounded text-primary focus:outline-none focus:ring-0 focus:ring-offset-0"
                      ref={checkbox}
                      checked={checked}
                      onChange={toggleAll}
                    />
                  </th>
                )}
                {TableHeaderData.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className="px-4 py-2 text-left text-subtitle font-bold capitalize "
                  >
                    {header.label.split("|").map((chunk, index, array) => (
                      <React.Fragment key={index}>
                        {chunk}

                        {index < array.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {TableData.map((person, personIdx) => (
                <tr
                  key={personIdx}
                  className={
                    selectedPeople.includes(person)
                      ? "bg-background-alt"
                      : undefined
                  }
                >
                  {isCheckbox && (
                    <td className="px-4 py-3 text-subtitle relative  sm:w-12 sm:px-6">
                      {selectedPeople.includes(person) && (
                        <div className="absolute inset-y-0 left-0 w-0.5 bg-primary" />
                      )}
                      <input
                        type="checkbox"
                        className="rounded text-primary focus:outline-none focus:ring-0 focus:ring-offset-0"
                        checked={selectedPeople.includes(person)}
                        onChange={(e) =>
                          setSelectedPeople(
                            e.target.checked
                              ? [...selectedPeople, person]
                              : selectedPeople.filter((p) => p !== person)
                          )
                        }
                      />
                    </td>
                  )}
                  {TableHeaderData.map((header) => {
                    const cellValue = person[header.id];
                    const inputKey = `${personIdx}_${header.id}`;
                    if (
                      header.label === "Final DP QTY" &&
                      inputValues[inputKey] === undefined
                    ) {
                      setInputValues((prev) => ({
                        ...prev,
                        [inputKey]: cellValue,
                      }));
                    }
                    return (
                      <td
                        key={`${personIdx}_${header.id}`}
                        className="px-4 py-3 whitespace-nowrap text-subtitle  text-body"
                      >
                        {header.label.toLowerCase() === "status" ||
                        header.label === "app" ? (
                          <StatusBadge status={cellValue} />
                        ) : header.label === "DP Date" ? (
                          formatDateString(cellValue)
                        ) : header.label === "Last Updated" ? (
                          "-"
                        ) : header.label === "Delta" ? (
                          delta && `${delta}%`
                        ) : header.label === "Final DP QTY" ? (
                          <input
                            value={inputValues[inputKey] || ""}
                            pattern="\d*"
                            onChange={(e) => {
                              const newValue = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                              setInputValues((prev) => ({
                                ...prev,
                                [inputKey]: newValue,
                              }));
                              handleInputChange(
                                person["demand_plan_month"],
                                newValue
                              );
                            }}
                            type="text"
                            className="block w-full  px-3 py-1.5 border-b border-border-subtle focus-visible:ring-0 focus-visible:outline-0  focus:ring-0 text-subtitle"
                          />
                        ) : cellValue === null ? (
                          "-"
                        ) : (
                          cellValue
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
