import * as React from "react"
const Profile = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <circle cx={12} cy={8} r={3.5} stroke="#222" strokeLinecap="round" />
    <path
      stroke="#222"
      strokeLinecap="round"
      d="M4.85 16.948c.639-2.345 3.065-3.448 5.495-3.448h3.31c2.43 0 4.856 1.103 5.496 3.448a9.95 9.95 0 0 1 .295 1.553c.06.55-.394.999-.946.999h-13c-.552 0-1.005-.45-.946-.998a9.94 9.94 0 0 1 .295-1.554Z"
    />
  </svg>
)
export default Profile
