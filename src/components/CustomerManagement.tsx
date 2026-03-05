import React, { useState, useEffect } from 'react';
import { MessageCircle, Trash2, Eye, CheckCircle, Clock } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { motion } from 'motion/react';

export interface CustomerContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  contact_source: 'zalo' | 'facebook' | 'phone' | 'contact_form';
  status: 'new' | 'contacted' | 'converted' | 'closed';
  interested_products?: string[];
  created_at: string;
  notes?: string;
}

export default function CustomerManagement() {
  const [contacts, setContacts] = useState<CustomerContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'converted'>('all');
  const [selectedContact, setSelectedContact] = useState<CustomerContact | null>(null);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const { data } = await supabase
        .from('customer_contacts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) {
        setContacts(data);
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (id: string, status: CustomerContact['status']) => {
    try {
      await supabase
        .from('customer_contacts')
        .update({ status })
        .eq('id', id);
      
      setContacts(contacts.map(c => c.id === id ? { ...c, status } : c));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const updateContactNotes = async (id: string) => {
    try {
      await supabase
        .from('customer_contacts')
        .update({ notes })
        .eq('id', id);
      
      if (selectedContact) {
        setSelectedContact({ ...selectedContact, notes });
      }
    } catch (error) {
      console.error('Error updating notes:', error);
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await supabase
        .from('customer_contacts')
        .delete()
        .eq('id', id);
      
      setContacts(contacts.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const filteredContacts = filter === 'all' 
    ? contacts 
    : contacts.filter(c => c.status === filter);

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    converted: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800'
  };

  const sourceIcons = {
    zalo: '💬',
    facebook: '📘',
    phone: '☎️',
    contact_form: '📧'
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold mb-2">Quản Lý Liên Hệ Khách Hàng</h2>
        <p className="text-slate-600">Theo dõi và quản lý tất cả yêu cầu từ khách hàng</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'new', 'contacted', 'converted'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === tab
                ? 'bg-primary text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab === 'all' && '📋 Tất Cả'}
            {tab === 'new' && '🆕 Mới'}
            {tab === 'contacted' && '💬 Đã Liên Hệ'}
            {tab === 'converted' && '✅ Chuyển Đổi'}
          </button>
        ))}
      </div>

      {/* Contacts List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-slate-500">Đang tải dữ liệu...</p>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Không có liên hệ nào</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredContacts.map((contact, idx) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{sourceIcons[contact.contact_source]}</span>
                    <div>
                      <h3 className="font-semibold text-charcoal">{contact.name}</h3>
                      <p className="text-xs text-slate-500">{contact.phone}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 mb-3">{contact.message}</p>
                  <div className="flex items-center gap-3 text-xs">
                    <button
                      onClick={() => setSelectedContact(contact)}
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      Chi tiết
                    </button>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">
                      {new Date(contact.created_at).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[contact.status]}`}>
                    {contact.status === 'new' && 'Mới'}
                    {contact.status === 'contacted' && 'Đã Liên Hệ'}
                    {contact.status === 'converted' && 'Chuyển Đổi'}
                    {contact.status === 'closed' && 'Đóng'}
                  </span>
                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="p-1 hover:bg-red-50 rounded text-red-500"
                    title="Xóa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Status Update Buttons */}
              <div className="flex gap-2 flex-wrap">
                {(['new', 'contacted', 'converted', 'closed'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => updateContactStatus(contact.id, status)}
                    className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                      contact.status === status
                        ? 'bg-primary text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {status === 'new' && '🆕 Mới'}
                    {status === 'contacted' && '💬 Đã Liên Hệ'}
                    {status === 'converted' && '✅ Chuyển Đổi'}
                    {status === 'closed' && '✕ Đóng'}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xl font-serif font-bold">Chi Tiết Liên Hệ</h3>
              <button
                onClick={() => {
                  setSelectedContact(null);
                  setNotes('');
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase">Tên</span>
                  <p className="font-medium">{selectedContact.name}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase">Số Điện Thoại</span>
                  <p className="font-medium">{selectedContact.phone}</p>
                </div>
                {selectedContact.email && (
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase">Email</span>
                    <p className="font-medium">{selectedContact.email}</p>
                  </div>
                )}
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase">Nguồn</span>
                  <p className="font-medium">{selectedContact.contact_source}</p>
                </div>
              </div>

              {/* Message */}
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase block mb-2">Tin Nhắn</span>
                <p className="bg-slate-50 p-4 rounded-lg text-slate-700 border border-slate-200">
                  {selectedContact.message}
                </p>
              </div>

              {/* Notes */}
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase block mb-2">Ghi Chú</span>
                <textarea
                  value={notes || selectedContact.notes || ''}
                  onChange={(e) => setNotes(e.target.value)}
                  onBlur={() => updateContactNotes(selectedContact.id)}
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                  rows={4}
                  placeholder="Thêm ghi chú về cuộc trao đổi..."
                />
              </div>

              {/* Status Management */}
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase block mb-3">Cập Nhật Trạng Thái</span>
                <div className="grid grid-cols-2 gap-2">
                  {(['new', 'contacted', 'converted', 'closed'] as const).map(status => (
                    <button
                      key={status}
                      onClick={() => {
                        updateContactStatus(selectedContact.id, status);
                        setSelectedContact({ ...selectedContact, status });
                      }}
                      className={`py-2 px-3 rounded-lg font-medium transition-all text-sm ${
                        selectedContact.status === status
                          ? 'bg-primary text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {status === 'new' && '🆕 Mới'}
                      {status === 'contacted' && '💬 Đã Liên Hệ'}
                      {status === 'converted' && '✅ Chuyển Đổi'}
                      {status === 'closed' && '✕ Đóng'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
