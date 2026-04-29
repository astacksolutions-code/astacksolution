import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Search } from 'lucide-react';
import api from '../lib/axios';

const categories = ['All', 'Web Dev', 'Graphic Design', 'Digital Marketing'];

interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  technologies: string[];
}

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
        // Fallback dummy data if backend is not ready
        setProjects([
          { _id: '1', title: 'TechFlow SaaS', category: 'Web Dev', description: 'Enterprise dashboard for SaaS management.', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', technologies: ['React', 'Node.js'] },
          { _id: '2', title: 'Lumina Branding', category: 'Graphic Design', description: 'Modern identity for a high-end fashion brand.', imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80', technologies: ['Illustrator', 'Figma'] },
          { _id: '3', title: 'ViralGrowth Ads', category: 'Digital Marketing', description: 'Social media strategy for a fintech startup.', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', technologies: ['SEO', 'Ads'] },
          { _id: '4', title: 'EduLearn Platform', category: 'Web Dev', description: 'Comprehensive LMS with interactive content.', imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80', technologies: ['Next.js', 'MongoDB'] },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section className="py-24" id="portfolio">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-8"
          >
            Creative <span className="text-accent underline underline-offset-8">Showcase</span>
          </motion.h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === cat 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-white text-primary border border-gray-100 hover:border-accent hover:text-accent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={project._id}
                className="group relative overflow-hidden rounded-3xl aspect-[16/10] bg-gray-100 shadow-md"
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 text-white">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-accent text-sm font-bold uppercase tracking-wider mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-3xl font-display font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-300 text-sm max-w-md mb-6">{project.description}</p>
                    
                    <div className="flex items-center gap-4">
                      <button className="flex items-center space-x-2 bg-white text-primary px-5 py-2 rounded-full text-sm font-bold hover:bg-accent hover:text-white transition-colors">
                        <span>View Case Study</span>
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
