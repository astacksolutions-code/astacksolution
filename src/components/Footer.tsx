import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Rocket, Instagram, Twitter, Linkedin, Facebook, Mail, MapPin, Phone, Clock, Send, ArrowRight, Globe, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: "Our Services", path: "/services", icon: "" },
    { name: "Portfolio", path: "/portfolio", icon: "" },
    { name: "About Us", path: "/about", icon: "" },
    { name: "Contact", path: "/contact", icon: "" },
  ];

  const services = [
    "Web Development",
    "Graphic Design",
    "Digital Marketing",
    "UI/UX Design",
    "SEO Optimization"
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/astacksolutions", label: "Instagram", color: "hover:bg-pink-600" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-blue-700" },
  ];

  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary-dark/95 pointer-events-none" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            
            {/* Column 1 - Brand & Social */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <Link to="/" className="flex items-center space-x-3 group">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
   <img src="./logo.png" alt="Logo" width="30" />                  </div>
                  <div>
                    <span className="text-2xl font-display font-bold">Astack</span>
                    <span className="text-accent text-2xl font-display font-bold">Solutions</span>
                    <p className="text-[10px] text-gray-400 tracking-wider">Innovation Meets Execution</p>
                  </div>
                </Link>
              </motion.div>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                We deliver modern fullstack development, creative graphic design, 
                and result-driven digital marketing — all under one roof.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-3 mb-8">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -3 }}
                    className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:text-white hover:shadow-lg group`}
                  >
                    <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                  </motion.a>
                ))}
              </div>
              
              {/* Newsletter Signup */}
           
            </div>

            {/* Column 2 - Quick Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className=" font-display text-white font-bold mb-6 relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-accent rounded-full"></span>
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, idx) => (
                  <motion.li 
                    key={idx}
                    whileHover={{ x: 5 }}
                  >
                    <Link 
                      to={link.path} 
                      className="text-gray-300 hover:text-accent transition-all duration-300 flex items-center space-x-2 group"
                    >
                      <span className="text-sm">{link.icon}</span>
                      <span>{link.name}</span>
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3 - Our Services */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-white font-display font-bold mb-6 relative inline-block">
                Our Services
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-accent rounded-full"></span>
              </h4>
              <ul className="space-y-3">
                {services.map((service, idx) => (
                  <motion.li 
                    key={idx}
                    whileHover={{ x: 5 }}
                  >
                    <Link 
                      to="/services" 
                      className="text-gray-300 hover:text-accent transition-all duration-300 flex items-center space-x-2"
                    >
                      <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                      <span>{service}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Column 4 - Contact Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="text-white font-display font-bold mb-6 relative inline-block">
                Get in Touch
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-accent rounded-full"></span>
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-gray-300 hover:text-accent transition-colors group">
                  <Mail size={18} className="text-accent mt-0.5 group-hover:scale-110 transition-transform" />
                  <a href="mailto:astacksolutions@gmail.com" className="text-sm hover:text-accent">
                    astacksolutions@gmail.com
                  </a>
                </li>
                <li className="flex items-start space-x-3 text-gray-300">
                  <Phone size={18} className="text-accent mt-0.5" />
                  <span className="text-sm">+923282308116</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-300">
                  <MapPin size={18} className="text-accent mt-0.5" />
                  <span className="text-sm">Karachi,Pakistan</span>
                </li>
                <li className="flex items-start space-x-3 text-gray-300">
                  <Clock size={18} className="text-accent mt-0.5" />
                  <span className="text-sm">Mon - fri: 9:00 AM - 5:00 PM</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Astack Solutions. All rights reserved.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/privacy" className="text-gray-400 hover:text-accent text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-accent text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-accent text-sm transition-colors">
                Sitemap
              </Link>
            </div>
            
            <div className="flex items-center space-x-1 text-gray-500 text-xs">
              <span>Made with</span>
              <Heart size={12} className="text-accent animate-pulse" />
              <span>by Astack Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}