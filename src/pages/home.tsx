import Navbar from '../components/navbar/navbar';
import HeroSection from '../components/hero/herosection';
import Footer from '../components/footer/footer';
import ContactForm from '../components/contact/contact';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ContactForm />
        {/* Add more sections here */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;