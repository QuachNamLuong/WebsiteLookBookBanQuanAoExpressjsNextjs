export default function Footer() {
  return (
    <footer className="w-full bg-[#6B7854] text-white py-10 px-8 mt-auto">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="text-2xl font-bold mb-2">VIECHARM</h3>
          <p>Thông tin liên hệ</p>
          <p>Email: support@viecharm.vn</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Đăng ký email</h4>
          <input
            placeholder="Nhập địa chỉ email của bạn"
            className="w-full p-2 text-black rounded"
          />
        </div>
        <div>
          <h4 className="font-semibold mb-2">Kết nối cùng VieCharm</h4>
          <div className="flex gap-3">
            <span>🌸</span>
            <span>🌿</span>
            <span>🌺</span>
          </div>
        </div>
      </div>
      <p className="text-center mt-8 text-xs opacity-70">
        Copyright © 2025 by VieCharm
      </p>
    </footer>
  );
}
