import React from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

type CartSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed top-0 right-0 h-screen w-screen max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <div className="flex items-center gap-3">
                <ShoppingCart size={24} />
                <div>
                  <h2 className="font-bold text-lg">Giỏ hàng của bạn</h2>
                  <p className="text-sm text-blue-100">{cart.length} sản phẩm</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                    <p className="text-slate-500 font-medium">Giỏ hàng trống</p>
                    <p className="text-xs text-slate-400 mt-2">Thêm sản phẩm để bắt đầu mua sắm</p>
                  </div>
                </div>
              ) : (
                cart.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 transition"
                  >
                    {/* Image */}
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80';
                      }}
                    />

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-slate-900">{item.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {item.color && <span>{item.color} • </span>}
                        {item.size && <span>Size {item.size}</span>}
                      </p>
                      <p className="text-sm font-bold text-green-600 mt-2">
                        {(item.price * item.quantity).toLocaleString('vi-VN')} VND
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="p-1 hover:bg-slate-200 rounded transition"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-slate-200 rounded transition"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-slate-200 p-6 space-y-4 bg-slate-50">
                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Tạm tính:</span>
                    <span className="font-semibold">
                      {cartTotal.toLocaleString('vi-VN')} VND
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Phí giao hàng:</span>
                    <span className="font-semibold">Miễn phí</span>
                  </div>
                  <div className="border-t border-slate-300 pt-2 flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-green-600">
                      {cartTotal.toLocaleString('vi-VN')} VND
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-lg transition-all">
                  💳 Thanh toán ngay
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-red-600 border border-red-300 hover:bg-red-50 font-semibold rounded-lg transition"
                >
                  🗑️ Xóa giỏ hàng
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
