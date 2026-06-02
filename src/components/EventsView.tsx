import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Users, Award, Tag, Clock, ChevronRight } from 'lucide-react';
import { Event } from '../types';

interface EventsViewProps {
  eventsList: Event[];
}

export default function EventsView({ eventsList }: EventsViewProps) {
  const [filterType, setFilterType] = useState<string>('All');

  const filteredEvents = eventsList.filter(e => {
    if (filterType === 'All') return true;
    return e.type === filterType;
  });

  return (
    <div id="events-view-root" className="space-y-12">
      {/* Introduction */}
      <section className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-[10px] bg-red-50 text-red-900 border border-red-100 font-extrabold px-3 py-1 rounded-sm uppercase tracking-widest inline-block mx-auto">
          Academic Milestones & Conferences
        </span>
        <h1 className="text-3xl font-serif font-medium text-slate-900 leading-tight">
          University Event <span className="italic text-red-900 font-normal">Schedules & Forums</span>
        </h1>
        <p className="text-xs text-slate-500">
          Stay mapped to syndicate panel webinars, surgical symposia, research workshops, and upcoming exam boards.
        </p>
      </section>

      {/* Filter Chips */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200 pb-4">
        {['All', 'Academic', 'Seminar', 'Sports', 'Conference', 'Exam'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-1.5 rounded-sm text-xs font-bold tracking-tight uppercase transition-all cursor-pointer ${
              filterType === type 
              ? 'bg-slate-900 text-amber-400 border border-slate-900 shadow-sm' 
              : 'bg-white text-slate-600 border border-slate-250 hover:bg-slate-50'
            }`}
          >
            {type} Slots
          </button>
        ))}
      </div>

      {/* Timelines Cards */}
      <div className="max-w-4xl mx-auto space-y-6">
        {filteredEvents.map((evt) => {
          const dt = new Date(evt.date);
          const day = dt.toLocaleString('en-US', { day: '2-digit' });
          const monthShort = dt.toLocaleString('en-US', { month: 'short' }).toUpperCase();
          const year = dt.getFullYear();

          return (
            <div 
              key={evt.id}
              className="bg-white border border-slate-250 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start hover:shadow-md transition-shadow"
            >
              {/* Date Box */}
              <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-lg flex flex-col items-center justify-center text-white shrink-0 shadow-sm">
                <span className="text-amber-400 font-serif font-black text-2xl leading-none">{day}</span>
                <span className="text-[10px] uppercase font-bold text-white tracking-widest mt-1">{monthShort}</span>
              </div>

              {/* Central Information */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-red-50 text-red-900/90 font-black text-[9px] px-2 py-0.5 uppercase tracking-wider rounded-sm border border-red-100">
                    Category: {evt.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Year Block: {year}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-slate-900">{evt.title}</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">{evt.description}</p>

                <div className="flex flex-wrap gap-4 text-xs text-slate-650 font-medium pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1 text-slate-600"><MapPin size={13} className="text-red-700" /> {evt.location}</span>
                  <span className="flex items-center gap-1 text-slate-600"><Clock size={13} className="text-red-700" /> 09:30 AM Pakistan Standard Time</span>
                </div>
              </div>

              {/* Register Side Info */}
              <div className="w-full md:w-36 text-left md:text-right flex flex-col justify-between self-stretch shrink-0">
                <div className="hidden md:block">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-serif">Registry Seat</span>
                  <span className="text-xs font-bold text-slate-800 mt-0.5 block">Seats Available</span>
                </div>

                <button 
                  onClick={() => alert(`Registration details for "${evt.title}" are dispatched at our local desk (admissions@jsmu.edu.pk).`)}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-[10px] py-2.5 px-4 rounded-sm transition-colors text-center w-full uppercase tracking-wider cursor-pointer"
                >
                  Join Forum
                </button>
              </div>
            </div>
          );
        })}

        {filteredEvents.length === 0 && (
          <p className="text-xs text-slate-400 text-center py-16 bg-white border border-slate-200 rounded-2xl font-bold uppercase tracking-wider">
            No events scheduled under {filterType} category catalog.
          </p>
        )}
      </div>
    </div>
  );
}
