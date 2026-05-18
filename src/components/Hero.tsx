
import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Code, Palette, Zap, Globe, Smartphone, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" id="hero">
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
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Content */}
          <div>
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
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
            >
              Fullstack Dev & <br />
              <span className="text-accent underline decoration-primary/10 hover:decoration-accent/50 underline-offset-8 italic">Graphic Design</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Modern websites, creative branding, digital growth — all under one roof. 
              We turn ideas into powerful digital experiences.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link 
                to="/contact" 
                className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-full text-lg font-bold flex items-center justify-center space-x-2 hover:bg-primary-dark transition-all transform hover:scale-105 shadow-xl shadow-primary/30"
              >
                <span>Start Your Project</span>
                <ArrowRight size={18} />
              </Link>
              <Link 
                to="/portfolio" 
                className="w-full sm:w-auto text-primary font-bold flex items-center justify-center space-x-2 group px-4 py-2"
              >
                <span className="border-b-2 border-transparent group-hover:border-primary transition-all">View Our Work</span>
              </Link>
            </motion.div>

            {/* Feature badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 pt-8 border-t border-gray-100"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                  <Code size={20} />
                </div>
                <div>
                  <h5 className="font-bold text-sm">Clean Code</h5>
                  <p className="text-xs text-gray-500">Scalable & secure</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center text-accent">
                  <Palette size={20} />
                </div>
                <div>
                  <h5 className="font-bold text-sm">Bold Design</h5>
                  <p className="text-xs text-gray-500">Creative identities</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/5 flex items-center justify-center text-green-600">
                  <Zap size={20} />
                </div>
                <div>
                  <h5 className="font-bold text-sm">Real Results</h5>
                  <p className="text-xs text-gray-500">Data-driven growth</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Animated Graphic */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Circle */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse"></div>
              
              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -left-10 bg-white rounded-2xl shadow-2xl p-4 w-32"
              >
                <Monitor size={32} className="text-accent mx-auto mb-2" />
                <p className="text-xs font-bold text-center">Web Dev</p>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -right-10 bg-white rounded-2xl shadow-2xl p-4 w-32"
              >
                <Smartphone size={32} className="text-primary mx-auto mb-2" />
                <p className="text-xs font-bold text-center">Mobile App</p>
              </motion.div>

              <motion.div 
                animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/2 -right-16 bg-white rounded-2xl shadow-2xl p-4 w-28"
              >
                <Globe size={32} className="text-green-500 mx-auto mb-2" />
                <p className="text-xs font-bold text-center">Digital Mkt</p>
              </motion.div>

              {/* Center Image/Graphic */}
              <div className="relative z-10 flex justify-center items-center">
                <div className="w-80 h-80 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-2xl">
                  <div className="text-center text-white">
                    <Code size={80} className="mx-auto mb-4 opacity-90" />
                    <p className="text-2xl font-bold">Astack</p>
                    <p className="text-sm opacity-80">Solutions</p>
                  </div>
                </div>
              </div>

              {/* Orbiting dots */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 translate-y-1/2"></div>
                <div className="absolute left-0 top-1/2 w-3 h-3 bg-green-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute right-0 top-1/2 w-3 h-3 bg-orange-500 rounded-full translate-x-1/2 -translate-y-1/2"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}