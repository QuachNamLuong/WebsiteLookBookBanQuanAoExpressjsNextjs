"use client";

import { useState } from "react";
import LoginForm from "./(components)/(form)/login-form";
import RegisterForm from "./(components)/(form)/register-form";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="absolute top-[200px] left-1/2 -translate-x-1/2 w-full max-w-md bg-[#4f6742] p-8 shadow-md">
        {/* Tab Switcher */}
        <div className="flex justify-around">
          <button
            onClick={() => setIsLogin(true)}
            className={`pb-2 uppercase font-semibold ${
              isLogin
                ? "text-white border-b-2 border-white"
                : "text-gray-400"
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`pb-2 uppercase font-semibold ${
              !isLogin
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
