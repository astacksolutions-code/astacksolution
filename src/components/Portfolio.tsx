import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Star, Code, Smartphone, Database, Cloud } from 'lucide-react';
import api from '../lib/axios';
import { cn } from '../lib/utils';

interface Project {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      const data = Array.isArray(response.data) ? response.data : [];
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = Array.isArray(projects) 
    ? (filter === 'all' ? projects : projects.filter(p => p.category === filter))
    : [];

  const categories = [
    { id: 'all', label: 'All Work', icon: '' },
    { id: 'web', label: 'Web Apps', icon: '' },
    { id: 'mobile', label: 'Mobile', icon: '' },
    { id: 'ai', label: 'AI/ML', icon: '' },
    { id: 'design', label: 'Design', icon: '' }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      web: 'bg-blue-500/10 text-blue-600',
      mobile: 'bg-green-500/10 text-green-600',
      ai: 'bg-purple-500/10 text-purple-600',
      design: 'bg-pink-500/10 text-pink-600'
    };
    return colors[category] || 'bg-gray-500/10 text-gray-600';
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'web': return <Code size={14} />;
      case 'mobile': return <Smartphone size={14} />;
      case 'ai': return <Database size={14} />;
      default: return <Cloud size={14} />;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center"
        >
          <div className="relative">
            <div className="w-20 h-20 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-accent rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
          <p className="text-gray-500 mt-6 font-medium">Loading amazing projects...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Filter Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap justify-center gap-3 mb-16"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={cn(
              "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2",
              filter === cat.id 
                ? "bg-accent text-white shadow-lg shadow-accent/20 scale-105" 
                : "bg-white text-gray-600 hover:bg-gray-100 hover:scale-105 border border-gray-200"
            )}
          >
            <span className="text-lg">{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-400 text-lg font-medium">No projects found in this category.</p>
          <p className="text-gray-400 text-sm mt-2">Try selecting a different filter</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              onHoverStart={() => setHoveredId(project._id)}
              onHoverEnd={() => setHoveredId(null)}
              className="group relative"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                  {project.imageUrl ? (
                    <motion.img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                      animate={{ scale: hoveredId === project._id ? 1.1 : 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Code size={64} className="text-gray-300" />
                    </div>
                  )}
                  
                  {/* Overlay on Hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex items-end justify-center p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === project._id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex space-x-4">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-white text-primary px-5 py-2 rounded-full text-sm font-medium flex items-center space-x-2 hover:bg-accent hover:text-white transition-all"
                        >
                          <ExternalLink size={16} />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-white text-primary px-5 py-2 rounded-full text-sm font-medium flex items-center space-x-2 hover:bg-accent hover:text-white transition-all"
                        >
                          <Github size={16} />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </motion.div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                      <Star size={12} />
                      <span>Featured</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={cn(
                      "text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1",
                      getCategoryColor(project.category)
                    )}>
                      {getCategoryIcon(project.category)}
                      <span className="ml-1">{project.category.toUpperCase()}</span>
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {project.description || 'No description available'}
                  </p>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span 
                          key={i} 
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* View All Projects Button */}
      {filteredProjects.length > 6 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-16"
        >
          <button className="bg-white border-2 border-accent text-accent px-8 py-3 rounded-full font-bold hover:bg-accent hover:text-white transition-all duration-300">
            Load More Projects
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Portfolio;