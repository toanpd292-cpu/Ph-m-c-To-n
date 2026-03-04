import React from 'react';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';

export default function Blog() {
  return (
    <div className="bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <a href="/" className="hover:text-primary">Trang chủ</a>
          <ChevronRight className="w-4 h-4" />
          <a href="#" className="hover:text-primary">Kiến thức Phong thủy</a>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 font-medium">Ngọc Phỉ Thúy</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8">
            <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-10 shadow-xl border border-primary/20">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpybEovNbJY6O4aq83RtVKsWbJRFg6CTpgj1WsqYGq96tT5XVD8janIopHtNCGYKcmMDN-gJ_-u20uAbwfRsdRD1RVoV8v1KUR_n_3AvOr0dwY0C5KSvzt9YTqX0wgtTNitmtas_RFougm88ni7iBOjzulicO1c2HL1TeLq8ARYUUtsGDdnRQ6y2DvleQt78hoHVLQRfPFi2p8sLyOmlbuuPLYSeGo5j3Acw6r7HXDfhqEnsWhjFcvqPiNw_G6yVC7oR4g3wP5zX4" 
                alt="Jadeite"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div>
                  <span className="bg-primary text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4 inline-block">Văn hóa & Tâm linh</span>
                  <h1 className="text-3xl md:text-5xl font-serif text-white font-bold leading-tight">Ý Nghĩa Của Ngọc Phỉ Thúy Trong Phong Thủy Đương Đại</h1>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="text-primary w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold">Chuyên gia Minh Tuấn</p>
                  <p className="text-xs text-primary italic">Cố vấn phong thủy cao cấp</p>
                </div>
              </div>
              <div className="text-sm text-slate-400 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>24 Tháng 5, 2024</span>
              </div>
              <div className="text-sm text-slate-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>8 phút đọc</span>
              </div>
            </div>

            <div className="prose prose-slate lg:prose-xl max-w-none text-slate-700 space-y-6">
              <p className="italic text-lg text-slate-600 border-l-2 border-primary/30 pl-6">
                "Ngọc không mài không sáng, người không học không biết lý". Trong văn hóa Á Đông, Ngọc Phỉ Thúy (Jadeite) không chỉ đơn thuần là một món đồ trang sức xa xỉ, mà còn là linh vật hộ thân, mang trong mình dòng năng lượng tinh túy của đất trời qua hàng triệu năm hình thành.
              </p>
              <h2 className="text-3xl font-bold font-serif text-charcoal mt-12 mb-6">Ngọc Phỉ Thúy là gì?</h2>
              <p>
                Phỉ Thúy thực chất là một loại cẩm thạch (Jadeite) đạt độ trong và màu sắc ở mức thượng đẳng. Tên gọi "Phỉ Thúy" bắt nguồn từ loài chim cùng tên, với bộ lông rực rỡ sắc đỏ (Phỉ) và sắc xanh lục (Thúy). Loại ngọc này được hình thành trong điều kiện địa chất khắc nghiệt, hấp thụ tinh hoa của núi sông, mang tần số rung động cực cao.
              </p>
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-primary/10">
              <h4 className="font-serif text-xl font-bold mb-4 border-b border-primary/20 pb-2">Đăng ký bản tin</h4>
              <p className="text-sm text-slate-500 mb-6">Nhận kiến thức phong thủy và ưu đãi độc quyền từ Ngọc Nhất Linh hàng tuần.</p>
              <div className="space-y-3">
                <input className="w-full rounded-lg border-primary/20 focus:border-primary focus:ring-primary py-3 outline-none px-4" placeholder="Email của bạn" type="email" />
                <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-all shadow-md">ĐĂNG KÝ NGAY</button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
