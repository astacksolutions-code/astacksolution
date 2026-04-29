import React from 'react';
import { motion } from 'motion/react';
import { Target, Users, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutSection() {
  return (
    <section className="py-24 overflow-hidden" id="about-section">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div 
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl bg-primary/10 aspect-square flex items-center justify-center">
              <div className="relative">
                <div className="w-48 h-48 bg-primary rounded-[2rem] transform -rotate-12 translate-x-10 shadow-xl opacity-80" />
                <div className="w-48 h-48 bg-accent rounded-[2rem] transform rotate-12 -translate-x-10 -translate-y-20 shadow-xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-mono text-4xl font-bold">
                  []
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl z-0" />
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl z-0" />
            
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl z-20 border border-gray-100 hidden md:block"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <Target size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Mission First</p>
                  <p className="font-display font-bold text-primary">Driven by Impact</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <div>
            <motion.h2 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              className="text-4xl md:text-5xl font-display font-bold mb-8"
            >
              Beyond Code, We Build <span className="text-accent underline underline-offset-8">Growth.</span>
            </motion.h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Astack Solutions combines technical expertise with creative design to help businesses grow online. We deliver complete digital solutions from the ground up, ensuring every project is unique, scalable, and impactful.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 mt-1">
                  <Users size={14} fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-bold text-primary">Collaborative Partnership</h4>
                  <p className="text-sm text-gray-500">We work closely with you to understand your vision and goals.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 mt-1">
                  <Lightbulb size={14} fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-bold text-primary">Innovation-Driven</h4>
                  <p className="text-sm text-gray-500">We constantly explore new technologies to keep you ahead.</p>
                </div>
              </div>
            </div>

            <Link 
              to="/about" 
              className="inline-flex items-center space-x-2 text-primary font-bold hover:text-accent transition-colors group"
            >
              <span>Learn More About Our Story</span>
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                <Users size={18} />
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
