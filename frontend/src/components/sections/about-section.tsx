export default function AboutSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center bg-[#6B7854]/20 py-16 px-6 md:px-12">
      <div className="md:w-1/2 flex justify-center">
        <img src="/images/about-image.png" alt="About VieCharm" className="max-w-sm" />
      </div>
      <div className="md:w-1/2 text-center md:text-left px-6 mt-8 md:mt-0">
        <h2 className="text-xl font-semibold text-[#4A5A3C] mb-4">VỀ CHÚNG TÔI</h2>
        <p className="text-sm text-[#4A5A3C]/90 leading-relaxed mb-4">
          VieCharm ra đời từ tình yêu bất tận với tà áo dài – biểu tượng cho vẻ đẹp và tâm hồn người phụ nữ Việt Nam. 
          Tên gọi "VieCharm" chính là lời cam kết của chúng tôi: gói trọn “Nét Duyên Việt” (Vie + Charm) trong từng thiết kế.
        </p>
        <button className="bg-[#E6E8D3] text-[#4A5A3C] text-sm px-5 py-2 rounded hover:bg-[#D8DAC1]">
          Xem thêm
        </button>
      </div>
    </section>
  );
}
