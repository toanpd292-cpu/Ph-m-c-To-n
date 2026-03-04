import React from 'react';
import { Link } from 'react-router-dom';
import { Diamond, MapPin, Phone, Mail, Facebook, Instagram, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-20 pb-10 px-6">
      <div className="mx-auto max-w-7xl grid md:grid-cols-4 gap-12 pb-16 border-b border-white/10">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Diamond className="text-primary w-8 h-8" />
            <h1 className="font-serif text-2xl font-bold tracking-tight">NGỌC NHẤT LINH</h1>
          </div>
          <p className="text-white/60 font-light leading-relaxed max-w-md mb-8">
            Thương hiệu phong thủy hàng đầu tại Cần Thơ, chuyên cung cấp các sản phẩm đá quý thiên nhiên cao cấp, mang đến sự thịnh vượng và bình an cho mọi gia đình.
          </p>
          <div className="flex gap-4">
            <a href="#" className="h-10 w-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="h-10 w-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-8">Liên Hệ</h4>
          <ul className="space-y-4 text-white/60 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="text-primary w-5 h-5" />
              <span>Quận Ninh Kiều, Thành phố Cần Thơ</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-primary w-5 h-5" />
              <span>0902 111 626</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-primary w-5 h-5" />
              <span>contact@ngocnhatlinh.vn</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-8">Chính Sách</h4>
          <ul className="space-y-4 text-white/60 text-sm">
            <li><Link to="#" className="hover:text-primary transition-colors">Chính sách bảo mật</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Điều khoản dịch vụ</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Chính sách bảo hành</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Vận chuyển & Giao hàng</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="mt-10 text-center text-white/30 text-xs tracking-widest uppercase">
        © 2024 Ngọc Nhất Linh. All rights reserved.
      </div>
    </footer>
  );
}
