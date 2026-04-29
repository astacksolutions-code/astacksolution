import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
      )}
      id="main-nav"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:bg-accent transition-colors">
            <img src="./logo.png" alt="Logo" width="200" />
            {/* <Rocket className="text-white w-6 h-6" /> */}
          </div>
          <span className="text-2xl font-display font-bold text-primary">Astack<span className="text-accent">Solutions</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                location.pathname === link.path ? "text-accent" : "text-primary"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/contact" 
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 shadow-md shadow-primary/20"
          >
            Start Your Project
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-primary"
          onClick={() => setIsOpen(!isOpen)}
          id="mobile-menu-toggle"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium py-2 transition-colors",
                    location.pathname === link.path ? "text-accent" : "text-primary hover:text-accent"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/contact" 
                onClick={() => setIsOpen(false)}
                className="bg-primary text-white text-center py-3 rounded-xl font-medium"
              >
                Start Your Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
