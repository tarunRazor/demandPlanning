import * as React from "react"
const LeftArrow = (props) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width={20}
  height={20}
  fill="none"
  {...props}
>
  <path
    stroke="#2E2E2E"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="m9.25 7-3 3m0 0 3 3m-3-3h7.5M10 19a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z"
  />
</svg>
)
export default LeftArrow
