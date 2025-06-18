import React from 'react';
import { FaYoutube, FaMicrophone, FaPenAlt } from 'react-icons/fa';

interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

const SolutionCard: React.FC<SolutionCardProps> = ({ icon, title, items }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 h-full">
    <div className="text-red-600 text-4xl mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <ul className="text-left space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="text-red-600 mr-2">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const NewGeneration: React.FC = () => {
  const solutions = [
    {
      icon: <FaYoutube />,
      title: 'YouTube Influencer Collaboration',
      items: [
        'Influencer Partnerships: Facilitate collaborations between coaching institutes and popular YouTube influencers who can promote courses and programs to a broader audience.',
        'Content Creation Support: Provide support for creating high-quality educational content that influencers can share on their channels.'
      ]
    },
    {
      icon: <FaMicrophone />,
      title: 'Anchoring and Hosting Services',
      items: [
        'Professional Anchors: Offer professional anchoring services for webinars, seminars, and events to enhance the presentation and engagement.',
        'Training for In-house Anchors: Conduct training programs for the coaching institute\'s staff to improve their anchoring and hosting skills for online classes and events.'
      ]
    },
    {
      icon: <FaPenAlt />,
      title: 'Scriptwriting and Content Development',
      items: [
        'Scriptwriting Services: Provide professional scriptwriting services to create compelling and effective scripts for educational videos, promotional content, and webinars.',
        'Content Development Workshops: Organize workshops and training sessions on content development, focusing on creating engaging and educational scripts for various formats.'
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">New Generation Solutions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            With the changing times and generational gap often coaching institutes finds themselves in a situation of Not connecting with the target Student Base. With our services we bridge this gap smoothly.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              icon={solution.icon}
              title={solution.title}
              items={solution.items}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewGeneration;