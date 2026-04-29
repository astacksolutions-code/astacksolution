import React from 'react';
import { motion } from 'motion/react';
import Portfolio from '../components/Portfolio.tsx';
import Contact from '../components/Contact.tsx';

export default function PortfolioPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32"
    >
      <div className="container mx-auto px-6 mb-16">
        <div className="max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-8"
          >
            Our <span className="text-accent underline underline-offset-8">Portfolio</span>
          </motion.h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            A collection of our favorite projects. We approach every challenge with creativity and technical precision to deliver results that exceed expectations.
          </p>
        </div>
      </div>
      
      <Portfolio />

      <div className="bg-primary py-24 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-display font-bold mb-8">Ready to be our next success story?</h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg">
            Every project starts with a conversation. Let's talk about your goals and how we can achieve them together.
          </p>
          <motion.div whileHover={{ scale: 1.05 }}>
             <a href="/contact" className="bg-accent text-white px-10 py-5 rounded-full text-lg font-bold shadow-xl shadow-accent/20">
               Get Started Now
             </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
