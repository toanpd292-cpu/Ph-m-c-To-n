// SEO Helper Functions
export interface SEOConfig {
  title: string;
  description: string;
  image?: string;
  url: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  type?: 'article' | 'website';
}

export function generateMetaTags(config: SEOConfig) {
  return {
    title: `${config.title} | Ngọc Nhất Linh`,
    description: config.description,
    og: {
      title: config.title,
      description: config.description,
      image: config.image || 'https://lwshqypvoockvejpwmhk.supabase.co/storage/v1/object/public/assets/og-image.jpg',
      url: config.url,
      type: config.type || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      image: config.image || 'https://lwshqypvoockvejpwmhk.supabase.co/storage/v1/object/public/assets/og-image.jpg',
    },
  };
}

export function generateStructuredData(config: SEOConfig & { content?: string }) {
  const baseUrl = 'https://ngocnhatlinh.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': config.type === 'article' ? 'BlogPosting' : 'WebPage',
    headline: config.title,
    description: config.description,
    image: config.image || `${baseUrl}/og-image.jpg`,
    url: config.url,
    ...(config.type === 'article' && {
      author: {
        '@type': 'Person',
        name: config.author || 'Ngọc Nhất Linh',
      },
      datePublished: config.publishedDate,
      dateModified: config.modifiedDate || config.publishedDate,
      publisher: {
        '@type': 'Organization',
        name: 'Ngọc Nhất Linh',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.png`,
        },
      },
    }),
  };
}
