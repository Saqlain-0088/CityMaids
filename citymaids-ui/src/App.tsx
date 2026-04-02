import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Booking from './pages/Booking'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Contact from './pages/Contact'
import Testimonials from './pages/Testimonials'
import FAQ from './pages/FAQ'
import Blog from './pages/Blog'
import ServiceAreas from './pages/ServiceAreas'
import Careers from './pages/Careers'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/admin/Dashboard'
import AdminBookings from './pages/admin/Bookings'
import AdminServices from './pages/admin/Services'
import AdminStaff from './pages/admin/Staff'
import AdminCustomers from './pages/admin/Customers'
import AdminReviews from './pages/admin/Reviews'
import AdminLeads from './pages/admin/Leads'
import AdminSettings from './pages/admin/Settings'
import StaffDashboard from './pages/staff/Dashboard'
// CMS pages
import CmsHome from './pages/admin/cms/CmsHome'
import CmsAbout from './pages/admin/cms/CmsAbout'
import CmsServices from './pages/admin/cms/CmsServices'
import CmsPricing from './pages/admin/cms/CmsPricing'
import CmsBlog from './pages/admin/cms/CmsBlog'
import CmsFaq from './pages/admin/cms/CmsFaq'
import CmsTestimonials from './pages/admin/cms/CmsTestimonials'
import CmsServiceAreas from './pages/admin/cms/CmsServiceAreas'
import CmsContact from './pages/admin/cms/CmsContact'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Admin — Operations */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/services" element={<AdminServices />} />
        <Route path="/admin/staff" element={<AdminStaff />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/reviews" element={<AdminReviews />} />
        <Route path="/admin/leads" element={<AdminLeads />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        {/* Admin — CMS */}
        <Route path="/admin/cms/home" element={<CmsHome />} />
        <Route path="/admin/cms/about" element={<CmsAbout />} />
        <Route path="/admin/cms/services" element={<CmsServices />} />
        <Route path="/admin/cms/pricing" element={<CmsPricing />} />
        <Route path="/admin/cms/blog" element={<CmsBlog />} />
        <Route path="/admin/cms/faq" element={<CmsFaq />} />
        <Route path="/admin/cms/testimonials" element={<CmsTestimonials />} />
        <Route path="/admin/cms/service-areas" element={<CmsServiceAreas />} />
        <Route path="/admin/cms/contact" element={<CmsContact />} />
        {/* Staff */}
        <Route path="/staff" element={<StaffDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
