import * as React from "react"
const lens = (props) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  width={24}
  height={24}
  fill="none"
  {...props}
  
>
  <circle cx={11} cy={11} r={6} stroke="#222" />
  <path stroke="#222" strokeLinecap="square" d="m20 20-3-3" />
</svg>
)
export default lens
