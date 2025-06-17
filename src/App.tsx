import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';

// Placeholder components for routes
const About = () => <div className="min-h-screen pt-20 px-4">About Us</div>;
const Services = () => <div className="min-h-screen pt-20 px-4">Services</div>;
const Courses = () => <div className="min-h-screen pt-20 px-4">Courses</div>;
const Contact = () => <div className="min-h-screen pt-20 px-4">Contact Us</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/1" element={<div className="min-h-screen pt-20 px-4">Service 1</div>} />
          <Route path="/services/2" element={<div className="min-h-screen pt-20 px-4">Service 2</div>} />
          <Route path="/services/3" element={<div className="min-h-screen pt-20 px-4">Service 3</div>} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
