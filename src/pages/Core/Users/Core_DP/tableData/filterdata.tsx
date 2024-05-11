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

  const hasStatus = data.some((item) => item.hasOwnProperty("status"));

  const uniqueStatus = hasStatus
    ? removeDuplicates(data, "status").map((status) => ({
        value: status["status"],
        label: status["status"],
      }))
    : [];

  const result = [];

  if (uniqueStatus.length > 0) {
    result.push({
      column: "status",
      title: "status",
      options: uniqueStatus,
    });
  }

  return result;
};
