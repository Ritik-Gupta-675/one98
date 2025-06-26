import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Home from './app/pages/layout';
import About from './app/pages/aboutus';
import BlogSection from './app/pages/articles-section/section';
import CreateArticlePage from './app/Dashboard/create';
import Dashboard from './app/Dashboard/layout';
import DashboardPage from './app/Dashboard/page';
import Contact from './app/pages/contactus';
import ServicesPage from './app/pages/services/page';
import TechServicesPage from './app/pages/services/tech-services';
import ContentServicesPage from './app/pages/services/content-services';
import BusinessServicesPage from './app/pages/services/business-services';
import EditArticlePageWrapper from './components/articles/edit-article';
import ArticlePage from './app/pages/articles-section/articles/article';
import ManageArticlePage from './app/Dashboard/manage-article'
// Layout component that includes Navbar and Footer
const MainLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// Placeholder components for routes  
const Courses = () => <div className="min-h-screen pt-20 px-4">Courses</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Routes with Navbar and Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<About />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/tech-service" element={<TechServicesPage />} />
            <Route path="/content-services" element={<ContentServicesPage />} />
            <Route path="/business-development-services" element={<BusinessServicesPage />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogsection" element={<BlogSection />} />
            <Route path="/contactus" element={<Contact />} />
            <Route path="/articles/:id" element={<ArticlePage />} />
          </Route>
          
          {/* Dashboard routes without Navbar/Footer */}
          <Route path="/dashboard" element={<Dashboard><DashboardPage /></Dashboard>} />
          <Route path="/dashboard/articles/create" element={<Dashboard><CreateArticlePage /></Dashboard>} />
          <Route path="/dashboard/articles/manage" element={<Dashboard><ManageArticlePage /></Dashboard>} />
          <Route path="/dashboard/articles/edit/:id" element={<Dashboard><EditArticlePageWrapper /></Dashboard>} />
          {/* <Route path="/dashboard/admin-login" element={<AdminLogin />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
