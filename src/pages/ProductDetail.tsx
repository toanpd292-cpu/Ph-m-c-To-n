import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Minus, Plus, ShoppingCart, ShieldCheck, Truck, Heart, Share2, ChevronRight, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { products } from '../data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id)) || products[0];
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [mainImage, setMainImage] = useState(product.img);

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-widest">
          <a href="/" className="hover:text-primary transition-colors">Trang chủ</a>
          <ChevronRight className="w-3 h-3" />
          <a href="/products" className="hover:text-primary transition-colors">{product.category}</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-600">{product.name}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          {/* Left: Product Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 shadow-inner group relative"
            >
              <img 
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
                src={mainImage} 
                alt={product.name}
                referrerPolicy="no-referrer"
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute top-6 right-6 flex flex-col gap-3">
                <button className="p-3 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-primary hover:text-white transition-all">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-3 bg-white/90 backdrop-blur rounded-full shadow-lg hover:bg-primary hover:text-white transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
            <div className="flex sm:grid sm:grid-cols-4 gap-3 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 scrollbar-hide">
              {product.images.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setMainImage(img)}
                  className={`flex-shrink-0 w-20 sm:w-auto aspect-square rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-slate-50 ${mainImage === img ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
                >
                  <img 
                    src={img} 
                    alt={`Thumb ${i}`} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer" 
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Information */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-widest border border-primary/20">Tuyệt tác phong thủy</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">(48 Đánh giá)</span>
            </div>
            
            <h2 className="text-4xl font-serif text-charcoal leading-tight mb-4">{product.name}</h2>
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-black text-primary">{product.price}</span>
              {product.oldPrice && <span className="text-lg text-slate-300 line-through">{product.oldPrice}</span>}
            </div>
            
            <div className="flex flex-wrap gap-3 mb-10">
              {product.affinities.map((affinity) => (
                <div key={affinity} className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
                  <div className={`w-3 h-3 rounded-full ${
                    affinity.includes('Kim') ? 'bg-yellow-400' : 
                    affinity.includes('Mộc') ? 'bg-emerald-500' : 
                    affinity.includes('Thủy') ? 'bg-blue-500' : 
                    affinity.includes('Hỏa') ? 'bg-red-500' : 'bg-orange-800'
                  } shadow-lg`}></div>
                  <span className="text-xs font-bold uppercase tracking-wider">{affinity}</span>
                </div>
              ))}
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 mb-10">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Cam kết chất lượng</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Đá tự nhiên 100%, không qua xử lý nhiệt
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Bảo hành thay dây trọn đời
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Kiểm định uy tín theo yêu cầu
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-200 rounded-2xl overflow-hidden bg-white h-14">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 hover:bg-slate-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-bold text-lg min-w-[40px] text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-5 hover:bg-slate-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <a 
                  href="https://zalo.me/0902111626" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-charcoal text-white hover:bg-primary py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 h-14 shadow-lg hover:shadow-primary/30 uppercase tracking-widest text-xs"
                >
                  <MessageCircle className="w-5 h-5" />
                  Tư vấn Zalo
                </a>
              </div>
              <a 
                href="tel:0902111626"
                className="w-full bg-primary hover:bg-primary-dark text-white py-5 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                GỌI ĐIỆN TƯ VẤN NGAY
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Bảo hành</p>
                  <p className="text-xs font-bold">12 Tháng</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <Truck className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Vận chuyển</p>
                  <p className="text-xs font-bold">Miễn phí toàn quốc</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-24">
          <div className="flex border-b border-slate-100 mb-10">
            {['description', 'specification', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all relative ${
                  activeTab === tab ? 'text-primary' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab === 'description' ? 'Mô tả chi tiết' : tab === 'specification' ? 'Thông số kỹ thuật' : 'Đánh giá khách hàng'}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>
          <div className="max-w-4xl">
            {activeTab === 'description' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-slate-600 leading-relaxed">
                <p>{product.description}</p>
                <div className="grid grid-cols-2 gap-8 py-8">
                  {product.images.slice(0, 2).map((img, i) => (
                    <img 
                      key={i} 
                      src={img} 
                      alt={`Detail ${i}`} 
                      className="rounded-2xl aspect-video object-cover" 
                      referrerPolicy="no-referrer" 
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
              </motion.div>
            )}
            {activeTab === 'specification' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100">
                <table className="w-full text-sm">
                  <tbody>
                    {product.specs.map((spec, i) => (
                      <tr key={i} className={i !== product.specs.length - 1 ? "border-b border-slate-100" : ""}>
                        <td className="px-8 py-4 font-bold text-slate-400 uppercase tracking-widest text-[10px] w-1/3">{spec.label}</td>
                        <td className="px-8 py-4 font-medium">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-3xl font-serif">Sản Phẩm Liên Quan</h3>
            <a href="/products" className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all">
              Xem tất cả <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <motion.div 
                key={p.id}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <Link to={`/product/${p.id}`}>
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-50 border border-slate-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
                    <img 
                      src={p.img} 
                      alt={p.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
                      referrerPolicy="no-referrer" 
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h5 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors line-clamp-1">{p.name}</h5>
                  <p className="text-primary font-bold">{p.price}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
