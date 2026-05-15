
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Monitor, Palette, Megaphone, Server, Layers, Code, Globe, CheckCircle2 } from 'lucide-react';
import Contact from '../components/Contact.tsx';
import api from '../lib/axios';

// Icon mapping
const iconMap: { [key: string]: any } = {
  Monitor: Monitor,
  Palette: Palette,
  Megaphone: Megaphone,
  Server: Server,
  Layers: Layers,
  Code: Code,
  Globe: Globe
};

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      const data = Array.isArray(response.data) ? response.data : [];
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const Icon = iconMap[iconName] || Code;
    return <Icon size={48} />;
  };

  if (loading) {
    return (
      <div className="pt-32 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading services...</p>
        </div>
      </div>
    );
  }

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
            We provide a wide range of digital services to help businesses grow and succeed in the modern world. 
            Our team of experts is dedicated to delivering high-quality results.
          </p>
        </div>

        {services.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No services found. Please check back later.</p>
          </div>
        ) : (
          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div 
                key={service._id}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="w-20 h-20 bg-accent/10 text-accent rounded-3xl flex items-center justify-center mb-8">
                    {getIconComponent(service.icon)}
                  </div>
                  <h2 className="text-4xl font-display font-bold mb-6">{service.title}</h2>
                  <p className="text-lg text-gray-500 mb-8">{service.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features?.map((feature, iIndex) => (
                      <div key={iIndex} className="flex items-center space-x-3 text-primary/80">
                        <CheckCircle2 size={18} className="text-accent flex-shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`bg-soft rounded-[3rem] aspect-square overflow-hidden border border-gray-100 shadow-sm relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <Layers size={300} />
                  </div>
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
        )}
      </div>
      <Contact />
    </motion.div>
  );
}