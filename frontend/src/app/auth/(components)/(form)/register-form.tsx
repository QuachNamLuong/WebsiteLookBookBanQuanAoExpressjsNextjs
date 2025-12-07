import { toast } from "sonner";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import { useState } from "react";
// Removed unused imports: Field, FieldGroup, FieldLabel, FieldSet, Input, axios

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(""); 
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Critical Validation: Check password confirmation
    if (password !== confirmPassword) {
      toast.error("Mật khẩu và xác nhận mật khẩu không khớp.");
      setLoading(false);
      return;
    }

    try {
      await api.post("/auth/register", {
        username,
        email,
        password,
        firstName,
        lastName,
        birthday: dateOfBirth
      });

      toast.success("Đăng ký thành công");
      window.location.href = "/";
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Đăng ký thất bại";
      toast.error(err.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full max-w-sm space-y-6 bg-[#4f6742] p-8" onSubmit={handleSubmit}>
      
      {/* Username Field */}
      <div className="relative">
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nhập username"
          required
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
      
      {/* Họ (First Name) Field - NOW HAS STATE */}
      <div className="relative">
        <input
          type="text"
          id="first-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Họ"
          required
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

      {/* Tên (Last Name) Field - NOW HAS STATE */}
      <div className="relative">
        <input
          type="text"
          id="last-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Tên"
          required
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

      {/* Ngày sinh (Date of Birth) Field - NOW CAPTURES VALUE */}
      <div className="mt-8 mb-0 flex flex-row gap-3">
        <Label className="text-[#f2f3dc] flex-[1]">Ngày sinh</Label>
        <DatePicker 
          className="flex-[3]"
          selected={dateOfBirth}
          onSelect={setDateOfBirth} // Set the state on date selection
        />
      </div>

      {/* Email Field */}
      <div className="relative">
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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

      {/* Mật khẩu (Password) Field */}
      <div className="relative">
        <input
          type="password"
          id="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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

      {/* Nhập lại mật khẩu (Confirm Password) Field - NOW HAS STATE */}
      <div className="relative">
        <input
          type="password"
          id="confirm-password"
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#f2f3dc] text-[#4f6742] font-semibold py-2 rounded-none disabled:opacity-50"
      >
        {loading ? "ĐANG XỬ LÝ..." : "ĐĂNG KÝ"}
      </button>
    </form>
  );
}