import { Button } from "@nextui-org/button";
import { motion } from 'framer-motion';
import banner from '../../assets/banner.jpg';
import { FiBook, FiMail, FiPhone } from 'react-icons/fi';

const HeroSection = () => {
  return (
   <div className="relative w-full h-[100vh] overflow-hidden">
     <img className="absolute inset-0 w-full h-full  object-cover z-0" src={banner} alt="Hero Background "/> 
        <div className="absolute inset-0 bg-black/5 flex flex-col-reverse justify-center items-start text-left px-2 md:px-2">
          <div className="px-3 text-black md:px-12 max-w-2xl md:text-left">
            <motion.h1 
              className="text-2xl md:text-[34px] text-white font-bold mb-6 leading-tight max-w-2xl max mt-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              One98 Edusolutions: <br /> Pioneering Education Excellence
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-[15] text-blue-100 max-w-[15] mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Founded in 2016 in the educational hub of Kota, Rajasthan, One98
              Edusolutions was established with a singular vision: to 
              addressand solve the pressing challenges faced by major coaching institutes. Since its inception,
              One98 Edusolutions has dedicated itself to revolutionizing the educational landscape through innovative
              and effective solutions tailored to the needs of our clients.
            </motion.p>
            
            <motion.div
            className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button 
                variant="flat" 
                size="lg"
                className="text-white bg-amber-500 border-2 rounded border-amber-500 h-12 w-40 hover:bg-white/10 transition-colors">
                Learn More
              </Button>
            </motion.div>
            <motion.p 
              className="text-lg md:text-[15] text-blue-100 max-w-[15] mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex">
              <div className="text-white text-100 text-[16px] px-3 mt-10 w-1/5 hover:text-yellow-300 inset-0" >  9773732347  </div>
              <div className="text-white text-100 text-[16px] px-3 mt-10 pd-0 w-4/5 hover:text-yellow-300" >  one98solutions@gmail.com  </div>
              </div>
            </motion.p>
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