import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Instagram, Twitter, Linkedin, Facebook, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-16 px-6" id="site-footer">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Tagline */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
            <img src="./logo.png" alt="Logo" width="30" />
              <span className="text-2xl font-display font-bold">Astack<span className="text-accent">Solutions</span></span>
            </Link>
            <p className="text-gray-400 max-w-md leading-relaxed mb-6">
              Astack Solutions delivers modern fullstack development, creative graphic design, and result-driven digital marketing — all under one roof. Clean code. Bold design. Real results.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/astacksolutions" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-colors text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-colors text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-colors text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent transition-colors text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/services" className="text-gray-400 hover:text-accent transition-colors">Our Services</Link></li>
              <li><Link to="/portfolio" className="text-gray-400 hover:text-accent transition-colors">Portfolio</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-display font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail size={18} className="text-accent" />
                <span>astacksolutions@gmail.com</span>
              </li>
              <li className="text-gray-400">
                Available for worldwide projects.
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Astack Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
