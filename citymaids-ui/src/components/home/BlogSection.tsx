import { Link } from 'react-router-dom'
import { useInView } from '../../hooks/useInView'

const posts = [
  {
    id: 1,
    title: '10 Tips for Keeping Your Home Clean Between Professional Cleanings',
    excerpt: 'Maintaining a clean home doesn\'t have to be a full-time job. Here are our top tips for keeping things tidy between your scheduled cleanings.',
    date: 'March 20, 2026',
    category: 'Tips & Tricks',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85',
  },
  {
    id: 2,
    title: 'The Ultimate Guide to Deep Cleaning Your Kitchen',
    excerpt: 'Your kitchen deserves more than a quick wipe-down. Learn how to deep clean every surface, appliance, and corner for a truly spotless result.',
    date: 'March 15, 2026',
    category: 'How-To',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=85',
  },
  {
    id: 3,
    title: 'Move-Out Cleaning Checklist: Get Your Full Deposit Back',
    excerpt: 'Moving out? Use our comprehensive checklist to ensure your rental is spotless and maximize your chances of getting your full deposit back.',
    date: 'March 5, 2026',
    category: 'Guides',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=700&q=85',
  },
]

export default function BlogSection() {
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className="section bg-dark-50">
      <div className="container-xl">

        {/* Header */}
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-brand-500" />
              <span className="text-brand-600 font-semibold text-xs uppercase tracking-widest">Latest Articles</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-dark-900 leading-tight"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Cleaning Tips & Guides
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-dark-700 border-b-2 border-brand-500 pb-0.5 hover:text-brand-700 transition-colors group self-start sm:self-end flex-shrink-0"
          >
            View all articles
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <article
              key={post.id}
              className={`group bg-white border border-dark-100 rounded-2xl overflow-hidden hover:border-brand-200 hover:shadow-lg transition-all duration-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms`, transition: 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease' }}
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-dark-400">{post.readTime} read</span>
                </div>
                <h3 className="font-bold text-dark-900 text-base leading-snug mb-2 group-hover:text-brand-700 transition-colors line-clamp-2"
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {post.title}
                </h3>
                <p className="text-dark-500 text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-3 border-t border-dark-100">
                  <span className="text-xs text-dark-400">{post.date}</span>
                  <Link to="/blog" className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors flex items-center gap-1">
                    Read more
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
