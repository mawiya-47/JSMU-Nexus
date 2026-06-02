import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, GraduationCap, Menu, X, Landmark, 
  Activity, Users, FileText, Calendar, KeyRound, 
  Mail, Phone, Clock, ShieldCheck, HeartPulse,
  MapPin, Loader2
} from 'lucide-react';

import { News, Event, Faculty } from './types';

// Subcomponents imports
import HomeView from './components/HomeView';
import AdmissionsView from './components/AdmissionsView';
import DepartmentsView from './components/DepartmentsView';
import NewsView from './components/NewsView';
import EventsView from './components/EventsView';
import ResultsView from './components/ResultsView';
import FacultyView from './components/FacultyView';
import ContactView from './components/ContactView';
import StudentPortal from './components/StudentPortal';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Auth states
  const [token, setToken] = useState<string | null>(localStorage.getItem('jsmu_token'));
  const [user, setUser] = useState<any | null>(JSON.parse(localStorage.getItem('jsmu_user') || 'null'));

  // Database synchronizers state
  const [newsList, setNewsList] = useState<News[]>([]);
  const [eventsList, setEventsList] = useState<Event[]>([]);
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  // Sync general lists on mount
  const refreshAllData = async () => {
    try {
      const [newsResp, evResp, facResp] = await Promise.all([
        fetch('/api/news'),
        fetch('/api/events'),
        fetch('/api/faculty')
      ]);

      if (newsResp.ok) {
        const news = await newsResp.json();
        setNewsList(news);
      }
      if (evResp.ok) {
        const evs = await evResp.json();
        setEventsList(evs);
      }
      if (facResp.ok) {
        const facs = await facResp.json();
        setFacultyList(facs);
      }
    } catch (e) {
      console.error('Failed communicating with JSMU dataset engine:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  const handleLoginSuccess = (newToken: string, loggedUser: any) => {
    localStorage.setItem('jsmu_token', newToken);
    localStorage.setItem('jsmu_user', JSON.stringify(loggedUser));
    setToken(newToken);
    setUser(loggedUser);
    setCurrentView('admin'); // Instantly route to administration workspace
  };

  const handleLogout = () => {
    localStorage.removeItem('jsmu_token');
    localStorage.removeItem('jsmu_user');
    setToken(null);
    setUser(null);
    setCurrentView('home');
  };

  const navigationItems = [
    { id: 'home', label: 'Home Page' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'departments', label: 'Syllabus & Colleges' },
    { id: 'news', label: 'Press & Media' },
    { id: 'events', label: 'Milestones' },
    { id: 'results', label: 'Grades Checking' },
    { id: 'faculty', label: 'Clinicians' },
    { id: 'contact', label: 'Contact Public Cell' },
  ];

  return (
    <div id="universal-app-shell" className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-red-800 selection:text-white">
      
      {/* Upper announcements strip */}
      <div id="alert-banner-top" className="bg-slate-950 border-b border-slate-900 text-slate-350 text-[11px] py-3 px-4 block">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="flex items-center gap-1 font-semibold"><MapPin size={12} className="text-red-700" /> JSMU Karachi Cantonment Sindh</span>
            <span className="w-1.5 h-1.5 bg-red-700 rounded-full hidden sm:block"></span>
            <span className="flex items-center gap-1 font-semibold"><Phone size={12} className="text-red-700" /> exchange desk phone: +92-21-99205185</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] bg-amber-400/20 border border-amber-400/30 px-2 py-0.5 rounded-sm font-black text-amber-500 uppercase tracking-widest block">
              Admission Intake Fall 2026-27 Active
            </span>
          </div>
        </div>
      </div>

      {/* Header element */}
      <header id="main-navigation-header" className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          
          {/* Logo brand */}
          <div 
            onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 bg-red-900 group-hover:bg-red-950 transition-colors text-amber-400 rounded-sm flex items-center justify-center shadow-md font-serif text-2xl font-black italic">
              J
            </div>
            <div>
              <span className="font-serif font-bold text-sm tracking-tight text-slate-900 block leading-tight">Jinnah Sindh Medical</span>
              <span className="text-[10px] uppercase font-extrabold text-red-800 tracking-widest block mt-0.5">University کراچی</span>
            </div>
          </div>

          {/* Large display nav items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`px-3.5 py-1.5 rounded-sm text-[11px] font-bold tracking-tight transition-all cursor-pointer uppercase ${
                  currentView === item.id 
                  ? 'bg-red-50 text-red-900 border-b-2 border-red-900' 
                  : 'text-slate-600 hover:text-red-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right quick portals and mobile drawer triggers */}
          <div className="flex items-center gap-2">
            
            {/* Conditional Portal / Dashboard path */}
            {token ? (
              <button
                onClick={() => setCurrentView('admin')}
                className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-amber-400 text-slate-950 hover:bg-amber-500 font-bold text-[11px] rounded-sm shadow-sm transition-all cursor-pointer uppercase tracking-wider"
              >
                <ShieldCheck size={14} />
                VC Terminal
              </button>
            ) : (
              <button
                onClick={() => setCurrentView('portal')}
                className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white hover:bg-slate-850 font-bold text-[11px] rounded-sm shadow-sm transition-all cursor-pointer uppercase tracking-wider"
              >
                <KeyRound size={13} className="mr-0.5 text-amber-500" />
                Staff Portal
              </button>
            )}

            {/* Mobile burger toggle trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu slide down drawer */}
        {mobileMenuOpen && (
          <div id="mobile-menu-drawer" className="lg:hidden bg-white border-t border-slate-200 p-4 space-y-2 text-center shadow-lg">
            <div className="flex flex-col gap-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setCurrentView(item.id); setMobileMenuOpen(false); }}
                  className={`w-full py-2.5 rounded-sm text-xs font-bold text-center ${
                    currentView === item.id 
                    ? 'bg-red-50 text-red-900' 
                    : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="border-t border-slate-100 pt-3 mt-2 flex flex-col gap-2">
                {token ? (
                  <button
                    onClick={() => { setCurrentView('admin'); setMobileMenuOpen(false); }}
                    className="w-full py-2.5 bg-amber-45 bg-amber-400 text-slate-950 font-bold rounded-sm text-xs uppercase tracking-wide cursor-pointer"
                  >
                    VC Command Office
                  </button>
                ) : (
                  <button
                    onClick={() => { setCurrentView('portal'); setMobileMenuOpen(false); }}
                    className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-sm text-xs uppercase tracking-wide cursor-pointer"
                  >
                    Staff Portal Login
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content viewport container */}
      <main id="app-viewport-wrapper" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full animate-none">
        
        {loading ? (
          <div id="loader-fallback" className="py-24 text-center space-y-3">
            <Loader2 size={36} className="animate-spin text-red-700 mx-auto" />
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Syncing Jinnah Sindh Medical Univ datasets...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-full"
            >
              {currentView === 'home' && (
                <HomeView 
                  newsList={newsList} 
                  eventsList={eventsList} 
                  onNavigate={(view) => setCurrentView(view)} 
                />
              )}

              {currentView === 'admissions' && (
                <AdmissionsView 
                  onApplySuccess={refreshAllData}
                />
              )}

              {currentView === 'departments' && <DepartmentsView />}

              {currentView === 'news' && <NewsView newsList={newsList} />}

              {currentView === 'events' && <EventsView eventsList={eventsList} />}

              {currentView === 'results' && <ResultsView />}

              {currentView === 'faculty' && <FacultyView facultyList={facultyList} />}

              {currentView === 'contact' && <ContactView />}

              {currentView === 'portal' && (
                token ? (
                  <AdminDashboard 
                    token={token} 
                    user={user} 
                    onLogout={handleLogout} 
                    newsList={newsList}
                    eventsList={eventsList}
                    facultyList={facultyList}
                    onRefreshAllData={refreshAllData}
                  />
                ) : (
                  <StudentPortal onLoginSuccess={handleLoginSuccess} />
                )
              )}

              {currentView === 'admin' && (
                token ? (
                  <AdminDashboard 
                    token={token} 
                    user={user} 
                    onLogout={handleLogout} 
                    newsList={newsList}
                    eventsList={eventsList}
                    facultyList={facultyList}
                    onRefreshAllData={refreshAllData}
                  />
                ) : (
                  <StudentPortal onLoginSuccess={handleLoginSuccess} />
                )
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* Unified footer */}
      <footer id="jsmu-unified-footer" className="bg-slate-950 text-slate-400 border-t border-slate-900 mt-20 shrink-0 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-red-900 text-amber-400 font-serif font-black rounded-sm flex items-center justify-center text-sm italic shadow-md">J</div>
              <span className="font-serif font-bold text-xs uppercase tracking-wider block text-white">Jinnah Sindh Med Univ</span>
            </div>
            <p className="text-xs text-slate-450 text-slate-400 leading-relaxed font-light">
              A premier public medical academy registered by HEC and certified by Pakistan Medical Commission (PMC), training globally recognized clinical, operative, and dental experts on a Cantonment Karachi campus.
            </p>
          </div>

          <div>
            <h3 className="text-amber-400 font-bold block mb-4 text-[10px] uppercase tracking-widest font-sans">Medical Divisions</h3>
            <ul className="text-xs text-slate-300 space-y-2 font-semibold">
              <li>Sindh Medical College (MBBS)</li>
              <li>Sindh Institute of Oral Sciences (BDS)</li>
              <li>Appasasi College of Pharmacy (Pharm.D)</li>
              <li>Jinnah Nursing College (BSN)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-amber-400 font-bold block mb-4 text-[10px] uppercase tracking-widest font-sans">Registrars Directories</h3>
            <ul className="text-xs text-slate-300 space-y-2 font-semibold font-sans">
              <li>Admissions Matriculation</li>
              <li>MDCAT Board Guidelines</li>
              <li>HEC Curriculums</li>
              <li>Controller of Examinations</li>
            </ul>
          </div>

          <div>
            <h3 className="text-amber-400 font-bold block mb-4 text-[10px] uppercase tracking-widest font-sans font-sans font-sans">Campus Desk</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light font-sans font-sans">
              Rafiqui H.J. Shaheed Road, Karachi Cantonment, Sindh, Pakistan. <br />
              Email: admissions@jsmu.edu.pk <br />
              Ph: +92-21-99205185
            </p>
          </div>

        </div>

        <div className="bg-slate-990 border-t border-slate-900 py-6 text-center text-[10px] text-slate-500 font-medium font-sans">
          <p>© 2026 Jinnah Sindh Medical University (JSMU). Integrated Administrative Syndicate Workspaces. PMC and HEC Category-Leading Campus.</p>
        </div>
      </footer>

    </div>
  );
}
