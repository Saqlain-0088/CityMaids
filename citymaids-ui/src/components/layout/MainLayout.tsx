import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from '../ui/WhatsAppButton'
import LeadPopup from '../ui/LeadPopup'

export default function MainLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  // Home page hero overlaps the transparent header \u2014 no spacer needed
  const isHome = pathname === '/'

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      {!isHome && <div className="h-16" />}
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
      <LeadPopup />
    </div>
  )
}
