import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { Trash2, Edit2, Plus, LogOut, Upload, X } from 'lucide-react';
import AdminLogin from '../components/AdminLogin';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  colors?: string[];
  sizes?: string[];
  stock?: number;
  created_at: string;
};

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: '',
    colors: [] as string[],
    sizes: [] as string[],
    stock: '',
  });
  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');

  // Kiểm tra authentication
  useEffect(() => {
    const session = localStorage.getItem('adminSession');
    if (session === 'authenticated') {
      setIsAuthenticated(true);
      fetchProducts();
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    localStorage.removeItem('adminLoginTime');
    setIsAuthenticated(false);
    setProducts([]);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      image_url: '',
      colors: [],
      sizes: [],
      stock: '',
    });
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm:', error);
      alert('Lỗi khi lấy danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Upload ảnh lên Supabase Storage
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const timestamp = Date.now();
      const filename = `product-${timestamp}-${file.name}`;

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('products')
        .upload(filename, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filename);

      setFormData(prev => ({
        ...prev,
        image_url: publicUrl
      }));

      alert('✅ Upload ảnh thành công!');
    } catch (error) {
      console.error('Lỗi upload:', error);
      alert('❌ Lỗi khi upload ảnh. Vui lòng thử lại!');
    } finally {
      setUploading(false);
    }
  };

  const addColor = () => {
    if (newColor.trim()) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, newColor.trim()]
      }));
      setNewColor('');
    }
  };

  const removeColor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  const addSize = () => {
    if (newSize.trim()) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, newSize.trim()]
      }));
      setNewSize('');
    }
  };

  const removeSize = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      alert('Vui lòng điền tên sản phẩm và giá');
      return;
    }

    try {
      if (editing) {
        // Cập nhật sản phẩm
        const { error } = await supabase
          .from('products')
          .update({
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
            image_url: formData.image_url,
            colors: formData.colors,
            sizes: formData.sizes,
            stock: parseInt(formData.stock) || 0,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editing.id);

        if (error) throw error;
        alert('✅ Cập nhật sản phẩm thành công!');
      } else {
        // Thêm sản phẩm mới
        const { error } = await supabase
          .from('products')
          .insert([{
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
            image_url: formData.image_url,
            colors: formData.colors,
            sizes: formData.sizes,
            stock: parseInt(formData.stock) || 0,
          }]);

        if (error) throw error;
        alert('✅ Thêm sản phẩm thành công!');
      }

      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        image_url: '',
        colors: [],
        sizes: [],
        stock: '',
      });
      setNewColor('');
      setNewSize('');
      setEditing(null);
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      console.error('Lỗi:', error);
      alert('❌ Có lỗi xảy ra khi lưu sản phẩm');
    }
  };

  const handleEdit = (product: Product) => {
    setEditing(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image_url: product.image_url,
      colors: product.colors || [],
      sizes: product.sizes || [],
      stock: product.stock?.toString() || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      alert('Xóa sản phẩm thành công!');
      fetchProducts();
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Có lỗi xảy ra khi xóa sản phẩm');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      image_url: '',
      colors: [],
      sizes: [],
      stock: '',
    });
    setNewColor('');
    setNewSize('');
  };

  // Nếu chưa đăng nhập, hiển thị login form
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} adminPassword={adminPassword} />;
  }

  if (loading && !showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
          <p>Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">👨‍💼 Quản lý Sản phẩm</h1>
          <div className="flex gap-4">
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6 py-3 rounded-lg font-semibold transition"
              >
                <Plus size={20} />
                Thêm Sản phẩm
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-semibold transition"
            >
              <LogOut size={20} />
              Đăng xuất
            </button>
          </div>
        </div>

        {/* Form Thêm/Sửa */}
        {showForm && (
          <div className="bg-slate-800 rounded-lg p-8 mb-8 border border-slate-700">
            <h2 className="text-2xl font-bold mb-6">
              {editing ? '✏️ Chỉnh sửa sản phẩm' : '➕ Thêm sản phẩm mới'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tên sản phẩm */}
              <div>
                <label className="block text-sm font-semibold mb-2">Tên sản phẩm *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  placeholder="Ví dụ: Áo Thun Nam"
                  required
                />
              </div>

              {/* Mô tả */}
              <div>
                <label className="block text-sm font-semibold mb-2">Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  placeholder="Mô tả chi tiết sản phẩm..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Giá */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Giá (VND) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    placeholder="Ví dụ: 150000"
                    required
                  />
                </div>

                {/* Danh mục */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Danh mục</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    placeholder="Ví dụ: Áo, Quần, Giày..."
                  />
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-semibold mb-2">📦 Số lượng tồn kho</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    placeholder="Ví dụ: 50"
                  />
                </div>
              </div>

              {/* Upload Ảnh */}
              <div>
                <label className="block text-sm font-semibold mb-2">🖼️ Ảnh sản phẩm</label>
                <div className="space-y-3">
                  {/* File input */}
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className={`block px-4 py-3 bg-slate-700 border-2 border-dashed border-slate-600 rounded-lg text-center cursor-pointer hover:border-blue-500 transition ${
                        uploading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <Upload size={20} className="mx-auto mb-2" />
                      <span className="text-sm font-medium">
                        {uploading ? 'Đang upload...' : 'Click để chọn file hoặc kéo thả ảnh'}
                      </span>
                    </label>
                  </div>

                  {/* Paste URL */}
                  <div>
                    <input
                      type="text"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 text-sm"
                      placeholder="Hoặc paste URL ảnh từ Cloudinary/ImgBB..."
                    />
                  </div>
                </div>
              </div>

              {/* Xem trước ảnh */}
              {formData.image_url && (
                <div className="flex justify-center">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="h-40 w-40 object-cover rounded-lg border border-slate-600"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=No+Image';
                    }}
                  />
                </div>
              )}

              {/* Màu sắc */}
              <div>
                <label className="block text-sm font-semibold mb-2">🎨 Màu sắc</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addColor()}
                    className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    placeholder="Ví dụ: Đạo, Đỏ, Xanh, Vàng..."
                  />
                  <button
                    type="button"
                    onClick={addColor}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition"
                  >
                    Thêm
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.colors.map((color, index) => (
                    <div
                      key={index}
                      className="bg-slate-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                    >
                      {color}
                      <button
                        type="button"
                        onClick={() => removeColor(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-sm font-semibold mb-2">📏 Kích cỡ (Sizes)</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSize()}
                    className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    placeholder="Ví dụ: S, M, L, XL, XXL..."
                  />
                  <button
                    type="button"
                    onClick={addSize}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition"
                  >
                    Thêm
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.sizes.map((size, index) => (
                    <div
                      key={index}
                      className="bg-slate-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                    >
                      {size}
                      <button
                        type="button"
                        onClick={() => removeSize(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 justify-center pt-6 border-t border-slate-700">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-8 py-2 rounded-lg font-semibold transition"
                >
                  {editing ? '✏️ Cập nhật' : '➕ Thêm'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-8 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Danh sách sản phẩm */}
        <div>
          <h2 className="text-2xl font-bold mb-4">📦 Danh sách sản phẩm ({products.length})</h2>
          
          {products.length === 0 ? (
            <div className="bg-slate-800 rounded-lg p-8 text-center border border-slate-700">
              <p className="text-slate-400">Chưa có sản phẩm nào. Hãy thêm sản phẩm đầu tiên!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {products.map(product => (
                <div key={product.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition flex items-center gap-6">
                  {/* Ảnh sản phẩm */}
                  <div className="flex-shrink-0">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-20 w-20 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80x80?text=No+Img';
                      }}
                    />
                  </div>

                  {/* Thông tin sản phẩm */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                    <p className="text-slate-400 text-sm mb-2">
                      {product.description?.substring(0, 100)}
                      {product.description && product.description.length > 100 ? '...' : ''}
                    </p>
                    <div className="flex gap-4 text-sm flex-wrap">
                      <span className="text-green-400 font-semibold">💰 {product.price.toLocaleString('vi-VN')} VND</span>
                      {product.category && (
                        <span className="bg-slate-700 px-3 py-1 rounded">📂 {product.category}</span>
                      )}
                      {product.stock !== undefined && (
                        <span className="bg-slate-700 px-3 py-1 rounded">📦 {product.stock} hàng</span>
                      )}
                      {product.colors && product.colors.length > 0 && (
                        <span className="bg-slate-700 px-3 py-1 rounded">🎨 {product.colors.length} màu</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
                      title="Chỉnh sửa"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
                      title="Xóa"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
