import { redirect } from "next/navigation";
import { checkIsAdmin } from "@/lib/auth/check-admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await checkIsAdmin();

  if (!isAdmin) {
    redirect("/404");
  }

  return <>{children}</>;
}
