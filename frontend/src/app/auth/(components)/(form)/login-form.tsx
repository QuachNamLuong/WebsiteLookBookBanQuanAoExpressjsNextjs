import { useState } from "react";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { FloatingInput, FloatingLabel, FloatingLabelInput } from "@/components/ui/floating-label-input";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { tr } from "date-fns/locale";
import { mutate } from "swr";
import api from "@/lib/axios";
import { useAuthStore } from "@/lib/use-auth-store";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/login", { username, password });
      mutate("/auth/me");
      toast.success("Đăng nhập thành công");
      window.location.href = "/";
      setLoggedIn(true);
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Đăng nhập thất bại";
      toast.error(msg);
      setLoggedIn(false);
    } finally {
      setLoading(false);
  
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6 bg-[#4f6742] p-8">
      <div className="relative">
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="peer w-full border-b-2 border-gray-300 bg-transparent pt-5 pb-2 text-[#f2f3dc] 
                     placeholder-transparent focus:border-white focus:outline-none rounded-none"
        />
        <label
          htmlFor="username"
          className="absolute left-0 top-2 text-[#f2f3dc] text-sm transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#f2f3dc]
                     peer-focus:top-1 peer-focus:text-sm peer-focus:text-white"
        >
          Username
        </label>
      </div>

      <div className="relative">
        <input
          type="password"
          id="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="peer w-full border-b-2 border-gray-300 bg-transparent pt-5 pb-2 text-[#f2f3dc]
                     placeholder-transparent focus:border-white focus:outline-none rounded-none"
        />
        <label
          htmlFor="password"
          className="absolute left-0 top-2 text-[#f2f3dc] text-sm transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#f2f3dc]
                     peer-focus:top-1 peer-focus:text-sm peer-focus:text-white"
        >
          Mật khẩu
        </label>
      </div>

      <button
        type="submit"
        onClick={(e) => { toast.info(`username: ${username} password: ${password}`) }}
        className="w-full bg-[#f2f3dc] text-[#4f6742] font-semibold py-2 rounded-none"
      >
        ĐĂNG NHẬP
      </button>
    </form>
  );
}