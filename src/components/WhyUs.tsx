import React from 'react';
import { motion } from 'motion/react';
import { Timer, Cpu, Palette, ShieldCheck, HeartHandshake, Zap } from 'lucide-react';

const features = [
  {
    title: "Fast Delivery",
    icon: <Timer />,
    desc: "We value your time. Our agile process ensures rapid development without sacrificing quality."
  },
  {
    title: "Modern Tech",
    icon: <Cpu />,
    desc: "We use the latest tools and frameworks (React, Next.js, Node.js) for high-performance builds."
  },
  {
    title: "Creative Design",
    icon: <Palette />,
    desc: "Our designs are not just pretty—they are strategically crafted to resonate with your audience."
  },
  {
    title: "Quality Assurance",
    icon: <ShieldCheck />,
    desc: "Rigorous testing and maintenance guarantee a bug-free and smooth user experience."
  },
  {
    title: "24/7 Support",
    icon: <HeartHandshake />,
    desc: "We are always here for you. Our round-the-clock support keeps your business running."
  },
  {
    title: "Client First",
    icon: <Zap />,
    desc: "Your goals are our priority. We listen, adapt, and build solutions tailored to your specific needs."
  }
];

export default function WhyUs() {
  return (
    <section className="py-24" id="why-us">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -30 }}
              className="text-4xl md:text-5xl font-display font-bold mb-6"
            >
              Why Businesses Choose <span className="text-accent">Astack Solutions</span>
            </motion.h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              We combine technical expertise with creative vision to deliver digital products that actually drive growth. Our commitment to quality is what sets us apart.
            </p>
          </div>
          <div className="bg-primary px-8 py-4 rounded-2xl text-white">
            <span className="text-4xl font-bold">100+</span>
            <span className="ml-3 text-sm font-medium opacity-70">Projects Successful</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start group"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/5 flex items-center justify-center text-accent mr-5 flex-shrink-0 group-hover:bg-accent group-hover:text-white transition-all">
                {React.cloneElement(feature.icon as React.ReactElement<any>, { size: 28 })}
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{feature.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
