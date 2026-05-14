import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LogIn, LogOut, LayoutDashboard, MessageSquare, Files, Plus, Trash2, Edit, Save } from 'lucide-react';
import api from '../lib/axios';
import { cn } from '../lib/utils';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'contacts' | 'projects'>('contacts');
  const [contacts, setContacts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('🔍 Checking localStorage for token...');
    const token = localStorage.getItem('astack_token');
    console.log('Token exists?', !!token);
    
    if (token) {
      console.log('✅ Token found, setting isLoggedIn to true');
      setIsLoggedIn(true);
      fetchData();
    } else {
      console.log('❌ No token found');
    }
  }, []);

  const fetchData = async () => {
    console.log('📡 Fetching dashboard data...');
    setLoading(true);
    try {
      const [contRes, projRes] = await Promise.all([
        api.get('/contact'),
        api.get('/projects')
      ]);
      console.log('Contacts:', contRes.data?.length || 0);
      console.log('Projects:', projRes.data?.length || 0);
      setContacts(contRes.data || []);
      setProjects(projRes.data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔑 Login attempt with:', email);
    setLoading(true);
    setMessage('');
    
    try {
      const res = await api.post('/admin/login', { email, password });
      console.log('📦 Login response:', res.data);
      
      if (res.data.token) {
        console.log('✅ Login successful! Saving token...');
        localStorage.setItem('astack_token', res.data.token);
        localStorage.setItem('astack_admin', JSON.stringify(res.data.admin));
        
        console.log('🔄 Setting isLoggedIn to true...');
        setIsLoggedIn(true);
        
        console.log('📡 Fetching data...');
        await fetchData();
        
        console.log('✅ Dashboard should now be visible!');
      }
    } catch (err: any) {
      console.error('❌ Login error:', err);
      setMessage(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    console.log('🚪 Logging out...');
    localStorage.removeItem('astack_token');
    localStorage.removeItem('astack_admin');
    setIsLoggedIn(false);
    setContacts([]);
    setProjects([]);
  };

  console.log('🖥️ Rendering AdminPage, isLoggedIn =', isLoggedIn);

  // ✅ If not logged in, show login form
  if (!isLoggedIn) {
    console.log('📱 Showing login form');
    return (
      <div className="min-h-screen flex items-center justify-center bg-soft px-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-primary">Admin Login</h2>
            <p className="text-sm text-gray-500 mt-2">Manage Astack Solutions Portal</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 block">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-soft border border-gray-100 rounded-2xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                placeholder="admin@astack.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 block">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-soft border border-gray-100 rounded-2xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            {message && <p className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded-lg">{message}</p>}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-primary-dark transition-all disabled:opacity-70 shadow-lg shadow-primary/20"
            >
              {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 
                <>
                  <span>Sign In</span>
                  <LogIn size={20} />
                </>
              }
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ✅ If logged in, show dashboard
  console.log('📊 Showing dashboard');
  return (
    <div className="min-h-screen bg-soft pt-32 pb-24 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-display font-bold">Admin <span className="text-accent underline">Dashboard</span></h1>
            <p className="text-gray-500 mt-2">Manage your inquiries and showcase projects.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-500 hover:text-red-600 font-bold bg-red-50 px-6 py-3 rounded-2xl transition-all"
          >
            <span>Logout</span>
            <LogOut size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="md:col-span-1 space-y-4">
            <button 
              onClick={() => setActiveTab('contacts')}
              className={cn(
                "w-full flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold transition-all",
                activeTab === 'contacts' ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white text-primary border border-gray-100 hover:border-accent"
              )}
            >
              <MessageSquare size={20} />
              <span>Inquiries</span>
              <span className="ml-auto bg-black/10 text-[10px] px-2 py-0.5 rounded-full">{contacts.length}</span>
            </button>
            <button 
              onClick={() => setActiveTab('projects')}
              className={cn(
                "w-full flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold transition-all",
                activeTab === 'projects' ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white text-primary border border-gray-100 hover:border-accent"
              )}
            >
              <Files size={20} />
              <span>Portfolio</span>
              <span className="ml-auto bg-black/10 text-[10px] px-2 py-0.5 rounded-full">{projects.length}</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 min-h-[60vh]">
              {activeTab === 'contacts' ? (
                <div className="space-y-6">
                  <h3 className="text-2xl font-display font-bold mb-8">Recent Submissions</h3>
                  {contacts.length === 0 ? (
                    <p className="text-gray-400 italic">No messages found yet.</p>
                  ) : (
                    contacts.map((c: any) => (
                      <div key={c._id} className="p-6 rounded-2xl bg-soft border border-gray-50">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-bold text-lg">{c.name}</h4>
                            <p className="text-sm text-accent font-medium">{c.email} • {c.phone}</p>
                          </div>
                          <span className="text-[10px] uppercase tracking-widest font-bold bg-primary/10 px-3 py-1 rounded-full">{c.service}</span>
                        </div>
                        <p className="text-gray-600 text-sm italic mb-4">"{c.message}"</p>
                        <p className="text-[10px] text-gray-400">{new Date(c.createdAt).toLocaleString()}</p>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-display font-bold">Manage Portfolio</h3>
                    <button className="bg-accent text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center space-x-2">
                       <Plus size={18} />
                       <span>Add Project</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {projects.map((p: any) => (
                      <div key={p._id} className="bg-soft rounded-2xl p-4 flex space-x-4 border border-gray-50 group hover:border-accent transition-colors">
                         <img src={p.imageUrl} className="w-24 h-24 rounded-xl object-cover shadow-sm" alt="" />
                         <div className="flex-1 min-w-0">
                           <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">{p.category}</p>
                           <h4 className="font-bold truncate text-primary">{p.title}</h4>
                           <div className="flex items-center space-x-5 mt-4">
                             <button className="text-gray-400 hover:text-accent transition-colors"><Edit size={16} /></button>
                             <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                           </div>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}