import React from 'react';

const Portfolio = () => {
  const projects = [
    { id: 1, title: 'E-Commerce Website', category: 'web', image: '' },
    { id: 2, title: 'Mobile Banking App', category: 'mobile', image: '' },
    { id: 3, title: 'AI Chatbot', category: 'ai', image: '' },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-accent/20 to-primary/20"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="text-gray-500 mt-2">Category: {project.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;