import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { PopupProvider } from './context/PopupContext';
import { TopMarquee } from './components/TopMarquee';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { MasterPopup } from './components/MasterPopup';
// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage';
import { CareerPage } from './pages/CareerPage';
import { JobDetailPage } from './pages/JobDetailPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ServiceCategoryPage } from './pages/ServiceCategoryPage';
import { ServicesPage } from './pages/ServicesPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SitemapPage } from './pages/SitemapPage';
function ScrollToTop() {
  const {
    pathname
  } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
export function App() {
  return <PopupProvider>
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[color:var(--pure-black)] text-white font-sans selection:bg-[color:var(--bright-red)] selection:text-white">
        <TopMarquee />
        <Navigation />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Work Routes */}
          <Route path="/work" element={<PortfolioPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:id" element={<CaseStudyDetailPage />} />

          {/* Career Routes */}
          <Route path="/career" element={<CareerPage />} />
          <Route path="/career/:id" element={<JobDetailPage />} />

          {/* Blog Routes */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />

          {/* Service Routes */}
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:category" element={<ServiceCategoryPage />} />
          <Route path="/services/:category/:subcategory" element={<ServiceDetailPage />} />

          {/* Products Routes */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />

          {/* Legal */}
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
        </Routes>

        <Footer />
        <MasterPopup />
      </div>
    </Router>
  </PopupProvider>;
}