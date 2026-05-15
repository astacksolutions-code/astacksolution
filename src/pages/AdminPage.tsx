import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LogOut, LayoutDashboard, MessageSquare, Briefcase, Settings,
  Plus, Trash2, Edit, Save, X, Image as ImageIcon, Upload,
  Mail, Phone, User, Calendar, Search, Bell, Menu, ChevronRight,
  Eye, Star, TrendingUp, Users, FolderOpen, MessageCircle,
  Monitor, Palette, Megaphone, Server, Layers, Code, Globe,
  Save as SaveIcon, UserCircle, Lock, Mail as MailIcon, Phone as PhoneIcon
} from 'lucide-react';
import api from '../lib/axios';
import { cn } from '../lib/utils';

// Types
interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt: string;
}

interface Project {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  technologies?: string[];
  liveUrl?: string;
  featured?: boolean;
}

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
}

interface AdminProfile {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: string;
  bio?: string;
}

export default function AdminPage() {
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // UI State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState<AdminProfile>({
    name: '',
    email: '',
    phone: '',
    avatar: '',
    role: 'admin',
    bio: ''
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profileMessage, setProfileMessage] = useState('');

  // Data State
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalProjects: 0,
    totalServices: 0,
    unreadContacts: 0
  });

  // Form States
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'web',
    imageUrl: '',
    description: '',
    technologies: '',
    liveUrl: '',
    featured: false
  });

  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    icon: 'Code',
    features: '',
    order: 0
  });

  const iconOptions = [
    { name: 'Monitor', icon: Monitor },
    { name: 'Palette', icon: Palette },
    { name: 'Megaphone', icon: Megaphone },
    { name: 'Server', icon: Server },
    { name: 'Code', icon: Code },
    { name: 'Globe', icon: Globe },
    { name: 'Layers', icon: Layers }
  ];

  useEffect(() => {
    const token = localStorage.getItem('astack_token');
    const adminData = localStorage.getItem('astack_admin');
    if (token && adminData) {
      const parsedAdmin = JSON.parse(adminData);
      setIsLoggedIn(true);
      setAdmin(parsedAdmin);
      setProfileForm({
        name: parsedAdmin.name || '',
        email: parsedAdmin.email || '',
        phone: parsedAdmin.phone || '',
        avatar: parsedAdmin.avatar || '',
        role: parsedAdmin.role || 'admin',
        bio: parsedAdmin.bio || ''
      });
      fetchAllData();
    }
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [contactsRes, projectsRes, servicesRes] = await Promise.all([
        api.get('/contact'),
        api.get('/projects'),
        api.get('/services')
      ]);

      const contactsData = contactsRes.data || [];
      const projectsData = projectsRes.data || [];
      const servicesData = servicesRes.data || [];

      setContacts(contactsData);
      setProjects(projectsData);
      setServices(servicesData);
      
      setStats({
        totalContacts: contactsData.length,
        totalProjects: projectsData.length,
        totalServices: servicesData.length,
        unreadContacts: contactsData.filter((c: any) => !c.read).length
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const res = await api.post('/admin/login', { email, password });
      if (res.data.token) {
        localStorage.setItem('astack_token', res.data.token);
        localStorage.setItem('astack_admin', JSON.stringify(res.data.admin));
        setIsLoggedIn(true);
        setAdmin(res.data.admin);
        setProfileForm({
          name: res.data.admin.name || '',
          email: res.data.admin.email || '',
          phone: res.data.admin.phone || '',
          avatar: res.data.admin.avatar || '',
          role: res.data.admin.role || 'admin',
          bio: res.data.admin.bio || ''
        });
        await fetchAllData();
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('astack_token');
    localStorage.removeItem('astack_admin');
    setIsLoggedIn(false);
    setAdmin(null);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setProfileMessage('');
    try {
      const res = await api.put('/admin/profile', profileForm);
      const updatedAdmin = { ...admin, ...profileForm };
      setAdmin(updatedAdmin);
      localStorage.setItem('astack_admin', JSON.stringify(updatedAdmin));
      setProfileMessage('Profile updated successfully!');
      setIsEditingProfile(false);
      setTimeout(() => setProfileMessage(''), 3000);
    } catch (error) {
      setProfileMessage('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setProfileMessage('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await api.put('/admin/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      setProfileMessage('Password changed successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setProfileMessage(''), 3000);
    } catch (error) {
      setProfileMessage('Error changing password');
    } finally {
      setLoading(false);
    }
  };

  // Project CRUD
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const projectData = {
        ...projectForm,
        technologies: projectForm.technologies.split(',').map(t => t.trim())
      };
      
      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, projectData);
      } else {
        await api.post('/projects', projectData);
      }
      
      setShowProjectModal(false);
      setEditingProject(null);
      setProjectForm({ title: '', category: 'web', imageUrl: '', description: '', technologies: '', liveUrl: '', featured: false });
      fetchAllData();
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Delete this project?')) {
      await api.delete(`/projects/${id}`);
      fetchAllData();
    }
  };

  const editProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      category: project.category,
      imageUrl: project.imageUrl || '',
      description: project.description,
      technologies: project.technologies?.join(', ') || '',
      liveUrl: project.liveUrl || '',
      featured: project.featured || false
    });
    setShowProjectModal(true);
  };

  // Service CRUD
  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const serviceData = {
        ...serviceForm,
        features: serviceForm.features.split(',').map(f => f.trim())
      };
      
      if (editingService) {
        await api.put(`/services/${editingService._id}`, serviceData);
      } else {
        await api.post('/services', serviceData);
      }
      
      setShowServiceModal(false);
      setEditingService(null);
      setServiceForm({ title: '', description: '', icon: 'Code', features: '', order: 0 });
      fetchAllData();
    } catch (error) {
      console.error('Error saving service:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (window.confirm('Delete this service?')) {
      await api.delete(`/services/${id}`);
      fetchAllData();
    }
  };

  const editService = (service: Service) => {
    setEditingService(service);
    setServiceForm({
      title: service.title,
      description: service.description,
      icon: service.icon,
      features: service.features.join(', '),
      order: service.order || 0
    });
    setShowServiceModal(true);
  };

  const handleDeleteContact = async (id: string) => {
    if (window.confirm('Delete this inquiry?')) {
      await api.delete(`/contact/${id}`);
      fetchAllData();
    }
  };

  const getIconComponent = (iconName: string) => {
    const icon = iconOptions.find(i => i.name === iconName);
    return icon ? React.createElement(icon.icon, { size: 24 }) : <Code size={24} />;
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-primary to-primary-dark">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/95 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
              <LayoutDashboard className="text-white" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-primary">Welcome Back</h2>
            <p className="text-gray-500 mt-2">Astack Solutions Admin Portal</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@astack.com"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
              required
            />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
              required
            />
            {message && <p className="text-red-500 text-sm text-center">{message}</p>}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-70"
            >
              {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" /> : 'Sign In'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-gradient-to-b from-primary to-primary-dark text-white transition-all duration-300 z-50 ${sidebarOpen ? 'w-72' : 'w-20'}`}>
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
              <LayoutDashboard size={20} />
            </div>
            {sidebarOpen && (
              <div>
                <h2 className="font-bold text-lg">Astack Admin</h2>
                <p className="text-xs text-white/60">{admin?.email}</p>
              </div>
            )}
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'services', icon: Settings, label: 'Services', badge: stats.totalServices },
            { id: 'projects', icon: Briefcase, label: 'Projects', badge: stats.totalProjects },
            { id: 'contacts', icon: MessageSquare, label: 'Inquiries', badge: stats.unreadContacts },
            { id: 'profile', icon: UserCircle, label: 'Profile' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsEditingProfile(false);
              }}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all",
                activeTab === item.id ? "bg-white/20 shadow-lg" : "hover:bg-white/10"
              )}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="flex-1 text-left">{item.label}</span>}
              {sidebarOpen && item.badge && item.badge > 0 && (
                <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all">
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-20'}`}>
        {/* Simple Header - No Navbar */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="px-8 py-4 flex justify-between items-center">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
              <Menu size={24} />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-bold text-primary">{admin?.name || 'Admin'}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                {admin?.name?.charAt(0) || 'A'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <AnimatePresence mode="wait">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
                  <p className="text-gray-500 mt-1">Welcome back, {admin?.name}! Here's what's happening.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[
                    { label: 'Total Services', value: stats.totalServices, icon: Settings, color: 'bg-purple-500' },
                    { label: 'Total Projects', value: stats.totalProjects, icon: Briefcase, color: 'bg-green-500' },
                    { label: 'Total Inquiries', value: stats.totalContacts, icon: MessageCircle, color: 'bg-blue-500' },
                    { label: 'Unread Messages', value: stats.unreadContacts, icon: Mail, color: 'bg-accent' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-gray-500 text-sm">{stat.label}</p>
                          <p className="text-3xl font-bold mt-2">{stat.value}</p>
                        </div>
                        <div className={`${stat.color} p-3 rounded-xl text-white`}>
                          <stat.icon size={24} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Services Tab - Same as before */}
            {activeTab === 'services' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-primary">Services</h1>
                    <p className="text-gray-500 mt-1">Manage your services offered</p>
                  </div>
                  <button 
                    onClick={() => {
                      setEditingService(null);
                      setServiceForm({ title: '', description: '', icon: 'Code', features: '', order: 0 });
                      setShowServiceModal(true);
                    }} 
                    className="bg-accent text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:shadow-lg transition-all"
                  >
                    <Plus size={18} /> <span>Add Service</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <div key={service._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                            {getIconComponent(service.icon)}
                          </div>
                          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => editService(service)} className="p-1 hover:text-accent">
                              <Edit size={18} />
                            </button>
                            <button onClick={() => handleDeleteService(service._id)} className="p-1 hover:text-red-500">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                        <p className="text-gray-500 text-sm mb-4">{service.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {service.features.slice(0, 3).map((feature, i) => (
                            <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{feature}</span>
                          ))}
                          {service.features.length > 3 && (
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">+{service.features.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {services.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-400">No services yet. Click "Add Service" to get started.</div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Projects Tab - Same as before */}
            {activeTab === 'projects' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-primary">Projects</h1>
                    <p className="text-gray-500 mt-1">Manage your portfolio projects</p>
                  </div>
                  <button 
                    onClick={() => {
                      setEditingProject(null);
                      setProjectForm({ title: '', category: 'web', imageUrl: '', description: '', technologies: '', liveUrl: '', featured: false });
                      setShowProjectModal(true);
                    }} 
                    className="bg-accent text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:shadow-lg transition-all"
                  >
                    <Plus size={18} /> <span>Add Project</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div key={project._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                      <div className="relative h-48 overflow-hidden">
                        {project.imageUrl ? (
                          <img src={project.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={project.title} />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
                            <ImageIcon size={48} className="text-gray-400" />
                          </div>
                        )}
                        {project.featured && (
                          <div className="absolute top-3 right-3 bg-accent text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                            <Star size={12} /> <span>Featured</span>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-xs text-accent font-bold uppercase">{project.category}</span>
                            <h3 className="text-lg font-bold mt-1">{project.title}</h3>
                          </div>
                          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => editProject(project)} className="p-1 hover:text-accent">
                              <Edit size={18} />
                            </button>
                            <button onClick={() => handleDeleteProject(project._id)} className="p-1 hover:text-red-500">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm line-clamp-2">{project.description}</p>
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {project.technologies.slice(0, 3).map((tech, i) => (
                              <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{tech}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {projects.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-400">No projects yet. Click "Add Project" to get started.</div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-primary">Contact Inquiries</h1>
                  <p className="text-gray-500 mt-1">Manage customer messages and requests</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                          <th className="text-left p-4">Name</th>
                          <th className="text-left p-4">Contact</th>
                          <th className="text-left p-4">Service</th>
                          <th className="text-left p-4">Message</th>
                          <th className="text-left p-4">Date</th>
                          <th className="text-left p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {contacts.map((contact) => (
                          <tr key={contact._id} className="hover:bg-gray-50">
                            <td className="p-4 font-medium">{contact.name}</td>
                            <td className="p-4 text-sm">
                              <div>{contact.email}</div>
                              <div className="text-gray-500 text-xs">{contact.phone}</div>
                            </td>
                            <td className="p-4">
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded">{contact.service}</span>
                            </td>
                            <td className="p-4 text-sm max-w-xs truncate">{contact.message}</td>
                            <td className="p-4 text-sm">{new Date(contact.createdAt).toLocaleDateString()}</td>
                            <td className="p-4">
                              <button onClick={() => handleDeleteContact(contact._id)} className="text-red-500 hover:text-red-700">
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {contacts.length === 0 && (
                          <tr>
                            <td colSpan={6} className="p-12 text-center text-gray-400">No inquiries found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Profile Tab with Edit */}
            {activeTab === 'profile' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-8 flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold text-primary">Profile Settings</h1>
                    <p className="text-gray-500 mt-1">Manage your account information</p>
                  </div>
                  {!isEditingProfile && (
                    <button 
                      onClick={() => setIsEditingProfile(true)}
                      className="bg-accent text-white px-5 py-2 rounded-xl flex items-center space-x-2 hover:shadow-lg transition-all"
                    >
                      <Edit size={18} /> <span>Edit Profile</span>
                    </button>
                  )}
                </div>

                {profileMessage && (
                  <div className={`mb-4 p-3 rounded-lg ${profileMessage.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {profileMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Profile Card */}
                  <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                      <div className="w-32 h-32 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                        {admin?.name?.charAt(0) || 'A'}
                      </div>
                      <h3 className="text-xl font-bold text-primary">{admin?.name}</h3>
                      <p className="text-gray-500 text-sm mt-1">{admin?.email}</p>
                      <p className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full inline-block mt-3">
                        {admin?.role || 'Administrator'}
                      </p>
                      {admin?.phone && (
                        <p className="text-gray-500 text-sm mt-3 flex items-center justify-center space-x-1">
                          <PhoneIcon size={14} /> <span>{admin.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Edit Forms */}
                  <div className="lg:col-span-2 space-y-6">
                    {isEditingProfile ? (
                      <>
                        {/* Profile Edit Form */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                          <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
                            <UserCircle size={20} /> <span>Edit Profile Information</span>
                          </h2>
                          <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Full Name</label>
                              <input
                                type="text"
                                value={profileForm.name}
                                onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Email Address</label>
                              <input
                                type="email"
                                value={profileForm.email}
                                onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                                className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                                disabled
                              />
                              <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Phone Number</label>
                              <input
                                type="tel"
                                value={profileForm.phone || ''}
                                onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent"
                                placeholder="+1 234 567 8900"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Bio</label>
                              <textarea
                                rows={3}
                                value={profileForm.bio || ''}
                                onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent"
                                placeholder="Tell us about yourself..."
                              />
                            </div>
                            <div className="flex space-x-3 pt-2">
                              <button type="submit" disabled={loading} className="bg-accent text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                                {loading ? 'Saving...' : 'Save Changes'}
                              </button>
                              <button type="button" onClick={() => setIsEditingProfile(false)} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-all">
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>

                        {/* Change Password Form */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                          <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
                            <Lock size={20} /> <span>Change Password</span>
                          </h2>
                          <form onSubmit={handleChangePassword} className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Current Password</label>
                              <input
                                type="password"
                                value={passwordForm.currentPassword}
                                onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">New Password</label>
                              <input
                                type="password"
                                value={passwordForm.newPassword}
                                onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                              <input
                                type="password"
                                value={passwordForm.confirmPassword}
                                onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent"
                                required
                              />
                            </div>
                            <button type="submit" disabled={loading} className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                              {loading ? 'Updating...' : 'Update Password'}
                            </button>
                          </form>
                        </div>
                      </>
                    ) : (
                      /* View Profile Mode */
                      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold mb-4">Profile Information</h2>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Full Name</p>
                              <p className="font-medium">{admin?.name || 'Not set'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Email Address</p>
                              <p className="font-medium">{admin?.email}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phone Number</p>
                            <p className="font-medium">{admin?.phone || 'Not set'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Bio</p>
                            <p className="text-gray-600">{admin?.bio || 'No bio added yet'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Role</p>
                            <p className="font-medium capitalize">{admin?.role || 'Administrator'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Member Since</p>
                            <p className="font-medium">{new Date().toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Modals - Add Project and Add Service remain the same */}
      {/* Add/Edit Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-2xl font-bold">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
              <button onClick={() => setShowProjectModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleAddProject} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Title *</label>
                <input type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none" value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <select className="w-full px-4 py-2 border rounded-lg" value={projectForm.category} onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App</option>
                    <option value="ai">AI/ML</option>
                    <option value="design">UI/UX Design</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input type="url" className="w-full px-4 py-2 border rounded-lg" value={projectForm.imageUrl} onChange={(e) => setProjectForm({...projectForm, imageUrl: e.target.value})} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea rows={4} required className="w-full px-4 py-2 border rounded-lg" value={projectForm.description} onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Technologies (comma separated)</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg" value={projectForm.technologies} onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})} />
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="featured" checked={projectForm.featured} onChange={(e) => setProjectForm({...projectForm, featured: e.target.checked})} className="w-4 h-4 text-accent" />
                <label htmlFor="featured" className="text-sm font-medium">Mark as Featured Project</label>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setShowProjectModal(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 bg-accent text-white py-2 rounded-lg font-medium">{loading ? 'Saving...' : (editingProject ? 'Update' : 'Add')} Project</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Add/Edit Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-2xl font-bold">{editingService ? 'Edit Service' : 'Add New Service'}</h2>
              <button onClick={() => setShowServiceModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleAddService} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Service Title *</label>
                <input type="text" required className="w-full px-4 py-2 border rounded-lg" value={serviceForm.title} onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})} />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea rows={3} required className="w-full px-4 py-2 border rounded-lg" value={serviceForm.description} onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Icon</label>
                  <select className="w-full px-4 py-2 border rounded-lg" value={serviceForm.icon} onChange={(e) => setServiceForm({...serviceForm, icon: e.target.value})}>
                    {iconOptions.map(icon => (
                      <option key={icon.name} value={icon.name}>{icon.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Order</label>
                  <input type="number" className="w-full px-4 py-2 border rounded-lg" value={serviceForm.order} onChange={(e) => setServiceForm({...serviceForm, order: parseInt(e.target.value)})} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Features (comma separated)</label>
                <textarea rows={3} className="w-full px-4 py-2 border rounded-lg" value={serviceForm.features} onChange={(e) => setServiceForm({...serviceForm, features: e.target.value})} placeholder="Custom Web Apps, API Development, Database Design" />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setShowServiceModal(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 bg-accent text-white py-2 rounded-lg font-medium">{loading ? 'Saving...' : (editingService ? 'Update' : 'Add')} Service</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}