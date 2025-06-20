import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Home from './app/pages/layout';
import About from './app/pages/aboutus';
import BlogSection from './app/pages/blogsection/section';
import CreateArticlePage from './app/Dashboard/articles/create';
import Dashboard from './app/Dashboard/layout';
import DashboardPage from './app/Dashboard/page';
import Contact from './app/pages/contactus';
import ServicesPage from './app/pages/services/page';
import TechServicesPage from './app/pages/services/tech-services';
import ContentServicesPage from './app/pages/services/content-services';
import BusinessServicesPage from './app/pages/services/business-services';
// import AdminLogin from './app/pages/admin-login';
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
            <Route path="/services/1" element={<TechServicesPage />} />
            <Route path="/services/2" element={<ContentServicesPage />} />
            <Route path="/services/3" element={<BusinessServicesPage />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogsection" element={<BlogSection />} />
            <Route path="/contactus" element={<Contact />} />
          </Route>
          
          {/* Dashboard routes without Navbar/Footer */}
          <Route path="/dashboard" element={<Dashboard><DashboardPage /></Dashboard>} />
          <Route path="/dashboard/articles/create" element={<Dashboard><CreateArticlePage /></Dashboard>} />
          {/* <Route path="/dashboard/admin-login" element={<AdminLogin />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
