import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, User, ChevronRight, ArrowRight } from 'lucide-react';
import { supabase } from '../utils/supabase';

type Post = {
  id: number;
  title: string;
  content?: string;
  excerpt?: string;
  image_url?: string;
  author?: string;
  created_at?: string;
};

export default function Blog() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    async function loadPosts() {
      setLoading(true);
      try {
        const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
        if (mounted && data) setPosts(data as Post[]);
      } catch (e) {
        console.warn('Failed to load posts', e);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
    return () => { mounted = false };
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog | Ngọc Nhất Linh - Kiến Thức Phong Thủy</title>
        <meta name="description" content="Khám phá các bài viết về phong thủy, ngọc quý, và kiến thức tâm linh từ Ngọc Nhất Linh." />
        <meta property="og:title" content="Blog | Ngọc Nhất Linh" />
        <meta property="og:description" content="Kiến thức phong thủy từ những chuyên gia hàng đầu" />
        <meta name="keywords" content="blog, phong thủy, ngọc quý, kiến thức, tâm linh" />
      </Helmet>

      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-primary/10 via-white to-primary/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-charcoal mb-4">
              Kiến Thức Phong Thủy
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Khám phá những bài viết sâu sắc về phong thủy, ý nghĩa của ngọc quý, và cách chọn lựa vật phẩm phù hợp với vận mệnh của bạn.
            </p>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">Blog</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Blog Posts */}
            <section className="lg:col-span-8">
              {loading ? (
                <div className="space-y-8">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-64 bg-slate-200 rounded-xl mb-4"></div>
                      <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                    </div>
                  ))}
                </div>
              ) : posts.length > 0 ? (
                <div className="space-y-12">
                  {posts.map((post) => (
                    <article
                      key={post.id}
                      className="group bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-primary hover:shadow-xl transition-all duration-300"
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        {/* Featured Image */}
                        {post.image_url && (
                          <Link
                            to={`/blog/${post.id}`}
                            className="sm:col-span-1 aspect-square overflow-hidden rounded-xl"
                          >
                            <img
                              src={post.image_url}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              decoding="async"
                            />
                          </Link>
                        )}

                        {/* Content */}
                        <div className={`p-6 flex flex-col justify-between`}>
                          <div>
                            <Link
                              to={`/blog/${post.id}`}
                              className="block group-hover:text-primary transition-colors"
                            >
                              <h3 className="text-xl md:text-2xl font-serif font-bold text-charcoal mb-3 line-clamp-2 group-hover:underline">
                                {post.title}
                              </h3>
                            </Link>

                            <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                              {post.excerpt || (post.content || '').slice(0, 150) + '...'}
                            </p>

                            {/* Metadata */}
                            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-4">
                              {post.author && (
                                <div className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  <span>{post.author}</span>
                                </div>
                              )}
                              {post.created_at && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <time dateTime={post.created_at}>
                                    {new Date(post.created_at).toLocaleDateString('vi-VN')}
                                  </time>
                                </div>
                              )}
                              {post.content && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{Math.ceil((post.content || '').split(' ').length / 200)} phút</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Read More Button */}
                          <Link
                            to={`/blog/${post.id}`}
                            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                          >
                            Đọc tiếp
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-600 text-lg">Chưa có bài viết nào. Hãy quay lại sau!</p>
                </div>
              )}
            </section>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Newsletter */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-xl border border-primary/20">
                <h4 className="font-serif text-xl font-bold mb-3 text-charcoal">Đăng ký bản tin</h4>
                <p className="text-sm text-slate-600 mb-6">
                  Nhận các bài viết mới, kiến thức phong thủy và ưu đãi độc quyền hàng tuần.
                </p>
                <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn đã đăng ký!'); }}>
                  <input
                    className="w-full rounded-lg border border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 py-3 outline-none px-4"
                    placeholder="Email của bạn"
                    type="email"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-95"
                  >
                    ĐĂNG KÝ NGAY
                  </button>
                </form>
              </div>

              {/* Categories */}
              <div className="bg-white p-8 rounded-xl border border-slate-100">
                <h4 className="font-serif text-lg font-bold mb-4 text-charcoal">Chủ đề phổ biến</h4>
                <div className="space-y-2">
                  {['Phong Thủy', 'Ngọc Quý', 'Tâm Linh', 'Kiến Thức'].map(category => (
                    <a
                      key={category}
                      href={`/blog?category=${encodeURIComponent(category)}`}
                      className="block px-4 py-2 rounded-lg bg-slate-50 hover:bg-primary hover:text-white text-sm font-medium transition-colors"
                    >
                      {category}
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-charcoal text-white p-8 rounded-xl">
                <h4 className="font-serif text-lg font-bold mb-3">Tìm sản phẩm phù hợp?</h4>
                <p className="text-sm text-slate-200 mb-6">
                  Khám phá bộ sưu tập đá quý phong thủy của chúng tôi.
                </p>
                <Link
                  to="/products"
                  className="inline-block w-full text-center bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Xem sản phẩm
                </Link>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}
