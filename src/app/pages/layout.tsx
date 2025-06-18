import HeroSection from '../../components/home/herosection';
import ContactForm from '../../components/contact/contact';
import Testimonials from '../../components/home/testimonials';
import ClientSection from '../../components/home/client';
import { TopArticles } from '../../components/home/toparticle';
import NewGeneration from '../../components/home/newgeneration';
import WhatWeOffer from '../../components/home/whatweoffer';

const Home = () => {
  return (
    <>
      <HeroSection />
      <TopArticles />
      <NewGeneration />
      <WhatWeOffer />
      <ClientSection />
      <Testimonials />
      <ContactForm />
      {/* Add more sections here */}
    </>
  );
};

export default Home;