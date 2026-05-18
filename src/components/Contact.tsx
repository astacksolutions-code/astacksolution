// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'motion/react';
// import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';
// import api from '../lib/axios';

// const services = [
//   "Web Development",
//   "Graphic Design",
//   "Digital Marketing",
//   "UI/UX Design",
//   "SEO & Growth"
// ];

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     service: services[0],
//     message: ''
//   });

//   const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setStatus('loading');

//     try {
//       await api.post('/contact', formData);
//       setStatus('success');
//       setFormData({
//         name: '',
//         email: '',
//         phone: '',
//         service: services[0],
//         message: ''
//       });
//     } catch (err: any) {
//       setStatus('error');
//       setErrorMessage(err.response?.data?.message || 'Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <section className="py-24 bg-soft" id="contact">
//       <div className="container mx-auto px-6">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
//           {/* Info Side */}
//           <div className="max-w-xl">
//             <motion.h2 
//               whileInView={{ opacity: 1, x: 0 }}
//               initial={{ opacity: 0, x: -30 }}
//               className="text-4xl md:text-6xl font-display font-bold mb-8"
//             >
//               Let's Build Something <span className="text-accent italic">Extraordinary.</span>
//             </motion.h2>
//             <p className="text-gray-500 text-lg mb-12 leading-relaxed">
//               Have a project in mind? Looking to scale your digital presence? Reach out to us and let's discuss how we can help.
//             </p>

//             <div className="space-y-8">
//               <div className="flex items-center space-x-6">
//                 <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-accent shadow-sm border border-gray-100">
//                   <Phone size={24} />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Call Us</p>
//                   <p className="font-bold text-lg text-primary">+923282308116</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-6">
//                 <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-accent shadow-sm border border-gray-100">
//                   <Mail size={24} />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Email Us</p>
//                   <p className="font-bold text-lg text-primary">astacksolutions@gmail.com</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-6">
//                 <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-accent shadow-sm border border-gray-100">
//                   <MapPin size={24} />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Visit Us</p>
//                   <p className="font-bold text-lg text-primary">Karachi, Pakistan</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Form Side */}
//           <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-primary/5 border border-gray-100 relative overflow-hidden">
//             <AnimatePresence mode="wait">
//               {status === 'success' ? (
//                 <motion.div 
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   className="text-center py-12"
//                 >
//                   <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <CheckCircle size={40} />
//                   </div>
//                   <h3 className="text-3xl font-display font-bold mb-4">Message Sent!</h3>
//                   <p className="text-gray-500 mb-8">Thank you for reaching out. Our team will contact you within 24 hours.</p>
//                   <button 
//                     onClick={() => setStatus('idle')}
//                     className="text-accent font-bold underline"
//                   >
//                     Send another message
//                   </button>
//                 </motion.div>
//               ) : (
//                 <motion.form 
//                   key="form"
//                   initial={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   onSubmit={handleSubmit} 
//                   className="space-y-6"
//                 >
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <label className="text-sm font-bold text-primary ml-1">Your Name</label>
//                       <input 
//                         required
//                         type="text" 
//                         placeholder="John Doe"
//                         className="w-full px-5 py-4 bg-soft border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
//                         value={formData.name}
//                         onChange={(e) => setFormData({...formData, name: e.target.value})}
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <label className="text-sm font-bold text-primary ml-1">Email Address</label>
//                       <input 
//                         required
//                         type="email" 
//                         placeholder="john@example.com"
//                         className="w-full px-5 py-4 bg-soft border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
//                         value={formData.email}
//                         onChange={(e) => setFormData({...formData, email: e.target.value})}
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <label className="text-sm font-bold text-primary ml-1">Phone Number</label>
//                       <input 
//                         required
//                         type="tel" 
//                         placeholder="+1 (234) 567-890"
//                         className="w-full px-5 py-4 bg-soft border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
//                         value={formData.phone}
//                         onChange={(e) => setFormData({...formData, phone: e.target.value})}
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <label className="text-sm font-bold text-primary ml-1">Service Interest</label>
//                       <select 
//                         className="w-full px-5 py-4 bg-soft border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all appearance-none"
//                         value={formData.service}
//                         onChange={(e) => setFormData({...formData, service: e.target.value})}
//                       >
//                         {services.map(s => <option key={s} value={s}>{s}</option>)}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-bold text-primary ml-1">How can we help?</label>
//                     <textarea 
//                       required
//                       placeholder="Tell us about your project..."
//                       rows={5}
//                       className="w-full px-5 py-4 bg-soft border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all resize-none"
//                       value={formData.message}
//                       onChange={(e) => setFormData({...formData, message: e.target.value})}
//                     />
//                   </div>

//                   {status === 'error' && (
//                     <div className="flex items-center space-x-2 text-red-500 bg-red-50 p-4 rounded-xl">
//                       <AlertCircle size={20} />
//                       <p className="text-sm font-medium">{errorMessage}</p>
//                     </div>
//                   )}

//                   <button 
//                     disabled={status === 'loading'}
//                     type="submit"
//                     className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 disabled:opacity-70"
//                   >
//                     {status === 'loading' ? (
//                       <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                     ) : (
//                       <>
//                         <span>Send Message</span>
//                         <Send size={20} />
//                       </>
//                     )}
//                   </button>
//                 </motion.form>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';
import api from '../lib/axios';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [services, setServices] = useState<string[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services');
        const servicesData = response.data || [];
        const serviceTitles = servicesData.map((s: any) => s.title);
        setServices(serviceTitles);
        if (serviceTitles.length > 0) {
          setFormData(prev => ({ ...prev, service: serviceTitles[0] }));
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        // Fallback services if API fails
        const fallbackServices = [
          "Web Development",
          "Graphic Design",
          "Digital Marketing",
          "UI/UX Design",
          "SEO & Growth"
        ];
        setServices(fallbackServices);
        setFormData(prev => ({ ...prev, service: fallbackServices[0] }));
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await api.post('/contact', formData);
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: services[0] || '',
        message: ''
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section className="py-24 bg-soft" id="contact">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div className="max-w-xl">
            <motion.h2
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -30 }}
              className="text-4xl md:text-6xl font-display font-bold mb-8"
            >
              Let's Build Something <span className="text-accent italic">Extraordinary.</span>
            </motion.h2>
            <p className="text-gray-500 text-lg mb-12 leading-relaxed">
              Have a project in mind? Looking to scale your digital presence? Reach out to us and let's discuss how we can help.
            </p>

            <div className="space-y-8">
              <div className="flex items-center space-x-6">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-accent shadow-sm border border-gray-100">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Call / WhatsApp</p>
                  <a href="tel:+923282308116" className="font-bold text-lg text-primary hover:text-accent transition-colors">
                    +92 328 2308116
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-accent shadow-sm border border-gray-100">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email Us</p>
                  <a href="mailto:astacksolutions@gmail.com" className="font-bold text-lg text-primary hover:text-accent transition-colors">
                    astacksolutions@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-accent shadow-sm border border-gray-100">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Visit Us</p>
                  <p className="font-bold text-lg text-primary">Karachi, Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-primary/5 border border-gray-100 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4">Message Sent!</h3>
                  <p className="text-gray-500 mb-8">Thank you for reaching out. Our team will contact you within 24 hours.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-accent font-bold underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary ml-1">Your Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-5 py-4 bg-soft border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary ml-1">Email Address *</label>
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-5 py-4 bg-soft border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary ml-1">Phone Number *</label>
                      <input
                        required
                        type="tel"
                        placeholder="+92 328 2308116"
                        className="w-full px-5 py-4 bg-soft border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary ml-1">Service Interest *</label>
                      {loadingServices ? (
                        <div className="w-full px-5 py-4 bg-soft border border-gray-100 rounded-2xl">
                          <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        <select
                          required
                          className="w-full px-5 py-4 bg-soft border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all cursor-pointer"
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        >
                          {services.map((s, idx) => (
                            <option key={idx} value={s}>{s}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary ml-1">How can we help? *</label>
                    <textarea
                      required
                      placeholder="Tell us about your project..."
                      rows={5}
                      className="w-full px-5 py-4 bg-soft border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center space-x-2 text-red-500 bg-red-50 p-4 rounded-xl">
                      <AlertCircle size={20} />
                      <p className="text-sm font-medium">{errorMessage}</p>
                    </div>
                  )}

                  <button
                    disabled={status === 'loading'}
                    type="submit"
                    className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 disabled:opacity-70"
                  >
                    {status === 'loading' ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={20} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}