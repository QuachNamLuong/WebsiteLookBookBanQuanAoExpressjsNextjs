// components/UserIcon.tsx
import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

export function AccountIcon(props: IconProps) {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props} // allows className, style, etc.
    >
      <circle
        cx="17.1499"
        cy="12.25"
        r="6.35"
        stroke="#4F6742"
        strokeWidth="2"
      />
      <path
        d="M5.59998 29.4C5.59997 21.7636 12.0805 18.9 17.4113 18.9C22.7421 18.9 28.7 21.7636 28.7 29.4"
        stroke="#4F6742"
        strokeWidth="2"
      />
      <circle
        cx="17.5"
        cy="17.5"
        r="16.5"
        stroke="#4F6742"
        strokeWidth="2"
      />
    </svg>
  );
}
