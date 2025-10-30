export default function NewArrivalSection() {
  return (
    <section className="text-center py-12">
      <h2 className="text-lg tracking-wide font-medium">NEW ARRIVAL</h2>
      <button className="mt-2 bg-[#6B7854] text-white text-sm px-4 py-2 rounded hover:bg-[#55613F]">
        SHOP NOW
      </button>
      <div className="mt-10 flex flex-wrap justify-center gap-8">
        {/* Example products */}
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="w-[280px]">
            <div className="aspect-[3/4] bg-gray-200" />
            <h3 className="mt-3 text-sm font-semibold">
              ÁO DÀI TƠ TẰM YÊN LINH
            </h3>
            <p className="text-xs text-gray-500">4.700.000 VNĐ</p>
            <button className="mt-2 border border-[#6B7854] px-3 py-1 text-xs text-[#6B7854] hover:bg-[#6B7854] hover:text-white transition">
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
