import React from "react";

function removeDuplicates(array, key) {
  if (!Array.isArray(array)) {
    // Handle non-array input appropriately
    return [];
  }

  return array.reduce((accumulator, current) => {
    const duplicate = accumulator.find((item) => item[key] === current[key]);
    if (!duplicate) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);
}

export const filters = (data) => {
  if (!Array.isArray(data)) {
    return { uniquePos: [], uniqueStatus: [] };
  }

  // Checking if any item in the data array has the key 'po_number'

  const hasStatus = data.some((item) => item.hasOwnProperty("Status"));
  const hasDelta = data.some((item) => item.hasOwnProperty("Delta"));

  const uniqueStatus = hasStatus
    ? removeDuplicates(data, "Status").map((status) => ({
        value: status["Status"],
        label: status["Status"],
      }))
    : [];

  var uniqueDelta = hasDelta
    ? removeDuplicates(data, "Delta").map((delta) => ({
        value: delta["Delta"],
        label: delta["Delta"],
      }))
    : [];

  const result = [];

  if (uniqueStatus.length > 0) {
    result.push({
      column: "status",
      title: "Status",
      options: uniqueStatus,
    });
  }
  if (uniqueDelta.length > 0) {
    console.log(uniqueDelta);

    // uniqueDelta = uniqueDelta.map((item) => {
    //   if (item.label === "+100%") {
    //     return { ...item, label: "abc" };
    //   }
    //   if (item.label === "-25%") {
    //     return { ...item, label: "bbc" };
    //   }
    //   if (item.label === "0%") {
    //     return { ...item, label: "tarun" };
    //   }
    //   if (item.label === "-0%") {
    //     return { ...item, label: "abc" };
    //   }
    //   return uniqueDelta;
    // });

    result.push({
      column: "Delta",
      title: "delta",
      options: uniqueDelta,
    });
  }

  return result;
};
