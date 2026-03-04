import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Sparkles, Leaf, Scale, ShieldCheck, ChevronRight, ShoppingBag, Flame, Droplets, Mountain, Zap } from 'lucide-react';
import { calculateDestiny, DestinyResult } from '../utils/destiny';

const ElementIcon = ({ element }: { element: string }) => {
  switch (element) {
    case 'Kim': return <Zap className="w-8 h-8 text-yellow-500" />;
    case 'Mộc': return <Leaf className="w-8 h-8 text-green-500" />;
    case 'Thủy': return <Droplets className="w-8 h-8 text-blue-500" />;
    case 'Hỏa': return <Flame className="w-8 h-8 text-red-500" />;
    case 'Thổ': return <Mountain className="w-8 h-8 text-orange-800" />;
    default: return null;
  }
};

export default function DestinyLookup() {
  const [year, setYear] = useState<string>('');
  const [gender, setGender] = useState<string>('nam');
  const [result, setResult] = useState<DestinyResult | null>(null);

  const handleLookup = () => {
    const y = parseInt(year);
    if (y > 1900 && y < 2100) {
      setResult(calculateDestiny(y));
    } else {
      alert('Vui lòng nhập năm sinh hợp lệ (1900 - 2100)');
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero & Search Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-6xl mb-6 leading-tight"
          >
            Khám Phá Bản Mệnh <br /><span className="text-primary italic">Phong Thủy Của Bạn</span>
          </motion.h2>
          <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
            Nhập năm sinh để tìm hiểu hành mệnh và các vật phẩm phong thủy mang lại năng lượng tích cực, sự cân bằng và may mắn cho cuộc sống của bạn.
          </p>
          
          {/* Search Form */}
          <div className="bg-white p-8 rounded-2xl shadow-2xl border border-primary/10 flex flex-col md:flex-row gap-6 items-end">
            <div className="flex-1 w-full text-left">
              <label className="block text-sm font-semibold mb-3 text-slate-700">Năm sinh (Âm lịch/Dương lịch)</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                  placeholder="VD: 1995" 
                  type="number" 
                />
              </div>
            </div>
            <div className="flex-1 w-full text-left">
              <label className="block text-sm font-semibold mb-3 text-slate-700">Giới tính</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <select 
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none transition-all"
                >
                  <option value="nam">Nam giới</option>
                  <option value="nu">Nữ giới</option>
                </select>
              </div>
            </div>
            <button 
              onClick={handleLookup}
              className="w-full md:w-auto bg-primary text-white px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-primary/30"
            >
              <Sparkles className="w-5 h-5" />
              Xem kết quả
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={result.element}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
          >
            {/* Results Section */}
            <section className="py-16 px-6 bg-slate-50">
              <div className="container mx-auto max-w-6xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="relative rounded-2xl overflow-hidden aspect-square shadow-2xl group">
                    <img 
                      src={result.image} 
                      alt={result.element}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                      <p className="text-primary font-bold tracking-widest uppercase mb-2">Bản mệnh của bạn - {result.canChi}</p>
                      <h3 className="text-5xl font-serif">Mệnh {result.element}</h3>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-sm border border-primary/10 text-primary text-sm font-bold uppercase tracking-wider">
                      <ElementIcon element={result.element} />
                      Cân bằng & Thịnh vượng
                    </div>
                    <h4 className="text-3xl font-serif">Đặc trưng Mệnh {result.element}</h4>
                    <p className="text-slate-600 leading-relaxed text-lg italic">
                      "{result.description}"
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-6 rounded-2xl bg-white border border-primary/10 shadow-sm">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-widest">Màu tương hợp</p>
                        <div className="flex flex-wrap gap-2">
                          {result.colors.compatible.map(c => (
                            <span key={c} className="px-3 py-1 bg-slate-100 rounded-full text-sm font-medium">{c}</span>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 rounded-2xl bg-white border border-primary/10 shadow-sm">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-widest">Màu tương sinh</p>
                        <div className="flex flex-wrap gap-2">
                          {result.colors.generative.map(c => (
                            <span key={c} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">{c}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Personalized Recommendations */}
            <section className="py-20 px-6">
              <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                  <div>
                    <h3 className="text-3xl font-serif mb-2">Gợi Ý Vật Phẩm Cho Mệnh {result.element}</h3>
                    <p className="text-slate-600">Các tuyệt tác được tuyển chọn để tối ưu hóa năng lượng cho bạn.</p>
                  </div>
                  <a href="/products" className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    Xem tất cả bộ sưu tập <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { title: 'Vòng Ngọc Bích Tự Nhiên', price: '2,450,000đ', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp7zT-5eXe2ufw03s-nvJta1GrBDWzfvMEwOd2-nQKsMenHgQQhY1KpogWPLhu3xEZATDFmObugt_zfNGrg9Fr_puOmDExtsmd24siXCLJK6cCYDh-Fn6I0uongdZF78K3MftXkclu4SrQurmMnbjPEA9anSnSUJ4JOavKdW1iAb_xa9piDful5p7Y51Ph8dmwh0VJQ0DCJO21jyFcqSEFhqdg11U8V0dnMOgU8cv4p7Um-2yKIYhMMaVJ3IPka85APtoB9uOcNbU' },
                    { title: 'Hoa Tai Lam Bảo Ngọc', price: '1,890,000đ', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv0eZ4PzorrtTHSuXTBrcuRSsrMjaKd6TTJQCVsSND7e-dh0nICb8wCV2diBb562_vmbu6hyN4lp3deqLNfJR5xVZF8xY7C8ryO5kkZgMP5vqGMRoBehc_SLxPRxmF7Vm1q0R08Oz92CQelpK0C5TlBOcra2ZOPUGj-Jhs-afzB5TutK4gTAQNacKdsKuXo0eeI18i2Y-Rk_fzbuAPb6jyAW83Q2F5DwUVA6LV0cQY3GhGvnat3AZHepXIABcP39V_Bj5njVnvoMc' },
                    { title: 'Vòng Đá Thạch Anh Đen', price: '1,200,000đ', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJJS_fgbTux-3uVzbZBDVUbZKhpdGQWg98oDWRB00xDHwCFupSUWk0AQDAaM1JUd1ko_sWz9BQ3zCguo1yGv7WtqG5dbzfPH28baV1Bk7z4GNcUdxr2kwvx0se3rYaVPWLENGmzwr2MZAacIZBq8TN5XjE5wFQE_vk4YfJXi39e3ArmTkij7_n6PvmSUBVwepFUcsPPLHsXfpt9wDxeyJLrOJjI5Q7-VT8b7jQVrb1dyKchu6An2b6bq39cDn65eSz8Lxqom51Ehw' },
                    { title: 'Nhẫn Cẩm Thạch Thượng Hạng', price: '5,600,000đ', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_40ebyBWFcRjEXOGi8tUAFURboBWknESd3G7LvYQ0iXvIGOQC2Na37zB7dud5a3he95w0KK_ob_op0zSdMtHaPzLi--RIHiWV-8FFK0g-RSFZjTg87AB-v_90kL2PunLWubP6m-EfsKfGj_O-SG6rkw7hxMHdQb5u-W14QH5QpjVObvCJFA8-DZaFwqRIAscnOYbYLFjmV_9O3_OE3-brMSyvLxbcfO9dXwgtpe7bpQjjeVKGTxFy7GPDs0cO85yVgpKywfrFZqI' }
                  ].map((p, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -10 }}
                      className="group cursor-pointer"
                    >
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-slate-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
                        <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                        <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                          <ShoppingBag className="w-5 h-5 text-primary" />
                        </button>
                      </div>
                      <h5 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{p.title}</h5>
                      <p className="text-primary font-bold">{p.price}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Education Section */}
      <section className="py-20 px-6 bg-primary/5">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-serif mb-4">Tại sao nên chọn trang sức hợp mệnh?</h3>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center space-y-4 p-8 bg-white rounded-3xl shadow-sm border border-primary/5 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-8 h-8 text-primary" />
              </div>
              <h5 className="text-xl font-bold">Cân Bằng Năng Lượng</h5>
              <p className="text-slate-500 text-sm leading-relaxed">Sử dụng đúng màu sắc và chất liệu giúp điều hòa ngũ hành trong cơ thể, mang lại tâm thái thư thái.</p>
            </div>
            <div className="text-center space-y-4 p-8 bg-white rounded-3xl shadow-sm border border-primary/5 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h5 className="text-xl font-bold">Kích Hoạt May Mắn</h5>
              <p className="text-slate-500 text-sm leading-relaxed">Vật phẩm phong thủy đóng vai trò như một "trạm thu phát" năng lượng tích cực từ vũ trụ đến với chủ nhân.</p>
            </div>
            <div className="text-center space-y-4 p-8 bg-white rounded-3xl shadow-sm border border-primary/5 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h5 className="text-xl font-bold">Bảo Vệ Bản Thân</h5>
              <p className="text-slate-500 text-sm leading-relaxed">Trang sức đá quý tự nhiên mang từ tính mạnh, giúp ngăn chặn các luồng khí xấu và bảo vệ sức khỏe.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
