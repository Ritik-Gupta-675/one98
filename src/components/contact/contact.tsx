import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean, message: string} | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9\+\-\s]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Replace with your actual form submission logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // On success
      setSubmitStatus({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-5">
        <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Contact Info */}
          <div className="w-full lg:w-2/5 bg-gradient-to-br from-blue-900 to-blue-700 text-white p-12">
            <h2 className="text-4xl font-bold mb-6 relative pb-4">
              Get in Touch
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-red-400 rounded"></span>
            </h2>
            <p className="text-gray-200 mb-8 leading-relaxed">
              Have questions or want to know more about our services? Reach out to us!
            </p>
            
            <div className="space-y-6 mt-10">
              <div className="flex items-start">
                <div>
                  <h4 className="text-red-400 font-semibold mb-1">Email Us</h4>
                  <a href="mailto:info@one98edusolutions.com" className="text-gray-200 hover:text-red-400 transition-colors">
                    info@one98edusolutions.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div>
                  <h4 className="text-red-400 font-semibold mb-1">Call Us</h4>
                  <a href="tel:+911234567890" className="text-gray-200 hover:text-red-400 transition-colors">
                    +91 12345 67890
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div>
                  <h4 className="text-red-400 font-semibold mb-1">Visit Us</h4>
                  <p className="text-gray-200">
                    123 Education Street, Tech Park,<br />Bangalore, Karnataka 560001
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="w-full lg:w-3/5 p-12">
            <h2 className="text-4xl font-bold mb-8 text-gray-800 relative pb-4">
              Send Us a Message
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-blue-800 rounded"></span>
            </h2>
            
            {submitStatus && (
              <div className={`p-4 mb-6 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
                {errors.name && <span className="block mt-1 text-sm text-red-600">{errors.name}</span>}
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
                {errors.email && <span className="block mt-1 text-sm text-red-600">{errors.email}</span>}
              </div>
              
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
                {errors.phone && <span className="block mt-1 text-sm text-red-600">{errors.phone}</span>}
              </div>
              
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                ></textarea>
                {errors.message && <span className="block mt-1 text-sm text-red-600">{errors.message}</span>}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-800 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg uppercase tracking-wider disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;