// app/page.tsx or app/viecharm/page.tsx
"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-900 w-full min-h-screen">
      <div className="flex flex-col gap-5 max-w-[1440px] mx-auto w-full h-full py-10 px-10">
        <section className="flex-1 h-full">
            <div className="flex flex-row h-full gap-5">
                <div className="flex-[3] flex flex-col justify-center px-6">
                    <div className="bg-[#f2f3dc] p-5">
                        <h1 className="text-3xl font-bold mb-4 text-[#4f6742]">VIECHARM</h1>
                        <p className="mb-4 text-justify text-[#4f6742]">
                            Viecharm ra đời từ tình yêu bất tận với tà áo dài – biểu tượng cho vẻ đẹp
                            và tâm hồn người phụ nữ Việt Nam. Tên gọi "Viecharm" chính là lời cam kết
                            của chúng tôi: gói trọn "Nét Duyên Việt" (Vie + Charm) trong từng thiết kế.
                            Chúng tôi tin rằng mỗi người phụ nữ là một nàng thơ, và tà áo dài là cách
                            tuyệt vời nhất để tôn vinh vẻ đẹp ấy.
                        </p>
                        <p className="mb-4 text-justify text-[#4f6742]">
                            Mỗi bộ sưu tập tại Viecharm không chỉ là trang phục, mà là một câu chuyện
                            được kể bằng lụa, gấm và nghệ thuật đính kết thủ công tỉ mỉ. Từ tà áo
                            truyền thống thướt tha đến những bộ sưu tập phụ kiện (mấn, guốc, túi xách)
                            được thiết kế đồng điệu, Viecharm mong muốn đồng hành cùng bạn trong mọi
                            khoảnh khắc trọng đại, giúp bạn tỏa sáng với khí chất thanh cao và nét duyên
                            thầm quyến rũ.
                        </p>
                    </div>
                </div>
                <Image
                src="/about/right.jpg"
                width={300}
                height={900}
                alt="viecharm"
                className="flex-2 rounded-[3px]"
                />
            </div>
        </section>

        <section className="flex-1  h-full">
            <div className="flex flex-row h-full gap-5">
                <Image
                src="/about/left.jpg"
                width={300}
                height={900}
                alt="viecharm"
                className="flex-2 rounded-[3px]"
                />
                <div className="flex-[3] flex flex-col justify-center px-6 ">
                    <div className="bg-[#f2f3dc] p-5">
                        <h1 className="text-3xl font-bold mb-4 text-[#4f6742]">NGUỒN CẢM HỨNG</h1>
                        <p className="mb-4 text-justify text-[#4f6742]">
                            Cảm hứng của Viecharm chính là "Nét Duyên Việt" (Vie + Charm) – sự giao thoa tinh tế giữa vẻ đẹp truyền thống ngàn năm và khí chất thanh lịch của người phụ nữ hiện đại.
                        </p>
                        <p className="mb-4 text-justify text-[#4f6742]">
                            Chúng tôi tìm về những giá trị di sản, từ tranh lụa, gốm sứ men lam đến kiến trúc cung đình, để chắt lọc nên những tinh hoa văn hóa. Mỗi thiết kế là một tác phẩm nghệ thuật, kết hợp kỹ thuật thêu thùa, đính kết thủ công với phom dáng đương đại, nhằm tôn vinh vẻ đẹp độc bản và sự tự tin của bạn. Viecharm là nơi di sản được khoác lên mình một nét duyên mới, tinh tế và quyến rũ hơn.
                        </p>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </main>
  );
}
