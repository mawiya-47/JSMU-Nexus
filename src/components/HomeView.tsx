import React from 'react';
import { motion } from 'motion/react';
import { Award, BookOpen, GraduationCap, ChevronRight, Bell, Calendar, Flame, Database, ShieldAlert } from 'lucide-react';
import { News, Event } from '../types';

interface HomeViewProps {
  newsList: News[];
  eventsList: Event[];
  onNavigate: (view: string) => void;
}

export default function HomeView({ newsList, eventsList, onNavigate }: HomeViewProps) {
  return (
    <div id="home-view" className="space-y-12">
      {/* Hero & Quick announcements Container */}
      <div className="flex flex-col lg:flex-row gap-8 min-h-115">
        {/* Left Hero Box */}
        <div className="flex-1 min-h-95 rounded-2xl bg-linear-to-r from-slate-950 via-slate-900 to-slate-800 p-8 md:p-12 text-white relative overflow-hidden flex flex-col justify-end shadow-xl border border-slate-800/40">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            {/* Ambient pattern */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-900/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-60 h-60 bg-amber-500/20 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative z-10 space-y-4">
            <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-3 py-1 uppercase rounded-sm inline-block tracking-widest">
              70 Years of Acceding Legacy
            </span>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight font-medium tracking-tight text-white italic">
              Pioneering Medical <br/>Education in Pakistan
            </h2>
            <p className="text-slate-350 text-slate-300 text-xs md:text-sm max-w-lg leading-relaxed font-light">
              Join the ranks of globally accredited healthcare professionals. High-impact clinical learning modules, integrated tertiary hospitals, and HEC category-leading research.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => onNavigate('admissions')}
                className="bg-red-700 hover:bg-red-800 text-white font-bold text-xs py-3.5 px-8 rounded-sm shadow-xl transition-all cursor-pointer inline-flex items-center gap-2 uppercase tracking-wide"
              >
                Apply Online Now <ChevronRight size={14} />
              </button>
              <button 
                onClick={() => onNavigate('departments')}
                className="border border-white/30 hover:bg-white/10 text-white font-bold text-xs py-3.5 px-6 rounded-sm transition-all cursor-pointer uppercase tracking-wide"
              >
                View Curriculums
              </button>
            </div>
          </div>
        </div>

        {/* Quick Access Side Panel */}
        <div className="w-full lg:w-96 bg-white border border-slate-250 rounded-2xl flex flex-col justify-between overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <Bell size={15} className="text-red-700" />
              <h3 className="font-extrabold text-slate-900 uppercase text-xs tracking-wider">Latest Bulletins</h3>
            </div>
            <button 
              onClick={() => onNavigate('news')}
              className="text-[10px] text-red-900 font-extrabold hover:underline uppercase tracking-wider cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="p-5 space-y-4 flex-1">
            {newsList.slice(0, 3).map((item, index) => {
              const date = new Date(item.createdAt);
              const day = date.getDate();
              const month = date.toLocaleString('default', { month: 'short' });
              
              return (
                <div 
                  key={item.id} 
                  onClick={() => onNavigate('news')}
                  className="flex gap-4 group cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors"
                >
                  <div className="w-11 h-11 bg-slate-100 shrink-0 flex flex-col items-center justify-center border border-slate-200 rounded-sm">
                    <span className="text-red-700 font-black text-sm leading-none">{day}</span>
                    <span className="text-[9px] uppercase text-slate-500 font-semibold">{month}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{item.content}</p>
                  </div>
                </div>
              );
            })}

            {newsList.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-6">No announcements published recently.</p>
            )}

            {/* Quick Examination links */}
            <div className="p-4 bg-slate-50 border-l-4 border-amber-400 rounded-r-lg space-y-2">
              <h4 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider">Registrar Directories</h4>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => onNavigate('results')}
                  className="text-[10px] bg-white border border-slate-200 py-1.5 rounded-sm font-semibold text-slate-700 hover:border-red-900 transition-colors cursor-pointer"
                >
                  Grade Sheets
                </button>
                <button 
                  onClick={() => onNavigate('admissions')}
                  className="text-[10px] bg-white border border-slate-200 py-1.5 rounded-sm font-semibold text-slate-700 hover:border-red-900 transition-colors cursor-pointer"
                >
                  Eligibilities
                </button>
              </div>
            </div>
          </div>

          <div className="p-5 bg-linear-to-r from-red-950 to-red-900 text-white flex items-center justify-between">
            <div>
              <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-red-200">Official Access</h4>
              <p className="text-[11px] text-white opacity-90 mt-0.5">Faculty clinical login workspace</p>
            </div>
            <button 
              onClick={() => onNavigate('admin')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-[10px] font-bold text-white px-3.5 py-1.5 rounded-sm uppercase tracking-wide transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* University Main Academic Segments */}
      <section className="space-y-6">
        <h3 className="text-center font-serif text-2xl font-bold italic text-slate-900 block">JSMU Key Academic Divisions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 border border-slate-200 rounded-xl space-y-3 shadow-xs">
            <GraduationCap className="text-red-700 w-8 h-8" />
            <h4 className="text-sm font-bold text-slate-900 tracking-tight uppercase">Sindh Medical College (SMC)</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Pioneered in 1973, SMC has trained over 15,000 physicians working globally in renowned cardiology, neurosurgery, and oncology tracks.
            </p>
            <button 
              onClick={() => onNavigate('departments')}
              className="text-xs font-bold text-red-700 hover:text-red-800 uppercase inline-flex items-center gap-1 cursor-pointer"
            >
              Read curriculum <ChevronRight size={13} />
            </button>
          </div>

          <div className="bg-white p-6 border border-slate-200 rounded-xl space-y-3 shadow-xs">
            <BookOpen className="text-red-700 w-8 h-8" />
            <h4 className="text-sm font-bold text-slate-900 tracking-tight uppercase">Sindh Institute of Oral Sciences (SIOS)</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Accredited BDS degree frameworks offering fully equipped phantom heads laboratories and operational prosthodontic surgery wards.
            </p>
            <button 
              onClick={() => onNavigate('departments')}
              className="text-xs font-bold text-red-700 hover:text-red-800 uppercase inline-flex items-center gap-1 cursor-pointer"
            >
              Check clinical seats <ChevronRight size={13} />
            </button>
          </div>

          <div className="bg-white p-6 border border-slate-200 rounded-xl space-y-3 shadow-xs">
            <Award className="text-red-700 w-8 h-8" />
            <h4 className="text-sm font-bold text-slate-900 tracking-tight uppercase">Appasasi Pharmacy & Nursing Colleges</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Highly integrated Pharm.D and Bachelor of Nursing programs registered by the pharmacy council ensuring direct medical camp placements.
            </p>
            <button 
              onClick={() => onNavigate('departments')}
              className="text-xs font-bold text-red-700 hover:text-red-800 uppercase inline-flex items-center gap-1 cursor-pointer"
            >
              Detailed timeline <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* Legacy Statistics Grid */}
      <div className="bg-slate-950 text-slate-400 py-6 px-8 rounded-2xl flex flex-wrap justify-between items-center gap-6 border border-slate-800">
        <div className="flex flex-wrap gap-8 md:gap-12">
          <div className="flex items-center gap-3">
            <span className="text-white font-serif font-black text-2xl">8500+</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest leading-tight">Students<br/>Enrolled</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white font-serif font-black text-2xl">12</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest leading-tight">Affiliated<br/>Hospitals</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white font-serif font-black text-2xl">450+</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest leading-tight">Research<br/>Publications</span>
          </div>
          <div className="flex items-center gap-3 border-l border-slate-800 pl-8">
            <span className="text-amber-500 font-serif font-black text-2xl">A+</span>
            <span className="text-[10px] text-slate-350 font-bold uppercase tracking-widest leading-tight">HEC Rating<br/>Medical Category</span>
          </div>
        </div>
        <div className="text-[10px] font-sans font-semibold tracking-wide text-right">
          HEC Verified & PMC Accredited Karachi Campus
        </div>
      </div>
    </div>
  );
}
