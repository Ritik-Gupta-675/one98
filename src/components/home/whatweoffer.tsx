import React from 'react';
import { FaGraduationCap, FaChalkboardTeacher, FaLaptopCode, FaChartLine, FaUsers, FaMobileAlt } from 'react-icons/fa';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
    <div className="text-red-600 text-3xl mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600 flex-grow">{description}</p>
  </div>
);

const WhatWeOffer: React.FC = () => {
  const services = [
    {
      icon: <FaGraduationCap />,
      title: 'Educational Consulting',
      description: 'Expert guidance to help educational institutions optimize their operations and improve learning outcomes.'
    },
    {
      icon: <FaChalkboardTeacher />,
      title: 'Teacher Training',
      description: 'Comprehensive training programs to enhance teaching methodologies and classroom management skills.'
    },
    {
      icon: <FaLaptopCode />,
      title: 'E-Learning Solutions',
      description: 'Custom e-learning platforms and content development for seamless digital education experiences.'
    },
    {
      icon: <FaChartLine />,
      title: 'Performance Analytics',
      description: 'Data-driven insights to track and improve institutional and student performance metrics.'
    },
    {
      icon: <FaUsers />,
      title: 'Student Engagement',
      description: 'Innovative programs and tools to boost student participation and learning outcomes.'
    },
    {
      icon: <FaMobileAlt />,
      title: 'Mobile Learning',
      description: 'Mobile-optimized learning solutions for education on-the-go.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">WHAT WE OFFER</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Offering Innovative Tech Solutions For Your Business</h3>
          <div className="w-20 h-1 bg-red-600 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;