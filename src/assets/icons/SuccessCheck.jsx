import * as React from "react"
const SuccessCheck = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <circle cx={10} cy={10} r={9} stroke="#107149" />
    <path stroke="#107149" d="m6 10 3 3 5-6" />
  </svg>
)
export default SuccessCheck
