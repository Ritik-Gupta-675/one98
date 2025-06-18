import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Home from './app/pages/layout';
import About from './app/pages/aboutus';
import BlogSection from './app/pages/blogsection/section';
import CreateArticlePage from './app/Dashboard/articles/create';
import Dashboard from './app/Dashboard/layout';
import Contact from './app/pages/contactus';

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
const Services = () => <div className="min-h-screen pt-20 px-4">Services</div>;
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
            <Route path="/services" element={<Services />} />
            <Route path="/services/1" element={<div className="min-h-screen pt-20 px-4">Service 1</div>} />
            <Route path="/services/2" element={<div className="min-h-screen pt-20 px-4">Service 2</div>} />
            <Route path="/services/3" element={<div className="min-h-screen pt-20 px-4">Service 3</div>} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogsection" element={<BlogSection />} />
            <Route path="/contactus" element={<Contact />} />
          </Route>
          
          {/* Dashboard routes without Navbar/Footer */}
          <Route path="/dashboard" element={<Dashboard children={<CreateArticlePage />} />} />
          <Route path="/dashboard/articles/create" element={<CreateArticlePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
