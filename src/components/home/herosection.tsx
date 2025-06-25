import { motion } from 'framer-motion';
import banner from '../../assets/banner.jpg';
import { FiBook, FiMail, FiPhone } from 'react-icons/fi';

const HeroSection = () => {
  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      <img className="absolute inset-0 w-full h-full object-cover z-0" src={banner} alt="Hero Background"/> 
      <div className="absolute inset-0 bg-black/5 flex flex-col-reverse justify-center items-start text-left px-2 md:px-2">
        <div className="px-3 text-black md:px-12 max-w-2xl md:text-left">
          <motion.h1 
            className="text-3xl md:text-5xl  font-bold mb-6 leading-tight text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            One98 Edusolutions: <br /> 
            <span className="text-white">Pioneering Education Excellence</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-white/90 mb-10 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Founded in 2016 in the educational hub of Kota, Rajasthan, One98 Edusolutions was established with a singular vision: to address and solve the pressing challenges faced by major coaching institutes. Since its inception, One98 Edusolutions has dedicated itself to revolutionizing the educational landscape through innovative and effective solutions tailored to the needs of our clients.
          </motion.p>
          
          <motion.button
            className="flex items-center bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <FiBook className="mr-2" />
            Learn More
          </motion.button>
          
          {/* Contact Information */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 mt-12 text-white/90 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center">
              <FiPhone className="mr-2" />
              <span>9773732347</span>
            </div>
            <div className="flex items-center">
              <FiMail className="mr-2" />
              <span>one98solutions@gmail.com</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;