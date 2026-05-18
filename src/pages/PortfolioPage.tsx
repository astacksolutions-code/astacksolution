import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Star, Code, Smartphone, Database, Cloud, X, ZoomIn } from 'lucide-react';
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
    { id: 'all', label: 'All Work', icon: '', color: 'bg-gray-500' },
    { id: 'web', label: 'Web Development', icon: '', color: 'bg-blue-500' },
    { id: 'mobile', label: 'Mobile Apps', icon: '', color: 'bg-green-500' },
    { id: 'ai', label: 'AI Solutions', icon: '', color: 'bg-purple-500' },
    { id: 'design', label: 'UI/UX Design', icon: '', color: 'bg-pink-500' }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      web: 'bg-blue-500/10 text-blue-600 border-blue-200',
      mobile: 'bg-green-500/10 text-green-600 border-green-200',
      ai: 'bg-purple-500/10 text-purple-600 border-purple-200',
      design: 'bg-pink-500/10 text-pink-600 border-pink-200'
    };
    return colors[category] || 'bg-gray-500/10 text-gray-600 border-gray-200';
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
    <>
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Our <span className="text-accent">Creative Works</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Explore our portfolio of successful projects that have helped businesses grow and transform.
          </p>
        </motion.div>

        {/* Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
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
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-400 text-lg font-medium">No projects found in this category.</p>
              <p className="text-gray-400 text-sm mt-2">Try selecting a different filter</p>
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                  onHoverStart={() => setHoveredId(project._id)}
                  onHoverEnd={() => setHoveredId(null)}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedProject(project)}
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
                        className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredId === project._id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex space-x-4">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(project);
                            }}
                            className="bg-white text-primary px-5 py-2 rounded-full text-sm font-medium flex items-center space-x-2 hover:bg-accent hover:text-white transition-all"
                          >
                            <ZoomIn size={16} />
                            <span>Quick View</span>
                          </button>
                          {project.liveUrl && (
                            <a 
                              href={project.liveUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="bg-white text-primary px-5 py-2 rounded-full text-sm font-medium flex items-center space-x-2 hover:bg-accent hover:text-white transition-all"
                            >
                              <ExternalLink size={16} />
                              <span>Live Demo</span>
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
                          "text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1 border",
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Section */}
        {filteredProjects.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-20 pt-10 border-t border-gray-100"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-accent">{projects.length}+</div>
                <div className="text-sm text-gray-500 mt-1">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">{new Set(projects.map(p => p.category)).size}</div>
                <div className="text-sm text-gray-500 mt-1">Service Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">{projects.filter(p => p.featured).length}</div>
                <div className="text-sm text-gray-500 mt-1">Featured Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">100%</div>
                <div className="text-sm text-gray-500 mt-1">Client Satisfaction</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 bg-white/90 p-2 rounded-full hover:bg-accent hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
                
                <div className="h-96 overflow-hidden rounded-t-3xl">
                  {selectedProject.imageUrl ? (
                    <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
                      <Code size={80} className="text-gray-400" />
                    </div>
                  )}
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className={cn(
                      "text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1 border",
                      getCategoryColor(selectedProject.category)
                    )}>
                      {getCategoryIcon(selectedProject.category)}
                      <span className="ml-1">{selectedProject.category.toUpperCase()}</span>
                    </span>
                    {selectedProject.featured && (
                      <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                        <Star size={12} />
                        <span>Featured Project</span>
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-3xl font-bold text-primary mb-4">{selectedProject.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{selectedProject.description}</p>
                  
                  {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-bold mb-2">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, i) => (
                          <span key={i} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-4 pt-4 border-t border-gray-100">
                    {selectedProject.liveUrl && (
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="bg-accent text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all flex items-center space-x-2">
                        <ExternalLink size={18} />
                        <span>View Live Project</span>
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:border-accent hover:text-accent transition-all flex items-center space-x-2">
                        <Github size={18} />
                        <span>View Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Portfolio;