import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Monitor, Palette, Megaphone, Server, Layers } from 'lucide-react';
import Contact from '../components/Contact.tsx';

const detailedServices = [
  {
    title: "Fullstack Development",
    icon: <Monitor size={48} />,
    desc: "End-to-end web solutions built for scale and performance.",
    items: [
      "Custom Web Applications",
      "E-commerce Platforms (Shopify, WooCommerce, Custom)",
      "Progressive Web Apps (PWA)",
      "Content Management Systems (CMS)",
      "API Development & Documentation",
      "Database Design & Optimization"
    ]
  },
  {
    title: "Graphic Design & Branding",
    icon: <Palette size={48} />,
    desc: "Visual storytelling that captures your brand's essence.",
    items: [
      "Logo & Brand Identity Design",
      "UI/UX Design for Web & Mobile",
      "Print & Marketing Collateral",
      "Motion Graphics & Animation",
      "Illustrations & Icons",
      "Design Systems"
    ]
  },
  {
    title: "Digital Marketing",
    icon: <Megaphone size={48} />,
    desc: "Comprehensive growth strategies for the digital age.",
    items: [
      "Search Engine Optimization (SEO)",
      "Social Media Management",
      "Pay-Per-Click (PPC) Advertising",
      "Content Marketing & Strategy",
      "Email Marketing Automations",
      "Analytics & Conversion Tracking"
    ]
  }
];

export default function ServicesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32"
    >
      <div className="container mx-auto px-6 mb-24">
        <div className="max-w-3xl mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-8"
          >
            Our <span className="text-accent underline underline-offset-8">Services</span>
          </motion.h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            We provide a wide range of digital services to help businesses grow and succeed in the modern world. Our team of experts is dedicated to delivering high-quality results.
          </p>
        </div>

        <div className="space-y-32">
          {detailedServices.map((service, index) => (
            <motion.div 
              key={index}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="w-20 h-20 bg-accent/10 text-accent rounded-3xl flex items-center justify-center mb-8">
                  {service.icon}
                </div>
                <h2 className="text-4xl font-display font-bold mb-6">{service.title}</h2>
                <p className="text-lg text-gray-500 mb-8">{service.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.items.map((item, iIndex) => (
                    <div key={iIndex} className="flex items-center space-x-3 text-primary/80">
                      <CheckCircle2 size={18} className="text-accent flex-shrink-0" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`bg-soft rounded-[3rem] aspect-square overflow-hidden border border-gray-100 shadow-sm relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                   <Layers size={300} />
                </div>
                {/* Visual placeholder for service */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="relative">
                    <div className="w-48 h-48 bg-primary rounded-[2rem] transform -rotate-12 translate-x-10 shadow-xl opacity-80" />
                    <div className="w-48 h-48 bg-accent rounded-[2rem] transform rotate-12 -translate-x-10 -translate-y-20 shadow-xl" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Contact />
    </motion.div>
  );
}
