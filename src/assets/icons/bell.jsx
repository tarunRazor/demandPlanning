import * as React from "react"
const Bell = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
    viewBox="0 0 18 18"
  >
    <path
      stroke="#33363F"
      d="M4.836 6.727a4.19 4.19 0 0 1 8.328 0l.189 1.7c.097.872.38 1.712.832 2.465l.433.722c.194.322.29.483.326.608a1 1 0 0 1-.704 1.245c-.126.033-.314.033-.69.033h-9.1c-.376 0-.564 0-.69-.033a1 1 0 0 1-.704-1.245c.036-.125.132-.286.325-.608l.434-.722a6.1 6.1 0 0 0 .832-2.465l.189-1.7Z"
    />
    <path
      stroke="#33363F"
      strokeLinecap="round"
      d="M6.827 13.804c.128.559.41 1.052.803 1.404.393.351.875.542 1.37.542.495 0 .977-.19 1.37-.542.393-.352.675-.845.803-1.404"
    />
  </svg>
)
export default Bell
