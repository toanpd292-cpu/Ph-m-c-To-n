import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../utils/supabase';
import { generateStructuredData } from '../utils/seo';
import { Calendar, Clock, User, ChevronRight, ArrowLeft } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  author?: string;
  created_at: string;
  image_url?: string;
}

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = React.useState<Post | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [relatedPosts, setRelatedPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    let mounted = true;

    async function loadPost() {
      setLoading(true);
      try {
        // Fetch main post
        const { data: postData } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single();

        if (mounted && postData) {
          setPost(postData as Post);

          // Fetch related posts (limit to 3)
          const { data: related } = await supabase
            .from('posts')
            .select('*')
            .neq('id', id)
            .limit(3)
            .order('created_at', { ascending: false });

          if (mounted && related) {
            setRelatedPosts(related as Post[]);
          }
        }
      } catch (e) {
        console.error('Failed to load post:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadPost();
    return () => { mounted = false };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-slate-600">Đang tải...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Bài viết không tìm thấy</h1>
          <Link to="/blog" className="inline-block px-6 py-2 bg-primary text-white rounded-lg">
            Quay lại blog
          </Link>
        </div>
      </div>
    );
  }

  const baseUrl = 'https://ngocnhatlinh.com';
  const postUrl = `${baseUrl}/blog/${post.id}`;
  const excerpt = post.excerpt || (post.content || '').slice(0, 160) + '...';
  const publishedDate = new Date(post.created_at).toISOString();

  const structuredData = generateStructuredData({
    title: post.title,
    description: excerpt,
    image: post.image_url,
    url: postUrl,
    type: 'article',
    author: post.author || 'Ngọc Nhất Linh',
    publishedDate,
    content: post.content,
  });

  return (
    <>
      <Helmet>
        <title>{post.title} | Ngọc Nhất Linh - Blog</title>
        <meta name="description" content={excerpt} />
        <meta name="keywords" content="phong thủy, ngọc quý, trang sức, đá quý, kiến thức" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content={post.image_url || `${baseUrl}/og-image.jpg`} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={excerpt} />
        <meta name="twitter:image" content={post.image_url || `${baseUrl}/og-image.jpg`} />
        <meta name="author" content={post.author || 'Ngọc Nhất Linh'} />
        <meta property="article:published_time" content={publishedDate} />
        <link rel="canonical" href={postUrl} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <article className="bg-white">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium truncate">{post.title}</span>
          </nav>

          {/* Back Button */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="text-primary w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-charcoal">{post.author || 'Ngọc Nhất Linh'}</p>
                  <p className="text-xs text-primary italic">Chuyên gia phong thủy</p>
                </div>
              </div>

              <div className="text-sm text-slate-500 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <time dateTime={publishedDate}>
                  {new Date(post.created_at).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>

              <div className="text-sm text-slate-500 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{Math.ceil((post.content || '').split(' ').length / 200)} phút đọc</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.image_url && (
            <figure className="mb-12">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="text-sm text-slate-500 text-center mt-3">
                {post.title}
              </figcaption>
            </figure>
          )}

          {/* Content */}
          <div className="prose prose-slate lg:prose-xl max-w-none text-slate-700 space-y-6 mb-12">
            {post.content.split('\n').map((paragraph, idx) => (
              paragraph.trim() && (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              )
            ))}
          </div>

          {/* Tags & Share */}
          <div className="py-8 border-t border-b border-slate-100 mb-12">
            <div className="flex flex-wrap gap-2">
              {['Phong Thủy', 'Ngọc Quý', 'Kiến Thức'].map(tag => (
                <a
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                  #{tag}
                </a>
              ))}
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold mb-6">Bài viết liên quan</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map(relPost => (
                  <Link
                    key={relPost.id}
                    to={`/blog/${relPost.id}`}
                    className="group p-6 rounded-xl border border-slate-100 hover:border-primary hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="font-semibold text-charcoal mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {relPost.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                      {(relPost.excerpt || relPost.content || '').slice(0, 100)}...
                    </p>
                    <time className="text-xs text-slate-400">
                      {new Date(relPost.created_at).toLocaleDateString('vi-VN')}
                    </time>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-serif font-bold mb-3">Tìm hiểu thêm về phong thủy?</h3>
            <p className="text-slate-600 mb-6">
              Khám phá bộ sưu tập đá quý phong thủy của chúng tôi và tìm ra sản phẩm phù hợp với vận mệnh của bạn.
            </p>
            <Link
              to="/products"
              className="inline-block px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Xem sản phẩm
            </Link>
          </section>
        </main>
      </article>
    </>
  );
}
