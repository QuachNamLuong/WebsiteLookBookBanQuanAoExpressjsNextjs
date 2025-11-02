// components/ViecharmIcon.tsx
import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

export default function ShopIcon(props: IconProps) {
  return (
    <svg
      width="33"
      height="36"
      viewBox="0 0 33 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props} // allows className, style, etc. to be passed in
    >
      <path
        d="M12.2194 13.3364C12.5242 14.7059 14.048 17.445 17.7051 17.445C21.3623 17.445 22.5813 14.7059 22.7337 13.3364M12.2194 9.9748H9.14709C8.25861 9.9748 7.47665 10.5609 7.2274 11.4137L1.08222 32.439C0.708039 33.7192 1.66811 35 3.00191 35H29.8478C31.1249 35 32.0749 33.8193 31.8014 32.5718L27.1925 11.5466C26.9913 10.6288 26.1784 9.9748 25.2389 9.9748H21.3623M12.2194 9.9748C12.8289 6.86221 13.6823 0.711726 17.7051 1.01053C21.728 1.30934 21.3623 7.11121 21.3623 9.9748M12.2194 9.9748H21.3623"
        stroke="#4F6742"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
