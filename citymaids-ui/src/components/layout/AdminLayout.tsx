import { ReactNode, useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const ops = [
  { label: 'Dashboard',  href: '/admin',           d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label: 'Bookings',   href: '/admin/bookings',  d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { label: 'Staff',      href: '/admin/staff',     d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { label: 'Customers',  href: '/admin/customers', d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { label: 'Leads',      href: '/admin/leads',     d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { label: 'Reviews',    href: '/admin/reviews',   d: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
]

const cms = [
  { label: 'Home Page',     href: '/admin/cms/home',          d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label: 'About Page',    href: '/admin/cms/about',         d: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Services',      href: '/admin/cms/services',      d: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
  { label: 'Pricing',       href: '/admin/cms/pricing',       d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Blog',          href: '/admin/cms/blog',          d: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
  { label: 'FAQ',           href: '/admin/cms/faq',           d: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Testimonials',  href: '/admin/cms/testimonials',  d: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
  { label: 'Service Areas', href: '/admin/cms/service-areas', d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z' },
  { label: 'Contact Info',  href: '/admin/cms/contact',       d: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
]

const notifications = [
  { id: 1, text: 'New booking from Sarah Johnson', time: '2m ago', unread: true },
  { id: 2, text: 'James Wilson submitted a review', time: '15m ago', unread: true },
  { id: 3, text: 'New lead: Patricia Moore', time: '1h ago', unread: true },
  { id: 4, text: 'Booking #3 is now in progress', time: '2h ago', unread: false },
  { id: 5, text: 'Staff Carlos Rivera completed job', time: '3h ago', unread: false },
]

interface NavItem { label: string; href: string; d: string }

function NavLink({ item, active, onClick }: { item: NavItem; active: boolean; onClick: () => void }) {
  return (
    <Link to={item.href} onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group ${active ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
      <svg className={`w-4 h-4 flex-shrink-0 ${active ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'}`} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d={item.d} />
      </svg>
      <span className='flex-1 truncate'>{item.label}</span>
      {active && <span className='w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0' />}
    </Link>
  )
}

function AccordionSection({
  title, icon, items, isActive, defaultOpen, onClose
}: {
  title: string
  icon: string
  items: NavItem[]
  isActive: (href: string) => boolean
  defaultOpen: boolean
  onClose: () => void
}) {
  const [open, setOpen] = useState(defaultOpen)
  const hasActive = items.some(i => isActive(i.href))

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors ${hasActive ? 'text-brand-600' : 'text-slate-400 hover:text-slate-600'}`}
      >
        <span className='text-base'>{icon}</span>
        <span className='flex-1 text-left'>{title}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill='none' viewBox='0 0 24 24' stroke='currentColor'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M19 9l-7 7-7-7' />
        </svg>
      </button>

      <div className={`overflow-hidden transition-all duration-200 ${open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className='mt-0.5 space-y-0.5 pl-1'>
          {items.map(item => (
            <NavLink key={item.href} item={item} active={isActive(item.href)} onClick={onClose} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { pathname } = useLocation()
  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const isActive = (href: string) => href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
  const isCmsActive = pathname.startsWith('/admin/cms')
  const isOpsActive = !isCmsActive

  const allItems = [...ops, ...cms, { label: 'Settings', href: '/admin/settings', d: '' }]
  const pageTitle = allItems.find(n => isActive(n.href))?.label || 'Admin'
  const unreadCount = notifications.filter(n => n.unread).length
  const close = () => setSidebarOpen(false)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className='min-h-screen bg-slate-50 flex'>
      {sidebarOpen && (
        <div className='fixed inset-0 z-20 bg-slate-950/50 backdrop-blur-sm lg:hidden' onClick={close} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-100 flex flex-col transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Logo */}
        <div className='flex items-center gap-3 h-16 px-5 border-b border-slate-100 flex-shrink-0'>
          <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-brand'>
            <svg className='w-5 h-5 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
            </svg>
          </div>
          <div>
            <p className='font-extrabold text-slate-900 text-sm leading-tight'>CityMaids</p>
            <p className='text-xs text-slate-400 font-medium'>Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className='flex-1 overflow-y-auto py-3 px-2 space-y-1'>

          {/* Operations accordion */}
          <AccordionSection
            title='Operations'
            icon='⚙️'
            items={ops}
            isActive={isActive}
            defaultOpen={isOpsActive}
            onClose={close}
          />

          <div className='mx-3 border-t border-slate-100' />

          {/* CMS accordion */}
          <AccordionSection
            title='Content (CMS)'
            icon='📝'
            items={cms}
            isActive={isActive}
            defaultOpen={isCmsActive}
            onClose={close}
          />

          <div className='mx-3 border-t border-slate-100' />

          {/* Settings — standalone */}
          <Link to='/admin/settings' onClick={close}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group ${isActive('/admin/settings') ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
            <svg className={`w-4 h-4 flex-shrink-0 ${isActive('/admin/settings') ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'}`} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z' />
            </svg>
            <span className='flex-1'>Settings</span>
            {isActive('/admin/settings') && <span className='w-1.5 h-1.5 rounded-full bg-brand-500' />}
          </Link>

        </nav>

        {/* Footer */}
        <div className='p-2 border-t border-slate-100 flex-shrink-0'>
          <Link to='/' className='flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 transition-colors'>
            <svg className='w-4 h-4 text-slate-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
            </svg>
            View Site
          </Link>
          <Link to='/login' className='flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors'>
            <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
            </svg>
            Logout
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className='flex-1 flex flex-col min-w-0'>

        {/* Top navbar */}
        <header className='h-16 bg-white border-b border-slate-100 flex items-center gap-4 px-4 sm:px-6 flex-shrink-0 sticky top-0 z-10'>
          <button className='lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors' onClick={() => setSidebarOpen(true)}>
            <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </button>

          <h1 className='text-base font-bold text-slate-900 hidden sm:block'>{pageTitle}</h1>

          <div className='flex-1 max-w-xs hidden md:block'>
            <div className='relative'>
              <svg className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
              <input type='text' placeholder='Search...' className='w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white transition-all placeholder:text-slate-400' />
            </div>
          </div>

          <div className='flex items-center gap-1.5 ml-auto'>

            {/* Notifications */}
            <div className='relative' ref={notifRef}>
              <button onClick={() => { setNotifOpen(o => !o); setProfileOpen(false) }} className='relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors'>
                <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' />
                </svg>
                {unreadCount > 0 && <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white' />}
              </button>
              {notifOpen && (
                <div className='absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-strong border border-slate-100 overflow-hidden z-50'>
                  <div className='flex items-center justify-between px-4 py-3 border-b border-slate-100'>
                    <p className='font-bold text-slate-900 text-sm'>Notifications</p>
                    <span className='text-xs bg-brand-100 text-brand-700 font-semibold px-2 py-0.5 rounded-full'>{unreadCount} new</span>
                  </div>
                  <div className='divide-y divide-slate-50 max-h-72 overflow-y-auto'>
                    {notifications.map(n => (
                      <div key={n.id} className={`flex items-start gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer ${n.unread ? 'bg-brand-50/40' : ''}`}>
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.unread ? 'bg-brand-500' : 'bg-slate-200'}`} />
                        <div>
                          <p className='text-sm text-slate-700 leading-snug'>{n.text}</p>
                          <p className='text-xs text-slate-400 mt-0.5'>{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='px-4 py-2.5 border-t border-slate-100'>
                    <button className='text-xs text-brand-600 font-semibold hover:text-brand-700'>Mark all as read</button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className='relative' ref={profileRef}>
              <button onClick={() => { setProfileOpen(o => !o); setNotifOpen(false) }} className='flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors'>
                <div className='w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center flex-shrink-0'>
                  <span className='text-white font-bold text-xs'>AD</span>
                </div>
                <div className='hidden sm:block text-left'>
                  <p className='text-sm font-semibold text-slate-900 leading-tight'>Admin User</p>
                  <p className='text-xs text-slate-400'>Super Admin</p>
                </div>
                <svg className='w-4 h-4 text-slate-400 hidden sm:block' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                </svg>
              </button>
              {profileOpen && (
                <div className='absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-strong border border-slate-100 overflow-hidden z-50'>
                  <div className='px-4 py-3 border-b border-slate-100'>
                    <p className='font-semibold text-slate-900 text-sm'>Admin User</p>
                    <p className='text-xs text-slate-400'>admin@citymaids.com</p>
                  </div>
                  <div className='p-1.5'>
                    {['Profile Settings', 'Preferences'].map(label => (
                      <button key={label} className='w-full flex items-center px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left'>{label}</button>
                    ))}
                  </div>
                  <div className='p-1.5 border-t border-slate-100'>
                    <Link to='/login' className='flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors'>Sign Out</Link>
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        <main className='flex-1 p-4 sm:p-6 overflow-auto'>{children}</main>
      </div>
    </div>
  )
}
