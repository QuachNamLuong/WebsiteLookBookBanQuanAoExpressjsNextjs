import React from "react";

interface SpaceVerticalProps {
  size?: number; // height in pixels
}

export default function SpaceVertical({ size = 16 }: SpaceVerticalProps) {
  return <div style={{ height: `${size}px`, width: "100%" }} />;
}
