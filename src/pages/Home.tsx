import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Star, ShieldCheck, Sparkles, Phone, MessageCircle, ArrowRight, Diamond, Verified, Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';

import { products } from '../data/products';

const FadeInWhenVisible = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:h-[90vh] flex items-center overflow-hidden py-20 md:py-0">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBBH0YSJi2hKIEhngqKKDcHv5Oprg0OSstR2nKjYKFn2xHcUMJc6lYwWCHGIMKU8OOgYoPhX-_XiWImi6eNkx_5n0mYPuyRzPRHEuZl1tjMDm7ZpwqvlPfvUPrKVqPb0rLO5NCBabWY1J2JqJOWPx4I8QNOvBtFKHCr0yyM7Kt7tcRT85xAljNgjQw88Vk8uyDmz_yi_qTqBivfO0jwaHvxoatVdffXqm5MYkdsB7ZBvipQgFCFRg5D3f1zhvozP3PtUktPFxMfQA" 
            alt="Luxury Background" 
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/40 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="inline-block px-4 py-1 bg-primary/20 text-primary text-xs font-bold uppercase tracking-[0.3em] mb-6 rounded-full border border-primary/30 backdrop-blur-sm">
                Tinh Hoa Phong Thủy Việt
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl text-white mb-8 leading-tight">
                Khai Mở Vận May <br />
                <span className="text-primary italic">Nâng Tầm Đẳng Cấp</span>
              </h2>
              <p className="text-slate-300 text-lg mb-10 max-w-xl leading-relaxed">
                Ngọc Nhất Linh tự hào mang đến những tuyệt tác trang sức đá quý tự nhiên, được chế tác tinh xảo và khai quang trì chú để mang lại năng lượng bình an cho chủ nhân.
              </p>
              <div className="flex flex-wrap gap-5">
                <Link to="/products" className="bg-primary text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center gap-2 group">
                  Khám phá ngay <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/destiny" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all">
                  Tra cứu bản mệnh
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Cuộn để khám phá</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
        </motion.div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-b border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Verified, text: "Kiểm định uy tín" },
              { icon: Sparkles, text: "Đá tự nhiên 100%" },
              { icon: Hammer, text: "Chế tác thủ công" },
              { icon: Star, text: "Tư vấn chuyên sâu" }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-3 text-slate-400 group">
                <item.icon className="w-5 h-5 group-hover:text-primary transition-colors" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories - Bento Grid */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <h3 className="text-4xl font-serif mb-4">Bộ Sưu Tập Tuyển Chọn</h3>
              <p className="text-slate-500 max-w-2xl mx-auto">Mỗi vật phẩm là một câu chuyện về năng lượng và sự tinh tế, được thiết kế để hòa hợp với cung mệnh của bạn.</p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[1000px] md:h-[600px]">
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-8 relative rounded-3xl overflow-hidden group cursor-pointer"
            >
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1FtCJ14tGMnLHOPU2BxfgdNNOvyxh2ABFZgLM1SgGVyhxZBTSkPvUN0x-Y9pEf44MZLvgVNbWElgtZCLTr-WDyTqWeTMRPEQhBQaYm5HarRotnwkkdSV0YRL8Zsxxc0_QBwsHvMh873t6TJSBlMPKwaxBed5-oKLst99Wi7j0BW-G_N4RWoXZTpy-pOfUgWcdqnjZITJ2E6Zljhy74p08HTcf6JB5x4Abz3Z0wmGyK28d3PgmpfN7RH33-BaRHlcx_rhyUWXRK2U" alt="Category 1" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent p-10 flex flex-col justify-end">
                <h4 className="text-3xl font-serif text-white mb-2">Vòng Tay Phong Thủy</h4>
                <p className="text-slate-300 mb-6 max-w-md">Kích hoạt tài lộc, bình an và may mắn với các loại đá quý thượng hạng.</p>
                <Link to="/products" className="text-primary font-bold flex items-center gap-2 group">
                  Xem bộ sưu tập <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-4 relative rounded-3xl overflow-hidden group cursor-pointer"
            >
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiBOOE4fSrIixsLPlMosGn9ZT2pWkHbwvmhFQvQ8lKNuQg9aUDVS6gWF08lhgSMUsdgw_Y0AfPTBls-TnKqSJFxPoIEp6sXM_dGEpyhphcEPgdNwQ_sX8aXaiygNbg-ZzYvRoKTlNrgw3J1hZTcaL09R1ScDhIYoJlCdNPmdKGvooUKcaegFqAfgHAc3N3ALUxqY85mHbAbTu_dcZCMuUMnHlj-1ieVz0JIzmSoCxdWgBIJzNk4qEubp_grg4zD7cmbjUDma87aWo" alt="Category 2" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent p-8 flex flex-col justify-end">
                <h4 className="text-2xl font-serif text-white mb-2">Linh Vật Chiêu Tài</h4>
                <Link to="/products" className="text-primary font-bold flex items-center gap-2 group">
                  Khám phá <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-4 relative rounded-3xl overflow-hidden group cursor-pointer"
            >
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIz8SLuzA_cNCaVn-titiYOCWM3PxfBMzTSHRpnQccECzW3nv6KzgbPx6g4HBHC7up4B4KyD3liZcfZoJmaPYwrWJ_LkA5bKjTdFfnErzAkCqFdC8azP3aVxo3GCeGz4GzDGUQZT0E8Xoo7hUvMXycC_HBoiAetujh0nGYberkKrU00uym44OQSfPwWvXvM_gJvjk_a51k6Y0te1om4es46Mlvfi_-KFNRsZRphchuGZnwFt-E7JHlsp4vGbwfZ1scSFPTYJTQb5s" alt="Category 3" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent p-8 flex flex-col justify-end">
                <h4 className="text-2xl font-serif text-white mb-2">Trang Sức Đá Quý</h4>
                <Link to="/products" className="text-primary font-bold flex items-center gap-2 group">
                  Khám phá <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-8 relative rounded-3xl overflow-hidden group cursor-pointer"
            >
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp0MPqw9OhmQMXRX7KzK2kjFA6MoyZdqpgPhRfjAjWU7Q2H-XWaY6HZ82P2AzgrTt0-lceIhUKbV0Moohl7VF2uGbhleGk2o_V7NnLJ3oX3nJWFUoS4x6zSRpjEJH3jBB2zuZOguvCMU7ml-RpflfU3ivmEzdjyI2cSOiSTc8G70cOX7BhZRAcSehKpodvcMdsZZc7xb4ng5-zQ8zE29Agl75S0YWQ-oVZHdNY8goskm78RfFV5IHkDq18v1szhEl-KVfJAGSIJS4" alt="Category 4" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent p-10 flex flex-col justify-end">
                <h4 className="text-3xl font-serif text-white mb-2">Vật Phẩm Để Bàn</h4>
                <Link to="/products" className="text-primary font-bold flex items-center gap-2 group">
                  Xem bộ sưu tập <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Personalized Consultation Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeInWhenVisible>
              <div className="space-y-8">
                <span className="text-primary font-bold uppercase tracking-widest text-xs">Tư vấn chuyên sâu</span>
                <h3 className="text-4xl md:text-5xl font-serif leading-tight">Vật Phẩm Đúng Mệnh <br /><span className="text-primary italic">Vạn Sự Hanh Thông</span></h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Đừng để sự ngẫu nhiên quyết định năng lượng xung quanh bạn. Hãy để các chuyên gia của Ngọc Nhất Linh giúp bạn tìm ra vật phẩm phù hợp nhất với bản mệnh và mong muốn cá nhân.
                </p>
                <div className="space-y-4">
                  {[
                    "Phân tích bản mệnh theo năm sinh & giới tính",
                    "Gợi ý loại đá và màu sắc tương sinh, tương hợp",
                    "Hướng dẫn cách trì chú và sử dụng vật phẩm",
                    "Hỗ trợ khai quang vật phẩm theo yêu cầu"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <ChevronRight className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-6 flex gap-4">
                  <a href="tel:0902111626" className="bg-charcoal text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-2">
                    <Phone className="w-4 h-4" /> 0902111626
                  </a>
                  <a href="https://zalo.me/0902111626" target="_blank" rel="noopener noreferrer" className="bg-white border border-slate-200 text-charcoal px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:border-primary transition-all flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Chat Zalo
                  </a>
                </div>
              </div>
            </FadeInWhenVisible>
            
            <FadeInWhenVisible delay={0.2}>
              <div className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100">
                <h4 className="text-2xl font-serif mb-6 text-center">Đăng Ký Tư Vấn Miễn Phí</h4>
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Họ và tên</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-primary focus:ring-0 outline-none transition-all" placeholder="Nguyễn Văn A" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Số điện thoại</label>
                      <input type="tel" className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-primary focus:ring-0 outline-none transition-all" placeholder="090..." />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Năm sinh</label>
                    <input type="number" className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-primary focus:ring-0 outline-none transition-all" placeholder="1995" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Vấn đề quan tâm</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-primary focus:ring-0 outline-none transition-all appearance-none">
                      <option>Tư vấn chọn vòng tay</option>
                      <option>Cầu tài lộc, công danh</option>
                      <option>Cầu bình an, sức khỏe</option>
                      <option>Tình duyên, gia đạo</option>
                    </select>
                  </div>
                  <button className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                    Gửi yêu cầu tư vấn
                  </button>
                  <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest">Cam kết bảo mật thông tin khách hàng</p>
                </form>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <FadeInWhenVisible>
            <div className="flex items-end justify-between mb-16">
              <div>
                <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">Tuyệt tác đá quý</span>
                <h3 className="text-4xl font-serif">Sản Phẩm Nổi Bật</h3>
              </div>
              <Link to="/products" className="text-charcoal font-bold flex items-center gap-2 group hover:text-primary transition-colors">
                Xem tất cả <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product, i) => (
              <FadeInWhenVisible key={product.id} delay={i * 0.1}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-50 border border-slate-100 shadow-sm group-hover:shadow-xl transition-all duration-500 relative">
                      <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white text-charcoal px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform">Xem chi tiết</span>
                      </div>
                    </div>
                    <div className="px-2">
                      <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">{product.tag}</div>
                      <h5 className="font-bold text-charcoal group-hover:text-primary transition-colors mb-2 line-clamp-1">{product.name}</h5>
                      <p className="text-primary font-black">{product.price}</p>
                    </div>
                  </Link>
                </motion.div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-serif mb-4">Khách Hàng Nói Gì Về Chúng Tôi</h3>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Chị Minh Anh", role: "Kinh doanh tự do", content: "Từ khi đeo vòng thạch anh tóc vàng của Ngọc Nhất Linh, mình cảm thấy tự tin và quyết đoán hơn hẳn trong công việc. Sản phẩm rất đẹp và sang trọng." },
              { name: "Anh Hoàng Nam", role: "Quản lý dự án", content: "Dịch vụ tư vấn ở đây rất chuyên nghiệp. Mình được giải thích kỹ về mệnh và cách chọn đá phù hợp. Giao hàng nhanh, đóng gói rất cao cấp." },
              { name: "Chị Thu Thủy", role: "Nhân viên văn phòng", content: "Mình mua tặng mẹ một chuỗi ngọc bích, mẹ rất thích. Đá thật, cầm mát tay và có giấy kiểm định nên mình rất yên tâm." }
            ].map((t, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.1}>
                <div className="p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 relative">
                  <div className="flex text-primary mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-slate-600 italic mb-8 leading-relaxed">"{t.content}"</p>
                  <div>
                    <h5 className="font-bold text-charcoal">{t.name}</h5>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">{t.role}</p>
                  </div>
                  <div className="absolute top-10 right-10 opacity-5">
                    <Sparkles className="w-12 h-12 text-primary" />
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
