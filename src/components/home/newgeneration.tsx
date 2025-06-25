import React from 'react';
import { motion } from 'framer-motion';
import youtubeImg from '../../assets/you-tube.png';

interface SolutionCardProps {
  title: string;
  items: string[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const SolutionCard: React.FC<SolutionCardProps> = ({ title, items }) => (
  <motion.div 
    variants={item}
    className="bg-white rounded-2xl shadow-lg p-8 flex flex-col h-full w-[90%] max-w-sm mx-auto transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl min-h-[480px]"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-100px" }}
  >
    <div className="bg-blue-50 rounded-2xl mb-7 scale-125 flex items-center justify-center mx-auto">
      <img 
        src={youtubeImg} 
        alt={title} 
        className="w-48 h-48 object-contain rounded-xl"
      />
    </div>
    <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">{title}</h3>
    <ul className="space-y-4 text-gray-600 text-base">
      {items.map((item, i) => (
        <li key={i} className="flex items-start">
          <span className="text-blue-500 font-bold mr-2">•</span>
          <span className="text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const NewGeneration: React.FC = () => {
  const solutions = [
    {
      title: 'YouTube Influencer Collaboration',
      items: [
        'Influencer Partnerships: Facilitate collaborations between coaching institutes and popular YouTube influencers who can promote courses and programs to a broader audience.',
        'Content Creation Support: Provide support for creating high-quality educational content that influencers can share on their channels.'
      ]
    },
    {
      title: 'Anchoring and Hosting Services',
      items: [
        'Professional Anchors: Offer professional anchoring services for webinars, seminars, and events to enhance the presentation and engagement.',
        'Training for In-house Anchors: Conduct training programs for the coaching institutes staff to improve their anchoring and hosting skills for online classes and events.'
      ]
    },
    {
      title: 'Scriptwriting and Content Development',
      items: [
        'Scriptwriting Services: Provide professional scriptwriting services to create compelling and effective scripts for educational videos, promotional content, and webinars.',
        'Content Development Workshops: Organize workshops and training sessions on content development, focusing on creating engaging and educational scripts for various formats.'
      ]
    },
    {
      title: 'Video Production and Editing',
      items: [
        'End-to-End Video Production: Offer end-to-end video production services, including shooting, editing, and post-production, to help coaching institutes create high-quality video content.',
        'Editing Workshops: Conduct workshops on video editing techniques, enabling institutes to produce polished and professional videos in-house.'
      ]
    },
    {
      title: 'Digital Marketing and Promotion',
      items: [
        'YouTube Channel Management: Assist coaching institutes in managing their YouTube channels, optimizing video titles, descriptions, and tags to increase visibility and engagement.',
        'SEO for Video Content: Implement SEO strategies specifically for video content to enhance searchability.'
      ]
    },
    {
      title: 'Virtual Studio Setup',
      items: [
        'Studio Design and Setup: Provide consultancy and services for setting up virtual studios equipped with the latest technology for recording high-quality video content.',
        'Green Screen Technology: Integrate green screen technology to allow for dynamic and engaging backgrounds in video recordings for creating visually appearing videos.'
      ]
    },
    {
      title: 'Interactive Live Sessions',
      items: [
        'Live Q&A Sessions: Organize live Q&A sessions with influencers or expert educators, moderated by professional anchors, to engage with students in real-time.',
        'Interactive Polls and Quizzes: Incorporate interactive elements like live polls and quizzes during webinars and online classes to increase student participation.'
      ]
    },
    {
      title: 'Personal Branding for Educators',
      items: [
        'Brand Building Workshops: Offer workshops on personal branding for educators, helping them to build a strong online presence and connect with students effectively.',
        'Social Media Strategy: Develop comprehensive social media strategies for educators to increase their reach.'
      ]
    },
    {
      title: 'Content Distribution Networks',
      items: [
        'Multi-platform Content Distribution: Help coaching institutes distribute their video content across multiple platforms, including YouTube, Vimeo, and educational portals, to maximize reach.',
        'Analytics and Reporting: Provide detailed analytics and reporting on video performance, helping institutes understand viewer engagement.'
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">New Generation Solutions</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            With the changing times and generational gap often coaching institutes finds themselves in a situation of Not connecting with the target Student Base. With our services we bridge this gap smoothly.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              title={solution.title}
              items={solution.items}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewGeneration;