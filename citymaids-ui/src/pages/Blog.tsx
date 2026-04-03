import MainLayout from '../components/layout/MainLayout'
import { useInView } from '../hooks/useInView'

const posts = [
  { id: 1, title: '10 Tips for Keeping Your Home Clean Between Professional Cleanings', excerpt: 'Maintaining a clean home doesn\'t have to be a full-time job. Here are our top tips for keeping things tidy between your scheduled cleanings.', date: 'March 20, 2026', category: 'Tips & Tricks', readTime: '5 min', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { id: 2, title: 'The Ultimate Guide to Deep Cleaning Your Kitchen', excerpt: 'Your kitchen deserves more than a quick wipe-down. Learn how to deep clean every surface, appliance, and corner for a truly spotless kitchen.', date: 'March 15, 2026', category: 'How-To', readTime: '8 min', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80' },
  { id: 3, title: 'Why Eco-Friendly Cleaning Products Are Better for Your Family', excerpt: 'Switching to eco-friendly cleaning products isn\'t just good for the environment — it\'s better for your family\'s health too.', date: 'March 10, 2026', category: 'Health & Home', readTime: '4 min', image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&q=80' },
  { id: 4, title: 'Move-Out Cleaning Checklist: Get Your Full Deposit Back', excerpt: 'Moving out? Use our comprehensive checklist to ensure your rental is spotless and maximize your chances of getting your full deposit back.', date: 'March 5, 2026', category: 'Guides', readTime: '6 min', image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&q=80' },
]

export default function Blog() {
  const { ref, inView } = useInView()
  return (
    <MainLayout>
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-16">
        <div className="container-xl text-center">
          <span className="inline-block text-primary-400 font-semibold text-sm uppercase tracking-widest mb-3">Our Blog</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Cleaning Tips & Guides</h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">Expert advice for a cleaner, healthier home.</p>
        </div>
      </div>
      <section ref={ref} className="section bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {posts.map((post, i) => (
              <article key={post.id}
                className={`group card-hover overflow-hidden ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 100}ms`, transition: 'all 0.5s ease' }}>
                <div className="h-52 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge badge-brand">{post.category}</span>
                    <span className="text-xs text-slate-400">{post.readTime} read</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-xl leading-snug mb-2 group-hover:text-primary-700 transition-colors">{post.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
                  <p className="text-xs text-slate-400">{post.date}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

