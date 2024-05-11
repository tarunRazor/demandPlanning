// import React, { useState, useEffect, useRef } from "react";

// export default function TableauViz({ token, StartUrl }) {
//   return (
//     console.log(token, StartUrl),
//     (
//       <tableau-viz
//         id="tableauViz"
//         className={"mt-16"}
//         src="https://analytics.razor-group.com/#/views/ASINReview-PurchasingDecisions/PurchasingDecisions?:iid=1"
//         token={token}
//         toolbar="hidden"
//       ></tableau-viz>
//     )
//   );
// }

import React, { useEffect, useRef } from "react";

export default function TableauViz({ token, StartUrl }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && token && StartUrl) {
      // Perform initialization here, or set up conditions to ensure the component does not re-render
      initialized.current = true;
      // You may want to insert the tableau-viz element programmatically if required, or trigger some setup code.
    }
  }, []); // Empty dependency array to run only once on mount

  return (
    <div id="tableauViz" className="mt-16">
      {initialized.current && (
        <tableau-viz
          id="tableauViz"
          src={StartUrl}
          token={token}
          toolbar="hidden"
        ></tableau-viz>
      )}
    </div>
  );
}
