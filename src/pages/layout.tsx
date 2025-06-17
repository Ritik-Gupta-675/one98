import Navbar from '../components/navbar/navbar';
import HeroSection from '../components/home/herosection';
import Footer from '../components/footer/footer';
import ContactForm from '../components/contact/contact';
import Testimonials from '../components/home/testimonials';
import ClientSection from '../components/home/client';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ClientSection />
        <Testimonials />
        <ContactForm />
        {/* Add more sections here */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;