import { toast } from "sonner";
import { DatePicker } from "../ui/date-picker";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { mutate } from "swr";
import api from "@/lib/axios";
import { useState } from "react";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", { username, email, password });
      mutate("/auth/me");
      toast.success("Đăng ky thành công");
      window.location.href = "/";
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Đăng ky thất bại";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="w-full max-w-sm space-y-6 bg-[#4f6742] p-8" onSubmit={handleSubmit}>
      <div className="relative">
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nhap username"
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
          type="text"
          id="first-name"
          placeholder="Họ"
          className="peer w-full border-b-2 border-gray-300 bg-transparent pt-5 pb-2 text-[#f2f3dc] 
                     placeholder-transparent focus:border-white focus:outline-none rounded-none"
        />
        <label
          htmlFor="first-name"
          className="absolute left-0 top-2 text-[#f2f3dc] text-sm transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#f2f3dc]
                     peer-focus:top-1 peer-focus:text-sm peer-focus:text-white"
        >
          Họ
        </label>
      </div>

      <div className="relative">
        <input
          type="text"
          id="last-name"
          placeholder="Tên"
          className="peer w-full border-b-2 border-gray-300 bg-transparent pt-5 pb-2 text-[#f2f3dc]
                     placeholder-transparent focus:border-white focus:outline-none rounded-none"
        />
        <label
          htmlFor="last-name"
          className="absolute left-0 top-2 text-[#f2f3dc] text-sm transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#f2f3dc]
                     peer-focus:top-1 peer-focus:text-sm peer-focus:text-white"
        >
          Tên
        </label>
      </div>

      <div className="mt-8 mb-0 flex flex-row gap-3">
        <Label className="text-[#f2f3dc] flex-[1]">Ngày sinh</Label>
        <DatePicker className="flex-[3]" />
      </div>


      <div className="relative">
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="peer w-full border-b-2 border-gray-300 bg-transparent pt-5 pb-2 text-[#f2f3dc]
                     placeholder-transparent focus:border-white focus:outline-none rounded-none"
        />
        <label
          htmlFor="email"
          className="absolute left-0 top-2 text-[#f2f3dc] text-sm transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#f2f3dc]
                     peer-focus:top-1 peer-focus:text-sm peer-focus:text-white"
        >
          Email
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

      <div className="relative">
        <input
          type="password"
          id="confirm-password"
          placeholder="Nhập lại mật khẩu"
          className="peer w-full border-b-2 border-gray-300 bg-transparent pt-5 pb-2 text-[#f2f3dc]
                     placeholder-transparent focus:border-white focus:outline-none rounded-none"
        />
        <label
          htmlFor="confirm-password"
          className="absolute left-0 top-2 text-[#f2f3dc] text-sm transition-all
                     peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#f2f3dc]
                     peer-focus:top-1 peer-focus:text-sm peer-focus:text-white"
        >
          Nhập lại mật khẩu
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-[#f2f3dc] text-[#4f6742] font-semibold py-2 rounded-none"
      >
        ĐĂNG KÝ
      </button>
    </form>
  );
}
