import * as React from "react"
const LineSeparator = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={1}
    height={22}
    fill="none"
    {...props}
  >
    <path stroke="#222" d="M.5 0v22" />
  </svg>
)
export default LineSeparator
