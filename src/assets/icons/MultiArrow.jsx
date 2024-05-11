import * as React from "react"
const MultiArrow = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={17}
    fill="none"
    {...props}
  >
    <path
      stroke="#2E2E2E"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m1 6 6.102 5.993A3 3 0 0 1 8 14.133V16M1 6h2.545M1 6v2.5M15 6l-6.102 5.993A3 3 0 0 0 8 14.133V16m7-10h-2.546M15 6v2.5M8 1v13.125M8 1 6.09 2.875M8 1l1.91 1.875"
    />
  </svg>
)
export default MultiArrow
