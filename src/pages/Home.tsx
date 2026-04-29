import React from 'react';
import Hero from '../components/Hero.tsx';
import Services from '../components/Services.tsx';
import WhyUs from '../components/WhyUs.tsx';
import Portfolio from '../components/Portfolio.tsx';
import Contact from '../components/Contact.tsx';
import AboutSection from '../components/AboutSection.tsx';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <AboutSection />
      <Services />
      <Portfolio />
      <WhyUs />
      <Contact />
    </motion.div>
  );
}
