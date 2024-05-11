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
  const hasPoNumber = data.some((item) => item.hasOwnProperty(""));
  const hasInvoiceStatus = data.some((item) =>
    item.hasOwnProperty("Submission_Status")
  );

  
  const uniquePos = hasPoNumber
    ? removeDuplicates(data, "po_number").map((po) => ({
        value: po["po_number"],
        label: po["po_number"],
      }))
    : [];

  const uniqueStatus = hasInvoiceStatus
    ? removeDuplicates(data, "Submission_Status").map((status) => ({
        value: status["Submission_Status"],
        label: status["Submission_Status"],
      }))
    : [];

    

  const result = {};

  if (uniquePos.length > 0) {
    result.Pos = [
      {
        column: "po_number",
        title: "po_number",
        options: uniquePos,
      },
    ];
  }

  if (uniqueStatus.length > 0) {
    result.Status = [
      {
        column: "status",
        title: "Status",
        options: uniqueStatus,
      },
    ];
  }
  
  return result;
  

};
