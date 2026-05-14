import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import api from '../lib/axios';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        const data = Array.isArray(response.data) ? response.data : [];
        setProjects(data);
      } catch (err) {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // SAFE - Always array
  const filteredProjects = Array.isArray(projects) 
    ? (filter === 'all' ? projects : projects.filter(p => p.category === filter))
    : [];

  const categories = ['all', 'web', 'mobile', 'ai', 'cloud'];

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full ${filter === cat ? 'bg-accent text-white' : 'bg-gray-100'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-20">No projects found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <div key={project._id || i} className="bg-white rounded-2xl shadow overflow-hidden">
              {project.imageUrl && (
                <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold">{project.title || 'Project'}</h3>
                <p className="text-gray-500 mt-2">{project.description || 'No description'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Portfolio;