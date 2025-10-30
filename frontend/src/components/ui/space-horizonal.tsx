import React from "react";

interface SpaceHorizontalProps {
  size?: number; // width in pixels
}

export default function SpaceHorizontal({ size = 16 }: SpaceHorizontalProps) {
  return <div style={{ width: `${size}px`, height: "100%" }} />;
}
