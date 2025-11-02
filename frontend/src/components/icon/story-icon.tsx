import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

export function StoryIcon(props: IconProps) {
  return (
    <svg
      width="37"
      height="32"
      viewBox="0 0 37 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props} // allows className, style, etc.
    >
      <path
        d="M18.7108 5.73763C19.2731 3.97198 24.1928 -0.048275 36 1.25559V26.5179C30.6586 26.1105 19.7229 26.4364 18.7108 31M18.7108 5.73763C16.3494 1.82604 6.2008 0.848131 1 1.25559V26.5179C14.494 25.54 18.4297 29.0985 18.7108 31M18.7108 5.73763V31"
        stroke="#4F6742"
        strokeWidth="2"
      />
    </svg>
  );
}
