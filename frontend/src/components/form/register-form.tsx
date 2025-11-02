import { DatePicker } from "../ui/date-picker";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function RegisterForm() {
  return (
    <form className="w-full max-w-sm space-y-6 bg-[#4f6742] p-8">
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
