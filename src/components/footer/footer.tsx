import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 text-black w-full">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">One98</h3>
            <p className="mb-4">Empowering education through innovative solutions and technology.</p>
          </div>

          {/* Quick Links */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-300">Home</a></li>
              <li><a href="#" className="hover:text-blue-300">About Us</a></li>
              <li><a href="#" className="hover:text-blue-300">Services</a></li>
              <li><a href="#" className="hover:text-blue-300">Courses</a></li>
              <li><a href="#" className="hover:text-blue-300">Contact Us</a></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-300">E-Learning Solutions</a></li>
              <li><a href="#" className="hover:text-blue-300">Skill Development</a></li>
              <li><a href="#" className="hover:text-blue-300">Career Guidance</a></li>
              <li><a href="#" className="hover:text-blue-300">Training Programs</a></li>
              <li><a href="#" className="hover:text-blue-300">Workshops</a></li>
            </ul>
          </div>

          {/* Empty column to maintain grid layout */}
          <div></div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-700 mt-8 pt-6 text-sm text-center">
          <p>© {new Date().getFullYear()} One98 EduSolutions. All Rights Reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-blue-300">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-300">Terms & Conditions</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;