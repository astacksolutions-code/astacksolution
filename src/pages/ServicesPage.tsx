
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Monitor, Palette, Megaphone, Server, Layers, Code, Globe, 
  CheckCircle2, Sparkles, ArrowRight, Clock, Users, Star,
  Calendar, MessageCircle, Phone, Mail, MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Contact from '../components/Contact.tsx';
import api from '../lib/axios';

// Icon mapping
const iconMap: { [key: string]: any } = {
  Monitor: Monitor,
  Palette: Palette,
  Megaphone: Megaphone,
  Server: Server,
  Layers: Layers,
  Code: Code,
  Globe: Globe
};

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      const data = Array.isArray(response.data) ? response.data : [];
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      // Fallback services
      setServices([
        { _id: '1', title: 'Web Development', description: 'Modern, scalable web applications built with latest technologies.', icon: 'Globe', features: ['React/Next.js', 'Node.js', 'MongoDB', 'Responsive Design'], order: 1 },
        { _id: '2', title: 'Graphic Design', description: 'Creative branding and visual identities that make your business stand out.', icon: 'Palette', features: ['Logo Design', 'Brand Identity', 'UI/UX Design', 'Social Media Graphics'], order: 2 },
        { _id: '3', title: 'Digital Marketing', description: 'Data-driven strategies to grow your online presence and increase conversions.', icon: 'Megaphone', features: ['SEO Optimization', 'PPC Campaigns', 'Content Strategy', 'Email Marketing'], order: 3 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const Icon = iconMap[iconName] || Code;
    return <Icon size={48} />;
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus('loading');
    try {
      await api.post('/bookings', {
        ...bookingForm,
        service: selectedService,
        createdAt: new Date().toISOString()
      });
      setBookingStatus('success');
      setTimeout(() => {
        setShowBookingModal(false);
        setBookingStatus('idle');
        setBookingForm({ name: '', email: '', phone: '', date: '', time: '', message: '' });
      }, 2000);
    } catch (error) {
      setBookingStatus('error');
      setTimeout(() => setBookingStatus('idle'), 3000);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-32"
      >
        {/* Hero Section */}
        <div className="container mx-auto px-6 mb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full mb-6"
            >
              <Sparkles size={16} className="text-accent" />
              <span className="text-sm font-medium text-accent">Our Expertise</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold mb-6"
            >
              Our <span className="text-accent underline underline-offset-8">Services</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-500 leading-relaxed"
            >
              We provide a wide range of digital services to help businesses grow and succeed in the modern world. 
              Our team of experts is dedicated to delivering high-quality results.
            </motion.p>
          </div>
        </div>

        {/* Services Grid - Modern Card Design */}
        <div className="container mx-auto px-6 mb-24">
          {services.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No services found. Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-primary rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-500 blur-xl"></div>
                  
                  <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-500 group-hover:shadow-2xl">
                    {/* Top Gradient Bar */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-accent to-primary"></div>
                    
                    <div className="p-8">
                      {/* Icon */}
                      <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                        {getIconComponent(service.icon)}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-display font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                        {service.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-500 leading-relaxed mb-6">
                        {service.description}
                      </p>
                      
                      {/* Features */}
                      <ul className="space-y-2 mb-8">
                        {service.features?.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle2 size={16} className="text-accent mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      {/* Booking Button */}
                      <button
                        onClick={() => {
                          setSelectedService(service.title);
                          setShowBookingModal(true);
                        }}
                        className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all group/btn"
                      >
                        <Calendar size={18} />
                        <span>Book Appointment</span>
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-white/70 text-sm">Projects Completed</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-white/70 text-sm">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-white/70 text-sm">Support Available</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">5+</div>
                <div className="text-white/70 text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </div>

       

        <Contact />
      </motion.div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
              <div>
                <h2 className="text-2xl font-bold text-primary">Book Appointment</h2>
                <p className="text-sm text-gray-500 mt-1">For: {selectedService}</p>
              </div>
              <button onClick={() => setShowBookingModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {bookingStatus === 'success' ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Booking Confirmed!</h3>
                <p className="text-gray-500">We'll contact you shortly to confirm your appointment.</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      placeholder="+92 328 2308116"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Preferred Time *</label>
                    <select
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                    >
                      <option value="">Select Time</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Message (Optional)</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
                    value={bookingForm.message}
                    onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                    placeholder="Tell us about your project requirements..."
                  />
                </div>
                
                {bookingStatus === 'error' && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                    Something went wrong. Please try again.
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={bookingStatus === 'loading'}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-70"
                >
                  {bookingStatus === 'loading' ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}