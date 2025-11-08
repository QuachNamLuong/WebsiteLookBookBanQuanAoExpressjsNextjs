import { headers } from "next/headers";

export async function getDeviceType() {
  const ua = (await headers()).get("user-agent") || "";

  const isMobile = /mobile/i.test(ua);
  const isTablet = /tablet|ipad/i.test(ua);
  const isDesktop = !isMobile && !isTablet;

  if (isMobile) return "mobile";
  if (isTablet) return "tablet";
  return "desktop";
}