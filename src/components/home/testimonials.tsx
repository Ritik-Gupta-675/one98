import { useState, useEffect, useCallback, useRef } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CEO, EduTech Solutions',
    content: 'The platform has transformed the way we approach education. The tools and resources provided are exceptional and have significantly improved our teaching methods.',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Principal, Global Academy',
    content: 'Our students have shown remarkable progress since we started using this platform. The interactive content keeps them engaged and motivated to learn.',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    role: 'Education Consultant',
    content: 'As an education consultant, I highly recommend this platform. It provides comprehensive solutions that cater to the diverse needs of modern education.',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, []);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        nextTestimonial();
      }, 5000);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAutoPlaying, nextTestimonial]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div 
          className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-8 md:mb-0 md:pr-8">
              <div className="relative">
                <img 
                  src={currentTestimonial.image} 
                  alt={currentTestimonial.name}
                  className="w-40 h-40 rounded-full mx-auto border-4 border-blue-100 object-cover"
                />
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-2">
                  <span className="text-2xl">"</span>
                </div>
              </div>
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <p className="text-gray-600 italic mb-6">"{currentTestimonial.content}"</p>
              <h4 className="text-xl font-semibold text-gray-800">{currentTestimonial.name}</h4>
              <p className="text-blue-600">{currentTestimonial.role}</p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-blue-600 hover:bg-blue-50 transition-colors"
            aria-label="Previous testimonial"
          >
            &larr;
          </button>
          <button 
            onClick={nextTestimonial}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-blue-600 hover:bg-blue-50 transition-colors"
            aria-label="Next testimonial"
          >
            &rarr;
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;