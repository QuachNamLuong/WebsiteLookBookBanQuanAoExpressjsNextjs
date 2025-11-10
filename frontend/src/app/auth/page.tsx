"use client";

import { useEffect, useState } from "react";
import LoginForm from "./(components)/(form)/login-form";
import RegisterForm from "./(components)/(form)/register-form";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [state, setState] = useState<string | null>(null);
  const router = useRouter();

  const handleLoginState = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("state", "login");
    router.push(`?${params.toString()}`);
  };

  const handleRegisterState = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("state", "register");
    router.push(`?${params.toString()}`);
  };

  // Update state whenever searchParams changes
  useEffect(() => {
    const currentState = searchParams.get("state");
    setState(currentState);

    // Determine login/register
    if (currentState === "register") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="= w-full max-w-md bg-[#4f6742] p-8 shadow-md my-20">
        <div className="flex justify-around">
          <button
            onClick={() => { setIsLogin(true); handleLoginState(); }}
            className={`pb-2 uppercase font-semibold ${isLogin
              ? "text-white border-b-2 border-white"
              : "text-gray-400"
              }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => { setIsLogin(false); handleRegisterState(); }}
            className={`pb-2 uppercase font-semibold ${!isLogin
              ? "text-white border-b-2 border-white"
              : "text-gray-400"
              }`}
          >
            Đăng ký
          </button>
        </div>

        {/* Swap Forms */}
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
