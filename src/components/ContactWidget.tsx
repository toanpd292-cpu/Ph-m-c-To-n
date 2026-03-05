import React, { useState } from 'react';
import { MessageCircle, Zap, Phone, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'zalo' | 'whatsapp' | 'phone'>('zalo');
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (!message.trim()) return;

    if (activeTab === 'zalo') {
      window.open(`https://zalo.me/0902111626?text=${encodeURIComponent(message)}`, '_blank');
    } else if (activeTab === 'whatsapp') {
      window.open(`https://wa.me/84902111626?text=${encodeURIComponent(message)}`, '_blank');
    } else if (activeTab === 'phone') {
      window.location.href = 'tel:0902111626';
    }

    setMessage('');
    setIsOpen(false);
  };

  const handleQuickMessage = (text: string) => {
    setMessage(text);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-30"
            />

            {/* Chat Box */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-2xl z-40 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">💬 Liên hệ với chúng tôi</h3>
                  <p className="text-sm text-blue-100">Trả lời trong vòng 24h</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Tabs */}
              <div className="bg-slate-50 border-b border-slate-200 flex gap-0">
                {[
                  { id: 'zalo' as const, label: '👤 Zalo', icon: '💬' },
                  { id: 'whatsapp' as const, label: '📱 WhatsApp', icon: '💬' },
                  { id: 'phone' as const, label: '☎️ Gọi', icon: '☎️' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-blue-600 bg-white'
                        : 'text-slate-600 border-transparent hover:bg-slate-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Quick Messages */}
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-3 uppercase">
                    ⚡ Gửi nhanh
                  </p>
                  <div className="space-y-2">
                    {[
                      '👋 Xin chào! Tôi muốn tư vấn về sản phẩm',
                      '❓ Còn hàng không? Bao lâu giao?',
                      '💳 Có hỗ trợ trả góp không?',
                      '🎁 Có khuyến mãi nào không?',
                    ].map(text => (
                      <button
                        key={text}
                        onClick={() => handleQuickMessage(text)}
                        className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm text-slate-700 transition-colors"
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Message Input */}
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-2 uppercase">
                    Hoặc nhập tin nhắn
                  </p>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyPress={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Viết tin nhắn của bạn..."
                    className="w-full p-3 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                {/* Send Button */}
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Gửi qua{' '}
                  {activeTab === 'zalo' ? 'Zalo' : activeTab === 'whatsapp' ? 'WhatsApp' : 'Gọi'}
                </button>

                {/* Contact Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-slate-600">
                    <span className="font-semibold">📞 Hotline:</span> 0902 111 626
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    <span className="font-semibold">⏰ Giờ hoạt động:</span> 8:00 - 22:00
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
