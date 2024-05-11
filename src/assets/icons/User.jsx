import * as React from "react"
const User = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
    viewBox="0 0 18 18"
  >
    <path
      stroke="#222"
      strokeLinecap="round"
      d="M14.796 15.335c-.342-.957-1.096-1.802-2.143-2.405C11.605 12.327 10.32 12 9 12c-1.32 0-2.605.327-3.653.93-1.047.603-1.8 1.449-2.143 2.405"
    />
    <circle cx={9} cy={6} r={3} stroke="#222" strokeLinecap="round" />
  </svg>
)
export default User
