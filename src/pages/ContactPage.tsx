import React from 'react';
import { motion } from 'motion/react';
import Contact from '../components/Contact.tsx';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32"
    >
      <div className="container mx-auto px-6 mb-24">
        <div className="max-w-3xl mb-16 px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-8"
          >
            Get in <span className="text-accent underline underline-offset-8">Touch.</span>
          </motion.h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Ready to start your next project or have questions about our services? Our team is here to help you achieve your digital goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-24 cursor-default">
           {[
             { icon: <Mail />, title: "Email", info: "astacksolutions@gmail.com", sub: "Support within 24h" },
             { icon: <Phone />, title: "Phone", info: "+1 (234) 567-890", sub: "Mon - Fri, 9am - 6pm" },
             { icon: <MapPin />, title: "Office", info: "Innovation St, 101", sub: "Digital Hub, NY" },
             { icon: <Clock />, title: "Hours", info: "Mon - Sat", sub: "Global Availability" }
           ].map((item, i) => (
             <motion.div 
               key={i}
               whileHover={{ y: -5 }}
               className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all"
             >
               <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6">
                 {React.cloneElement(item.icon as React.ReactElement<any>, { size: 24 })}
               </div>
               <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{item.title}</h4>
               <p className="text-lg font-bold text-primary mb-1">{item.info}</p>
               <p className="text-xs text-gray-500 font-medium">{item.sub}</p>
             </motion.div>
           ))}
        </div>
      </div>
      
      <Contact />

      {/* Map Placeholder */}
      <div className="h-96 w-full bg-gray-100 grayscale hover:grayscale-0 transition-all duration-700 relative group overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
          <div className="text-center z-10 p-10 bg-white rounded-3xl shadow-xl border border-gray-100 group-hover:scale-105 transition-transform">
             <MapPin size={48} className="text-accent mx-auto mb-4" />
             <h3 className="text-2xl font-display font-bold mb-2">Our Headquarters</h3>
             <p className="text-gray-500">Find us at the heart of Digital Innovation District.</p>
          </div>
        </div>
        {/* Subtle grid pattern for map feel */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #3B82F6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>
    </motion.div>
  );
}
