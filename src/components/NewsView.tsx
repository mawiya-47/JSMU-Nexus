import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, Calendar, Award, BookOpen, AlertCircle, Sparkles, ChevronRight } from 'lucide-react';
import { News } from '../types';

interface NewsViewProps {
  newsList: News[];
}

export default function NewsView({ newsList }: NewsViewProps) {
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  return (
    <div id="news-view-root" className="space-y-12">
      {/* Intro section */}
      <section className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-[10px] bg-red-50 text-red-900 border border-red-100 font-extrabold px-3 py-1 rounded-sm uppercase tracking-widest inline-block mx-auto">
          Press & Media Release Directory
        </span>
        <h1 className="text-3xl font-serif font-medium text-slate-900 leading-tight">
          JSMU Gazette & <span className="italic text-red-900 font-normal">Board Bulletins</span>
        </h1>
        <p className="text-xs text-slate-500">
          Official academic press notifications, research achievements, syndicate board updates, and HEC compliance alerts here.
        </p>
      </section>

      {/* Grid Bulletins */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsList.map((news) => {
          const date = new Date(news.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });

          return (
            <div 
              key={news.id}
              onClick={() => setSelectedNews(news)}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-red-900/50 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative bg-slate-100">
                  <img 
                    referrerPolicy="no-referrer"
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute top-3 left-3 bg-red-900 text-white font-black text-[9px] px-2.5 py-0.5 rounded uppercase tracking-wider">
                    {news.category}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                    <Calendar size={13} /> {date}
                  </span>
                  <h3 className="font-serif font-bold text-sm text-slate-800 leading-snug group-hover:text-red-900 transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-light line-clamp-3 leading-relaxed">
                    {news.content}
                  </p>
                </div>
              </div>

              <div className="p-5 border-t border-slate-100 flex justify-end">
                <span className="text-xs font-bold text-red-700 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform uppercase tracking-wider text-[10px]">
                  Read Full Notice <ChevronRight size={13} />
                </span>
              </div>
            </div>
          );
        })}

        {newsList.length === 0 && (
          <div className="col-span-full py-16 text-center text-xs text-slate-400 font-bold uppercase tracking-wider bg-white p-8 rounded-2xl border border-slate-200">
            No active press releases recorded in registry.
          </div>
        )}
      </div>

      {/* Notice Dialog Popup */}
      <AnimatePresence>
        {selectedNews && (
          <div 
            id="bulletin-popover"
            onClick={() => setSelectedNews(null)} 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden max-w-2xl w-full shadow-2xl relative"
            >
              <div className="h-60 relative bg-slate-100">
                <img 
                  referrerPolicy="no-referrer"
                  src={selectedNews.image} 
                  alt={selectedNews.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/45 to-transparent"></div>
                <div className="absolute bottom-5 left-6 right-6 text-white space-y-2">
                  <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest">
                    {selectedNews.category} Publication Slot
                  </span>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-white leading-tight">
                    {selectedNews.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-4 max-h-87.5 overflow-y-auto">
                <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-rose-100/10 pb-3">
                  <span className="font-semibold uppercase tracking-wider">JSMU Chancellor Syndicate Notice</span>
                  <span className="font-mono">{new Date(selectedNews.createdAt).toLocaleString()}</span>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed font-light space-y-3">
                  {selectedNews.content.split('\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-medium">Verify with Registrar Cell at +92-21-99205185</span>
                <button 
                  onClick={() => setSelectedNews(null)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                >
                  Close Notice Board
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
