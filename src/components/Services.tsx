import React from 'react';
import { motion } from 'motion/react';
import { Monitor, Smartphone, PenTool, BarChart3, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const services = [
  {
    title: "Web Development",
    icon: <Globe className="w-10 h-10" />,
    description: "High-performance websites and web applications built with modern frameworks like React, Next.js, and Node.js.",
    features: ["Custom React Apps", "E-commerce Solutions", "API Integration", "Performance Optimization"],
    color: "bg-blue-500"
  },
  {
    title: "Graphic Design",
    icon: <PenTool className="w-10 h-10" />,
    description: "Creative branding and visual identities that make your business stand out from the competition.",
    features: ["Logo Design", "Brand Identity", "UI/UX Design", "Social Media Graphics"],
    color: "bg-purple-500"
  },
  {
    title: "Digital Marketing",
    icon: <BarChart3 className="w-10 h-10" />,
    description: "Result-driven strategies to grow your online presence, reach customers, and increase conversions.",
    features: ["SEO Optimization", "PPC Campaigns", "Content Strategy", "Email Marketing"],
    color: "bg-green-500"
  }
];

export default function Services() {
  return (
    <section className="py-24 bg-soft" id="services">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Digital Excellence, Delivered.
          </motion.h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We provide comprehensive digital solutions to help your business thrive in the modern online landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 transition-all hover:shadow-xl group"
            >
              <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center text-white mb-8 transition-transform group-hover:scale-110", service.color)}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{service.title}</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-3 mb-10">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center text-sm font-medium text-primary/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="text-primary font-bold inline-flex items-center group/btn">
                <span>Talk to an expert</span>
                <motion.div 
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Monitor size={16} />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
