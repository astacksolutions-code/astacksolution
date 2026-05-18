
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'motion/react';
// import {
//   LogOut, LayoutDashboard, MessageSquare, Briefcase, Settings,
//   Plus, Trash2, Edit, Save, X, Image as ImageIcon, Upload,
//   Mail, Phone, User, Calendar, Search, Bell, Menu, ChevronRight,
//   Eye, Star, TrendingUp, Users, FolderOpen, MessageCircle,
//   Monitor, Palette, Megaphone, Server, Layers, Code, Globe,
//   Save as SaveIcon, UserCircle, Lock, Mail as MailIcon, Phone as PhoneIcon,
//   Activity, Clock, CheckCircle, AlertCircle, ArrowUpRight, MoreHorizontal,
//   ArrowLeft, Download, BarChart3
// } from 'lucide-react';
// import api from '../lib/axios';
// import { cn } from '../lib/utils';

// // Types
// interface Contact {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   service: string;
//   message: string;
//   createdAt: string;
//   read?: boolean;
// }

// interface Project {
//   _id: string;
//   title: string;
//   category: string;
//   imageUrl: string;
//   description: string;
//   technologies?: string[];
//   liveUrl?: string;
//   featured?: boolean;
//   createdAt?: string;
// }

// interface Service {
//   _id: string;
//   title: string;
//   description: string;
//   icon: string;
//   features: string[];
//   order: number;
// }

// interface AdminProfile {
//   _id?: string;
//   name: string;
//   email: string;
//   phone?: string;
//   avatar?: string;
//   role: string;
//   bio?: string;
// }

// export default function AdminPage() {
//   // Auth State
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [admin, setAdmin] = useState<AdminProfile | null>(null);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [currentTime, setCurrentTime] = useState(new Date());

//   // UI State
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [showProjectModal, setShowProjectModal] = useState(false);
//   const [showServiceModal, setShowServiceModal] = useState(false);
//   const [editingProject, setEditingProject] = useState<Project | null>(null);
//   const [editingService, setEditingService] = useState<Service | null>(null);
//   const [isEditingProfile, setIsEditingProfile] = useState(false);
//   const [showNotificationPanel, setShowNotificationPanel] = useState(false);
//   const [profileForm, setProfileForm] = useState<AdminProfile>({
//     name: '',
//     email: '',
//     phone: '',
//     avatar: '',
//     role: 'admin',
//     bio: ''
//   });
//   const [passwordForm, setPasswordForm] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [profileMessage, setProfileMessage] = useState('');

//   // Data State
//   const [contacts, setContacts] = useState<Contact[]>([]);
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [services, setServices] = useState<Service[]>([]);
//   const [stats, setStats] = useState({
//     totalContacts: 0,
//     totalProjects: 0,
//     totalServices: 0,
//     unreadContacts: 0,
//     featuredProjects: 0,
//     newThisWeek: 0
//   });

//   // Form States
//   const [projectForm, setProjectForm] = useState({
//     title: '',
//     category: 'web',
//     imageUrl: '',
//     description: '',
//     technologies: '',
//     liveUrl: '',
//     featured: false
//   });

//   const [serviceForm, setServiceForm] = useState({
//     title: '',
//     description: '',
//     icon: 'Code',
//     features: '',
//     order: 0
//   });

//   const iconOptions = [
//     { name: 'Monitor', icon: Monitor },
//     { name: 'Palette', icon: Palette },
//     { name: 'Megaphone', icon: Megaphone },
//     { name: 'Server', icon: Server },
//     { name: 'Code', icon: Code },
//     { name: 'Globe', icon: Globe },
//     { name: 'Layers', icon: Layers }
//   ];

//   // ============ CHART DATA FUNCTIONS ============
  
//   const getMonthlyData = () => {
//     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//     const monthlyCounts = new Array(12).fill(0);
    
//     contacts.forEach(contact => {
//       const month = new Date(contact.createdAt).getMonth();
//       monthlyCounts[month]++;
//     });
    
//     return months.map((month, index) => ({
//       name: month,
//       inquiries: monthlyCounts[index]
//     }));
//   };

//   const getServiceDistribution = () => {
//     const serviceMap = new Map();
//     contacts.forEach(contact => {
//       serviceMap.set(contact.service, (serviceMap.get(contact.service) || 0) + 1);
//     });
//     return Array.from(serviceMap.entries()).map(([name, value]) => ({ name, value }));
//   };

//   const getReadStatusData = () => {
//     const read = contacts.filter(c => c.read).length;
//     const unread = contacts.filter(c => !c.read).length;
//     return { read, unread, total: contacts.length };
//   };

//   // ============ EXPORT TO CSV (No external library needed) ============
  
//   const exportToCSV = () => {
//     const headers = ['Name', 'Email', 'Phone', 'Service', 'Message', 'Status', 'Date'];
//     const rows = contacts.map(c => [
//       c.name,
//       c.email,
//       c.phone,
//       c.service,
//       `"${c.message.replace(/"/g, '""')}"`,
//       c.read ? 'Read' : 'Unread',
//       new Date(c.createdAt).toLocaleString()
//     ]);
    
//     const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
//     const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
//     link.setAttribute('href', url);
//     link.setAttribute('download', `contacts_${new Date().toISOString().split('T')[0]}.csv`);
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   // Update time every minute
//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 60000);
//     return () => clearInterval(timer);
//   }, []);

//   // BACK ARROW FIX
//   useEffect(() => {
//     if (isLoggedIn) {
//       window.history.pushState(null, '', window.location.pathname);
      
//       const handlePopState = () => {
//         if (isLoggedIn) {
//           window.history.pushState(null, '', '/admin');
//         }
//       };
      
//       window.addEventListener('popstate', handlePopState);
//       return () => window.removeEventListener('popstate', handlePopState);
//     }
//   }, [isLoggedIn]);

//   useEffect(() => {
//     const token = localStorage.getItem('astack_token');
//     const adminData = localStorage.getItem('astack_admin');
//     if (token && adminData) {
//       const parsedAdmin = JSON.parse(adminData);
//       setIsLoggedIn(true);
//       setAdmin(parsedAdmin);
//       setProfileForm({
//         name: parsedAdmin.name || '',
//         email: parsedAdmin.email || '',
//         phone: parsedAdmin.phone || '',
//         avatar: parsedAdmin.avatar || '',
//         role: parsedAdmin.role || 'admin',
//         bio: parsedAdmin.bio || ''
//       });
//       fetchAllData();
//       window.history.pushState(null, '', '/admin');
//     }
//   }, []);

//   const fetchAllData = async () => {
//     setLoading(true);
//     try {
//       const [contactsRes, projectsRes, servicesRes] = await Promise.all([
//         api.get('/contact'),
//         api.get('/projects'),
//         api.get('/services')
//       ]);

//       const contactsData = contactsRes.data || [];
//       const projectsData = projectsRes.data || [];
//       const servicesData = servicesRes.data || [];

//       setContacts(contactsData);
//       setProjects(projectsData);
//       setServices(servicesData);
      
//       const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
//       const newProjectsThisWeek = projectsData.filter((p: any) => 
//         p.createdAt && new Date(p.createdAt) > oneWeekAgo
//       ).length;
      
//       setStats({
//         totalContacts: contactsData.length,
//         totalProjects: projectsData.length,
//         totalServices: servicesData.length,
//         unreadContacts: contactsData.filter((c: any) => !c.read).length,
//         featuredProjects: projectsData.filter((p: any) => p.featured).length,
//         newThisWeek: newProjectsThisWeek
//       });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');
    
//     try {
//       const res = await api.post('/admin/login', { email, password });
//       if (res.data.token) {
//         localStorage.setItem('astack_token', res.data.token);
//         localStorage.setItem('astack_admin', JSON.stringify(res.data.admin));
//         setIsLoggedIn(true);
//         setAdmin(res.data.admin);
//         setProfileForm({
//           name: res.data.admin.name || '',
//           email: res.data.admin.email || '',
//           phone: res.data.admin.phone || '',
//           avatar: res.data.admin.avatar || '',
//           role: res.data.admin.role || 'admin',
//           bio: res.data.admin.bio || ''
//         });
//         await fetchAllData();
//         window.history.pushState(null, '', '/admin');
//       }
//     } catch (err: any) {
//       setMessage(err.response?.data?.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('astack_token');
//     localStorage.removeItem('astack_admin');
//     setIsLoggedIn(false);
//     setAdmin(null);
//   };

//   const handleUpdateProfile = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setProfileMessage('');
//     try {
//       await api.put('/admin/profile', {
//         ...profileForm,
//         email: admin?.email
//       });
//       const updatedAdmin = { ...admin, ...profileForm };
//       setAdmin(updatedAdmin);
//       localStorage.setItem('astack_admin', JSON.stringify(updatedAdmin));
//       setProfileMessage('Profile updated successfully!');
//       setIsEditingProfile(false);
//       setTimeout(() => setProfileMessage(''), 3000);
//     } catch (error) {
//       setProfileMessage('Error updating profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChangePassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (passwordForm.newPassword !== passwordForm.confirmPassword) {
//       setProfileMessage('Passwords do not match');
//       return;
//     }
//     setLoading(true);
//     try {
//       await api.put('/admin/change-password', {
//         currentPassword: passwordForm.currentPassword,
//         newPassword: passwordForm.newPassword,
//         email: admin?.email
//       });
//       setProfileMessage('Password changed successfully!');
//       setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
//       setTimeout(() => setProfileMessage(''), 3000);
//     } catch (error) {
//       setProfileMessage('Error changing password');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Project CRUD
//   const handleAddProject = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const projectData = {
//         ...projectForm,
//         technologies: projectForm.technologies.split(',').map(t => t.trim()),
//         createdAt: new Date().toISOString()
//       };
      
//       if (editingProject) {
//         await api.put(`/projects/${editingProject._id}`, projectData);
//       } else {
//         await api.post('/projects', projectData);
//       }
      
//       setShowProjectModal(false);
//       setEditingProject(null);
//       setProjectForm({ title: '', category: 'web', imageUrl: '', description: '', technologies: '', liveUrl: '', featured: false });
//       fetchAllData();
//     } catch (error) {
//       console.error('Error saving project:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteProject = async (id: string) => {
//     if (window.confirm('Delete this project?')) {
//       await api.delete(`/projects/${id}`);
//       fetchAllData();
//     }
//   };

//   const editProject = (project: Project) => {
//     setEditingProject(project);
//     setProjectForm({
//       title: project.title,
//       category: project.category,
//       imageUrl: project.imageUrl || '',
//       description: project.description,
//       technologies: project.technologies?.join(', ') || '',
//       liveUrl: project.liveUrl || '',
//       featured: project.featured || false
//     });
//     setShowProjectModal(true);
//   };

//   // Service CRUD
//   const handleAddService = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const serviceData = {
//         ...serviceForm,
//         features: serviceForm.features.split(',').map(f => f.trim())
//       };
      
//       if (editingService) {
//         await api.put(`/services/${editingService._id}`, serviceData);
//       } else {
//         await api.post('/services', serviceData);
//       }
      
//       setShowServiceModal(false);
//       setEditingService(null);
//       setServiceForm({ title: '', description: '', icon: 'Code', features: '', order: 0 });
//       fetchAllData();
//     } catch (error) {
//       console.error('Error saving service:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteService = async (id: string) => {
//     if (window.confirm('Delete this service?')) {
//       await api.delete(`/services/${id}`);
//       fetchAllData();
//     }
//   };

//   const editService = (service: Service) => {
//     setEditingService(service);
//     setServiceForm({
//       title: service.title,
//       description: service.description,
//       icon: service.icon,
//       features: service.features.join(', '),
//       order: service.order || 0
//     });
//     setShowServiceModal(true);
//   };

//   const handleDeleteContact = async (id: string) => {
//     if (window.confirm('Delete this inquiry?')) {
//       await api.delete(`/contact/${id}`);
//       fetchAllData();
//     }
//   };

//   const markAsRead = async (id: string) => {
//     try {
//       setLoading(true);
//       await api.put(`/contact/${id}/read`);
//       await fetchAllData();
//       setShowNotificationPanel(false);
//     } catch (error) {
//       console.error('Error marking as read:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const markAllAsRead = async () => {
//     try {
//       setLoading(true);
//       await api.post('/contact/read-all');
//       await fetchAllData();
//       setShowNotificationPanel(false);
//     } catch (error) {
//       console.error('Error marking all as read:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getIconComponent = (iconName: string) => {
//     const icon = iconOptions.find(i => i.name === iconName);
//     return icon ? React.createElement(icon.icon, { size: 24 }) : <Code size={24} />;
//   };

//   if (!isLoggedIn) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-primary to-primary-dark">
//         <motion.div 
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           className="bg-white/95 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md"
//         >
//           <div className="text-center mb-8">
//             <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
//               <LayoutDashboard className="text-white" size={40} />
//             </div>
//             <h2 className="text-3xl font-bold text-primary">Welcome Back</h2>
//             <p className="text-gray-500 mt-2">Astack Solutions Admin Portal</p>
//           </div>
          
//           <form onSubmit={handleLogin} className="space-y-5">
//             <input 
//               type="email" 
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="admin@astack.com"
//               className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
//               required
//             />
//             <input 
//               type="password" 
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••••"
//               className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none"
//               required
//             />
//             {message && <p className="text-red-500 text-sm text-center">{message}</p>}
//             <button 
//               type="submit" 
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-70"
//             >
//               {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" /> : 'Sign In'}
//             </button>
//           </form>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside className={`fixed left-0 top-0 h-full bg-gradient-to-b from-primary to-primary-dark text-white transition-all duration-300 z-50 ${sidebarOpen ? 'w-72' : 'w-20'}`}>
//         <div className="p-6 border-b border-white/10">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
//               <LayoutDashboard size={20} />
//             </div>
//             {sidebarOpen && (
//               <div>
//                 <h2 className="font-bold text-white">Astack Admin</h2>
//                 <p className="text-xs text-white/60">{admin?.email}</p>
//               </div>
//             )}
//           </div>
//         </div>

//         <nav className="p-4 space-y-2">
//           {[
//             { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
//             { id: 'analytics', icon: BarChart3, label: 'Analytics' },
//             { id: 'services', icon: Settings, label: 'Services', badge: stats.totalServices },
//             { id: 'projects', icon: Briefcase, label: 'Projects', badge: stats.totalProjects },
//             { id: 'contacts', icon: MessageSquare, label: 'Inquiries', badge: stats.unreadContacts },
//             { id: 'profile', icon: UserCircle, label: 'Profile' },
//           ].map((item) => (
//             <button
//               key={item.id}
//               onClick={() => {
//                 setActiveTab(item.id);
//                 setIsEditingProfile(false);
//                 setShowNotificationPanel(false);
//               }}
//               className={cn(
//                 "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all",
//                 activeTab === item.id ? "bg-white/20 shadow-lg" : "hover:bg-white/10"
//               )}
//             >
//               <item.icon size={20} />
//               {sidebarOpen && <span className="flex-1 text-left">{item.label}</span>}
//               {sidebarOpen && item.badge && item.badge > 0 && (
//                 <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">{item.badge}</span>
//               )}
//             </button>
//           ))}
//         </nav>

//         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
//           <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all">
//             <LogOut size={20} />
//             {sidebarOpen && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-20'}`}>
//         {/* Top Header */}
//         <header className="bg-white shadow-sm sticky top-0 z-40">
//           <div className="px-8 py-4 flex justify-between items-center">
//             <div className="flex items-center space-x-3">
//               <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
//                 <Menu size={24} />
//               </button>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               {/* Notification Bell */}
//               <div className="relative">
//                 <button 
//                   onClick={() => setShowNotificationPanel(!showNotificationPanel)}
//                   className="p-2 hover:bg-gray-100 rounded-lg relative transition-all"
//                 >
//                   <Bell size={20} />
//                   {stats.unreadContacts > 0 && (
//                     <motion.span 
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-md"
//                     >
//                       {stats.unreadContacts > 9 ? '9+' : stats.unreadContacts}
//                     </motion.span>
//                   )}
//                 </button>
                
//                 {/* Notification Panel */}
//                 <AnimatePresence>
//                   {showNotificationPanel && (
//                     <motion.div 
//                       initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                       className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
//                     >
//                       <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-accent/5">
//                         <div className="flex justify-between items-center">
//                           <div>
//                             <h3 className="font-bold text-primary text-lg">Notifications</h3>
//                             <p className="text-xs text-gray-400 mt-0.5">
//                               You have {stats.unreadContacts} unread message{stats.unreadContacts !== 1 ? 's' : ''}
//                             </p>
//                           </div>
//                           {stats.unreadContacts > 0 && (
//                             <button 
//                               onClick={markAllAsRead}
//                               disabled={loading}
//                               className="text-xs bg-accent/10 text-accent px-3 py-1.5 rounded-full hover:bg-accent hover:text-white transition-all"
//                             >
//                               {loading ? 'Marking...' : 'Mark all read'}
//                             </button>
//                           )}
//                         </div>
//                       </div>
                      
//                       <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
//                         {contacts.filter(c => !c.read).length === 0 ? (
//                           <div className="p-12 text-center">
//                             <Bell size={28} className="text-gray-400 mx-auto mb-2" />
//                             <p className="text-gray-400">No new notifications</p>
//                           </div>
//                         ) : (
//                           contacts.filter(c => !c.read).map((contact) => (
//                             <div 
//                               key={contact._id}
//                               className="p-4 hover:bg-blue-50 cursor-pointer transition-colors"
//                               onClick={() => {
//                                 markAsRead(contact._id);
//                                 setActiveTab('contacts');
//                                 setShowNotificationPanel(false);
//                               }}
//                             >
//                               <div className="flex items-start space-x-3">
//                                 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//                                   <Mail size={16} className="text-blue-600" />
//                                 </div>
//                                 <div className="flex-1">
//                                   <p className="font-medium text-sm">{contact.name}</p>
//                                   <p className="text-xs text-gray-500">{contact.service}</p>
//                                   <p className="text-xs text-gray-400 mt-1 truncate">{contact.message}</p>
//                                 </div>
//                                 <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
//                               </div>
//                             </div>
//                           ))
//                         )}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
              
//               {/* Profile */}
//               <div className="flex items-center space-x-3">
//                 <div className="text-right hidden md:block">
//                   <p className="text-sm font-bold text-primary">{admin?.name || 'Admin'}</p>
//                   <p className="text-xs text-gray-500">Administrator</p>
//                 </div>
//                 <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
//                   {admin?.name?.charAt(0) || 'A'}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="p-8">
//           <AnimatePresence mode="wait">
//             {/* Dashboard Tab */}
//             {activeTab === 'dashboard' && (
//               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
//                 <div className="mb-8 flex justify-between items-start flex-wrap gap-4">
//                   <div>
//                     <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
//                     <p className="text-gray-500 mt-1">Welcome back, {admin?.name}! Here's what's happening.</p>
//                   </div>
//                   <div className="text-right bg-white px-6 py-3 rounded-2xl shadow-sm">
//                     <div className="text-2xl font-bold text-primary">{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
//                     <p className="text-sm text-gray-400">{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                   <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"><div className="flex justify-between"><div><p className="text-gray-500 text-sm">Total Services</p><p className="text-3xl font-bold text-primary mt-2">{stats.totalServices}</p></div><div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center"><Settings className="text-purple-600" size={24} /></div></div></div>
//                   <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"><div className="flex justify-between"><div><p className="text-gray-500 text-sm">Total Projects</p><p className="text-3xl font-bold text-primary mt-2">{stats.totalProjects}</p></div><div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"><Briefcase className="text-green-600" size={24} /></div></div></div>
//                   <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 cursor-pointer" onClick={() => setActiveTab('contacts')}><div className="flex justify-between"><div><p className="text-gray-500 text-sm">Contact Messages</p><p className="text-3xl font-bold text-primary mt-2">{stats.totalContacts}</p>{stats.unreadContacts > 0 && <p className="text-xs text-accent mt-1">{stats.unreadContacts} unread</p>}</div><div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center relative"><MessageSquare className="text-blue-600" size={24} />{stats.unreadContacts > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{stats.unreadContacts}</span>}</div></div></div>
//                   <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"><div className="flex justify-between"><div><p className="text-gray-500 text-sm">Active Content</p><p className="text-3xl font-bold text-primary mt-2">{stats.totalServices + stats.totalProjects}</p></div><div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center"><FolderOpen className="text-orange-600" size={24} /></div></div></div>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                   <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//                     <h2 className="text-lg font-bold text-primary mb-4">Quick Actions</h2>
//                     <div className="space-y-3">
//                       <button onClick={() => setActiveTab('services')} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-accent/10"><div className="flex items-center space-x-3"><Plus size={16} className="text-accent" /><span>Add Service</span></div><ChevronRight size={16} /></button>
//                       <button onClick={() => setActiveTab('projects')} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-accent/10"><div className="flex items-center space-x-3"><Plus size={16} className="text-accent" /><span>Add Project</span></div><ChevronRight size={16} /></button>
//                       <button onClick={() => setActiveTab('contacts')} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-accent/10"><div className="flex items-center space-x-3"><Eye size={16} className="text-accent" /><span>View Contacts</span></div><ChevronRight size={16} /></button>
//                       <button onClick={exportToCSV} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-green-50"><div className="flex items-center space-x-3"><Download size={16} className="text-green-600" /><span>Export to CSV</span></div><ChevronRight size={16} /></button>
//                     </div>
//                   </div>
//                   <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//                     <h2 className="text-lg font-bold text-primary mb-4">Recent Activity</h2>
//                     <div className="space-y-3">
//                       {contacts.slice(0, 5).map((contact) => (<div key={contact._id} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer ${!contact.read ? 'bg-blue-50' : 'hover:bg-gray-50'}`} onClick={() => { if (!contact.read) markAsRead(contact._id); setActiveTab('contacts'); }}><div className="flex items-center space-x-3"><div className={`w-10 h-10 rounded-full flex items-center justify-center ${!contact.read ? 'bg-blue-200' : 'bg-gray-100'}`}><Mail size={16} className={!contact.read ? 'text-blue-600' : 'text-gray-500'} /></div><div><p className="font-medium text-sm">{contact.name}</p><p className="text-xs text-gray-400">{new Date(contact.createdAt).toLocaleDateString()}</p></div></div>{!contact.read && <div className="w-2 h-2 bg-accent rounded-full"></div>}</div>))}
//                       {contacts.length === 0 && <div className="text-center py-8 text-gray-400">No recent activity</div>}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {/* Analytics Tab */}
//             {activeTab === 'analytics' && (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//                 <div className="mb-8">
//                   <button onClick={() => setActiveTab('dashboard')} className="flex items-center space-x-2 text-gray-500 hover:text-accent mb-2"><ArrowLeft size={18} /><span>Back to Dashboard</span></button>
//                   <div className="flex justify-between items-center flex-wrap gap-4"><div><h1 className="text-3xl font-bold text-primary">Analytics Dashboard</h1><p className="text-gray-500 mt-1">Track your business insights and performance</p></div><button onClick={exportToCSV} className="bg-green-600 text-white px-5 py-2 rounded-xl flex items-center space-x-2"><Download size={18} /><span>Export Data</span></button></div>
//                 </div>

//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//                   <div className="bg-white rounded-xl p-4 text-center border border-gray-100"><p className="text-2xl font-bold text-primary">{stats.totalContacts}</p><p className="text-xs text-gray-500">Total Inquiries</p></div>
//                   <div className="bg-white rounded-xl p-4 text-center border border-gray-100"><p className="text-2xl font-bold text-green-600">{stats.unreadContacts}</p><p className="text-xs text-gray-500">Unread</p></div>
//                   <div className="bg-white rounded-xl p-4 text-center border border-gray-100"><p className="text-2xl font-bold text-blue-600">{getReadStatusData().read}</p><p className="text-xs text-gray-500">Read</p></div>
//                   <div className="bg-white rounded-xl p-4 text-center border border-gray-100"><p className="text-2xl font-bold text-accent">{stats.totalServices + stats.totalProjects}</p><p className="text-xs text-gray-500">Total Content</p></div>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//                   {/* Monthly Inquiries Bar Chart */}
//                   <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//                     <h2 className="text-lg font-bold text-primary mb-4">Monthly Inquiries</h2>
//                     <div className="space-y-3">
//                       {getMonthlyData().map((item, idx) => {
//                         const maxInquiries = Math.max(...getMonthlyData().map(d => d.inquiries), 1);
//                         const percentage = (item.inquiries / maxInquiries) * 100;
//                         return (<div key={idx} className="flex items-center gap-3"><div className="w-12 text-sm font-medium text-gray-600">{item.name}</div><div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden"><div className="bg-accent h-full rounded-full flex items-center justify-end px-3 text-white text-xs font-medium" style={{ width: `${Math.max(5, percentage)}%` }}>{item.inquiries > 0 && item.inquiries}</div></div></div>);
//                       })}
//                     </div>
//                   </div>

//                   {/* Service Distribution */}
//                   <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//                     <h2 className="text-lg font-bold text-primary mb-4">Service Distribution</h2>
//                     <div className="space-y-3">
//                       {getServiceDistribution().map((item, idx) => {
//                         const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
//                         const percentage = (item.value / stats.totalContacts) * 100;
//                         return (<div key={idx} className="flex items-center justify-between"><div className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: colors[idx % colors.length] }}></div><span className="text-sm text-gray-600">{item.name}</span></div><div className="flex items-center gap-4"><div className="w-32 bg-gray-100 rounded-full h-2 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: colors[idx % colors.length] }}></div></div><span className="text-sm font-medium text-primary">{item.value}</span></div></div>);
//                       })}
//                       {getServiceDistribution().length === 0 && <div className="text-center py-8 text-gray-400">No data available</div>}
//                     </div>
//                   </div>

//                   {/* Read vs Unread Donut */}
//                   <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//                     <h2 className="text-lg font-bold text-primary mb-4">Read vs Unread</h2>
//                     <div className="flex items-center justify-center gap-8 py-4">
//                       <div className="text-center"><div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-bold mx-auto">{getReadStatusData().read}</div><p className="text-sm text-gray-600 mt-2">Read</p></div>
//                       <div className="text-center"><div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold mx-auto">{getReadStatusData().unread}</div><p className="text-sm text-gray-600 mt-2">Unread</p></div>
//                       <div className="text-center"><div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-white text-2xl font-bold mx-auto">{getReadStatusData().total}</div><p className="text-sm text-gray-600 mt-2">Total</p></div>
//                     </div>
//                   </div>

//                   {/* Response Rate */}
//                   <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//                     <h2 className="text-lg font-bold text-primary mb-4">Response Rate</h2>
//                     <div className="text-center py-8"><div className="text-5xl font-bold text-accent">{getReadStatusData().total > 0 ? Math.round((getReadStatusData().read / getReadStatusData().total) * 100) : 0}%</div><p className="text-gray-500 mt-2">Response Rate</p><div className="w-full bg-gray-100 rounded-full h-3 mt-4 overflow-hidden"><div className="bg-accent h-full rounded-full" style={{ width: `${getReadStatusData().total > 0 ? (getReadStatusData().read / getReadStatusData().total) * 100 : 0}%` }}></div></div></div>
//                   </div>
//                 </div>

//                 {/* Recent Contacts Table */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//                   <div className="p-6 border-b border-gray-100 flex justify-between items-center"><h2 className="text-lg font-bold text-primary">Recent Inquiries</h2><button onClick={() => setActiveTab('contacts')} className="text-accent text-sm">View All →</button></div>
//                   <div className="overflow-x-auto">
//                     <table className="w-full"><thead className="bg-gray-50"><tr><th className="p-4 text-left">Name</th><th className="p-4 text-left">Email</th><th className="p-4 text-left">Service</th><th className="p-4 text-left">Date</th><th className="p-4 text-left">Status</th></tr></thead>
//                     <tbody className="divide-y">{contacts.slice(0, 10).map((c) => (<tr key={c._id} className="hover:bg-gray-50"><td className="p-4 font-medium">{c.name}</td><td className="p-4 text-sm">{c.email}</td><td className="p-4"><span className="text-xs bg-gray-100 px-2 py-1 rounded">{c.service}</span></td><td className="p-4 text-sm">{new Date(c.createdAt).toLocaleDateString()}</td><td className="p-4">{!c.read ? <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">Unread</span> : <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">Read</span>}</td></tr>))}
//                     {contacts.length === 0 && <tr><td colSpan={5} className="p-12 text-center text-gray-400">No inquiries found</td></tr>}</tbody></table>
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {/* Services Tab */}
//             {activeTab === 'services' && (
//               <motion.div><div className="mb-8 flex justify-between items-center"><div><button onClick={() => setActiveTab('dashboard')} className="flex items-center space-x-2 text-gray-500 hover:text-accent mb-2"><ArrowLeft size={18} /><span>Back to Dashboard</span></button><h1 className="text-3xl font-bold text-primary">Services</h1><p className="text-gray-500 mt-1">Manage your services offered</p></div><button onClick={() => { setEditingService(null); setServiceForm({ title: '', description: '', icon: 'Code', features: '', order: 0 }); setShowServiceModal(true); }} className="bg-accent text-white px-6 py-3 rounded-xl"><Plus size={18} className="inline mr-2" />Add Service</button></div>
//               <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">{services.map((s) => (<div key={s._id} className="bg-white rounded-2xl p-6 shadow-sm"><div className="flex justify-between"><div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-accent">{getIconComponent(s.icon)}</div><div className="flex space-x-2"><button onClick={() => editService(s)} className="p-1 hover:text-accent"><Edit size={18} /></button><button onClick={() => handleDeleteService(s._id)} className="p-1 hover:text-red-500"><Trash2 size={18} /></button></div></div><h3 className="text-xl font-bold mt-4">{s.title}</h3><p className="text-gray-500 text-sm mt-2">{s.description}</p><div className="flex flex-wrap gap-2 mt-4">{s.features.slice(0, 3).map((f, i) => (<span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{f}</span>))}</div></div>))}</div></motion.div>
//             )}

//             {/* Projects Tab */}
//             {activeTab === 'projects' && (
//               <motion.div><div className="mb-8 flex justify-between items-center"><div><button onClick={() => setActiveTab('dashboard')} className="flex items-center space-x-2 text-gray-500 hover:text-accent mb-2"><ArrowLeft size={18} /><span>Back to Dashboard</span></button><h1 className="text-3xl font-bold text-primary">Projects</h1><p className="text-gray-500 mt-1">Manage your portfolio projects</p></div><button onClick={() => { setEditingProject(null); setProjectForm({ title: '', category: 'web', imageUrl: '', description: '', technologies: '', liveUrl: '', featured: false }); setShowProjectModal(true); }} className="bg-accent text-white px-6 py-3 rounded-xl"><Plus size={18} className="inline mr-2" />Add Project</button></div>
//               <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">{projects.map((p) => (<div key={p._id} className="bg-white rounded-2xl shadow-sm overflow-hidden group"><div className="relative h-48 overflow-hidden">{p.imageUrl ? <img src={p.imageUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center"><ImageIcon size={48} className="text-gray-400" /></div>}{p.featured && <div className="absolute top-3 right-3 bg-accent text-white text-xs px-2 py-1 rounded-full"><Star size={12} className="inline mr-1" />Featured</div>}</div><div className="p-5"><div className="flex justify-between"><div><span className="text-xs text-accent font-bold uppercase">{p.category}</span><h3 className="text-lg font-bold mt-1">{p.title}</h3></div><div className="flex space-x-2 opacity-0 group-hover:opacity-100"><button onClick={() => editProject(p)} className="p-1 hover:text-accent"><Edit size={18} /></button><button onClick={() => handleDeleteProject(p._id)} className="p-1 hover:text-red-500"><Trash2 size={18} /></button></div></div><p className="text-gray-500 text-sm mt-2">{p.description}</p></div></div>))}</div></motion.div>
//             )}

//             {/* Contacts Tab */}
//             {activeTab === 'contacts' && (
//               <motion.div><div className="mb-8"><button onClick={() => setActiveTab('dashboard')} className="flex items-center space-x-2 text-gray-500 hover:text-accent mb-2"><ArrowLeft size={18} /><span>Back to Dashboard</span></button><div className="flex justify-between items-center"><div><h1 className="text-3xl font-bold text-primary">Contact Inquiries</h1><p className="text-gray-500 mt-1">Manage customer messages and requests</p></div><button onClick={exportToCSV} className="bg-green-600 text-white px-5 py-2 rounded-xl"><Download size={18} className="inline mr-2" />Export to CSV</button></div></div>
//               <div className="bg-white rounded-2xl shadow-sm overflow-hidden"><div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50"><tr><th className="p-4">Name</th><th className="p-4">Contact</th><th className="p-4">Service</th><th className="p-4">Message</th><th className="p-4">Date</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead>
//               <tbody className="divide-y">{contacts.map((c) => (<tr key={c._id} className={!c.read ? 'bg-blue-50' : ''}><td className="p-4 font-medium">{c.name}</td><td className="p-4 text-sm"><div>{c.email}</div><div className="text-gray-500 text-xs">{c.phone}</div></td><td className="p-4"><span className="text-xs bg-gray-100 px-2 py-1 rounded">{c.service}</span></td><td className="p-4 text-sm max-w-xs truncate">{c.message}</td><td className="p-4 text-sm">{new Date(c.createdAt).toLocaleDateString()}</td><td className="p-4">{!c.read ? <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">Unread</span> : <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">Read</span>}</td><td className="p-4"><div className="flex space-x-2">{!c.read && <button onClick={() => markAsRead(c._id)} className="text-green-500 hover:text-green-700"><Eye size={18} /></button>}<button onClick={() => handleDeleteContact(c._id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button></div></td></tr>))}
//               {contacts.length === 0 && <tr><td colSpan={7} className="p-12 text-center text-gray-400">No inquiries found</td></tr>}</tbody></table></div></div></motion.div>
//             )}

//             {/* Profile Tab */}
//             {activeTab === 'profile' && (
//               <motion.div><div className="mb-8"><button onClick={() => setActiveTab('dashboard')} className="flex items-center space-x-2 text-gray-500 hover:text-accent mb-2"><ArrowLeft size={18} /><span>Back to Dashboard</span></button><div className="flex justify-between items-center"><div><h1 className="text-3xl font-bold text-primary">Profile Settings</h1><p className="text-gray-500 mt-1">Manage your account information</p></div>{!isEditingProfile && <button onClick={() => setIsEditingProfile(true)} className="bg-accent text-white px-5 py-2 rounded-xl"><Edit size={18} className="inline mr-2" />Edit Profile</button>}</div></div>
//               {profileMessage && <div className={`mb-4 p-3 rounded-lg ${profileMessage.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{profileMessage}</div>}
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><div className="lg:col-span-1"><div className="bg-white rounded-2xl p-6 text-center"><div className="w-32 h-32 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">{admin?.name?.charAt(0) || 'A'}</div><h3 className="text-xl font-bold text-primary">{admin?.name}</h3><p className="text-gray-500 text-sm mt-1">{admin?.email}</p><p className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full inline-block mt-3">{admin?.role || 'Administrator'}</p></div></div>
//               <div className="lg:col-span-2 space-y-6">{isEditingProfile ? (<><div className="bg-white rounded-2xl p-6"><h2 className="text-xl font-bold mb-4">Edit Profile</h2><form onSubmit={handleUpdateProfile} className="space-y-4"><div><label className="block text-sm font-medium mb-1">Full Name</label><input type="text" value={profileForm.name} onChange={(e) => setProfileForm({...profileForm, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required /></div><div><label className="block text-sm font-medium mb-1">Email</label><input type="email" value={profileForm.email} className="w-full px-4 py-2 border rounded-lg bg-gray-50" disabled /></div><div><label className="block text-sm font-medium mb-1">Phone</label><input type="tel" value={profileForm.phone || ''} onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})} className="w-full px-4 py-2 border rounded-lg" /></div><div><label className="block text-sm font-medium mb-1">Bio</label><textarea rows={3} value={profileForm.bio || ''} onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})} className="w-full px-4 py-2 border rounded-lg" /></div><div className="flex space-x-3"><button type="submit" disabled={loading} className="bg-accent text-white px-6 py-2 rounded-lg">{loading ? 'Saving...' : 'Save'}</button><button type="button" onClick={() => setIsEditingProfile(false)} className="border px-6 py-2 rounded-lg">Cancel</button></div></form></div><div className="bg-white rounded-2xl p-6"><h2 className="text-xl font-bold mb-4">Change Password</h2><form onSubmit={handleChangePassword} className="space-y-4"><div><label className="block text-sm font-medium mb-1">Current Password</label><input type="password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required /></div><div><label className="block text-sm font-medium mb-1">New Password</label><input type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required /></div><div><label className="block text-sm font-medium mb-1">Confirm Password</label><input type="password" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required /></div><button type="submit" disabled={loading} className="bg-primary text-white px-6 py-2 rounded-lg">{loading ? 'Updating...' : 'Update Password'}</button></form></div></>) : (<div className="bg-white rounded-2xl p-6"><h2 className="text-xl font-bold mb-4">Profile Information</h2><div className="space-y-3"><div><p className="text-sm text-gray-500">Full Name</p><p className="font-medium">{admin?.name}</p></div><div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{admin?.email}</p></div><div><p className="text-sm text-gray-500">Phone</p><p className="font-medium">{admin?.phone || 'Not set'}</p></div><div><p className="text-sm text-gray-500">Bio</p><p className="text-gray-600">{admin?.bio || 'No bio'}</p></div><div><p className="text-sm text-gray-500">Role</p><p className="font-medium capitalize">{admin?.role}</p></div></div></div>)}</div></div></motion.div>
//             )}
//           </AnimatePresence>
//         </main>
//       </div>

//       {/* Modals */}
//       {showProjectModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-2xl max-w-lg w-full"><div className="p-6 border-b flex justify-between"><h2 className="text-2xl font-bold">{editingProject ? 'Edit Project' : 'Add Project'}</h2><button onClick={() => setShowProjectModal(false)}><X size={24} /></button></div><form onSubmit={handleAddProject} className="p-6 space-y-4"><input type="text" placeholder="Title" className="w-full px-4 py-2 border rounded-lg" value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} required /><select className="w-full px-4 py-2 border rounded-lg" value={projectForm.category} onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}><option value="web">Web Development</option><option value="mobile">Mobile App</option><option value="ai">AI/ML</option><option value="design">UI/UX Design</option></select><input type="url" placeholder="Image URL" className="w-full px-4 py-2 border rounded-lg" value={projectForm.imageUrl} onChange={(e) => setProjectForm({...projectForm, imageUrl: e.target.value})} /><textarea placeholder="Description" rows={4} className="w-full px-4 py-2 border rounded-lg" value={projectForm.description} onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} required /><input type="text" placeholder="Technologies (comma separated)" className="w-full px-4 py-2 border rounded-lg" value={projectForm.technologies} onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})} /><label className="flex items-center space-x-2"><input type="checkbox" checked={projectForm.featured} onChange={(e) => setProjectForm({...projectForm, featured: e.target.checked})} /><span>Featured Project</span></label><div className="flex space-x-3"><button type="submit" className="flex-1 bg-accent text-white py-2 rounded-lg">{loading ? 'Saving...' : (editingProject ? 'Update' : 'Add')}</button><button type="button" onClick={() => setShowProjectModal(false)} className="flex-1 border rounded-lg py-2">Cancel</button></div></form></motion.div></div>)}

//       {showServiceModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-2xl max-w-lg w-full"><div className="p-6 border-b flex justify-between"><h2 className="text-2xl font-bold">{editingService ? 'Edit Service' : 'Add Service'}</h2><button onClick={() => setShowServiceModal(false)}><X size={24} /></button></div><form onSubmit={handleAddService} className="p-6 space-y-4"><input type="text" placeholder="Service Title" className="w-full px-4 py-2 border rounded-lg" value={serviceForm.title} onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})} required /><textarea placeholder="Description" rows={3} className="w-full px-4 py-2 border rounded-lg" value={serviceForm.description} onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})} required /><select className="w-full px-4 py-2 border rounded-lg" value={serviceForm.icon} onChange={(e) => setServiceForm({...serviceForm, icon: e.target.value})}>{iconOptions.map(icon => <option key={icon.name} value={icon.name}>{icon.name}</option>)}</select><input type="text" placeholder="Features (comma separated)" className="w-full px-4 py-2 border rounded-lg" value={serviceForm.features} onChange={(e) => setServiceForm({...serviceForm, features: e.target.value})} /><div className="flex space-x-3"><button type="submit" className="flex-1 bg-accent text-white py-2 rounded-lg">{loading ? 'Saving...' : (editingService ? 'Update' : 'Add')}</button><button type="button" onClick={() => setShowServiceModal(false)} className="flex-1 border rounded-lg py-2">Cancel</button></div></form></motion.div></div>)}
//     </div>
//   );
// }
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LogOut, LayoutDashboard, MessageSquare, Briefcase, Settings,
  Plus, Trash2, Edit, X, Image as ImageIcon, Mail, Bell, Menu, ChevronRight,
  Eye, Star, Users, FolderOpen, Monitor, Palette, Megaphone, Server, Code, Globe,
  UserCircle, Lock, Phone as PhoneIcon, Activity, ArrowLeft, Download, BarChart3,
  FileText, Printer, Share2
} from 'lucide-react';
import api from '../lib/axios';
import { cn } from '../lib/utils';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Types (same as before)
interface Contact { _id: string; name: string; email: string; phone: string; service: string; message: string; createdAt: string; read?: boolean; }
interface Project { _id: string; title: string; category: string; imageUrl: string; description: string; technologies?: string[]; featured?: boolean; }
interface Service { _id: string; title: string; description: string; icon: string; features: string[]; order: number; }
interface AdminProfile { name: string; email: string; phone?: string; role: string; bio?: string; }

export default function AdminPage() {
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  // UI State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');

  // Data State
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [stats, setStats] = useState({ totalContacts: 0, totalProjects: 0, totalServices: 0, unreadContacts: 0 });

  // Form States
  const [projectForm, setProjectForm] = useState({ title: '', category: 'web', imageUrl: '', description: '', technologies: '', featured: false });
  const [serviceForm, setServiceForm] = useState({ title: '', description: '', icon: 'Code', features: '', order: 0 });
  const [profileForm, setProfileForm] = useState<AdminProfile>({ name: '', email: '', phone: '', role: 'admin', bio: '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const iconOptions = ['Monitor', 'Palette', 'Megaphone', 'Server', 'Code', 'Globe'];

  // Helper Functions
  const getIcon = (iconName: string) => {
    const icons: any = { Monitor, Palette, Megaphone, Server, Code, Globe };
    return React.createElement(icons[iconName] || Code, { size: 24 });
  };

  const getMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const counts = new Array(12).fill(0);
    contacts.forEach(c => { const month = new Date(c.createdAt).getMonth(); counts[month]++; });
    return months.map((name, i) => ({ name, inquiries: counts[i] }));
  };

  const getServiceDistribution = () => {
    const map = new Map();
    contacts.forEach(c => map.set(c.service, (map.get(c.service) || 0) + 1));
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  };

  const getReadStatus = () => {
    const read = contacts.filter(c => c.read).length;
    const unread = contacts.filter(c => !c.read).length;
    return { read, unread, total: contacts.length };
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFillColor(26, 26, 46);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Astack Solutions', 14, 20);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Analytics Report', 14, 32);
    
    // Admin Info
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text(`Generated by: ${admin?.name || 'Admin'}`, pageWidth - 50, 15);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 50, 22);
    doc.text(`Time: ${new Date().toLocaleTimeString()}`, pageWidth - 50, 29);
    
    // Stats Section
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Statistics Overview', 14, 55);
    
    const statsData = [
      ['Total Contacts', stats.totalContacts.toString()],
      ['Unread Messages', stats.unreadContacts.toString()],
      ['Read Messages', getReadStatus().read.toString()],
      ['Total Services', stats.totalServices.toString()],
      ['Total Projects', stats.totalProjects.toString()],
      ['Response Rate', `${getReadStatus().total > 0 ? Math.round((getReadStatus().read / getReadStatus().total) * 100) : 0}%`]
    ];
    
    autoTable(doc, {
      startY: 60,
      head: [['Metric', 'Value']],
      body: statsData,
      theme: 'striped',
      headStyles: { fillColor: [26, 26, 46], textColor: [255, 255, 255] },
      margin: { left: 14 }
    });
    
    let finalY = (doc as any).lastAutoTable.finalY + 10;
    
    // Monthly Data
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Monthly Inquiries', 14, finalY);
    
    const monthlyData = getMonthlyData().map(m => [m.name, m.inquiries.toString()]);
    autoTable(doc, {
      startY: finalY + 5,
      head: [['Month', 'Inquiries']],
      body: monthlyData,
      theme: 'striped',
      headStyles: { fillColor: [26, 26, 46], textColor: [255, 255, 255] },
      margin: { left: 14 }
    });
    
    finalY = (doc as any).lastAutoTable.finalY + 10;
    
    // Service Distribution
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Service Distribution', 14, finalY);
    
    const serviceData = getServiceDistribution().map(s => [s.name, s.value.toString()]);
    autoTable(doc, {
      startY: finalY + 5,
      head: [['Service', 'Count']],
      body: serviceData,
      theme: 'striped',
      headStyles: { fillColor: [26, 26, 46], textColor: [255, 255, 255] },
      margin: { left: 14 }
    });
    
    finalY = (doc as any).lastAutoTable.finalY + 10;
    
    // Recent Contacts
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Recent Contacts', 14, finalY);
    
    const contactsData = contacts.slice(0, 10).map(c => [c.name, c.email, c.service, c.read ? 'Read' : 'Unread', new Date(c.createdAt).toLocaleDateString()]);
    autoTable(doc, {
      startY: finalY + 5,
      head: [['Name', 'Email', 'Service', 'Status', 'Date']],
      body: contactsData,
      theme: 'striped',
      headStyles: { fillColor: [26, 26, 46], textColor: [255, 255, 255] },
      margin: { left: 14 }
    });
    
    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Astack Solutions - Analytics Report | Page ${i} of ${pageCount}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
    }
    
    doc.save(`analytics_report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Service', 'Message', 'Status', 'Date'];
    const rows = contacts.map(c => [c.name, c.email, c.phone, c.service, `"${c.message.replace(/"/g, '""')}"`, c.read ? 'Read' : 'Unread', new Date(c.createdAt).toLocaleString()]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `contacts_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  // Time Update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Back Button Prevention
  useEffect(() => {
    if (isLoggedIn) {
      window.history.pushState(null, '', '/admin');
      const handlePopState = () => { if (isLoggedIn) window.history.pushState(null, '', '/admin'); };
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [isLoggedIn]);

  // Load Data
  useEffect(() => {
    const token = localStorage.getItem('astack_token');
    const adminData = localStorage.getItem('astack_admin');
    if (token && adminData) {
      const parsed = JSON.parse(adminData);
      setIsLoggedIn(true);
      setAdmin(parsed);
      setProfileForm({ name: parsed.name || '', email: parsed.email || '', phone: parsed.phone || '', role: parsed.role || 'admin', bio: parsed.bio || '' });
      fetchAllData();
      window.history.pushState(null, '', '/admin');
    }
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [contactsRes, projectsRes, servicesRes] = await Promise.all([api.get('/contact'), api.get('/projects'), api.get('/services')]);
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
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    try {
      const res = await api.post('/admin/login', { email, password });
      if (res.data.token) {
        localStorage.setItem('astack_token', res.data.token);
        localStorage.setItem('astack_admin', JSON.stringify(res.data.admin));
        setIsLoggedIn(true);
        setAdmin(res.data.admin);
        setProfileForm({ name: res.data.admin.name || '', email: res.data.admin.email || '', phone: res.data.admin.phone || '', role: res.data.admin.role || 'admin', bio: res.data.admin.bio || '' });
        await fetchAllData();
        window.history.pushState(null, '', '/admin');
      }
    } catch (err: any) { setLoginError(err.response?.data?.message || 'Login failed'); }
    finally { setLoading(false); }
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
    try {
      await api.put('/admin/profile', { ...profileForm, email: admin?.email });
      const updated = { ...admin, ...profileForm };
      setAdmin(updated);
      localStorage.setItem('astack_admin', JSON.stringify(updated));
      setProfileMessage('Profile updated!');
      setIsEditingProfile(false);
      setTimeout(() => setProfileMessage(''), 3000);
    } catch (error) { setProfileMessage('Error updating profile'); }
    finally { setLoading(false); }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setProfileMessage('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await api.put('/admin/change-password', { currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword, email: admin?.email });
      setProfileMessage('Password changed!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setProfileMessage(''), 3000);
    } catch (error) { setProfileMessage('Error changing password'); }
    finally { setLoading(false); }
  };

  // Project CRUD
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { ...projectForm, technologies: projectForm.technologies.split(',').map(t => t.trim()), createdAt: new Date().toISOString() };
      if (editingProject) await api.put(`/projects/${editingProject._id}`, data);
      else await api.post('/projects', data);
      setShowProjectModal(false);
      setEditingProject(null);
      setProjectForm({ title: '', category: 'web', imageUrl: '', description: '', technologies: '', featured: false });
      fetchAllData();
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Delete this project?')) {
      await api.delete(`/projects/${id}`);
      fetchAllData();
    }
  };

  const editProject = (p: Project) => {
    setEditingProject(p);
    setProjectForm({ title: p.title, category: p.category, imageUrl: p.imageUrl || '', description: p.description, technologies: p.technologies?.join(', ') || '', featured: p.featured || false });
    setShowProjectModal(true);
  };

  // Service CRUD
  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { ...serviceForm, features: serviceForm.features.split(',').map(f => f.trim()) };
      if (editingService) await api.put(`/services/${editingService._id}`, data);
      else await api.post('/services', data);
      setShowServiceModal(false);
      setEditingService(null);
      setServiceForm({ title: '', description: '', icon: 'Code', features: '', order: 0 });
      fetchAllData();
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  };

  const handleDeleteService = async (id: string) => {
    if (window.confirm('Delete this service?')) {
      await api.delete(`/services/${id}`);
      fetchAllData();
    }
  };

  const editService = (s: Service) => {
    setEditingService(s);
    setServiceForm({ title: s.title, description: s.description, icon: s.icon, features: s.features.join(', '), order: s.order || 0 });
    setShowServiceModal(true);
  };

  const handleDeleteContact = async (id: string) => {
    if (window.confirm('Delete this inquiry?')) {
      await api.delete(`/contact/${id}`);
      fetchAllData();
    }
  };

  const markAsRead = async (id: string) => {
    await api.put(`/contact/${id}/read`);
    fetchAllData();
    setShowNotifications(false);
  };

  const markAllAsRead = async () => {
    await api.post('/contact/read-all');
    fetchAllData();
    setShowNotifications(false);
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-primary to-primary-dark">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white/95 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6"><LayoutDashboard className="text-white" size={40} /></div>
            <h2 className="text-3xl font-bold text-primary">Welcome Back</h2>
            <p className="text-gray-500 mt-2">Astack Solutions Admin Portal</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@astack.com" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none" required />
            {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-70">
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
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center"><LayoutDashboard size={20} /></div>
            {sidebarOpen && <div><h2 className="font-bold text-white">Astack Admin</h2><p className="text-xs text-white/60">{admin?.email}</p></div>}
          </div>
        </div>
        <nav className="p-4 space-y-2">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'analytics', icon: BarChart3, label: 'Analytics' },
            { id: 'services', icon: Settings, label: 'Services', badge: stats.totalServices },
            { id: 'projects', icon: Briefcase, label: 'Projects', badge: stats.totalProjects },
            { id: 'contacts', icon: MessageSquare, label: 'Inquiries', badge: stats.unreadContacts },
            { id: 'profile', icon: UserCircle, label: 'Profile' },
          ].map((item) => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setIsEditingProfile(false); setShowNotifications(false); }} className={cn("w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all", activeTab === item.id ? "bg-white/20 shadow-lg" : "hover:bg-white/10")}>
              <item.icon size={20} />
              {sidebarOpen && <span className="flex-1 text-left">{item.label}</span>}
              {sidebarOpen && item.badge && item.badge > 0 && <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">{item.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all"><LogOut size={20} />{sidebarOpen && <span>Logout</span>}</button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-20'}`}>
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="px-8 py-4 flex justify-between items-center">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg"><Menu size={24} /></button>
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 hover:bg-gray-100 rounded-lg relative">
                  <Bell size={20} />
                  {stats.unreadContacts > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">{stats.unreadContacts > 9 ? '9+' : stats.unreadContacts}</span>}
                </button>
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                      <div className="p-4 border-b bg-gradient-to-r from-primary/5 to-accent/5 flex justify-between items-center">
                        <div><h3 className="font-bold text-primary">Notifications</h3><p className="text-xs text-gray-400">{stats.unreadContacts} unread</p></div>
                        {stats.unreadContacts > 0 && <button onClick={markAllAsRead} className="text-xs bg-accent/10 text-accent px-3 py-1.5 rounded-full hover:bg-accent hover:text-white">Mark all read</button>}
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {contacts.filter(c => !c.read).length === 0 ? (
                          <div className="p-12 text-center"><Bell size={28} className="text-gray-400 mx-auto mb-2" /><p className="text-gray-400">No new notifications</p></div>
                        ) : (
                          contacts.filter(c => !c.read).map(contact => (
                            <div key={contact._id} className="p-4 hover:bg-blue-50 cursor-pointer border-b" onClick={() => { markAsRead(contact._id); setActiveTab('contacts'); setShowNotifications(false); }}>
                              <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"><Mail size={16} className="text-blue-600" /></div>
                                <div className="flex-1"><p className="font-medium text-sm">{contact.name}</p><p className="text-xs text-gray-500">{contact.service}</p><p className="text-xs text-gray-400 mt-1 truncate">{contact.message}</p></div>
                                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* Profile */}
              <div className="flex items-center space-x-3">
                <div className="text-right hidden md:block"><p className="text-sm font-bold text-primary">{admin?.name || 'Admin'}</p><p className="text-xs text-gray-500">Administrator</p></div>
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">{admin?.name?.charAt(0) || 'A'}</div>
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
                <div className="mb-8 flex justify-between items-start flex-wrap gap-4">
                  <div><h1 className="text-3xl font-bold text-primary">Dashboard</h1><p className="text-gray-500 mt-1">Welcome back, {admin?.name}!</p></div>
                  <div className="text-right bg-white px-6 py-3 rounded-2xl shadow-sm"><div className="text-2xl font-bold text-primary">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div><p className="text-sm text-gray-400">{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border"><div className="flex justify-between"><div><p className="text-gray-500 text-sm">Services</p><p className="text-3xl font-bold text-primary mt-2">{stats.totalServices}</p></div><div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center"><Settings className="text-purple-600" size={24} /></div></div></div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border"><div className="flex justify-between"><div><p className="text-gray-500 text-sm">Projects</p><p className="text-3xl font-bold text-primary mt-2">{stats.totalProjects}</p></div><div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"><Briefcase className="text-green-600" size={24} /></div></div></div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border cursor-pointer" onClick={() => setActiveTab('contacts')}><div className="flex justify-between"><div><p className="text-gray-500 text-sm">Messages</p><p className="text-3xl font-bold text-primary mt-2">{stats.totalContacts}</p>{stats.unreadContacts > 0 && <p className="text-xs text-accent mt-1">{stats.unreadContacts} unread</p>}</div><div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center relative"><MessageSquare className="text-blue-600" size={24} />{stats.unreadContacts > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{stats.unreadContacts}</span>}</div></div></div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border"><div className="flex justify-between"><div><p className="text-gray-500 text-sm">Active Content</p><p className="text-3xl font-bold text-primary mt-2">{stats.totalServices + stats.totalProjects}</p></div><div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center"><FolderOpen className="text-orange-600" size={24} /></div></div></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl shadow-sm border p-6"><h2 className="text-lg font-bold text-primary mb-4">Quick Actions</h2><div className="space-y-3"><button onClick={() => setActiveTab('services')} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-accent/10"><div className="flex items-center space-x-3"><Plus size={16} className="text-accent" /><span>Add Service</span></div><ChevronRight size={16} /></button><button onClick={() => setActiveTab('projects')} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-accent/10"><div className="flex items-center space-x-3"><Plus size={16} className="text-accent" /><span>Add Project</span></div><ChevronRight size={16} /></button><button onClick={() => setActiveTab('contacts')} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-accent/10"><div className="flex items-center space-x-3"><Eye size={16} className="text-accent" /><span>View Contacts</span></div><ChevronRight size={16} /></button><button onClick={exportToCSV} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-green-50"><div className="flex items-center space-x-3"><Download size={16} className="text-green-600" /><span>Export CSV</span></div><ChevronRight size={16} /></button></div></div>
                  <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border p-6"><h2 className="text-lg font-bold text-primary mb-4">Recent Activity</h2><div className="space-y-3">{contacts.slice(0, 5).map(c => (<div key={c._id} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer ${!c.read ? 'bg-blue-50' : 'hover:bg-gray-50'}`} onClick={() => { if (!c.read) markAsRead(c._id); setActiveTab('contacts'); }}><div className="flex items-center space-x-3"><div className={`w-10 h-10 rounded-full flex items-center justify-center ${!c.read ? 'bg-blue-200' : 'bg-gray-100'}`}><Mail size={16} className={!c.read ? 'text-blue-600' : 'text-gray-500'} /></div><div><p className="font-medium text-sm">{c.name}</p><p className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</p></div></div>{!c.read && <div className="w-2 h-2 bg-accent rounded-full"></div>}</div>))}{contacts.length === 0 && <div className="text-center py-8 text-gray-400">No activity</div>}</div></div>
                </div>
              </motion.div>
            )}

            {/* Analytics Tab - Professional with PDF Export */}
            {activeTab === 'analytics' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="mb-8">
                  <button onClick={() => setActiveTab('dashboard')} className="flex items-center space-x-2 text-gray-500 hover:text-accent mb-2"><ArrowLeft size={18} /><span>Back</span></button>
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div>
                      <h1 className="text-3xl font-bold text-primary">Analytics Dashboard</h1>
                      <p className="text-gray-500">Track your business insights and performance</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={exportToCSV} className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:bg-green-700 transition-all"><Download size={18} /><span>CSV</span></button>
                      <button onClick={exportToPDF} className="bg-red-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:bg-red-700 transition-all"><FileText size={18} /><span>PDF Report</span></button>
                    </div>
                  </div>
                </div>

                {/* Welcome Banner with Admin Name */}
                <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 mb-8 text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white/70 text-sm">Analytics Report</p>
                      <h2 className="text-2xl font-bold">Hello, {admin?.name}!</h2>
                      <p className="text-white/60 text-sm mt-1">Here's your business performance summary</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/70 text-sm">Generated on</p>
                      <p className="font-semibold">{new Date().toLocaleDateString()}</p>
                      <p className="text-xs text-white/50">{new Date().toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm"><p className="text-2xl font-bold text-primary">{stats.totalContacts}</p><p className="text-xs text-gray-500">Total Inquiries</p></div>
                  <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm"><p className="text-2xl font-bold text-green-600">{stats.unreadContacts}</p><p className="text-xs text-gray-500">Unread</p></div>
                  <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm"><p className="text-2xl font-bold text-blue-600">{getReadStatus().read}</p><p className="text-xs text-gray-500">Read</p></div>
                  <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm"><p className="text-2xl font-bold text-accent">{stats.totalServices + stats.totalProjects}</p><p className="text-xs text-gray-500">Total Content</p></div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Monthly Inquiries Bar Chart */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-primary mb-4">Monthly Inquiries</h2>
                    <div className="space-y-3">
                      {getMonthlyData().map((item, idx) => {
                        const maxInquiries = Math.max(...getMonthlyData().map(d => d.inquiries), 1);
                        const percentage = (item.inquiries / maxInquiries) * 100;
                        return (<div key={idx} className="flex items-center gap-3"><div className="w-12 text-sm text-gray-600">{item.name}</div><div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden"><div className="bg-accent h-full rounded-full flex items-center justify-end px-3 text-white text-xs" style={{ width: `${Math.max(5, percentage)}%` }}>{item.inquiries > 0 && item.inquiries}</div></div></div>);
                      })}
                    </div>
                  </div>

                  {/* Service Distribution */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-primary mb-4">Service Distribution</h2>
                    <div className="space-y-3">
                      {getServiceDistribution().map((item, i) => {
                        const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
                        const percent = (item.value / stats.totalContacts) * 100;
                        return (<div key={i} className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i % colors.length] }}></div><span className="text-sm text-gray-600">{item.name}</span></div><div className="flex items-center gap-4"><div className="w-32 bg-gray-100 rounded-full h-2 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: colors[i % colors.length] }}></div></div><span className="text-sm font-medium">{item.value}</span></div></div>);
                      })}
                      {getServiceDistribution().length === 0 && <div className="text-center py-8 text-gray-400">No data available</div>}
                    </div>
                  </div>

                  {/* Read vs Unread */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-primary mb-4">Read vs Unread</h2>
                    <div className="flex items-center justify-center gap-8 py-4">
                      <div className="text-center"><div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-bold mx-auto">{getReadStatus().read}</div><p className="text-sm text-gray-600 mt-2">Read</p></div>
                      <div className="text-center"><div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold mx-auto">{getReadStatus().unread}</div><p className="text-sm text-gray-600 mt-2">Unread</p></div>
                      <div className="text-center"><div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-white text-2xl font-bold mx-auto">{getReadStatus().total}</div><p className="text-sm text-gray-600 mt-2">Total</p></div>
                    </div>
                  </div>

                  {/* Response Rate */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-primary mb-4">Response Rate</h2>
                    <div className="text-center py-8"><div className="text-5xl font-bold text-accent">{getReadStatus().total > 0 ? Math.round((getReadStatus().read / getReadStatus().total) * 100) : 0}%</div><p className="text-gray-500 mt-2">Response Rate</p><div className="w-full bg-gray-100 rounded-full h-3 mt-4 overflow-hidden"><div className="bg-accent h-full rounded-full" style={{ width: `${getReadStatus().total > 0 ? (getReadStatus().read / getReadStatus().total) * 100 : 0}%` }}></div></div></div>
                  </div>
                </div>

                {/* Recent Contacts Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center"><h2 className="text-lg font-bold text-primary">Recent Inquiries</h2><button onClick={() => setActiveTab('contacts')} className="text-accent text-sm">View All →</button></div>
                  <div className="overflow-x-auto">
                    <table className="w-full"><thead className="bg-gray-50"><tr><th className="p-4 text-left">Name</th><th className="p-4 text-left">Email</th><th className="p-4 text-left">Service</th><th className="p-4 text-left">Date</th><th className="p-4 text-left">Status</th></tr></thead>
                    <tbody className="divide-y">{contacts.slice(0, 10).map((c) => (<tr key={c._id} className="hover:bg-gray-50"><td className="p-4 font-medium">{c.name}</td><td className="p-4 text-sm">{c.email}</td><td className="p-4"><span className="text-xs bg-gray-100 px-2 py-1 rounded">{c.service}</span></td><td className="p-4 text-sm">{new Date(c.createdAt).toLocaleDateString()}</td><td className="p-4">{!c.read ? <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">Unread</span> : <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">Read</span>}</td></tr>))}
                    {contacts.length === 0 && <tr><td colSpan={5} className="p-12 text-center text-gray-400">No inquiries found</td></tr>}</tbody></table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <motion.div><div className="mb-8 flex justify-between items-center"><div><button onClick={() => setActiveTab('dashboard')} className="flex items-center space-x-2 text-gray-500 hover:text-accent mb-2"><ArrowLeft size={18} /><span>Back</span></button><h1 className="text-3xl font-bold text-primary">Services</h1><p className="text-gray-500">Manage your services</p></div><button onClick={() => { setEditingService(null); setServiceForm({ title: '', description: '', icon: 'Code', features: '', order: 0 }); setShowServiceModal(true); }} className="bg-accent text-white px-6 py-3 rounded-xl flex items-center space-x-2"><Plus size={18} /><span>Add Service</span></button></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{services.map(s => (<div key={s._id} className="bg-white rounded-2xl p-6 shadow-sm border group"><div className="flex justify-between"><div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-accent">{getIcon(s.icon)}</div><div className="flex space-x-2 opacity-0 group-hover:opacity-100"><button onClick={() => editService(s)} className="p-1 hover:text-accent"><Edit size={18} /></button><button onClick={() => handleDeleteService(s._id)} className="p-1 hover:text-red-500"><Trash2 size={18} /></button></div></div><h3 className="text-xl font-bold mt-4">{s.title}</h3><p className="text-gray-500 text-sm mt-2">{s.description}</p><div className="flex flex-wrap gap-2 mt-4">{s.features.slice(0, 3).map((f, i) => (<span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{f}</span>))}</div></div>))}</div></motion.div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <motion.div><div className="mb-8 flex justify-between items-center"><div><button onClick={() => setActiveTab('dashboard')} className="flex items-center space-x-2 text-gray-500 hover:text-accent mb-2"><ArrowLeft size={18} /><span>Back</span></button><h1 className="text-3xl font-bold text-primary">Projects</h1><p className="text-gray-500">Manage your portfolio</p></div><button onClick={() => { setEditingProject(null); setProjectForm({ title: '', category: 'web', imageUrl: '', description: '', technologies: '', featured: false }); setShowProjectModal(true); }} className="bg-accent text-white px-6 py-3 rounded-xl flex items-center space-x-2"><Plus size={18} /><span>Add Project</span></button></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{projects.map(p => (<div key={p._id} className="bg-white rounded-2xl shadow-sm border overflow-hidden group"><div className="relative h-48 overflow-hidden">{p.imageUrl ? <img src={p.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition" /> : <div className="w-full h-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center"><ImageIcon size={48} className="text-gray-400" /></div>}{p.featured && <div className="absolute top-3 right-3 bg-accent text-white text-xs px-2 py-1 rounded-full"><Star size={12} className="inline mr-1" />Featured</div>}</div><div className="p-5"><div className="flex justify-between"><div><span className="text-xs text-accent font-bold uppercase">{p.category}</span><h3 className="text-lg font-bold mt-1">{p.title}</h3></div><div className="flex space-x-2 opacity-0 group-hover:opacity-100"><button onClick={() => editProject(p)} className="p-1 hover:text-accent"><Edit size={18} /></button><button onClick={() => handleDeleteProject(p._id)} className="p-1 hover:text-red-500"><Trash2 size={18} /></button></div></div><p className="text-gray-500 text-sm mt-2 line-clamp-2">{p.description}</p></div></div>))}</div></motion.div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <motion.div><div className="mb-8"><button onClick={() => setActiveTab('dashboard')} className="flex items-center space-x-2 text-gray-500 hover:text-accent mb-2"><ArrowLeft size={18} /><span>Back</span></button><div className="flex justify-between items-center"><div><h1 className="text-3xl font-bold text-primary">Inquiries</h1><p className="text-gray-500">Manage customer messages</p></div><button onClick={exportToCSV} className="bg-green-600 text-white px-5 py-2 rounded-xl flex items-center space-x-2"><Download size={18} /><span>Export CSV</span></button></div></div>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden"><div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50"><tr><th className="p-4 text-left">Name</th><th className="p-4 text-left">Contact</th><th className="p-4 text-left">Service</th><th className="p-4 text-left">Message</th><th className="p-4 text-left">Date</th><th className="p-4 text-left">Status</th><th className="p-4 text-left">Actions</th></tr></thead><tbody className="divide-y">{contacts.map(c => (<tr key={c._id} className={!c.read ? 'bg-blue-50' : ''}><td className="p-4 font-medium">{c.name}</td><td className="p-4 text-sm"><div>{c.email}</div><div className="text-gray-500 text-xs">{c.phone}</div></td><td className="p-4"><span className="text-xs bg-gray-100 px-2 py-1 rounded">{c.service}</span></td><td className="p-4 text-sm max-w-xs truncate">{c.message}</td><td className="p-4 text-sm">{new Date(c.createdAt).toLocaleDateString()}</td><td className="p-4">{!c.read ? <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">Unread</span> : <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">Read</span>}</td><td className="p-4"><div className="flex space-x-2">{!c.read && <button onClick={() => markAsRead(c._id)} className="text-green-500 hover:text-green-700"><Eye size={18} /></button>}<button onClick={() => handleDeleteContact(c._id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button></div></td></tr>))}{contacts.length === 0 && <tr><td colSpan={7} className="p-12 text-center text-gray-400">No inquiries</td></tr>}</tbody></table></div></div></motion.div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div><div className="mb-8"><button onClick={() => setActiveTab('dashboard')} className="flex items-center space-x-2 text-gray-500 hover:text-accent mb-2"><ArrowLeft size={18} /><span>Back</span></button><div className="flex justify-between items-center"><div><h1 className="text-3xl font-bold text-primary">Profile</h1><p className="text-gray-500">Manage your account</p></div>{!isEditingProfile && <button onClick={() => setIsEditingProfile(true)} className="bg-accent text-white px-5 py-2 rounded-xl flex items-center space-x-2"><Edit size={18} /><span>Edit</span></button>}</div></div>
              {profileMessage && <div className={`mb-4 p-3 rounded-lg ${profileMessage.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{profileMessage}</div>}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><div className="lg:col-span-1"><div className="bg-white rounded-2xl shadow-sm border p-6 text-center"><div className="w-32 h-32 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">{admin?.name?.charAt(0) || 'A'}</div><h3 className="text-xl font-bold text-primary">{admin?.name}</h3><p className="text-gray-500 text-sm mt-1">{admin?.email}</p><p className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full inline-block mt-3">{admin?.role || 'Admin'}</p></div></div>
              <div className="lg:col-span-2 space-y-6">{isEditingProfile ? (<><div className="bg-white rounded-2xl shadow-sm border p-6"><h2 className="text-xl font-bold mb-4">Edit Profile</h2><form onSubmit={handleUpdateProfile} className="space-y-4"><div><label className="block text-sm font-medium mb-1">Full Name</label><input type="text" value={profileForm.name} onChange={(e) => setProfileForm({...profileForm, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required /></div><div><label className="block text-sm font-medium mb-1">Email</label><input type="email" value={profileForm.email} className="w-full px-4 py-2 border rounded-lg bg-gray-50" disabled /></div><div><label className="block text-sm font-medium mb-1">Phone</label><input type="tel" value={profileForm.phone || ''} onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})} className="w-full px-4 py-2 border rounded-lg" /></div><div><label className="block text-sm font-medium mb-1">Bio</label><textarea rows={3} value={profileForm.bio || ''} onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})} className="w-full px-4 py-2 border rounded-lg" /></div><div className="flex space-x-3"><button type="submit" disabled={loading} className="bg-accent text-white px-6 py-2 rounded-lg">{loading ? 'Saving...' : 'Save'}</button><button type="button" onClick={() => setIsEditingProfile(false)} className="border px-6 py-2 rounded-lg">Cancel</button></div></form></div><div className="bg-white rounded-2xl shadow-sm border p-6"><h2 className="text-xl font-bold mb-4">Change Password</h2><form onSubmit={handleChangePassword} className="space-y-4"><div><label className="block text-sm font-medium mb-1">Current Password</label><input type="password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required /></div><div><label className="block text-sm font-medium mb-1">New Password</label><input type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required /></div><div><label className="block text-sm font-medium mb-1">Confirm Password</label><input type="password" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required /></div><button type="submit" disabled={loading} className="bg-primary text-white px-6 py-2 rounded-lg">{loading ? 'Updating...' : 'Update'}</button></form></div></>) : (<div className="bg-white rounded-2xl shadow-sm border p-6"><h2 className="text-xl font-bold mb-4">Profile Info</h2><div className="space-y-3"><div><p className="text-sm text-gray-500">Full Name</p><p className="font-medium">{admin?.name}</p></div><div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{admin?.email}</p></div><div><p className="text-sm text-gray-500">Phone</p><p className="font-medium">{admin?.phone || 'Not set'}</p></div><div><p className="text-sm text-gray-500">Bio</p><p className="text-gray-600">{admin?.bio || 'No bio'}</p></div><div><p className="text-sm text-gray-500">Role</p><p className="font-medium capitalize">{admin?.role}</p></div></div></div>)}</div></div></motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Project Modal */}
      {showProjectModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-2xl max-w-lg w-full"><div className="p-6 border-b flex justify-between"><h2 className="text-2xl font-bold">{editingProject ? 'Edit Project' : 'Add Project'}</h2><button onClick={() => setShowProjectModal(false)}><X size={24} /></button></div><form onSubmit={handleAddProject} className="p-6 space-y-4"><input type="text" placeholder="Title" className="w-full px-4 py-2 border rounded-lg" value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} required /><select className="w-full px-4 py-2 border rounded-lg" value={projectForm.category} onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}><option value="web">Web</option><option value="mobile">Mobile</option><option value="ai">AI/ML</option><option value="design">Design</option></select><input type="url" placeholder="Image URL" className="w-full px-4 py-2 border rounded-lg" value={projectForm.imageUrl} onChange={(e) => setProjectForm({...projectForm, imageUrl: e.target.value})} /><textarea placeholder="Description" rows={4} className="w-full px-4 py-2 border rounded-lg" value={projectForm.description} onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} required /><input type="text" placeholder="Technologies (comma separated)" className="w-full px-4 py-2 border rounded-lg" value={projectForm.technologies} onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})} /><label className="flex items-center space-x-2"><input type="checkbox" checked={projectForm.featured} onChange={(e) => setProjectForm({...projectForm, featured: e.target.checked})} /><span>Featured</span></label><div className="flex space-x-3"><button type="submit" className="flex-1 bg-accent text-white py-2 rounded-lg">{loading ? 'Saving...' : (editingProject ? 'Update' : 'Add')}</button><button type="button" onClick={() => setShowProjectModal(false)} className="flex-1 border rounded-lg py-2">Cancel</button></div></form></motion.div></div>)}

      {/* Service Modal */}
      {showServiceModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-2xl max-w-lg w-full"><div className="p-6 border-b flex justify-between"><h2 className="text-2xl font-bold">{editingService ? 'Edit Service' : 'Add Service'}</h2><button onClick={() => setShowServiceModal(false)}><X size={24} /></button></div><form onSubmit={handleAddService} className="p-6 space-y-4"><input type="text" placeholder="Service Title" className="w-full px-4 py-2 border rounded-lg" value={serviceForm.title} onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})} required /><textarea placeholder="Description" rows={3} className="w-full px-4 py-2 border rounded-lg" value={serviceForm.description} onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})} required /><select className="w-full px-4 py-2 border rounded-lg" value={serviceForm.icon} onChange={(e) => setServiceForm({...serviceForm, icon: e.target.value})}>{iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}</select><input type="text" placeholder="Features (comma separated)" className="w-full px-4 py-2 border rounded-lg" value={serviceForm.features} onChange={(e) => setServiceForm({...serviceForm, features: e.target.value})} /><div className="flex space-x-3"><button type="submit" className="flex-1 bg-accent text-white py-2 rounded-lg">{loading ? 'Saving...' : (editingService ? 'Update' : 'Add')}</button><button type="button" onClick={() => setShowServiceModal(false)} className="flex-1 border rounded-lg py-2">Cancel</button></div></form></motion.div></div>)}
    </div>
  );
}