import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, BookOpen, Stethoscope, ChevronRight, Hash, Clock, Landmark } from 'lucide-react';

interface CollegeTrack {
  id: string;
  name: string;
  duration: string;
  seats: number;
  eligibility: string;
  internship: string;
  description: string;
  courses: string[];
}

export default function DepartmentsView() {
  const [activeTab, setActiveTab] = useState<'All' | 'Medicine' | 'Dentistry' | 'Allied' | 'Nursing'>('All');

  const tracks: CollegeTrack[] = [
    {
      id: 'smc',
      name: 'Sindh Medical College (MBBS)',
      duration: '5 Academic Years + 1 Year Mandatory Rotatory Internship',
      seats: 350,
      eligibility: 'MDCAT minimum 65%, HSSC Pre-Medical minimum 70%',
      internship: '12 Months Clinical Internship at Jinnah Postgraduate Medical Centre (JPMC)',
      description: 'The flagship division of Jinnah Sindh Medical University. Training exceptional clinicians through an integrated medical science modular syllabus.',
      courses: ['Human Anatomy & Histology', 'General Physiology & Biophysics', 'Clinical Pharmacology', 'Forensic Medicine & Toxicology', 'Principles of Medicine & Applied Pathology', 'Inpatient Surgery Clinical Clerkship'],
      // category derived from tabs
    },
    {
      id: 'sios',
      name: 'Sindh Institute of Oral Sciences (BDS)',
      duration: '4 Academic Years + 1 Year Clinical Rotatory Internship',
      seats: 100,
      eligibility: 'MDCAT minimum 55%, HSSC Pre-Medical minimum 65%',
      internship: '12 Months Mandatory Internship at Jinnah Dental Hospital',
      description: 'Rigorous dental curriculum focusing on maxillofacial diagnostics, operative dentistry, and community preventive dental camps.',
      courses: ['Dental Anatomy & Oral Biology', 'Science of Dental Materials', 'Prosthodontics & Operative Dentistry', 'Orthodontics & Pedodontics', 'Oral & Maxillofacial General Surgery'],
    },
    {
      id: 'pharmacy',
      name: 'Appasasi College of Pharmacy (Pharm.D)',
      duration: '5 Academic Years Professional Degree',
      seats: 150,
      eligibility: 'HSSC Pre-Medical minimum 60% standard equivalency',
      internship: 'Optional 6 Months Pharmaceutical Factory & Ward Internship',
      description: 'Exceptional pharmacological sciences training designed to match global standards in pharmacotherapy, organic chemistry, and hospital pharmacy setups.',
      courses: ['Pharmaceutics & Formulation Chemistry', 'Pharmaceutical Microbiology', 'Applied Pharmacognosy', 'Clinical Pharmacy & Toxicology', 'Industrial Biopharmaceutics'],
    },
    {
      id: 'nursing',
      name: 'Jinnah Nursing College (BS Nursing)',
      duration: '4 Academic Years Program',
      seats: 80,
      eligibility: 'HSSC Pre-Medical minimum 50% or matching Nursing Diploma',
      internship: '12 Months Inpatient Ward Placement at Sindh Social Security Hospital',
      description: 'Premium nursing degree addressing absolute patient-care values, critical medical care operations, and nursing ethics.',
      courses: ['Fundamental Patient Nursing Science', 'Nursing Microbiology & Biochemistry', 'Community Health Nursing', 'Adult Health Nursing Clerkship', 'Pediatric Patient Care Protocols'],
    }
  ];

  const filteredTracks = tracks.filter(t => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Medicine') return t.id === 'smc';
    if (activeTab === 'Dentistry') return t.id === 'sios';
    if (activeTab === 'Allied') return t.id === 'pharmacy';
    if (activeTab === 'Nursing') return t.id === 'nursing';
    return true;
  });

  return (
    <div id="departments-view" className="space-y-8">
      {/* Head */}
      <section className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-3xl font-serif font-medium text-slate-900 leading-tight">Syllabus & Colleges Registry</h1>
        <p className="text-xs text-slate-500">
          Explore credential programs, clinical training rotatories, HEC syllabus benchmarks, and total seats lists at JSMU Cantt.
        </p>
      </section>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200 pb-4">
        {(['All', 'Medicine', 'Dentistry', 'Allied', 'Nursing'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-sm text-xs font-bold tracking-tight uppercase transition-all cursor-pointer ${
              activeTab === tab 
              ? 'bg-red-800 text-white shadow-md' 
              : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-250'
            }`}
          >
            {tab} Tab
          </button>
        ))}
      </div>

      {/* Grid of tracks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredTracks.map((track) => (
          <div 
            key={track.id} 
            className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-2 py-0.5 uppercase tracking-wider rounded-sm inline-block">
                Registered Track Code: {track.id.toUpperCase()}
              </span>
              <h3 className="font-serif font-bold text-lg text-slate-900">{track.name}</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">{track.description}</p>

              <div className="divide-y divide-slate-100 text-xs text-slate-650 space-y-2.5 pt-2">
                <div className="flex justify-between py-1.5">
                  <span className="font-bold text-slate-900 flex items-center gap-1"><Clock size={14} className="text-red-700" /> Syllabus Duration</span>
                  <span className="text-slate-600 font-medium">{track.duration}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="font-bold text-slate-900 flex items-center gap-1"><Hash size={14} className="text-red-700" /> Seats Logged</span>
                  <span className="text-slate-700 font-mono font-bold bg-slate-100 px-2.5 py-0.5 rounded-sm">{track.seats} Admissions</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="font-bold text-slate-900 flex items-center gap-1"><Award size={14} className="text-red-700" /> Intake Eligibility</span>
                  <span className="text-slate-600 font-medium max-w-sm text-right">{track.eligibility}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="font-bold text-slate-900 flex items-center gap-1"><Stethoscope size={14} className="text-red-700" /> Clinical Rotatory</span>
                  <span className="text-slate-600 font-medium max-w-sm text-right">{track.internship}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-100">
              <h4 className="font-extrabold text-[10px] uppercase tracking-wider text-slate-400">Core Modular Subject Components:</h4>
              <div className="flex flex-wrap gap-1.5">
                {track.courses.map((course, i) => (
                  <span key={i} className="text-[10.5px] bg-slate-50 border border-slate-150 px-2 py-0.5 rounded text-slate-600 font-medium">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
