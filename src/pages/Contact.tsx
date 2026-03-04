import React from 'react';
import { MapPin, Phone, Mail, MessageSquare, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-900/80 z-10"></div>
          <img 
            src="https://scontent.fvca1-4.fna.fbcdn.net/v/t39.30808-6/505372034_4132967026923831_8812997507424975280_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=108&ccb=1-7&_nc_sid=2a1932&_nc_eui2=AeEbdgSFzCYBDrjvUh448OxJOT-i8DhFDQ85P6LwOEUND5jq-IL-SyAd-Azx9oBUJYetbLIMXWA32VV9UbsUGeEm&_nc_ohc=c74Gqs1gRBYQ7kNvwGoWyeU&_nc_oc=AdnWRJquL1Ye1hTK7pUnSkpRVJND_vnzNT0EtZEjxLDtMldHtrdxwkt9t-UeW7e6tTc&_nc_zt=23&_nc_ht=scontent.fvca1-4.fna&_nc_gid=ngud-1lrvaBBu7KVrH93gA&_nc_ss=8&oh=00_Afvn2KsJ7YMzm44dOHABmefKkr39SGt6UsyH0RwI_pykLw&oe=69A8E1A6" 
            alt="Background Store"
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-20 text-center px-4">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold uppercase tracking-widest mb-4">Kết nối cùng chuyên gia</span>
          <h2 className="font-serif text-4xl md:text-6xl text-white font-bold mb-6">Liên hệ với chúng tôi</h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">Kiến tạo không gian thịnh vượng và bình an cùng chuyên gia phong thủy hàng đầu Ngọc Nhất Linh.</p>
        </div>
      </section>

      {/* Contact Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-30 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-xl border border-slate-100">
              <h3 className="font-serif text-2xl font-bold mb-8 flex items-center gap-2">
                <span className="w-8 h-px bg-primary"></span>
                Thông tin liên hệ
              </h3>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-1">Địa chỉ</p>
                    <p className="text-base leading-relaxed">Quận Ninh Kiều, Cần Thơ, Việt Nam</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-1">Điện thoại</p>
                    <p className="text-base leading-relaxed">0902 111 626</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-1">Email</p>
                    <p className="text-base leading-relaxed">contact@ngocnhatlinh.vn</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl border border-slate-100 h-full">
              <h3 className="font-serif text-3xl font-bold mb-2">Gửi lời nhắn cho chúng tôi</h3>
              <p className="text-slate-500 mb-10">Để lại thông tin, chuyên gia của chúng tôi sẽ liên hệ lại sớm nhất để tư vấn phong thủy cho bạn.</p>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Họ và Tên</label>
                    <input className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="Nguyễn Văn A" type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Số điện thoại</label>
                    <input className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="0902 111 626" type="tel" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Dịch vụ quan tâm</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none">
                    <option>Tư vấn phong thủy nhà ở</option>
                    <option>Tư vấn phong thủy kinh doanh</option>
                    <option>Xem ngày lành tháng tốt</option>
                    <option>Thiết kế không gian tâm linh</option>
                    <option>Vật phẩm phong thủy cao cấp</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Lời nhắn / Yêu cầu cụ thể</label>
                  <textarea className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none" placeholder="Bạn cần tư vấn về vấn đề gì?" rows={4}></textarea>
                </div>
                <button className="w-full md:w-auto px-12 py-4 bg-primary text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-primary/40 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2" type="submit">
                  Gửi yêu cầu ngay
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
