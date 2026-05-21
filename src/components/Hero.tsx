
// import { Megaphone, Users } from 'lucide-react';
// import React, { useState, useEffect } from 'react';
// import { motion } from 'motion/react';
// import { ArrowRight, Code, Palette, Zap, Globe, Smartphone, Monitor, Briefcase, Star, TrendingUp, Award, CheckCircle } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import api from '../lib/axios';

// export default function Hero() {
//   const [services, setServices] = useState([]);
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     fetchServices();
//     fetchProjects();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const res = await api.get('/services');
//       setServices(res.data?.slice(0, 3) || []);
//     } catch (error) {
//       console.error('Error fetching services:', error);
//       // Fallback services
//       setServices([
//         { title: 'Web Development', icon: 'Monitor' },
//         { title: 'Graphic Design', icon: 'Palette' },
//         { title: 'Digital Marketing', icon: 'Megaphone' }
//       ]);
//     }
//   };

//   const fetchProjects = async () => {
//     try {
//       const res = await api.get('/projects');
//       setProjects(res.data?.slice(0, 3) || []);
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//       setProjects([]);
//     }
//   };

//   const getIcon = (iconName: string) => {
//     const icons: any = { Monitor, Palette, Megaphone, Code, Globe, Smartphone };
//     const Icon = icons[iconName] || Code;
//     return <Icon size={20} />;
//   };

//   return (
//     <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" id="hero">
//       {/* Background Shapes */}
//       <div className="absolute inset-0 z-0">
//         <motion.div 
//           animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0] }}
//           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
//         />
//         <motion.div 
//           animate={{ scale: [1, 1.1, 1], x: [0, -30, 0], y: [0, 40, 0] }}
//           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-3xl"
//         />
//         <div className="absolute inset-0 bg-grid-gray-900/[0.02] bg-[size:50px_50px] pointer-events-none" />
//       </div>

//       <div className="container mx-auto px-4 md:px-6 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
//           {/* Left Side - Content */}
//           <div>
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
//                 <TrendingUp size={14} className="text-accent" />
//                 <span className="text-sm font-semibold text-accent">Empowering Digital Growth</span>
//               </div>
//             </motion.div>

//             <motion.h1 
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
//             >
//               Fullstack Dev & <br />
//               <span className="text-accent relative inline-block">
//                 Graphic Design
//                 <motion.span 
//                   className="absolute -bottom-2 left-0 w-full h-1 bg-accent/30 rounded-full"
//                   initial={{ width: 0 }}
//                   animate={{ width: "100%" }}
//                   transition={{ duration: 0.8, delay: 0.5 }}
//                 />
//               </span>
//             </motion.h1>

//             <motion.p 
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
//             >
//               Modern websites, creative branding, digital growth — all under one roof. 
//               We turn ideas into powerful digital experiences.
//             </motion.p>

//             {/* Trust Badges */}
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.25 }}
//               className="flex flex-wrap items-center gap-4 mb-8"
//             >
//               <div className="flex items-center space-x-1">
//                 {[1, 2, 3, 4, 5].map((i) => (
//                   <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
//                 ))}
//                 <span className="text-sm font-medium ml-2">4.9 Rating</span>
//               </div>
//               <div className="w-px h-4 bg-gray-300"></div>
//               <div className="flex items-center space-x-2">
//                 <Award size={18} className="text-accent" />
//                 <span className="text-sm font-medium">Trusted Since 2024</span>
//               </div>
//               <div className="w-px h-4 bg-gray-300"></div>
//               <div className="flex items-center space-x-2">
//                 <Users size={18} className="text-accent" />
//                 <span className="text-sm font-medium">50+ Happy Clients</span>
//               </div>
//             </motion.div>

//             <motion.div 
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="flex flex-col sm:flex-row items-center gap-4"
//             >
//               <Link 
//                 to="/contact" 
//                 className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-full text-lg font-bold flex items-center justify-center space-x-2 hover:shadow-xl transition-all transform hover:scale-105 group"
//               >
//                 <span>Start Your Project</span>
//                 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//               </Link>
//               <Link 
//                 to="/portfolio" 
//                 className="w-full sm:w-auto border-2 border-primary text-primary px-8 py-4 rounded-full text-lg font-bold flex items-center justify-center space-x-2 hover:bg-primary hover:text-white transition-all group"
//               >
//                 <span>View Our Work</span>
//                 <Briefcase size={18} className="group-hover:translate-x-1 transition-transform" />
//               </Link>
//             </motion.div>

//             {/* Feature badges */}
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 1, delay: 0.5 }}
//               className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-gray-100"
//             >
//               <div className="flex items-center space-x-3 group cursor-pointer">
//                 <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
//                   <Code size={20} />
//                 </div>
//                 <div>
//                   <h5 className="font-bold text-sm">Clean Code</h5>
//                   <p className="text-xs text-gray-500">Scalable & secure</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3 group cursor-pointer">
//                 <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
//                   <Palette size={20} />
//                 </div>
//                 <div>
//                   <h5 className="font-bold text-sm">Bold Design</h5>
//                   <p className="text-xs text-gray-500">Creative identities</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3 group cursor-pointer">
//                 <div className="w-10 h-10 rounded-xl bg-green-500/5 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
//                   <Zap size={20} />
//                 </div>
//                 <div>
//                   <h5 className="font-bold text-sm">Real Results</h5>
//                   <p className="text-xs text-gray-500">Data-driven growth</p>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Right Side - Animated Graphic */}
//           <motion.div 
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="relative hidden lg:block"
//           >
//             <div className="relative">
//               {/* Main Circle */}
//               <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse"></div>
              
//               {/* Floating Cards */}
//               <motion.div 
//                 animate={{ y: [0, -15, 0] }}
//                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//                 className="absolute -top-10 -left-10 bg-white rounded-2xl shadow-2xl p-4 w-32 border border-gray-100"
//               >
//                 <Monitor size={32} className="text-accent mx-auto mb-2" />
//                 <p className="text-xs font-bold text-center">Web Dev</p>
//               </motion.div>

//               <motion.div 
//                 animate={{ y: [0, 15, 0] }}
//                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
//                 className="absolute -bottom-10 -right-10 bg-white rounded-2xl shadow-2xl p-4 w-32 border border-gray-100"
//               >
//                 <Smartphone size={32} className="text-primary mx-auto mb-2" />
//                 <p className="text-xs font-bold text-center">Mobile App</p>
//               </motion.div>

//               <motion.div 
//                 animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
//                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
//                 className="absolute top-1/2 -right-16 bg-white rounded-2xl shadow-2xl p-4 w-28 border border-gray-100"
//               >
//                 <Globe size={32} className="text-green-500 mx-auto mb-2" />
//                 <p className="text-xs font-bold text-center">Digital Mkt</p>
//               </motion.div>

//               {/* Center Image/Graphic */}
//               <div className="relative z-10 flex justify-center items-center">
//                 <div className="w-72 h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-2xl">
//                   <div className="text-center text-white">
//                     <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                       <Code size={48} className="text-white" />
//                     </div>
//                     <p className="text-2xl font-bold">Astack</p>
//                     <p className="text-sm opacity-80">Solutions</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Orbiting dots */}
//               <motion.div 
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                 className="absolute inset-0"
//               >
//                 <div className="absolute top-0 left-1/2 w-3 h-3 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
//                 <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 translate-y-1/2 shadow-lg"></div>
//                 <div className="absolute left-0 top-1/2 w-3 h-3 bg-green-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
//                 <div className="absolute right-0 top-1/2 w-3 h-3 bg-orange-500 rounded-full translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Services Preview Section */}
//         {services.length > 0 && (
//           <motion.div 
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.6 }}
//             className="mt-20 pt-10 border-t border-gray-100"
//           >
//             <div className="text-center mb-8">
//               <h3 className="text-2xl font-display font-bold text-primary">What We Offer</h3>
//               <p className="text-gray-500 text-sm mt-2">Comprehensive digital solutions for your business</p>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {services.map((service: any, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.7 + idx * 0.1 }}
//                   whileHover={{ y: -5 }}
//                   className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-xl transition-all group"
//                 >
//                   <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
//                     {getIcon(service.icon)}
//                   </div>
//                   <h4 className="text-lg font-bold text-primary">{service.title}</h4>
//                   <p className="text-gray-500 text-sm mt-2 line-clamp-2">{service.description}</p>
//                   <Link to="/services" className="inline-flex items-center text-accent text-sm font-medium mt-3 hover:underline">
//                     Learn More <ArrowRight size={14} className="ml-1" />
//                   </Link>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {/* Projects Preview Section */}
//         {projects.length > 0 && (
//           <motion.div 
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.8 }}
//             className="mt-16 pt-8 border-t border-gray-100"
//           >
//             <div className="text-center mb-8">
//               <h3 className="text-2xl font-display font-bold text-primary">Recent Projects</h3>
//               <p className="text-gray-500 text-sm mt-2">Some of our amazing work</p>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {projects.map((project: any, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.9 + idx * 0.1 }}
//                   whileHover={{ y: -5 }}
//                   className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all group"
//                 >
//                   <div className="h-40 overflow-hidden">
//                     {project.imageUrl ? (
//                       <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
//                     ) : (
//                       <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
//                         <Code size={40} className="text-gray-400" />
//                       </div>
//                     )}
//                   </div>
//                   <div className="p-4">
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-xs text-accent font-semibold uppercase">{project.category}</span>
//                       {project.featured && <Star size={14} className="text-yellow-500 fill-yellow-500" />}
//                     </div>
//                     <h4 className="font-bold text-primary">{project.title}</h4>
//                     <p className="text-gray-500 text-xs mt-1 line-clamp-2">{project.description}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//             <div className="text-center mt-8">
//               <Link to="/portfolio" className="inline-flex items-center space-x-2 text-accent font-medium hover:underline">
//                 <span>View All Projects</span>
//                 <ArrowRight size={16} />
//               </Link>
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </section>
//   );
// }
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Code, Palette, Zap, Globe, Smartphone, Monitor, Briefcase, Star, TrendingUp, Award, CheckCircle, Users, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../lib/axios';

interface Service {
  _id?: string;
  title: string;
  description?: string;
  icon: string;
}

interface Project {
  _id?: string;
  title: string;
  category: string;
  imageUrl?: string;
  description: string;
  featured?: boolean;
}

export default function Hero() {
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchServices();
    fetchProjects();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await api.get('/services');
      const servicesData = Array.isArray(res.data) ? res.data : [];
      setServices(servicesData.slice(0, 3));
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([
        { title: 'Web Development', icon: 'Monitor', description: 'Professional web solutions' },
        { title: 'Graphic Design', icon: 'Palette', description: 'Creative branding' },
        { title: 'Digital Marketing', icon: 'Megaphone', description: 'Grow your business' }
      ]);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      const projectsData = Array.isArray(res.data) ? res.data : [];
      setProjects(projectsData.slice(0, 3));
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    }
  };

  const getIcon = (iconName: string) => {
    const icons: any = { Monitor, Palette, Megaphone, Code, Globe, Smartphone };
    const Icon = icons[iconName] || Code;
    return <Icon size={20} />;
  };

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
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] bg-[size:50px_50px] pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-accent/10 px-4 py-2 rounded-full mb-6">
                <TrendingUp size={14} className="text-accent" />
                <span className="text-sm font-semibold text-accent">Empowering Digital Growth</span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
            >
              Fullstack Dev & <br />
              <span className="text-accent relative inline-block">
                Graphic Design
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-accent/30 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Modern websites, creative branding, digital growth — all under one roof. 
              We turn ideas into powerful digital experiences.
            </motion.p>

            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm font-medium ml-2">4.9 Rating</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <Award size={18} className="text-accent" />
                <span className="text-sm font-medium">Trusted Since 2024</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <Users size={18} className="text-accent" />
                <span className="text-sm font-medium">50+ Happy Clients</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link 
                to="/contact" 
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-full text-lg font-bold flex items-center justify-center space-x-2 hover:shadow-xl transition-all transform hover:scale-105 group"
              >
                <span>Start Your Project</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/portfolio" 
                className="w-full sm:w-auto border-2 border-primary text-primary px-8 py-4 rounded-full text-lg font-bold flex items-center justify-center space-x-2 hover:bg-primary hover:text-white transition-all group"
              >
                <span>View Our Work</span>
                <Briefcase size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Feature badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-gray-100"
            >
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Code size={20} />
                </div>
                <div>
                  <h5 className="font-bold text-sm">Clean Code</h5>
                  <p className="text-xs text-gray-500">Scalable & secure</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                  <Palette size={20} />
                </div>
                <div>
                  <h5 className="font-bold text-sm">Bold Design</h5>
                  <p className="text-xs text-gray-500">Creative identities</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-green-500/5 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
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
                className="absolute -top-10 -left-10 bg-white rounded-2xl shadow-2xl p-4 w-32 border border-gray-100"
              >
                <Monitor size={32} className="text-accent mx-auto mb-2" />
                <p className="text-xs font-bold text-center">Web Dev</p>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -right-10 bg-white rounded-2xl shadow-2xl p-4 w-32 border border-gray-100"
              >
                <Smartphone size={32} className="text-primary mx-auto mb-2" />
                <p className="text-xs font-bold text-center">Mobile App</p>
              </motion.div>

              <motion.div 
                animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/2 -right-16 bg-white rounded-2xl shadow-2xl p-4 w-28 border border-gray-100"
              >
                <Globe size={32} className="text-green-500 mx-auto mb-2" />
                <p className="text-xs font-bold text-center">Digital Mkt</p>
              </motion.div>

              {/* Center Image/Graphic */}
              <div className="relative z-10 flex justify-center items-center">
                <div className="w-72 h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-2xl">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Code size={48} className="text-white" />
                    </div>
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
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
                <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 translate-y-1/2 shadow-lg"></div>
                <div className="absolute left-0 top-1/2 w-3 h-3 bg-green-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
                <div className="absolute right-0 top-1/2 w-3 h-3 bg-orange-500 rounded-full translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Services Preview Section */}
        {services.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20 pt-10 border-t border-gray-100"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-display font-bold text-primary">What We Offer</h3>
              <p className="text-gray-500 text-sm mt-2">Comprehensive digital solutions for your business</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service: Service, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-xl transition-all group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform">
                    {getIcon(service.icon)}
                  </div>
                  <h4 className="text-lg font-bold text-primary">{service.title}</h4>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">{service.description || 'Professional service for your business'}</p>
                  <Link to="/services" className="inline-flex items-center text-accent text-sm font-medium mt-3 hover:underline">
                    Learn More <ArrowRight size={14} className="ml-1" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Projects Preview Section */}
        {projects.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 pt-8 border-t border-gray-100"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-display font-bold text-primary">Recent Projects</h3>
              <p className="text-gray-500 text-sm mt-2">Some of our amazing work</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project: Project, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all group"
                >
                  <div className="h-40 overflow-hidden">
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <Code size={40} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-accent font-semibold uppercase">{project.category}</span>
                      {project.featured && <Star size={14} className="text-yellow-500 fill-yellow-500" />}
                    </div>
                    <h4 className="font-bold text-primary">{project.title}</h4>
                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/portfolio" className="inline-flex items-center space-x-2 text-accent font-medium hover:underline">
                <span>View All Projects</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}