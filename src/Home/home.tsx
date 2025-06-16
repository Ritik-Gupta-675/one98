import Navbar from '../components/home/navbar/navbar';
import HeroSection from '../components/home/hero/herosection';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        {/* Add more sections here */}
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} One98 EduSolutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;