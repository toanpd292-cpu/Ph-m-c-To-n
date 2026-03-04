import React from 'react';
import { motion } from 'motion/react';
import { Verified, Heart, Diamond, CheckCircle, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKaj4Zl7cSPaXt3bV2N_xgdAloERPelgfAEkhz4zyhFXglUzmZNiaSpOiNNb5gMIIAyivhvva9B33tNWa6HreUxVjwdsyYxdus5b9y2zfXui_UW1PsfpgDqjimlqPY1yfXEbuKxc_NXUkko5TqvRfL_TmYuOdPb4eNafHHWFhXJB4T9d42YxQSI7Qaia6Mcn1iuvOQYvuZg4PMqlHwC_RTjRi7uO3utnef2UikBwp74llCD90NP9Z-DfpcmZMurO4pMJmKOiNCVZ4" 
            alt="Luxury gemstone collection"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1 mb-6 border border-primary/50 rounded-full">
            <span className="text-primary text-xs uppercase tracking-[0.3em] font-semibold">Thương Hiệu Đẳng Cấp</span>
          </div>
          <h1 className="text-white font-serif text-4xl md:text-6xl font-medium leading-tight mb-6">
            Ngọc Nhất Linh – Tinh Hoa Phong Thủy & Tâm Huyết Đá Quý
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Hành trình mang lại sự bình an và thịnh vượng thông qua những giá trị tâm linh đích thực.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative group">
                <div className="absolute -inset-4 border border-primary/30 rounded-xl transition-all group-hover:-inset-2"></div>
                <div className="aspect-[4/5] overflow-hidden rounded-xl shadow-2xl relative z-10">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxtdYFQRXtiB16iFLrDljPYG3P8l-UjpQnvGakQ-we6-oW9uc1DtSLVHJId37Yutfkzzusx9p615lbN_xhMUt89RgHLrMZzfXHhqPmIaesnZ5_on5uk0SY828kY2jLL1VbWSOFyYiQY9oWT9HZ0WpeZJtqOz3QNq4zhZ3BslR1Ds0YbZoHl1Y9ytUnizKnu-44APw29N_K0vHiTXl1j6gUppfL3_s7U7xRLEaIDOWrUJvVV21f6V1HJcAqI4_LqyIjMu74yQUIfEw" 
                    alt="Showroom"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-primary font-semibold tracking-widest uppercase text-sm">Về chúng tôi</span>
              <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-8 text-charcoal italic">Câu chuyện thương hiệu</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                <p>
                  Khởi nguồn từ niềm đam mê mãnh liệt với vẻ đẹp huyền bí của đá quý tự nhiên, <span className="text-primary font-semibold">Ngọc Nhất Linh</span> ra đời tại thủ phủ Cần Thơ – trái tim của miền Tây sông nước.
                </p>
                <p>
                  Chúng tôi không chỉ xem đá quý là những món trang sức vô tri, mà là những tinh hoa của đất trời, mang trong mình năng lượng tích cực từ hàng triệu năm kiến tạo. Sứ mệnh của Ngọc Nhất Linh là kết nối con người với thiên nhiên, mang lại sự bình an và thịnh vượng cho gia chủ.
                </p>
                <p>
                  Với mỗi sản phẩm được trao đi, chúng tôi gửi gắm vào đó cả sự tận tâm, kiến thức phong thủy chuyên sâu và cam kết về chất lượng đá tự nhiên 100%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-primary/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-charcoal">Giá trị cốt lõi</h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-xl shadow-primary/5 hover:-translate-y-2 transition-transform duration-300 border border-primary/10">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-8">
                <Verified className="text-primary w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif mb-4 text-charcoal">Chất lượng Thật</h3>
              <p className="text-slate-600 leading-relaxed">
                Cam kết 100% đá tự nhiên có kiểm định. Từng viên đá đều được tuyển chọn khắt khe để đảm bảo năng lượng tinh khiết nhất.
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-xl shadow-primary/5 hover:-translate-y-2 transition-transform duration-300 border border-primary/10">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-8">
                <Heart className="text-primary w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif mb-4 text-charcoal">Tư vấn Tâm</h3>
              <p className="text-slate-600 leading-relaxed">
                Lắng nghe và thấu hiểu nhu cầu của khách hàng. Chúng tôi tư vấn dựa trên kiến thức phong thủy chính thống và sự chân thành.
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-xl shadow-primary/5 hover:-translate-y-2 transition-transform duration-300 border border-primary/10">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-8">
                <Diamond className="text-primary w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif mb-4 text-charcoal">Giá trị Thực</h3>
              <p className="text-slate-600 leading-relaxed">
                Mỗi vật phẩm không chỉ mang giá trị thẩm mỹ mà còn là trợ thủ đắc lực giúp cải thiện vận khí, thu hút tài lộc và bình an.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
