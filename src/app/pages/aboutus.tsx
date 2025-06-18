import { useEffect } from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

const AboutUs: FC = () => {
  // Set page title and meta description
  useEffect(() => {
    document.title = 'About Us - One98 Edusolutions';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'One98 Edusolutions offers cutting-edge technology, content development, and business growth strategies for coaching institutes.');
    }
  }, []);
  
  const clients = [1, 2, 3, 4, 5, 6, 7, 8]; // Moved outside JSX for better performance
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Head content is managed by the useEffect hook */}

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-yellow-400 font-semibold text-lg mb-4 block">ABOUT US</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">India's No.1 Growth Partner for Coaching Institutes</h1>
            <p className="text-xl text-blue-100 mb-8">
              At One98 Edusolutions, we are committed to empowering coaching institutes, particularly those focused on the highly competitive UPSC examination market.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <img 
                src="/about-image.jpg" 
                alt="About One98 Edusolutions"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">One98 Edusolutions: Pioneering Education Excellence</h2>
              <p className="text-gray-600 mb-6">
                Our mission is to continuously innovate and deliver cutting-edge technological solutions that not only address the immediate needs of our clients but also anticipate and prepare for the future demands of the education sector.
              </p>
              <p className="text-gray-600 mb-8">
                At One98 Edusolutions, we believe in fostering long-term partnerships with our clients, working collaboratively to achieve excellence in education.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-700 mb-3">Vision</h3>
                  <p className="text-gray-600">
                    To be recognized as the global leader in educational solutions, synonymous with innovation, quality, and customer-centricity.
                  </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-700 mb-3">Mission</h3>
                  <p className="text-gray-600">
                    To revolutionize the educational landscape by delivering innovative, comprehensive, and customized tech and content solutions.
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-blue-100 text-blue-700 px-6 py-3 rounded-full font-semibold">
                  ESTABLISHED 2016
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Years of Service */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <span className="text-blue-600 font-semibold text-lg mb-4 block">OUR JOURNEY</span>
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Almost 7+ Years of Service. Serving Fantastic Companies</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {clients.map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">{item}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Client {item}</h3>
                <p className="text-gray-600">Partner Institute</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-lg mb-4 block">SERVICES</span>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Solutions to Your EdTech Problems</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core strength lies in providing comprehensive tech solutions that enhance the educational experience for both institutions and students.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tech Service */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Tech Services</h3>
                <p className="text-gray-600 mb-6">
                  Cutting-edge technology solutions tailored for educational institutions to enhance learning experiences.
                </p>
                <div className="text-center">
                  <Link to="/services/tech">
                    <div className="text-blue-600 font-semibold hover:text-blue-700 transition-colors cursor-pointer">
                      Read More →
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Content Service */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Content Services</h3>
                <p className="text-gray-600 mb-6">
                  High-quality, engaging, and curriculum-aligned content developed by subject matter experts.
                </p>
                <div className="text-center">
                  <Link to="/services/content">
                    <div className="text-blue-600 font-semibold hover:text-blue-700 transition-colors cursor-pointer">
                      Read More →
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Business Development Service */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Business Development</h3>
                <p className="text-gray-600 mb-6">
                  Strategic growth solutions to help educational institutions expand their reach and impact.
                </p>
                <div className="text-center">
                  <Link to="/services/business">
                    <div className="text-blue-600 font-semibold hover:text-blue-700 transition-colors cursor-pointer">
                      Read More →
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Institute?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Partner with One98 Edusolutions and take your coaching institute to the next level with our comprehensive solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-full transition-colors cursor-pointer">
                <Link to="/contact">
                  Contact Us Today
                </Link>
              </div>
              <div className="bg-transparent hover:bg-blue-600 border-2 border-white text-white font-bold py-3 px-8 rounded-full transition-colors cursor-pointer">
                <Link to="/services">
                  Explore Our Services
                </Link>
              </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;