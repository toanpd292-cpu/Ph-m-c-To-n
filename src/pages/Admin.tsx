import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { Trash2, Edit2, Plus, LogOut, X, AlertCircle } from 'lucide-react';
import AdminLogin from '../components/AdminLogin';

export type Product = {
  id: string;
  import React, { useEffect } from 'react';

  export default function Admin() {
    useEffect(() => {
      // Admin UI removed: redirect to homepage
      window.location.replace('/');
    }, []);

    return null;
  }
    setError('');
    setSuccess('');

    // Validation
    if (!formData.name.trim()) {
      setError('Vui lòng nhập tên sản phẩm');
      return;
    }
    if (!formData.price.trim()) {
      setError('Vui lòng nhập giá sản phẩm');
      return;
    }
    if (!formData.img.trim()) {
      setError('Vui lòng nhập URL hình ảnh');
      return;
    }

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: formData.price.trim(),
        img: formData.img.trim(),
        category: formData.category.trim(),
        affinities: formData.affinities,
        stock: formData.stock ? parseInt(formData.stock) : 0,
      };

      if (editing) {
        // Update product
        const { error: updateError } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editing.id);

        if (updateError) {
          throw new Error(updateError.message);
        }
        setSuccess('✅ Cập nhật sản phẩm thành công!');
      } else {
        // Insert new product
        const { error: insertError } = await supabase
          .from('products')
          .insert([productData]);

        if (insertError) {
          throw new Error(insertError.message);
        }
        setSuccess('✅ Thêm sản phẩm mới thành công!');
      }

      // Reset form
      resetForm();
      await fetchProducts();

      // Clear messages
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Có lỗi xảy ra';
      setError(`❌ ${errorMsg}`);
      console.error('Submit error:', err);
    }
  };

  const handleEdit = (product: Product) => {
    setEditing(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price || '',
      category: product.category || '',
      img: product.img || '',
      affinities: product.affinities || [],
      stock: product.stock?.toString() || '',
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Bạn chắc chắn muốn xóa "${name}"?`)) return;

    try {
      setError('');
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      setSuccess('✅ Xóa sản phẩm thành công!');
      await fetchProducts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Có lỗi xảy ra';
      setError(`❌ Lỗi xóa: ${errorMsg}`);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditing(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      img: '',
      affinities: [],
      stock: '',
    });
    setNewAffinity('');
  };

  // Login page
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} adminPassword={adminPassword} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-beige-subtle to-beige-subtle">
      {/* Navbar */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif font-bold text-charcoal">📦 Quản Lý Sản Phẩm Đá</h1>
            <p className="text-xs text-slate-500 mt-1">Tổng: {products.length} sản phẩm</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-red-50 text-charcoal border border-slate-200 hover:border-red-200 rounded-lg font-medium transition-all"
          >
            <LogOut size={18} />
            Đăng xuất
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3 items-start">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm">{success}</p>
          </div>
        )}

        {/* Add Product Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-8 flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
            Thêm Sản Phẩm Mới
          </button>
        )}

        {/* Form Section */}
        {showForm && (
          <div className="mb-12 bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-charcoal">
                {editing ? '✏️ Chỉnh Sửa Sản Phẩm' : '➕ Sản Phẩm Mới'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-slate-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">
                  Tên Sản Phẩm *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: Vòng tay đá thạch anh..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">
                  Mô Tả Chi Tiết
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Nhập mô tả sản phẩm..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                />
              </div>

              {/* Price & Category */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">
                    Giá (VND) *
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: 500.000đ"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">
                    Danh Mục
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: Vòng tay phong thủy"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">
                  URL Hình Ảnh *
                </label>
                <input
                  type="url"
                  name="img"
                  value={formData.img}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  required
                />
                <p className="text-xs text-slate-500 mt-2">
                  💡 Dùng Cloudinary, ImgBB hoặc lưu trữ hình ảnh miễn phí khác
                </p>

                {/* Image Preview */}
                {formData.img && (
                  <div className="mt-4">
                    <img
                      src={formData.img}
                      alt="Preview"
                      className="h-48 w-48 object-cover rounded-lg border border-slate-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Affinities */}
              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">
                  Mệnh Phong Thủy
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newAffinity}
                    onChange={(e) => setNewAffinity(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addAffinity()}
                    placeholder="Ví dụ: Mệnh Kim, Mệnh Hỏa..."
                    className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={addAffinity}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-all"
                  >
                    Thêm
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.affinities.map((affinity, idx) => (
                    <div
                      key={idx}
                      className="bg-primary/10 border border-primary/30 px-3 py-1.5 rounded-full flex items-center gap-2 text-sm text-primary font-medium"
                    >
                      {affinity}
                      <button
                        type="button"
                        onClick={() => removeAffinity(idx)}
                        className="hover:text-primary/60 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">
                  Số Lượng Tồn Kho
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-4 justify-end pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 border border-slate-200 text-charcoal rounded-lg font-medium hover:bg-slate-50 transition-all"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all shadow-md"
                >
                  {editing ? '✏️ Cập Nhật' : '➕ Thêm Sản Phẩm'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Loading State */}
        {loading && !showForm && (
          <div className="py-12 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
            </div>
            <p className="text-slate-600">Đang tải danh sách sản phẩm...</p>
          </div>
        )}

        {/* Products List */}
        {!loading && products.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left font-bold text-charcoal">Hình Ảnh</th>
                    <th className="px-6 py-3 text-left font-bold text-charcoal">Tên</th>
                    <th className="px-6 py-3 text-left font-bold text-charcoal">Giá</th>
                    <th className="px-6 py-3 text-left font-bold text-charcoal">Danh Mục</th>
                    <th className="px-6 py-3 text-left font-bold text-charcoal">Tồn Kho</th>
                    <th className="px-6 py-3 text-center font-bold text-charcoal">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="h-12 w-12 object-cover rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-charcoal">{product.name}</div>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                          {product.description}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-primary font-bold">{product.price}</td>
                      <td className="px-6 py-4 text-slate-600">{product.category}</td>
                      <td className="px-6 py-4 text-slate-600">{product.stock || 0}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="py-12 text-center bg-white border border-slate-200 rounded-xl">
            <p className="text-slate-600 mb-4">📦 Chưa có sản phẩm nào</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all"
            >
              ➕ Thêm Sản Phẩm Đầu Tiên
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
