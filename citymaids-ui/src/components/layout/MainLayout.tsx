import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from '../ui/WhatsAppButton'
import LeadPopup from '../ui/LeadPopup'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
      <LeadPopup />
    </div>
  )
}
