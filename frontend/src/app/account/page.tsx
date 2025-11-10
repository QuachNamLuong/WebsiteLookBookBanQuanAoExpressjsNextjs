"use client";

import { useState, useEffect, useId } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { LogOut, Settings, User } from "lucide-react";
import api from "@/lib/axios";
import { isLogin } from "@/utils/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getUserProfile } from "@/services/user/get-user-profile";
import { useAuthStore } from "@/lib/use-auth-store";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const loggedIn = useAuthStore((state) => state.loggedIn);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = await isLogin();

      if (!userId) {
        router.push("/auth"); // redirect if not logged in
        return;
      }
      const userProfile = await getUserProfile(userId);
      if (userProfile) setUser(userProfile); // set user if found

      setLoading(false); // done loading
    };
    if (!loggedIn) router.push("/auth");
    fetchUser();
  }, [router, loggedIn]);

  const handleLogout = async () => {
    try {
      const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
      await api.post(`${backend}/api/auth/logout`, {}, { withCredentials: true });
      window.location.href = "/auth"; // redirect to login
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
        <Card className="w-full max-w-md p-6 rounded-2xl shadow-lg border bg-white/70 dark:bg-gray-800/60">
          <CardHeader className="flex flex-col items-center text-center space-y-3">
            <Skeleton className="h-20 w-20 rounded-full" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="p-8 rounded-2xl shadow-md">
          <CardContent className="text-center space-y-2">
            <h2 className="text-xl font-semibold">You’re not logged in</h2>
            <p className="text-muted-foreground">Please sign in to access your account.</p>
            <Button asChild className="mt-3">
              <a href="/auth">Go to Login</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const displayName = user?.name ?? user?.email ?? user?.userId ?? "Unknown";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black p-6">
      <Card className="w-full max-w-md shadow-xl border rounded-2xl backdrop-blur-sm bg-white/80 dark:bg-gray-800/60">
        <CardHeader className="flex flex-col items-center text-center space-y-3 pt-8">
          <Avatar className="h-20 w-20 border-2 border-primary shadow-sm">
            <AvatarImage src={user?.avatarUrl || ""} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-2xl font-semibold">{displayName}</h1>
            <p className="text-muted-foreground text-sm mt-1">Welcome back 👋</p>
          </div>
        </CardHeader>

        <CardContent className="mt-6 space-y-4 px-6">
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">Email</p>
            <p className="font-medium">{user.email ?? "N/A"}</p>
          </div>

          <Separator />

          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">User ID</p>
            <p className="font-mono text-xs">{user.userId}</p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center px-6 pb-6 pt-4">
          <Button variant="outline" className="flex items-center gap-2" asChild>
            <a href="/settings">
              <Settings className="w-4 h-4" />
              Settings
            </a>
          </Button>

          <Button variant="destructive" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Log out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
