import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { FloatingInput, FloatingLabel, FloatingLabelInput } from "../ui/floating-label-input";
import { Input } from "../ui/input";

export default function LoginForm() {
  return (
    <form className="w-full max-w-sm space-y-6 bg-[#4f6742] p-8">
      <div className="relative">
        <input
          type="text"
          id="username"
          placeholder="Username"
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
        className="w-full bg-[#f2f3dc] text-[#4f6742] font-semibold py-2 rounded-none"
      >
        ĐĂNG NHẬP
      </button>
    </form>
  );
}
