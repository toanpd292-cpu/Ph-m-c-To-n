import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Diamond, Search, Menu, X, ShoppingBag, Phone, MessageCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Trang Chủ', href: '/' },
    { name: 'Sản Phẩm', href: '/products' },
    { name: 'Xem Mệnh', href: '/destiny' },
    { name: 'Về Chúng Tôi', href: '/about' },
    { name: 'Liên Hệ', href: '/contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2 group">
              <Diamond className="text-primary w-8 h-8 group-hover:rotate-12 transition-transform" />
              <h1 className="font-serif text-xl font-bold tracking-tight text-charcoal">NGỌC NHẤT LINH</h1>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-slate-600">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "hover-gold transition-all relative py-1",
                    location.pathname === link.href && "text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                className="h-10 w-64 rounded-full border-slate-200 bg-slate-50 pl-10 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="Tìm kiếm vật phẩm..."
              />
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <button 
                className="lg:hidden p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-full relative transition-colors">
                <ShoppingBag className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white font-bold">0</span>
              </button>
              <Link to="/contact" className="hidden md:block bg-primary text-white px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-primary-dark transition-all rounded-sm shadow-sm hover:shadow-md">
                Liên Hệ
              </Link>
              <button 
                className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden px-6 py-4 bg-white border-b border-slate-100"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  autoFocus
                  className="h-12 w-full rounded-xl border-slate-200 bg-slate-50 pl-10 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder="Tìm kiếm vật phẩm..."
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-50 md:hidden shadow-2xl flex flex-col"
              >
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                  <span className="font-serif font-bold text-primary">MENU</span>
                  <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X className="w-6 h-6 text-slate-600" />
                  </button>
                </div>
                <div className="flex flex-col p-8 gap-6">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "text-lg font-medium uppercase tracking-[0.2em] text-slate-600 hover:text-primary transition-colors flex items-center justify-between group",
                          location.pathname === link.href && "text-primary font-bold"
                        )}
                      >
                        {link.name}
                        <ChevronRight className={cn("w-5 h-5 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0", location.pathname === link.href && "opacity-100 translate-x-0")} />
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                    className="mt-8"
                  >
                    <Link 
                      to="/contact"
                      onClick={() => setIsOpen(false)}
                      className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest text-center shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                    >
                      Liên Hệ Ngay
                    </Link>
                  </motion.div>
                </div>
                
                <div className="mt-auto p-8 bg-slate-50 border-t border-slate-100">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Kết nối với chúng tôi</p>
                  <div className="flex gap-4">
                    <a href="tel:0902111626" className="size-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-primary transition-colors">
                      <Phone className="w-5 h-5" />
                    </a>
                    <a href="https://zalo.me" className="size-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-primary transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        <motion.a
          href="https://zalo.me"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-blue-500/40 transition-all flex items-center justify-center"
          title="Tư vấn Zalo"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.a>
        <motion.a
          href="tel:0901234567"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-primary text-white p-4 rounded-full shadow-lg hover:shadow-primary/40 transition-all flex items-center justify-center"
          title="Gọi ngay"
        >
          <Phone className="w-6 h-6" />
        </motion.a>
      </div>
    </>
  );
}
