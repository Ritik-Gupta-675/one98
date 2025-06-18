'use client';
import { FaUsers, FaClipboardList, FaChartLine, FaBullhorn, FaHandshake } from 'react-icons/fa';

const BusinessServicesPage = () => {
  const services = [
    { 
      icon: <FaUsers className="text-3xl text-blue-600" />, 
      title: "Recruiting",
      description: "Find and hire the best talent for your coaching institute with our comprehensive recruiting services."
    },
    { 
      icon: <FaClipboardList className="text-3xl text-blue-600" />, 
      title: "Mock Interviews",
      description: "Prepare your students for real-world interviews with our professional mock interview services."
    },
    { 
      icon: <FaChartLine className="text-3xl text-blue-600" />, 
      title: "Strategic Planning",
      description: "Develop a clear roadmap for your institute's growth with our strategic planning expertise."
    },
    { 
      icon: <FaBullhorn className="text-3xl text-blue-600" />, 
      title: "Marketing and Promotions",
      description: "Reach more students with our targeted marketing and promotional strategies."
    },
    { 
      icon: <FaHandshake className="text-3xl text-blue-600" />, 
      title: "Partnerships",
      description: "Expand your network and opportunities through strategic partnerships."
    },
    { 
      icon: <FaChartLine className="text-3xl text-blue-600" />, 
      title: "Funding Assistance",
      description: "Get help securing funding and investments for your educational initiatives."
    }
  ];

  const steps = [
    { number: "01", title: "Contract", description: "We begin with a detailed contract that outlines all project specifications and deliverables." },
    { number: "02", title: "Presentation", description: "Our team presents the business strategy and gathers your valuable feedback." },
    { number: "03", title: "Implementation", description: "We implement the business plan with regular updates and performance tracking." },
    { number: "04", title: "Results", description: "Achieve measurable growth and success with our proven business development strategies." }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Business Development Services</h1>
            <div className="flex items-center mb-8">
              <div className="w-16 h-1 bg-blue-400 mr-4"></div>
              <span className="uppercase tracking-widest text-blue-200 text-sm font-medium">BUSINESS DEVELOPMENT STRATEGY</span>
            </div>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Good Marketing Makes the Company Look Smart
            </p>
            <p className="text-lg text-blue-100 max-w-3xl">
              We understand that running a successful coaching institute involves more than just teaching. Our business development services are designed to support your operational needs.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">The Step for Perfect Action Delivery Result</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Grow Your Business?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Let's discuss how our business development services can help you achieve your goals.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessServicesPage;