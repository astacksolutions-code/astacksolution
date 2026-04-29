import React from 'react';
import { motion } from 'motion/react';
import { Users, Target, Shield, Zap, Heart, Sparkles } from 'lucide-react';
import Contact from '../components/Contact.tsx';

const values = [
  { icon: <Target className="text-blue-500" />, title: "Precision", desc: "We focus on the details that matter most for your business success." },
  { icon: <Zap className="text-yellow-500" />, title: "Innovation", desc: "We use cutting-edge technology to solve complex problems." },
  { icon: <Shield className="text-green-500" />, title: "Integrity", desc: "Honesty and transparency are at the core of every client relationship." },
  { icon: <Heart className="text-red-500" />, title: "Passion", desc: "We love what we do, and it shows in the quality of our work." },
  { icon: <Users className="text-purple-500" />, title: "Collaboration", desc: "We treat your business as our own through dedicated partnership." },
  { icon: <Sparkles className="text-orange-500" />, title: "Excellence", desc: "We strive for nothing less than perfection in every deliverable." }
];

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32"
    >
      <div className="container mx-auto px-6">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-7xl font-display font-bold mb-8"
            >
              Building the <span className="text-accent underline">Future</span> together.
            </motion.h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-8">
              Astack Solutions was founded on a simple principle: high-quality digital craftsmanship should be accessible to businesses that are ready to scale.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Based on the intersection of technical expertise and creative design, we help our clients navigate the complex digital landscape. Whether it's building a complex web application from scratch or crafting a brand identity that captures hearts, we are here to deliver excellence.
            </p>
          </div>
          <div className="relative">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl relative z-10 aspect-[4/5] bg-soft flex items-center justify-center border border-gray-100 italic font-display text-primary/10 text-9xl select-none">
               Astack
            </div>
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <div className="grid grid-cols-2 gap-4">
                 <div className="w-24 h-24 bg-primary rounded-2xl shadow-lg" />
                 <div className="w-24 h-24 bg-accent rounded-full shadow-lg" />
                 <div className="w-24 h-24 bg-accent-light rounded-2xl shadow-lg" />
                 <div className="w-24 h-24 bg-primary-dark rounded-[20%] shadow-lg" />
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-accent rounded-[3rem] transform rotate-12 z-0" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary rounded-[3rem] transform -rotate-12 z-0" />
          </div>
        </div>

        {/* Mission / Values */}
        <div className="py-24 bg-soft rounded-[4rem] px-8 md:px-16 mb-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Our DNA</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">The values that drive our agency and define how we work with our partners every single day.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {values.map((v, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-gray-50 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-soft rounded-2xl flex items-center justify-center mb-6 scale-125 origin-left">
                   {React.cloneElement(v.icon as React.ReactElement<any>, { size: 32 })}
                </div>
                <h4 className="text-2xl font-display font-bold mb-3">{v.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Contact />
    </motion.div>
  );
}
