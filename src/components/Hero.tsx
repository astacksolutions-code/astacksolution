import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Code, Palette, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden" id="hero">
      {/* Background Shapes */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-3xl"
        />
        <div className="absolute top-1/3 right-[10%] text-primary/5 select-none font-mono text-[20rem] font-light">
          {"{}"}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6">
              Empowering Digital Growth
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-8"
          >
            Fullstack Dev & <br />
            <span className="text-accent underline decoration-primary/10 transition-all hover:decoration-accent/50 underline-offset-8 italic">Graphic Design</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl leading-relaxed"
          >
            Modern websites, creative branding, digital growth — all under one roof. We turn ideas into powerful digital experiences.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-primary text-white px-10 py-5 rounded-full text-lg font-bold flex items-center justify-center space-x-3 hover:bg-primary-dark transition-all transform hover:scale-105 shadow-xl shadow-primary/30"
            >
              <span>Start Your Project</span>
              <ArrowRight size={20} />
            </Link>
            <Link 
              to="/portfolio" 
              className="w-full sm:w-auto text-primary font-bold flex items-center justify-center space-x-3 group px-4 py-2"
            >
              <span className="border-b-2 border-transparent group-hover:border-primary transition-all">View Our Work</span>
            </Link>
          </motion.div>
        </div>

        {/* Feature badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 border-t border-gray-100 pt-12"
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
              <Code size={24} />
            </div>
            <div>
              <h5 className="font-bold text-lg mb-1">Clean Code</h5>
              <p className="text-sm text-gray-500">Scalable & secure fullstack development.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center text-accent">
              <Palette size={24} />
            </div>
            <div>
              <h5 className="font-bold text-lg mb-1">Bold Design</h5>
              <p className="text-sm text-gray-500">Creative graphics that capture identities.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/5 flex items-center justify-center text-green-600">
              <Zap size={24} />
            </div>
            <div>
              <h5 className="font-bold text-lg mb-1">Real Results</h5>
              <p className="text-sm text-gray-500">Data-driven marketing to scale your business.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
