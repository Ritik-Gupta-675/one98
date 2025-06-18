'use client';
import React from 'react';
import { FaBook, FaLaptopCode, FaUsers, FaChartLine, FaFileAlt, FaMobileAlt, FaGlobe, FaClipboardCheck, FaSearch, FaHandshake, FaMoneyBillWave, FaBuilding, FaNewspaper, FaBookOpen } from 'react-icons/fa';

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
    <div className="text-blue-600 text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const ServiceSection = ({ title, services }: { title: string; services: ServiceCardProps[] }) => (
  <div className="mb-16">
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
      <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} />
      ))}
    </div>
  </div>
);

const ServicesPage = () => {
  const contentServices = [
    {
      icon: <FaFileAlt />,
      title: "Daily Current Affairs",
      description: "Stay updated with meticulously curated daily current affairs, helping students stay ahead in their preparation."
    },
    {
      icon: <FaNewspaper />,
      title: "Daily CA + Tech",
      description: "Combining current affairs with the latest in technology, this service ensures comprehensive coverage of relevant topics."
    },
    {
      icon: <FaBook />,
      title: "Books with Senior Officers & Toppers",
      description: "Access to exclusive study materials and books authored by senior officers and past toppers, providing invaluable insights and strategies."
    },
    {
      icon: <FaClipboardCheck />,
      title: "Test Series",
      description: "Rigorous test series that simulate real exam conditions, providing students with the practice they need to excel."
    },
    {
      icon: <FaChartLine />,
      title: "Evaluations",
      description: "Detailed and insightful evaluations by experienced educators, offering constructive feedback to help students improve."
    },
    {
      icon: <FaBookOpen />,
      title: "Daily Class Notes",
      description: "High-quality class notes crafted daily to reinforce learning and aid in revision, ensuring students have access to the best resources."
    }
  ];

  const techServices = [
    {
      icon: <FaMobileAlt />,
      title: "App Development",
      description: "Custom mobile applications that provide students with access to learning materials, live classes, and progress tracking on the go."
    },
    {
      icon: <FaGlobe />,
      title: "Website Development",
      description: "Professional website development services to create intuitive and engaging websites that reflect the institute's brand and mission."
    },
    {
      icon: <FaLaptopCode />,
      title: "Learning Management Systems (LMS) Integration",
      description: "Seamless integration of advanced LMS platforms to manage courses, content delivery, and assessments efficiently."
    },
    {
      icon: <FaClipboardCheck />,
      title: "Online Examination Platforms",
      description: "Secure and robust online examination systems that ensure a smooth and reliable testing experience."
    },
    {
      icon: <FaChartLine />,
      title: "Leads Management",
      description: "Powerful analytics tools that offer deep insights into student performance, track and convert potential students."
    },
    {
      icon: <FaSearch />,
      title: "SEO Services",
      description: "Comprehensive SEO services to enhance online visibility and attract more students to your coaching institute."
    }
  ];

  const businessServices = [
    {
      icon: <FaUsers />,
      title: "Recruiting",
      description: "Comprehensive recruiting services to help you find the best educators and administrative staff, ensuring your institute is staffed with top talent."
    },
    {
      icon: <FaUsers />,
      title: "Mock Interviews",
      description: "Conducting realistic mock interviews to prepare students for actual interview scenarios, boosting their confidence and performance."
    },
    {
      icon: <FaChartLine />,
      title: "Marketing and Promotions",
      description: "Tailored marketing strategies and promotional activities to enhance your institute's reach and reputation."
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Funding for Series A",
      description: "Assistance in securing initial funding for startups."
    },
    {
      icon: <FaBuilding />,
      title: "0 to Establishment",
      description: "Comprehensive support from idea inception to full establishment."
    },
    {
      icon: <FaHandshake />,
      title: "Partnerships and Collaborations",
      description: "Facilitating valuable connections in industry to drive growth."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">SERVICES</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">Worldwide Trust for EdTech Solutions</p>
        </div>
      </div>

      {/* Services Sections */}
      <div className="container mx-auto px-6 py-16">
        <ServiceSection 
          title="Content Services" 
          services={contentServices} 
        />
        
        <ServiceSection 
          title="Tech Services" 
          services={techServices} 
        />
        
        <ServiceSection 
          title="Business Development Services" 
          services={businessServices} 
        />
      </div>
    </div>
  );
};

export default ServicesPage;