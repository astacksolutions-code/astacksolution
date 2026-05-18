
import React from 'react';
import { motion } from 'motion/react';
import { Target, Users, Lightbulb, ArrowRight, Award, Rocket, CheckCircle2, Briefcase, GraduationCap, Calendar, Code, Palette, Zap, Globe, Heart, Coffee, Headphones, Sparkles, TrendingUp, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutSection() {
  const stats = [
    { value: "50+", label: "Projects Delivered", icon: Briefcase, color: "bg-blue-500" },
    { value: "30+", label: "Happy Clients", icon: Users, color: "bg-green-500" },
    { value: "100%", label: "Client Satisfaction", icon: Star, color: "bg-accent" },
    { value: "24/7", label: "Support Available", icon: Headphones, color: "bg-purple-500" }
  ];

  const offerings = [
    {
      title: "Live Projects",
      icon: Code,
      description: "Work on real-world industry projects",
      color: "from-blue-500 to-cyan-500",
      features: ["E-commerce Platform", "AI Chatbots", "Mobile Apps"]
    },
    {
      title: "Paid Internships",
      icon: GraduationCap,
      description: "3-6 months internship with stipend",
      color: "from-purple-500 to-pink-500",
      features: ["Monthly Stipend", "Flexible Hours", "Certificate"]
    },
    {
      title: "Tech Workshops",
      icon: Calendar,
      description: "Regular tech workshops & bootcamps",
      color: "from-green-500 to-emerald-500",
      features: ["Live Sessions", "Hands-on Training", "Q&A with Experts"]
    },
    {
      title: "Industry Certification",
      icon: Award,
      description: "Industry recognized certificates",
      color: "from-orange-500 to-red-500",
      features: ["Global Recognition", "Lifetime Validity", "Share on LinkedIn"]
    }
  ];

  const values = [
    { icon: Target, title: "Mission First", desc: "Driven by impact and results" },
    { icon: Users, title: "Collaborative", desc: "Work as one team" },
    { icon: Lightbulb, title: "Innovation", desc: "Always learning, always growing" },
    { icon: Heart, title: "Passion", desc: "Love what we do" }
  ];

  return (
    <section className="py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white to-gray-50" id="about-section">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full mb-4"
          >
            <Sparkles size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">About Astack Solutions</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Beyond Code, We Build <span className="text-accent relative inline-block">
              Growth
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-accent/30 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
          </h2>
          
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            We are a team of passionate developers, designers, and innovators dedicated to 
            helping businesses succeed in the digital world.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all group">
              <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs md:text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Main Content Grid - Left Image / Right Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          
          {/* Image Side - Animated */}
          <motion.div 
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl bg-gradient-to-br from-primary/10 to-accent/10 aspect-square flex items-center justify-center">
              <div className="relative">
                <motion.div 
                  animate={{ 
                    rotate: [-12, -8, -12],
                    y: [0, -10, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-40 h-40 md:w-56 md:h-56 bg-primary rounded-[2rem] transform -rotate-12 translate-x-8 shadow-xl opacity-80"
                />
                <motion.div 
                  animate={{ 
                    rotate: [12, 8, 12],
                    y: [0, 10, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="w-40 h-40 md:w-56 md:h-56 bg-accent rounded-[2rem] transform rotate-12 -translate-x-8 -translate-y-16 md:-translate-y-20 shadow-xl"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-mono text-4xl md:text-5xl font-bold">
                  &lt;/&gt;
                </div>
              </div>
            </div>
            
            {/* Background blurs */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl z-0" />
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl z-0" />
            
            {/* Floating cards */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 border border-gray-100"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white">
                  <Rocket size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Mission</p>
                  <p className="font-bold text-primary text-sm">Driven by Impact</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl z-20 border border-gray-100"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Growth</p>
                  <p className="font-bold text-primary text-sm">50+ Projects</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <div>
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl md:text-3xl font-display font-bold text-primary mb-4">
                Who We Are?
              </h3>
              <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">
                Astack Solutions is a <span className="font-semibold text-accent">full-service digital agency</span> 
                that combines technical expertise with creative design to help businesses grow online. 
                Founded in 2024, we've quickly become a trusted partner for startups and enterprises alike.
              </p>
              <p className="text-gray-500 text-base mb-8 leading-relaxed">
                We deliver complete digital solutions from the ground up, ensuring every project is 
                unique, scalable, and impactful. Our team of experts brings together the best of 
                development, design, and marketing to create exceptional digital experiences.
              </p>
            </motion.div>

            {/* Core Values */}
            <motion.div 
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {values.map((value, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                    <value.icon size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-sm">{value.title}</h4>
                    <p className="text-xs text-gray-500">{value.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link 
                to="/about" 
                className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl group"
              >
                <span>Learn More About Us</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* What We Offer Section - Internships, Workshops, Projects */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
            <Sparkles size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">For Students & Professionals</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
  What We Offer <span className="text-accent">Now & Coming Soon</span>
</h3>
<p className="text-gray-500 max-w-2xl mx-auto">
  We provide opportunities for learning, growth, and career development. 
  <span className="block text-accent font-medium mt-1"> More programs launching in the future!</span>
</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {offerings.map((offering, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 group"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${offering.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                <offering.icon size={28} />
              </div>
              <h4 className="text-xl font-bold text-primary mb-2">{offering.title}</h4>
              <p className="text-gray-500 text-sm mb-3">{offering.description}</p>
              <ul className="space-y-1.5">
                {offering.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-xs text-gray-600">
                    <CheckCircle2 size={12} className="text-accent mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
             
            </motion.div>
          ))}
        </div>

      
      </div>
    </section>
  );
}