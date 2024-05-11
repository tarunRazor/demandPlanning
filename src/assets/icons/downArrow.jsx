import * as React from "react";
const downArrow = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1}
    aria-hidden="true"
    viewBox="0 0 23 23"
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export default downArrow;
