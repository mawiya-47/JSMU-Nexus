import React from 'react';
import { motion } from 'motion/react';
import { Mail, GraduationCap, Stethoscope, ChevronRight, Award } from 'lucide-react';
import { Faculty } from '../types';

interface FacultyViewProps {
  facultyList: Faculty[];
}

export default function FacultyView({ facultyList }: FacultyViewProps) {
  return (
    <div id="faculty-view" className="space-y-12">
      {/* Header section */}
      <section className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-[10px] bg-red-50 text-red-900 border border-red-100 font-extrabold px-3 py-1 rounded-sm uppercase tracking-widest inline-block mx-auto">
          Medical Syndicate Professors
        </span>
        <h1 className="text-3xl font-serif font-medium text-slate-900 leading-tight">
          Executive Clinicians & <span className="italic text-red-900 font-normal">Academic Faculty</span>
        </h1>
        <p className="text-xs text-slate-500">
          Meet registered clinical deans, HEC approved supervisors, and senior dentists leading ward rotatory teams.
        </p>
      </section>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {facultyList.map((fac) => (
          <div 
            key={fac.id}
            className="bg-white border border-slate-250 rounded-2xl p-5 md:p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className="space-y-4">
              {/* Profile header */}
              <div className="flex gap-4 items-center">
                <img 
                  referrerPolicy="no-referrer"
                  src={fac.profileImage} 
                  alt={fac.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
                />
                <div>
                  <h3 className="font-serif font-bold text-sm text-slate-900 leading-tight">{fac.name}</h3>
                  <span className="text-[10.5px] font-semibold text-slate-400 block mt-0.5">{fac.designation}</span>
                  <span className="bg-red-50 text-red-900/95 text-[9px] font-black px-2 py-0.5 uppercase tracking-wider rounded-sm mt-1 inline-block border border-red-100/50">
                    Dept: {fac.department}
                  </span>
                </div>
              </div>

              {/* Degrees / Academics credentials */}
              <div className="p-3.5 bg-slate-50 rounded-lg space-y-1">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block font-sans">Degrees & Experience:</span>
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed flex items-start gap-1">
                  <GraduationCap size={13} className="text-red-700 shrink-0 mt-0.5" />
                  {fac.education}
                </p>
              </div>
            </div>

            {/* Actions footer */}
            <div className="pt-4 mt-4 border-t border-slate-150 flex items-center justify-between text-xs font-semibold">
              <a 
                href={`mailto:${fac.email}`}
                className="text-slate-600 hover:text-red-900 flex items-center gap-1 font-mono text-[10.5px]"
              >
                <Mail size={13} /> {fac.email}
              </a>
              <span className="text-[9px] uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded-sm font-black flex items-center gap-1">
                <Stethoscope size={11} /> PMC Verified
              </span>
            </div>
          </div>
        ))}

        {facultyList.length === 0 && (
          <div className="col-span-full py-16 text-center text-xs text-slate-400 font-bold uppercase tracking-wider bg-white rounded-2xl border border-slate-250">
            No faculty practitioners registered in curriculum boards.
          </div>
        )}
      </div>
    </div>
  );
}
