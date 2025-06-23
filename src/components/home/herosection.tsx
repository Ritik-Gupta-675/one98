import { Button } from "@nextui-org/button";
import { motion } from 'framer-motion';
import banner from '../../assets/banner.jpg';
import { FiBook, FiMail, FiPhone } from 'react-icons/fi';

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img 
        className="absolute inset-0 w-full h-full object-cover z-0" 
        src={banner} 
        alt="Hero Background"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      {/* Main Content */}
      <div className="relative z-20 h-full flex flex-col justify-center px-4 md:px-12 lg:px-24 max-w-4xl">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
            One98 Edusolutions: <br /> Pioneering Education Excellence
        </motion.h1>
        
        <motion.p 
          className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Founded in 2016 in the educational hub of Kota, Rajasthan, One98
          Edusolutions was established with a singular vision: to address and solve 
          the pressing challenges faced by major coaching institutes.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button 
            variant="solid"
            size="lg"
            startContent={<FiBook className="text-lg" />}
            className="bg-amber-500 text-white font-medium px-8 py-6 rounded-none hover:bg-amber-600 transition-colors"
          >
            Learn More
          </Button>
        </motion.div>
        
        {/* Contact Info */}
        <motion.div 
          className="flex flex-col space-y-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center text-white/90">
            <FiPhone className="mr-2" />
            <span>+91 9773732347</span>
          </div>
          <div className="flex items-center text-white/90">
            <FiMail className="mr-2" />
            <span>one98solutions@gmail.com</span>
          </div>
        </motion.div>
      </div>
      
      
    </div>
  );
};

export default HeroSection;