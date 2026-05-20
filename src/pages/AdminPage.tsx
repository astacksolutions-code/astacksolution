
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LogOut, LayoutDashboard, MessageSquare, Briefcase, Settings,
  Plus, Trash2, Edit, X, Image as ImageIcon, Mail, Bell, Menu, ChevronRight,
  Eye, Star, Users, FolderOpen, Monitor, Palette, Megaphone, Server, Code, Globe,
  UserCircle, Lock, Phone as PhoneIcon, Activity, ArrowLeft, Download, BarChart3,
  FileText, Calendar, Clock, Phone, MessageCircle, TrendingUp, PieChart, LineChart,
  Award, Target, Zap, Sparkles, CheckCircle
} from 'lucide-react';
import api from '../lib/axios';
import { cn } from '../lib/utils';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Types
interface Contact { _id: string; name: string; email: string; phone: string; service: string; message: string; createdAt: string; read?: boolean; }
interface Project { _id: string; title: string; category: string; imageUrl: string; description: string; technologies?: string[]; featured?: boolean; }
interface Service { _id: string; title: string; description: string; icon: string; features: string[]; order: number; }
interface Booking { _id: string; name: string; email: string; phone: string; service: string; date: string; time: string; message: string; status: string; createdAt: string; }
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
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Data State
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
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

  // Export Functions
  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFillColor(26, 26, 46);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Astack Solutions', 14, 20);
    doc.setFontSize(12);
    doc.text('Analytics Report', 14, 32);
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text(`Generated by: ${admin?.name || 'Admin'}`, pageWidth - 50, 15);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 50, 22);
    doc.text(`Time: ${new Date().toLocaleTimeString()}`, pageWidth - 50, 29);
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
    autoTable(doc, { startY: 60, head: [['Metric', 'Value']], body: statsData, theme: 'striped', headStyles: { fillColor: [26, 26, 46], textColor: [255, 255, 255] }, margin: { left: 14 } });
    let finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Monthly Inquiries', 14, finalY);
    const monthlyData = getMonthlyData().map(m => [m.name, m.inquiries.toString()]);
    autoTable(doc, { startY: finalY + 5, head: [['Month', 'Inquiries']], body: monthlyData, theme: 'striped', headStyles: { fillColor: [26, 26, 46], textColor: [255, 255, 255] }, margin: { left: 14 } });
    finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.text('Service Distribution', 14, finalY);
    const serviceData = getServiceDistribution().map(s => [s.name, s.value.toString()]);
    autoTable(doc, { startY: finalY + 5, head: [['Service', 'Count']], body: serviceData, theme: 'striped', headStyles: { fillColor: [26, 26, 46], textColor: [255, 255, 255] }, margin: { left: 14 } });
    finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.text('Recent Contacts', 14, finalY);
    const contactsData = contacts.slice(0, 10).map(c => [c.name, c.email, c.service, c.read ? 'Read' : 'Unread', new Date(c.createdAt).toLocaleDateString()]);
    autoTable(doc, { startY: finalY + 5, head: [['Name', 'Email', 'Service', 'Status', 'Date']], body: contactsData, theme: 'striped', headStyles: { fillColor: [26, 26, 46], textColor: [255, 255, 255] }, margin: { left: 14 } });
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Astack Solutions - Analytics Report | Page ${i} of ${pageCount}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
    }
    doc.save(`analytics_report_${new Date().toISOString().split('T')[0]}.pdf`);       
  };

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

  const exportBookingsToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Service', 'Date', 'Time', 'Status', 'Message', 'Created At'];
    const rows = bookings.map(b => [b.name, b.email, b.phone, b.service, b.date, b.time, b.status, `"${b.message?.replace(/"/g, '""') || ''}"`, new Date(b.createdAt).toLocaleString()]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `bookings_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  // Booking Functions
  const updateBookingStatus = async (id: string, status: string) => {
    try {
      await api.put(`/bookings/${id}`, { status });
      fetchAllData();
    } catch (error) { console.error('Error updating booking:', error); }
  };

  const deleteBooking = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await api.delete(`/bookings/${id}`);
        fetchAllData();
      } catch (error) { console.error('Error deleting booking:', error); }
    }
  };

  const viewBookingMessage = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowMessageModal(true);
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
      const [contactsRes, projectsRes, servicesRes, bookingsRes] = await Promise.all([
        api.get('/contact'), api.get('/projects'), api.get('/services'), api.get('/bookings')
      ]);
      setContacts(contactsRes.data || []);
      setProjects(projectsRes.data || []);
      setServices(servicesRes.data || []);
      setBookings(bookingsRes.data || []);
      setStats({
        totalContacts: contactsRes.data?.length || 0,
        totalProjects: projectsRes.data?.length || 0,
        totalServices: servicesRes.data?.length || 0,
        unreadContacts: (contactsRes.data || []).filter((c: any) => !c.read).length
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-gradient-to-b from-primary to-primary-dark text-white transition-all duration-300 z-50 ${sidebarOpen ? 'w-72' : 'w-20'}`}>
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg"><LayoutDashboard size={20} /></div>
            {sidebarOpen && <div><h2 className="font-bold text-white text-lg tracking-wide">Astack Admin</h2><p className="text-xs text-white/60">{admin?.email}</p></div>}
          </div>
        </div>
        <nav className="p-4 space-y-2">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', color: 'text-blue-400' },
            { id: 'analytics', icon: TrendingUp, label: 'Analytics', color: 'text-purple-400' },
            { id: 'services', icon: Settings, label: 'Services', badge: stats.totalServices, color: 'text-green-400' },
            { id: 'projects', icon: Briefcase, label: 'Projects', badge: stats.totalProjects, color: 'text-orange-400' },
            { id: 'contacts', icon: MessageSquare, label: 'Inquiries', badge: stats.unreadContacts, color: 'text-pink-400' },
            { id: 'bookings', icon: Calendar, label: 'Bookings', badge: bookings.filter(b => b.status === 'pending').length, color: 'text-yellow-400' },
            { id: 'profile', icon: UserCircle, label: 'Profile', color: 'text-cyan-400' },
          ].map((item) => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setIsEditingProfile(false); setShowNotifications(false); }} className={cn("w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200", activeTab === item.id ? "bg-white/20 shadow-lg" : "hover:bg-white/10")}>
              <item.icon size={20} className={item.color} />
              {sidebarOpen && <span className="flex-1 text-left font-medium">{item.label}</span>}
              {sidebarOpen && item.badge && item.badge > 0 && <span className="bg-accent text-white text-xs px-2 py-1 rounded-full font-bold">{item.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200"><LogOut size={20} />{sidebarOpen && <span>Logout</span>}</button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-20'}`}>
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-100">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg transition-all"><Menu size={24} /></button>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 hover:bg-gray-100 rounded-lg relative transition-all">
                  <Bell size={20} />
                  {stats.unreadContacts > 0 && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 font-bold shadow-md">{stats.unreadContacts > 9 ? '9+' : stats.unreadContacts}</motion.span>}
                </button>
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                      <div className="p-4 border-b bg-gradient-to-r from-primary/5 to-accent/5 flex justify-between items-center">
                        <div><h3 className="font-bold text-primary">Notifications</h3><p className="text-xs text-gray-400">{stats.unreadContacts} unread messages</p></div>
                        {stats.unreadContacts > 0 && <button onClick={markAllAsRead} className="text-xs bg-accent/10 text-accent px-3 py-1.5 rounded-full hover:bg-accent hover:text-white transition-all">Mark all read</button>}
                      </div>
                      <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
                        {contacts.filter(c => !c.read).length === 0 ? (
                          <div className="p-12 text-center"><Bell size={28} className="text-gray-400 mx-auto mb-2" /><p className="text-gray-400">No new notifications</p></div>
                        ) : (
                          contacts.filter(c => !c.read).map(contact => (
                            <div key={contact._id} className="p-4 hover:bg-blue-50 cursor-pointer transition-all" onClick={() => { markAsRead(contact._id); setActiveTab('contacts'); setShowNotifications(false); }}>
                              <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"><Mail size={16} className="text-blue-600" /></div>
                                <div className="flex-1"><p className="font-semibold text-sm text-primary">{contact.name}</p><p className="text-xs text-gray-500">{contact.service}</p><p className="text-xs text-gray-400 mt-1 line-clamp-2">{contact.message}</p></div>
                                <div className="w-2 h-2 bg-accent rounded-full mt-2 animate-pulse"></div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 px-3 py-1 rounded-xl transition-all">
                <div className="text-right hidden sm:block"><p className="text-sm font-bold text-primary">{admin?.name || 'Admin'}</p><p className="text-xs text-gray-500">Administrator</p></div>
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold shadow-md">{admin?.name?.charAt(0) || 'A'}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            {/* Dashboard Tab - Professional Design */}
            {activeTab === 'dashboard' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-4 sm:p-6 text-white">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <p className="text-white/70 text-sm">Welcome back,</p>
                      <h1 className="text-2xl sm:text-3xl text-white font-bold">{admin?.name}!</h1>
                      <p className="text-white/60 text-sm mt-1">Here's what's happening with your business today.</p>
                    </div>
                    <div className="text-right bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                      <p className="text-white/70 text-xs">Current Time</p>
                      <p className="text-xl sm:text-2xl font-bold">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      <p className="text-xs text-white/50">{currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                    </div>
                  </div>
                </div>

                {/* Stats Grid - 4 Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start">
                      <div><p className="text-gray-500 text-sm">Total Services</p><p className="text-2xl sm:text-3xl font-bold text-primary mt-2">{stats.totalServices}</p><div className="flex items-center gap-1 mt-2"><TrendingUp size={14} className="text-green-500" /><span className="text-xs text-green-500">+{stats.totalServices}</span></div></div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center"><Settings className="text-purple-600" size={24} /></div>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start">
                      <div><p className="text-gray-500 text-sm">Total Projects</p><p className="text-2xl sm:text-3xl font-bold text-primary mt-2">{stats.totalProjects}</p><div className="flex items-center gap-1 mt-2"><TrendingUp size={14} className="text-green-500" /><span className="text-xs text-green-500">+{stats.totalProjects}</span></div></div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center"><Briefcase className="text-green-600" size={24} /></div>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer" onClick={() => setActiveTab('contacts')}>
                    <div className="flex justify-between items-start">
                      <div><p className="text-gray-500 text-sm">Contact Messages</p><p className="text-2xl sm:text-3xl font-bold text-primary mt-2">{stats.totalContacts}</p>{stats.unreadContacts > 0 && <p className="text-xs text-accent mt-1">{stats.unreadContacts} unread</p>}</div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center relative"><MessageSquare className="text-blue-600" size={24} />{stats.unreadContacts > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{stats.unreadContacts}</span>}</div>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ y: -5 }} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start">
                      <div><p className="text-gray-500 text-sm">Active Content</p><p className="text-2xl sm:text-3xl font-bold text-primary mt-2">{stats.totalServices + stats.totalProjects}</p><div className="flex items-center gap-1 mt-2"><Award size={14} className="text-accent" /><span className="text-xs text-accent">Excellent</span></div></div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center"><FolderOpen className="text-orange-600" size={24} /></div>
                    </div>
                  </motion.div>
                </div>

                {/* Quick Actions & Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                    <h2 className="text-lg font-bold text-primary mb-4 flex items-center"><Sparkles size={18} className="text-accent mr-2" />Quick Actions</h2>
                    <div className="space-y-3">
                      <button onClick={() => setActiveTab('services')} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-accent/10 transition-all group"><div className="flex items-center space-x-3"><Plus size={16} className="text-accent" /><span className="font-medium">Add Service</span></div><ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" /></button>
                      <button onClick={() => setActiveTab('projects')} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-accent/10 transition-all group"><div className="flex items-center space-x-3"><Plus size={16} className="text-accent" /><span className="font-medium">Add Project</span></div><ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" /></button>
                      <button onClick={() => setActiveTab('contacts')} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-accent/10 transition-all group"><div className="flex items-center space-x-3"><Eye size={16} className="text-accent" /><span className="font-medium">View Contacts</span></div><ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" /></button>
                      <button onClick={exportToCSV} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-green-50 transition-all group"><div className="flex items-center space-x-3"><Download size={16} className="text-green-600" /><span className="font-medium">Export CSV</span></div><ChevronRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" /></button>
                    </div>
                  </div>
                  <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                    <h2 className="text-lg font-bold text-primary mb-4 flex items-center"><Activity size={18} className="text-accent mr-2" />Recent Activity</h2>
                    <div className="space-y-3">
                      {contacts.slice(0, 5).map(c => (<div key={c._id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${!c.read ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'}`} onClick={() => { if (!c.read) markAsRead(c._id); setActiveTab('contacts'); }}><div className="flex items-center space-x-3"><div className={`w-10 h-10 rounded-full flex items-center justify-center ${!c.read ? 'bg-blue-200' : 'bg-gray-100'}`}><Mail size={16} className={!c.read ? 'text-blue-600' : 'text-gray-500'} /></div><div><p className="font-medium text-sm text-primary">{c.name}</p><p className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</p></div></div>{!c.read && <div className="w-2 h-2 bg-accent rounded-full mt-2 sm:mt-0"></div>}</div>))}
                      {contacts.length === 0 && <div className="text-center py-8 text-gray-400"><Activity size={40} className="mx-auto mb-2 opacity-50" /><p>No recent activity</p></div>}
                    </div>
                  </div>
                </div>

                {/* Bookings & Stats Row */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h2 className="text-lg font-bold text-primary flex items-center space-x-2"><Calendar size={18} className="text-accent" /><span>Recent Bookings & Appointments</span></h2>
                    <div className="flex items-center space-x-2"><span className="text-sm text-gray-500">Total: {bookings.length}</span><span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">{bookings.filter(b => b.status === 'pending').length} pending</span></div>
                  </div>
                  {bookings.length === 0 ? (
                    <div className="text-center py-12 text-gray-400"><Calendar size={48} className="mx-auto mb-3 opacity-50" /><p className="font-medium">No bookings yet</p><p className="text-sm mt-1">When customers book appointments, they'll appear here</p></div>
                  ) : (
                    <div className="space-y-4">
                      {bookings.slice(0, 5).map((booking) => (<div key={booking._id} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl transition-all ${booking.status === 'pending' ? 'bg-yellow-50 border-l-4 border-yellow-500' : 'bg-gray-50'}`}><div className="flex items-center space-x-4"><div className={`w-12 h-12 rounded-full flex items-center justify-center ${booking.status === 'pending' ? 'bg-yellow-100' : 'bg-green-100'}`}><Calendar size={20} className={booking.status === 'pending' ? 'text-yellow-600' : 'text-green-600'} /></div><div><p className="font-semibold text-primary">{booking.name}</p><p className="text-sm text-gray-500">{booking.service}</p><div className="flex flex-wrap items-center gap-3 mt-1"><span className="text-xs text-gray-400 flex items-center"><Calendar size={10} className="mr-1" />{new Date(booking.date).toLocaleDateString()}</span><span className="text-xs text-gray-400 flex items-center"><Clock size={10} className="mr-1" />{booking.time}</span></div></div></div><div className="flex items-center space-x-3 mt-3 sm:mt-0"><span className={`text-xs px-2 py-1 rounded-full ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{booking.status === 'pending' ? 'Pending' : 'Confirmed'}</span><a href={`mailto:${booking.email}`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Mail size={16} /></a><a href={`tel:${booking.phone}`} className="p-2 text-green-500 hover:bg-green-50 rounded-lg"><Phone size={16} /></a></div></div>))}
                    </div>
                  )}
                </div>

                {/* Quick Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 sm:p-4 text-center"><div className="text-xl sm:text-2xl font-bold text-blue-600">{stats.totalContacts}</div><div className="text-xs text-gray-600 mt-1">Inquiries</div></div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 sm:p-4 text-center"><div className="text-xl sm:text-2xl font-bold text-green-600">{stats.unreadContacts}</div><div className="text-xs text-gray-600 mt-1">Unread</div></div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 sm:p-4 text-center"><div className="text-xl sm:text-2xl font-bold text-purple-600">{stats.totalServices}</div><div className="text-xs text-gray-600 mt-1">Services</div></div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-3 sm:p-4 text-center"><div className="text-xl sm:text-2xl font-bold text-orange-600">{stats.totalProjects}</div><div className="text-xs text-gray-600 mt-1">Projects</div></div>
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-3 sm:p-4 text-center"><div className="text-xl sm:text-2xl font-bold text-yellow-600">{bookings.length}</div><div className="text-xs text-gray-600 mt-1">Bookings</div></div>
                </div>
              </motion.div>
            )}

            {/* Analytics Tab - Professional with Graphs */}
            {activeTab === 'analytics' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div><button onClick={() => setActiveTab('dashboard')} className="flex items-center space-x-2 text-gray-500 hover:text-accent mb-2 transition-colors"><ArrowLeft size={18} /><span>Back to Dashboard</span></button><h1 className="text-2xl sm:text-3xl font-bold text-primary">Analytics Dashboard</h1><p className="text-gray-500 text-sm">Track your business insights and performance metrics</p></div>
                  <div className="flex gap-3"><button onClick={exportToCSV} className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:bg-green-700 transition-all shadow-md"><Download size={18} /><span className="hidden sm:inline">Export CSV</span><span className="sm:hidden">CSV</span></button><button onClick={exportToPDF} className="bg-red-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:bg-red-700 transition-all shadow-md"><FileText size={18} /><span className="hidden sm:inline">PDF Report</span><span className="sm:hidden">PDF</span></button></div>
                </div>

                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-4 sm:p-6 mb-6 text-white shadow-lg"><div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><p className="text-white/70 text-sm">Analytics Report</p><h2 className="text-xl sm:text-2xl text-white font-bold">Hello, {admin?.name}!</h2><p className="text-white/60 text-sm mt-1">Here's your business performance summary</p></div><div className="text-right"><p className="text-white/70 text-sm">Generated on</p><p className="font-semibold text-base sm:text-lg">{new Date().toLocaleDateString()}</p><p className="text-xs text-white/50">{new Date().toLocaleTimeString()}</p></div></div></div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm"><p className="text-2xl font-bold text-primary">{stats.totalContacts}</p><p className="text-xs text-gray-500 mt-1">Total Inquiries</p><div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mt-2"><Mail size={14} className="text-blue-600" /></div></div>
                  <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm"><p className="text-2xl font-bold text-green-600">{stats.unreadContacts}</p><p className="text-xs text-gray-500 mt-1">Unread</p><div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mt-2"><MessageSquare size={14} className="text-orange-600" /></div></div>
                  <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm"><p className="text-2xl font-bold text-blue-600">{getReadStatus().read}</p><p className="text-xs text-gray-500 mt-1">Read</p><div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mt-2"><Eye size={14} className="text-green-600" /></div></div>
                  <div className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm"><p className="text-2xl font-bold text-accent">{stats.totalServices + stats.totalProjects}</p><p className="text-xs text-gray-500 mt-1">Total Content</p><div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mt-2"><FolderOpen size={14} className="text-purple-600" /></div></div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Monthly Inquiries Bar Chart */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                    <h2 className="text-lg font-bold text-primary mb-4 flex items-center"><LineChart size={18} className="text-accent mr-2" />Monthly Inquiries</h2>
                    <div className="space-y-3">
                      {getMonthlyData().map((item, idx) => {
                        const max = Math.max(...getMonthlyData().map(d => d.inquiries), 1);
                        const percent = (item.inquiries / max) * 100;
                        return (<div key={idx} className="flex items-center gap-3 group"><div className="w-10 text-sm font-medium text-gray-600">{item.name}</div><div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden"><div className="bg-gradient-to-r from-accent to-primary h-full rounded-full flex items-center justify-end px-3 text-white text-xs font-medium transition-all group-hover:shadow-lg" style={{ width: `${Math.max(5, percent)}%` }}>{item.inquiries > 0 && item.inquiries}</div></div></div>);
                      })}
                    </div>
                  </div>

                  {/* Service Distribution */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                    <h2 className="text-lg font-bold text-primary mb-4 flex items-center"><PieChart size={18} className="text-accent mr-2" />Service Distribution</h2>
                    <div className="space-y-3">
                      {getServiceDistribution().map((item, i) => {
                        const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
                        const percent = (item.value / stats.totalContacts) * 100;
                        return (<div key={i} className="flex items-center justify-between group"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full transition-transform group-hover:scale-125" style={{ backgroundColor: colors[i % colors.length] }}></div><span className="text-sm text-gray-600">{item.name}</span></div><div className="flex items-center gap-4"><div className="w-24 sm:w-32 bg-gray-100 rounded-full h-2 overflow-hidden"><div className="h-full rounded-full transition-all group-hover:shadow-lg" style={{ width: `${percent}%`, backgroundColor: colors[i % colors.length] }}></div></div><span className="text-sm font-semibold text-primary">{item.value}</span></div></div>);
                      })}
                      {getServiceDistribution().length === 0 && <div className="text-center py-8 text-gray-400">No data available</div>}
                    </div>
                  </div>

                  {/* Read vs Unread */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                    <h2 className="text-lg font-bold text-primary mb-4 flex items-center"><PieChart size={18} className="text-accent mr-2" />Read vs Unread</h2>
                    <div className="flex flex-wrap items-center justify-center gap-6 py-4">
                      <div className="text-center group"><div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold mx-auto shadow-lg group-hover:scale-110 transition-transform">{getReadStatus().read}</div><p className="text-sm font-semibold text-gray-600 mt-3">Read</p></div>
                      <div className="text-center group"><div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold mx-auto shadow-lg group-hover:scale-110 transition-transform">{getReadStatus().unread}</div><p className="text-sm font-semibold text-gray-600 mt-3">Unread</p></div>
                      <div className="text-center group"><div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white text-2xl sm:text-3xl font-bold mx-auto shadow-lg group-hover:scale-110 transition-transform">{getReadStatus().total}</div><p className="text-sm font-semibold text-gray-600 mt-3">Total</p></div>
                    </div>
                  </div>

                  {/* Response Rate */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                    <h2 className="text-lg font-bold text-primary mb-4 flex items-center"><Target size={18} className="text-accent mr-2" />Response Rate</h2>
                    <div className="text-center py-4"><div className="text-4xl sm:text-6xl font-bold text-accent mb-2">{getReadStatus().total > 0 ? Math.round((getReadStatus().read / getReadStatus().total) * 100) : 0}%</div><p className="text-gray-500 mb-4 text-sm">of messages have been responded to</p><div className="w-full bg-gray-100 rounded-full h-3 sm:h-4 overflow-hidden shadow-inner"><motion.div initial={{ width: 0 }} animate={{ width: `${getReadStatus().total > 0 ? (getReadStatus().read / getReadStatus().total) * 100 : 0}%` }} transition={{ duration: 1 }} className="bg-gradient-to-r from-accent to-primary h-full rounded-full shadow-lg"></motion.div></div></div>
                  </div>
                </div>

                {/* Recent Contacts Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><h2 className="text-lg font-bold text-primary flex items-center"><Users size={18} className="text-accent mr-2" />Recent Inquiries</h2><button onClick={() => setActiveTab('contacts')} className="text-accent text-sm hover:underline">View All →</button></div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px]">
                      <thead className="bg-gray-50"><tr><th className="p-3 sm:p-4 text-left font-semibold text-gray-600 text-sm">Name</th><th className="p-3 sm:p-4 text-left font-semibold text-gray-600 text-sm">Email</th><th className="p-3 sm:p-4 text-left font-semibold text-gray-600 text-sm">Service</th><th className="p-3 sm:p-4 text-left font-semibold text-gray-600 text-sm">Date</th><th className="p-3 sm:p-4 text-left font-semibold text-gray-600 text-sm">Status</th></tr></thead>
                      <tbody className="divide-y divide-gray-100">{contacts.slice(0, 10).map((c) => (<tr key={c._id} className="hover:bg-gray-50 transition-all"><td className="p-3 sm:p-4 font-medium text-primary text-sm">{c.name}</td><td className="p-3 sm:p-4 text-sm text-gray-600">{c.email}</td><td className="p-3 sm:p-4"><span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{c.service}</span></td><td className="p-3 sm:p-4 text-sm text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</td><td className="p-3 sm:p-4">{!c.read ? <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full font-medium">Unread</span> : <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">Read</span>}</td></tr>))}
                      {contacts.length === 0 && <tr><td colSpan={5} className="p-12 text-center text-gray-400"><Activity size={40} className="mx-auto mb-2 opacity-50" /><p>No inquiries found</p></td></tr>}</tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="mb-6"><button onClick={() => setActiveTab('dashboard')} className="flex items-center space-x-2 text-gray-500 hover:text-accent mb-2"><ArrowLeft size={18} /><span>Back to Dashboard</span></button><div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><h1 className="text-2xl sm:text-3xl font-bold text-primary">Booking Management</h1><p className="text-gray-500 text-sm">Manage customer appointments and bookings</p></div><button onClick={exportBookingsToCSV} className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2"><Download size={18} /><span>Export CSV</span></button></div></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-4 text-center border"><p className="text-2xl font-bold text-primary">{bookings.length}</p><p className="text-xs text-gray-500">Total</p></div>
                  <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-200"><p className="text-2xl font-bold text-yellow-600">{bookings.filter(b => b.status === 'pending').length}</p><p className="text-xs text-gray-600">Pending</p></div>
                  <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200"><p className="text-2xl font-bold text-green-600">{bookings.filter(b => b.status === 'confirmed').length}</p><p className="text-xs text-gray-600">Confirmed</p></div>
                  <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200"><p className="text-2xl font-bold text-red-600">{bookings.filter(b => b.status === 'cancelled').length}</p><p className="text-xs text-gray-600">Cancelled</p></div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                      <thead className="bg-gray-50 border-b"><tr><th className="p-4 text-left text-sm font-semibold">Customer</th><th className="p-4 text-left text-sm font-semibold">Service</th><th className="p-4 text-left text-sm font-semibold">Date & Time</th><th className="p-4 text-left text-sm font-semibold">Contact</th><th className="p-4 text-left text-sm font-semibold">Status</th><th className="p-4 text-left text-sm font-semibold">Message</th><th className="p-4 text-left text-sm font-semibold">Actions</th></tr></thead>
                      <tbody className="divide-y">{bookings.map((booking) => (<tr key={booking._id} className="hover:bg-gray-50"><td className="p-4"><div><p className="font-semibold text-primary">{booking.name}</p><p className="text-xs text-gray-400">{new Date(booking.createdAt).toLocaleDateString()}</p></div></td><td className="p-4"><span className="text-sm text-gray-600">{booking.service}</span></td><td className="p-4"><p className="text-sm font-medium">{new Date(booking.date).toLocaleDateString()}</p><p className="text-xs text-gray-400">{booking.time}</p></td><td className="p-4"><a href={`mailto:${booking.email}`} className="text-sm text-blue-600 block">{booking.email}</a><a href={`tel:${booking.phone}`} className="text-sm text-green-600 block">{booking.phone}</a></td><td className="p-4"><select value={booking.status} onChange={(e) => updateBookingStatus(booking._id, e.target.value)} className={`text-xs px-2 py-1 rounded-full ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="cancelled">Cancelled</option></select></td><td className="p-4"><button onClick={() => viewBookingMessage(booking)} className="text-gray-500 hover:text-accent"><Eye size={18} /></button></td><td className="p-4"><div className="flex space-x-2"><a href={`https://wa.me/${booking.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(booking.name)}%2C%20your%20booking%20for%20${encodeURIComponent(booking.service)}%20on%20${booking.date}%20at%20${booking.time}%20has%20been%20confirmed.`} target="_blank" className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><MessageCircle size={18} /></a><a href={`mailto:${booking.email}?subject=Booking Confirmation&body=Dear%20${encodeURIComponent(booking.name)}%2C%0AYour%20booking%20has%20been%20confirmed.`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Mail size={18} /></a><button onClick={() => deleteBooking(booking._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button></div></td></tr>))}
                      {bookings.length === 0 && <tr><td colSpan={7} className="p-12 text-center text-gray-400"><Calendar size={48} className="mx-auto mb-3 opacity-50" /><p>No bookings yet</p></td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
                {showMessageModal && selectedBooking && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-2xl max-w-lg w-full">
                      <div className="p-6 border-b flex justify-between"><div><h2 className="text-2xl font-bold text-primary">Customer Message</h2><p className="text-sm text-gray-500">From: {selectedBooking.name}</p></div><button onClick={() => setShowMessageModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={24} /></button></div>
                      <div className="p-6"><div className="bg-gray-50 rounded-xl p-4 mb-4"><p className="text-gray-700 whitespace-pre-wrap">{selectedBooking.message || "No message provided"}</p></div><div className="flex gap-3"><a href={`mailto:${selectedBooking.email}`} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-center hover:bg-blue-700">Reply via Email</a><a href={`https://wa.me/${selectedBooking.phone.replace(/[^0-9]/g, '')}`} target="_blank" className="flex-1 bg-green-600 text-white py-2 rounded-lg text-center hover:bg-green-700">WhatsApp</a></div></div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <motion.div><div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><button onClick={() => setActiveTab('dashboard')} className="flex items-center space-x-2 text-gray-500 hover:text-accent mb-2"><ArrowLeft size={18} /><span>Back to Dashboard</span></button><h1 className="text-2xl sm:text-3xl font-bold text-primary">Services</h1><p className="text-gray-500 text-sm">Manage your services offered</p></div><button onClick={() => { setEditingService(null); setServiceForm({ title: '', description: '', icon: 'Code', features: '', order: 0 }); setShowServiceModal(true); }} className="bg-accent text-white px-5 py-2 rounded-xl flex items-center space-x-2 shadow-md"><Plus size={18} /><span>Add Service</span></button></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{services.map(s => (<div key={s._id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all group"><div className="flex justify-between items-start"><div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform">{getIcon(s.icon)}</div><div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => editService(s)} className="p-1 hover:text-accent"><Edit size={18} /></button><button onClick={() => handleDeleteService(s._id)} className="p-1 hover:text-red-500"><Trash2 size={18} /></button></div></div><h3 className="text-xl font-bold mt-4 text-primary">{s.title}</h3><p className="text-gray-500 text-sm mt-2">{s.description}</p><div className="flex flex-wrap gap-2 mt-4">{s.features.slice(0, 3).map((f, i) => (<span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{f}</span>))}</div></div>))}{services.length === 0 && <div className="col-span-full text-center py-12 text-gray-400">No services yet. Click "Add Service" to get started.</div>}</div></motion.div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <motion.div><div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><button onClick={() => setActiveTab('dashboard')} className="flex items-center space-x-2 text-gray-500 hover:text-accent mb-2"><ArrowLeft size={18} /><span>Back to Dashboard</span></button><h1 className="text-2xl sm:text-3xl font-bold text-primary">Projects</h1><p className="text-gray-500 text-sm">Manage your portfolio projects</p></div><button onClick={() => { setEditingProject(null); setProjectForm({ title: '', category: 'web', imageUrl: '', description: '', technologies: '', featured: false }); setShowProjectModal(true); }} className="bg-accent text-white px-5 py-2 rounded-xl flex items-center space-x-2 shadow-md"><Plus size={18} /><span>Add Project</span></button></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{projects.map(p => (<div key={p._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group"><div className="relative h-48 overflow-hidden">{p.imageUrl ? <img src={p.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={p.title} /> : <div className="w-full h-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center"><ImageIcon size={48} className="text-gray-400" /></div>}{p.featured && <div className="absolute top-3 right-3 bg-accent text-white text-xs px-2 py-1 rounded-full shadow-md"><Star size={12} className="inline mr-1" />Featured</div>}</div><div className="p-5"><div className="flex justify-between items-start"><div><span className="text-xs text-accent font-bold uppercase tracking-wider">{p.category}</span><h3 className="text-lg font-bold mt-1 text-primary">{p.title}</h3></div><div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => editProject(p)} className="p-1 hover:text-accent"><Edit size={18} /></button><button onClick={() => handleDeleteProject(p._id)} className="p-1 hover:text-red-500"><Trash2 size={18} /></button></div></div><p className="text-gray-500 text-sm mt-2 line-clamp-2">{p.description}</p></div></div>))}{projects.length === 0 && <div className="col-span-full text-center py-12 text-gray-400">No projects yet. Click "Add Project" to get started.</div>}</div></motion.div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <motion.div><div className="mb-6"><button onClick={() => setActiveTab('dashboard')} className="flex items-center space-x-2 text-gray-500 hover:text-accent mb-2"><ArrowLeft size={18} /><span>Back to Dashboard</span></button><div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><h1 className="text-2xl sm:text-3xl font-bold text-primary">Contact Inquiries</h1><p className="text-gray-500 text-sm">Manage customer messages and requests</p></div><button onClick={exportToCSV} className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 shadow-md"><Download size={18} /><span>Export CSV</span></button></div></div>
              <div className="bg-white rounded-2xl shadow-sm border overflow-hidden"><div className="overflow-x-auto"><table className="w-full min-w-[800px]"><thead className="bg-gray-50"><tr><th className="p-4 text-left text-sm font-semibold">Name</th><th className="p-4 text-left text-sm font-semibold">Contact</th><th className="p-4 text-left text-sm font-semibold">Service</th><th className="p-4 text-left text-sm font-semibold">Message</th><th className="p-4 text-left text-sm font-semibold">Date</th><th className="p-4 text-left text-sm font-semibold">Status</th><th className="p-4 text-left text-sm font-semibold">Actions</th></tr></thead><tbody className="divide-y">{contacts.map(c => (<tr key={c._id} className={!c.read ? 'bg-blue-50' : ''}><td className="p-4 font-medium text-primary">{c.name}</td><td className="p-4 text-sm"><div className="font-medium">{c.email}</div><div className="text-gray-500 text-xs">{c.phone}</div></td><td className="p-4"><span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{c.service}</span></td><td className="p-4 text-sm max-w-xs truncate text-gray-600">{c.message}</td><td className="p-4 text-sm text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</td><td className="p-4">{!c.read ? <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full font-medium">Unread</span> : <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">Read</span>}</td><td className="p-4"><div className="flex space-x-2">{!c.read && <button onClick={() => markAsRead(c._id)} className="text-green-500 hover:text-green-700 p-1 rounded-lg hover:bg-green-50"><Eye size={18} /></button>}<button onClick={() => handleDeleteContact(c._id)} className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50"><Trash2 size={18} /></button></div></td></tr>))}{contacts.length === 0 && <tr><td colSpan={7} className="p-12 text-center text-gray-400"><Activity size={40} className="mx-auto mb-2 opacity-50" /><p>No inquiries found</p></td></tr>}</tbody></table></div></div></motion.div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div><div className="mb-6"><button onClick={() => setActiveTab('dashboard')} className="flex items-center space-x-2 text-gray-500 hover:text-accent mb-2"><ArrowLeft size={18} /><span>Back to Dashboard</span></button><div className="flex justify-between items-center"><div><h1 className="text-2xl sm:text-3xl font-bold text-primary">Profile Settings</h1><p className="text-gray-500 text-sm">Manage your account information</p></div>{!isEditingProfile && <button onClick={() => setIsEditingProfile(true)} className="bg-accent text-white px-4 py-2 rounded-xl flex items-center space-x-2 shadow-md"><Edit size={18} /><span>Edit Profile</span></button>}</div></div>
              {profileMessage && <div className={`mb-4 p-3 rounded-lg ${profileMessage.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{profileMessage}</div>}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><div className="lg:col-span-1"><div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center"><div className="w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4 shadow-lg">{admin?.name?.charAt(0) || 'A'}</div><h3 className="text-xl font-bold text-primary">{admin?.name}</h3><p className="text-gray-500 text-sm mt-1">{admin?.email}</p><p className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full inline-block mt-3">{admin?.role || 'Administrator'}</p></div></div>
              <div className="lg:col-span-2 space-y-6">{isEditingProfile ? (<><div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"><h2 className="text-xl font-bold mb-4">Edit Profile</h2><form onSubmit={handleUpdateProfile} className="space-y-4"><div><label className="block text-sm font-medium mb-1">Full Name</label><input type="text" value={profileForm.name} onChange={(e) => setProfileForm({...profileForm, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent" required /></div><div><label className="block text-sm font-medium mb-1">Email</label><input type="email" value={profileForm.email} className="w-full px-4 py-2 border rounded-lg bg-gray-50" disabled /></div><div><label className="block text-sm font-medium mb-1">Phone</label><input type="tel" value={profileForm.phone || ''} onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})} className="w-full px-4 py-2 border rounded-lg" /></div><div><label className="block text-sm font-medium mb-1">Bio</label><textarea rows={3} value={profileForm.bio || ''} onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})} className="w-full px-4 py-2 border rounded-lg" /></div><div className="flex space-x-3"><button type="submit" disabled={loading} className="bg-accent text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all">{loading ? 'Saving...' : 'Save'}</button><button type="button" onClick={() => setIsEditingProfile(false)} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-all">Cancel</button></div></form></div><div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"><h2 className="text-xl font-bold mb-4">Change Password</h2><form onSubmit={handleChangePassword} className="space-y-4"><div><label className="block text-sm font-medium mb-1">Current Password</label><input type="password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent" required /></div><div><label className="block text-sm font-medium mb-1">New Password</label><input type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required /></div><div><label className="block text-sm font-medium mb-1">Confirm Password</label><input type="password" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required /></div><button type="submit" disabled={loading} className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all">{loading ? 'Updating...' : 'Update Password'}</button></form></div></>) : (<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"><h2 className="text-xl font-bold mb-4">Profile Information</h2><div className="space-y-4"><div className="grid grid-cols-2 gap-4"><div><p className="text-sm text-gray-500">Full Name</p><p className="font-medium text-primary">{admin?.name}</p></div><div><p className="text-sm text-gray-500">Email</p><p className="font-medium text-primary">{admin?.email}</p></div></div><div><p className="text-sm text-gray-500">Phone</p><p className="font-medium text-primary">{admin?.phone || 'Not set'}</p></div><div><p className="text-sm text-gray-500">Bio</p><p className="text-gray-600">{admin?.bio || 'No bio added yet'}</p></div><div><p className="text-sm text-gray-500">Role</p><p className="font-medium capitalize text-primary">{admin?.role}</p></div></div></div>)}</div></div></motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Modals */}
      {showProjectModal && (<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"><motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl max-w-lg w-full shadow-2xl"><div className="p-6 border-b border-gray-100 flex justify-between items-center"><h2 className="text-2xl font-bold text-primary">{editingProject ? 'Edit Project' : 'Add Project'}</h2><button onClick={() => setShowProjectModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-all"><X size={24} /></button></div><form onSubmit={handleAddProject} className="p-6 space-y-4"><input type="text" placeholder="Project Title" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} required /><select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" value={projectForm.category} onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}><option value="web">Web Development</option><option value="mobile">Mobile App</option><option value="ai">AI/ML</option><option value="design">UI/UX Design</option></select><input type="url" placeholder="Image URL" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" value={projectForm.imageUrl} onChange={(e) => setProjectForm({...projectForm, imageUrl: e.target.value})} /><textarea placeholder="Description" rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" value={projectForm.description} onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} required /><input type="text" placeholder="Technologies (comma separated)" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" value={projectForm.technologies} onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})} /><label className="flex items-center space-x-2 cursor-pointer"><input type="checkbox" checked={projectForm.featured} onChange={(e) => setProjectForm({...projectForm, featured: e.target.checked})} className="w-4 h-4 text-accent rounded" /><span className="text-sm text-gray-700">Mark as Featured Project</span></label><div className="flex space-x-3 pt-2"><button type="submit" className="flex-1 bg-accent text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all">{loading ? 'Saving...' : (editingProject ? 'Update' : 'Add')}</button><button type="button" onClick={() => setShowProjectModal(false)} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-all">Cancel</button></div></form></motion.div></div>)}

      {showServiceModal && (<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"><motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl max-w-lg w-full shadow-2xl"><div className="p-6 border-b border-gray-100 flex justify-between items-center"><h2 className="text-2xl font-bold text-primary">{editingService ? 'Edit Service' : 'Add Service'}</h2><button onClick={() => setShowServiceModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-all"><X size={24} /></button></div><form onSubmit={handleAddService} className="p-6 space-y-4"><input type="text" placeholder="Service Title" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" value={serviceForm.title} onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})} required /><textarea placeholder="Description" rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" value={serviceForm.description} onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})} required /><select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" value={serviceForm.icon} onChange={(e) => setServiceForm({...serviceForm, icon: e.target.value})}>{iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}</select><input type="text" placeholder="Features (comma separated)" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all" value={serviceForm.features} onChange={(e) => setServiceForm({...serviceForm, features: e.target.value})} /><div className="flex space-x-3 pt-2"><button type="submit" className="flex-1 bg-accent text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all">{loading ? 'Saving...' : (editingService ? 'Update' : 'Add')}</button><button type="button" onClick={() => setShowServiceModal(false)} className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-all">Cancel</button></div></form></motion.div></div>)}
    </div>
  );
}