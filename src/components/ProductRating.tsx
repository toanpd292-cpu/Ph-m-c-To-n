import React, { useState } from 'react';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export type Review = {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
};

type ProductRatingProps = {
  productId: string;
  reviews?: Review[];
  averageRating?: number;
  totalReviews?: number;
  onSubmitReview?: (review: Omit<Review, 'id' | 'date' | 'helpful'>) => void;
};

export default function ProductRating({
  productId,
  reviews = [],
  averageRating = 4.5,
  totalReviews = 12,
  onSubmitReview,
}: ProductRatingProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    content: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmitReview && formData.author && formData.title && formData.content) {
      onSubmitReview({
        author: formData.author,
        rating,
        title: formData.title,
        content: formData.content,
      });
      setFormData({ author: '', title: '', content: '' });
      setRating(5);
      setShowReviewForm(false);
    }
  };

  const ratingDistribution = [
    { stars: 5, count: 8 },
    { stars: 4, count: 3 },
    { stars: 3, count: 1 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ];

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Average Rating */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < Math.floor(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}
                />
              ))}
            </div>
            <p className="text-sm text-slate-600">Dựa trên {totalReviews} đánh giá</p>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="md:col-span-2 space-y-3">
          {ratingDistribution.map(({ stars, count }) => (
            <div key={stars} className="flex items-center gap-3">
              <div className="flex items-center gap-2 w-20">
                <span className="text-sm font-medium text-slate-600">{stars} sao</span>
                <span className="text-xs text-slate-500">({count})</span>
              </div>
              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all"
                  style={{ width: `${totalReviews > 0 ? (count / totalReviews) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Review Button */}
      {!showReviewForm && (
        <button
          onClick={() => setShowReviewForm(true)}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <MessageCircle size={20} />
          ✍️ Viết đánh giá
        </button>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-slate-50 rounded-xl p-6 border border-slate-200 space-y-4"
        >
          <h3 className="font-bold text-lg">Chia sẻ đánh giá của bạn</h3>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tên của bạn</label>
            <input
              type="text"
              value={formData.author}
              onChange={e => setFormData({ ...formData, author: e.target.value })}
              placeholder="Nhập tên..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Xếp hạng</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(i => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={32}
                    className={i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tiêu đề đánh giá</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ví dụ: Sản phẩm tuyệt vời!"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Nhận xét chi tiết</label>
            <textarea
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              placeholder="Chia sẻ trải nghiệm của bạn với sản phẩm này..."
              rows={4}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition"
            >
              ✓ Gửi đánh giá
            </button>
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="flex-1 py-2 border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-100 transition"
            >
              Hủy
            </button>
          </div>
        </motion.form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="font-bold text-xl">💬 Đánh giá từ khách hàng</h3>
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p>Chưa có đánh giá nào</p>
          </div>
        ) : (
          reviews.map(review => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-6 border border-slate-200 hover:border-slate-300 transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex gap-2 items-center mb-2">
                    <span className="font-semibold text-slate-900">{review.author}</span>
                    <span className="text-xs text-slate-500">{review.date}</span>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-slate-300'
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>

              <h4 className="font-bold text-slate-900 mb-2">{review.title}</h4>
              <p className="text-slate-600 text-sm mb-4">{review.content}</p>

              <button className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-2 transition">
                <ThumbsUp size={14} />
                Hữu ích ({review.helpful})
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
