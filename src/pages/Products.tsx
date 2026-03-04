import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, ShoppingBag, ChevronLeft, ChevronRight, Filter, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { products } from '../data/products';

const ProductSkeleton = () => (
  <div className="bg-white border border-slate-100 rounded-xl overflow-hidden animate-pulse">
    <div className="aspect-square bg-slate-200"></div>
    <div className="p-5 space-y-3">
      <div className="h-4 bg-slate-200 rounded w-1/2"></div>
      <div className="h-5 bg-slate-200 rounded w-3/4"></div>
      <div className="h-6 bg-slate-200 rounded w-1/3"></div>
      <div className="h-10 bg-slate-200 rounded w-full"></div>
    </div>
  </div>
);

export default function Products() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAffinities, setSelectedAffinities] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
  const [sortBy, setSortBy] = useState("newest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/\./g, '').replace('đ', ''));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (query: string) => {
    setLoading(true);
    setSearchQuery(query);
    setTimeout(() => setLoading(false), 300);
  };

  const handleAffinityChange = (affinity: string) => {
    setLoading(true);
    setSelectedAffinities(prev => 
      prev.includes(affinity) ? prev.filter(a => a !== affinity) : [...prev, affinity]
    );
    setTimeout(() => setLoading(false), 500);
  };

  const handleCategoryChange = (category: string | null) => {
    setLoading(true);
    setSelectedCategory(category === selectedCategory ? null : category);
    setTimeout(() => setLoading(false), 500);
  };

  const handlePriceChange = (min: number, max: number) => {
    setLoading(true);
    setPriceRange([min, max]);
    setTimeout(() => setLoading(false), 500);
  };

  const handleSortChange = (sort: string) => {
    setLoading(true);
    setSortBy(sort);
    setTimeout(() => setLoading(false), 500);
  };

  const filteredProducts = products.filter(product => {
    const price = parsePrice(product.price);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAffinity = selectedAffinities.length === 0 || selectedAffinities.some(a => product.affinities.includes(a));
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    return matchesSearch && matchesAffinity && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return parsePrice(a.price) - parsePrice(b.price);
    if (sortBy === "price-desc") return parsePrice(b.price) - parsePrice(a.price);
    return 0;
  });

  const categories = [
    "Vòng tay phong thủy",
    "Trang sức đá quý",
    "Bàn đá tự nhiên",
    "Linh vật chiêu tài"
  ];

  return (
    <div className="bg-white">
      {/* Hero Header Section */}
      <section className="relative py-20 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl -ml-32 -mb-32"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-charcoal mb-6">Tuyệt Tác Phong Thủy</h2>
            <p className="max-w-2xl mx-auto text-slate-600 leading-relaxed mb-10">
              Khám phá bộ sưu tập đá quý phong thủy tuyển chọn, mang năng lượng tinh khiết từ thiên nhiên. 
              Mỗi sản phẩm đều được kiểm định chất lượng, mang lại bình an và hưng thịnh cho chủ nhân.
            </p>
            
            <div className="max-w-xl mx-auto relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
              <input 
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white rounded-full shadow-xl shadow-slate-200/50 border border-slate-100 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between mb-6">
            <button 
              onClick={() => setShowMobileFilters(true)}
              className="flex items-center gap-2 px-6 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold uppercase tracking-widest text-charcoal shadow-sm active:scale-95 transition-all"
            >
              <Filter className="w-4 h-4" />
              Bộ lọc
              { (selectedAffinities.length > 0 || selectedCategory || priceRange[0] > 0 || priceRange[1] < 50000000) && (
                <span className="ml-2 w-2 h-2 rounded-full bg-primary"></span>
              )}
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Sắp xếp:</span>
              <select 
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="text-sm border-none bg-transparent focus:ring-0 font-bold outline-none cursor-pointer text-primary"
              >
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá thấp</option>
                <option value="price-desc">Giá cao</option>
              </select>
            </div>
          </div>

          {/* Sidebar Filters */}
          <AnimatePresence>
            {(showMobileFilters || window.innerWidth >= 1024) && (
              <motion.aside 
                initial={window.innerWidth < 1024 ? { x: '-100%' } : false}
                animate={window.innerWidth < 1024 ? { x: 0 } : false}
                exit={window.innerWidth < 1024 ? { x: '-100%' } : false}
                className={cn(
                  "w-full lg:w-72 flex-shrink-0 space-y-12",
                  "fixed inset-0 z-[60] bg-white p-8 overflow-y-auto lg:relative lg:inset-auto lg:z-auto lg:bg-transparent lg:p-0 lg:block",
                  !showMobileFilters && "hidden lg:block"
                )}
              >
                <div className="lg:hidden flex items-center justify-between mb-10">
                  <h3 className="text-xl font-serif font-bold">Bộ lọc tìm kiếm</h3>
                  <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-slate-100 rounded-full">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Theo Mệnh</h3>
                {(selectedAffinities.length > 0 || selectedCategory || priceRange[0] > 0 || priceRange[1] < 50000000 || searchQuery) && (
                  <button 
                    onClick={() => {
                      setLoading(true);
                      setSelectedAffinities([]);
                      setSelectedCategory(null);
                      setPriceRange([0, 50000000]);
                      setSearchQuery("");
                      setTimeout(() => setLoading(false), 500);
                    }}
                    className="text-[10px] text-primary font-bold uppercase tracking-widest hover:underline"
                  >
                    Xóa tất cả
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { name: "Mệnh Kim", color: "bg-yellow-400" },
                  { name: "Mệnh Mộc", color: "bg-green-500" },
                  { name: "Mệnh Thủy", color: "bg-blue-500" },
                  { name: "Mệnh Hỏa", color: "bg-red-500" },
                  { name: "Mệnh Thổ", color: "bg-orange-800" }
                ].map((m) => (
                  <button 
                    key={m.name} 
                    onClick={() => handleAffinityChange(m.name)}
                    className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 group ${
                      selectedAffinities.includes(m.name) 
                        ? 'bg-primary/5 border-primary shadow-sm' 
                        : 'bg-white border-slate-100 hover:border-primary/30 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${m.color} shadow-sm group-hover:scale-110 transition-transform`}></div>
                    <span className={`text-sm font-medium ${selectedAffinities.includes(m.name) ? 'text-primary' : 'text-slate-600'}`}>
                      {m.name}
                    </span>
                    {selectedAffinities.includes(m.name) && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">Danh Mục</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => handleCategoryChange(cat)}
                    className={`flex items-center justify-between w-full p-3 rounded-xl text-sm font-medium transition-all ${
                      selectedCategory === cat 
                        ? 'bg-charcoal text-white shadow-lg' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                    {selectedCategory === cat && <ChevronRight className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">Khoảng giá</h3>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="space-y-6">
                  <div className="relative h-1.5 bg-slate-200 rounded-full">
                    <div 
                      className="absolute h-full bg-primary rounded-full"
                      style={{ 
                        left: '0%', 
                        right: `${100 - (priceRange[1] / 50000000) * 100}%` 
                      }}
                    ></div>
                    <input 
                      type="range" 
                      min="0"
                      max="50000000"
                      step="1000000"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(priceRange[0], parseInt(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    />
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-md"
                      style={{ left: `${(priceRange[1] / 50000000) * 100}%`, transform: 'translate(-50%, -50%)' }}
                    ></div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Đến tối đa</span>
                      <span className="text-lg font-serif text-charcoal">{priceRange[1].toLocaleString()}đ</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 uppercase font-bold">Từ</label>
                        <input 
                          className="w-full text-xs px-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                          placeholder="0" 
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => handlePriceChange(parseInt(e.target.value) || 0, priceRange[1])}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 uppercase font-bold">Đến</label>
                        <input 
                          className="w-full text-xs px-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                          placeholder="50tr" 
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => handlePriceChange(priceRange[0], parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:hidden pt-10">
                  <button 
                    onClick={() => setShowMobileFilters(false)}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-primary/20"
                  >
                    Áp dụng bộ lọc
                  </button>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
          
          {window.innerWidth < 1024 && showMobileFilters && (
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[55] lg:hidden"
              onClick={() => setShowMobileFilters(false)}
            />
          )}

          {/* Product Grid */}
          <div className="flex-1">
            <div className="hidden lg:flex items-center justify-between mb-8">
              <p className="text-sm text-slate-500">Hiển thị {filteredProducts.length} sản phẩm</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Sắp xếp:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="text-sm border-none bg-transparent focus:ring-0 font-medium outline-none cursor-pointer"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="price-asc">Giá thấp đến cao</option>
                  <option value="price-desc">Giá cao đến thấp</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                [...Array(6)].map((_, i) => <ProductSkeleton key={i} />)
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    className="group bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <Link to={`/product/${product.id}`}>
                      <div className="aspect-square relative overflow-hidden bg-slate-50">
                        <img 
                          src={product.img} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute top-3 left-3 px-2 py-1 bg-primary/90 text-white text-[10px] font-bold uppercase rounded">Hot</div>
                      </div>
                      <div className="p-5">
                        <div className="inline-block px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-md mb-3">
                          {product.tag}
                        </div>
                        <h3 className="text-sm font-semibold mb-3 line-clamp-2">{product.name}</h3>
                        <p className="text-primary font-bold text-lg mb-4">{product.price}</p>
                        <button className="w-full py-2.5 bg-charcoal text-white text-xs font-bold rounded-lg group-hover:bg-primary transition-colors uppercase tracking-widest">Xem chi tiết</button>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
                    <Search className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-serif mb-2">Không tìm thấy sản phẩm</h3>
                  <p className="text-slate-500 text-sm">Vui lòng thử điều chỉnh lại bộ lọc của bạn.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <nav className="flex items-center justify-center mt-16 gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 hover:bg-primary hover:text-white transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-bold text-sm">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 hover:bg-primary hover:text-white transition-all text-sm font-medium">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 hover:bg-primary hover:text-white transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
}
