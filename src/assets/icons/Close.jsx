import * as React from "react"
const Close = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <path
      stroke="#222"
      strokeLinecap="round"
      d="M16 28a12 12 0 1 1 0-24.002A12 12 0 0 1 16 28h0ZM12 12l8 8M20 12l-8 8"
    />
  </svg>
)
export default Close
