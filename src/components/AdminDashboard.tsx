import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, Users, FileText, Calendar, Plus, Trash2, 
  LogOut, ClipboardCheck, AlertTriangle, ShieldCheck, 
  MapPin, Clock, Edit, CheckCircle, Upload, HelpCircle 
} from 'lucide-react';
import { News, Event, Faculty, Admission, Contact } from '../types';

interface AdminDashboardProps {
  token: string;
  user: any;
  onLogout: () => void;
  newsList: News[];
  eventsList: Event[];
  facultyList: Faculty[];
  onRefreshAllData: () => void;
}

export default function AdminDashboard({
  token,
  user,
  onLogout,
  newsList,
  eventsList,
  facultyList,
  onRefreshAllData
}: AdminDashboardProps) {
  const [activeSegment, setActiveSegment] = useState<'admissions' | 'news' | 'events' | 'faculty' | 'results' | 'contacts'>('admissions');
  const [admissionApps, setAdmissionApps] = useState<Admission[]>([]);
  const [contactsLog, setContactsLog] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  // News Form
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1576091159399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800');
  const [newCat, setNewCat] = useState<'General' | 'Admissions' | 'Research' | 'Exams' | 'Events'>('General');

  // Events Form
  const [evTitle, setEvTitle] = useState('');
  const [evDesc, setEvDesc] = useState('');
  const [evDate, setEvDate] = useState('');
  const [evLoc, setEvLoc] = useState('');
  const [evType, setEvType] = useState<'Academic' | 'Seminar' | 'Sports' | 'Conference' | 'Exam'>('Academic');

  // Faculty Form
  const [facName, setFacName] = useState('');
  const [facDes, setFacDes] = useState('');
  const [facDept, setFacDept] = useState('');
  const [facImg, setFacImg] = useState('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400');
  const [facMail, setFacMail] = useState('');
  const [facEdu, setFacEdu] = useState('');

  // Results Form
  const [resRoll, setResRoll] = useState('');
  const [resName, setResName] = useState('');
  const [resMarks, setResMarks] = useState<number>(0);
  const [resMax, setResMax] = useState<number>(500);
  const [resProg, setResProg] = useState('MBBS - First Year (Human Anatomy & Physiology)');
  const [resGrade, setResGrade] = useState('A+');
  const [resSuccess, setResSuccess] = useState(false);

  const [formErr, setFormErr] = useState('');

  const fetchAdmissionsAndContacts = async () => {
    try {
      const [admRep, conRep] = await Promise.all([
        fetch('/api/admissions'),
        fetch('/api/contacts')
      ]);

      if (admRep.ok) {
        const adms = await admRep.json();
        setAdmissionApps(adms);
      }
      if (conRep.ok) {
        const cons = await conRep.json();
        setContactsLog(cons);
      }
    } catch (e) {
      console.error('Failed syncing administrative catalogs:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissionsAndContacts();
  }, []);

  const handleUpdateAdmissionStatus = async (id: string, nextStatus: 'approved' | 'rejected' | 'reviewed') => {
    try {
      const resp = await fetch(`/api/admissions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (resp.ok) {
        fetchAdmissionsAndContacts();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErr('');
    if (!newTitle || !newContent || !newImage) {
      setFormErr('Provide title, content, and high-resolution Unsplash URL.');
      return;
    }

    try {
      const resp = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, content: newContent, image: newImage, category: newCat })
      });
      if (resp.ok) {
        setNewTitle('');
        setNewContent('');
        onRefreshAllData();
      }
    } catch (err: any) {
      setFormErr('Sync failure logging news.');
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm('Are you authorized to pull down this announcement?')) return;
    try {
      const resp = await fetch(`/api/news/${id}`, { method: 'DELETE' });
      if (resp.ok) {
        onRefreshAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErr('');
    if (!evTitle || !evDesc || !evDate || !evLoc) {
      setFormErr('Provide event header, description, scheduled date, and venue location.');
      return;
    }

    try {
      const resp = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: evTitle, description: evDesc, date: evDate, location: evLoc, type: evType })
      });
      if (resp.ok) {
        setEvTitle('');
        setEvDesc('');
        setEvDate('');
        setEvLoc('');
        onRefreshAllData();
      }
    } catch (err) {
      setFormErr('Sync failure logging milestone.');
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Cancel this scheduled event?')) return;
    try {
      const resp = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      if (resp.ok) {
        onRefreshAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddFaculty = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErr('');
    if (!facName || !facDes || !facDept || !facMail || !facEdu) {
      setFormErr('Provide practitioner full name, official design, department, email, and academic degrees.');
      return;
    }

    try {
      const resp = await fetch('/api/faculty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: facName, 
          designation: facDes, 
          department: facDept, 
          profileImage: facImg, 
          email: facMail, 
          education: facEdu 
        })
      });

      if (resp.ok) {
        setFacName('');
        setFacDes('');
        setFacMail('');
        setFacEdu('');
        onRefreshAllData();
      }
    } catch (err) {
      setFormErr('Sync failure logging medical practitioner.');
    }
  };

  const handleDeleteFaculty = async (id: string) => {
    if (!confirm('Remove this clinical supervisor from active directories?')) return;
    try {
      const resp = await fetch(`/api/faculty/${id}`, { method: 'DELETE' });
      if (resp.ok) {
        onRefreshAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUploadResult = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErr('');
    setResSuccess(false);

    if (!resRoll || !resName || resMarks == null || !resMax || !resProg) {
      setFormErr('Fill out all fields for the academic grading transcript record.');
      return;
    }

    try {
      const resp = await fetch('/api/results/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rollNumber: resRoll.trim().toUpperCase(),
          studentName: resName,
          marks: Number(resMarks),
          maxMarks: Number(resMax),
          program: resProg,
          subjectGrade: resGrade
        })
      });

      if (resp.ok) {
        setResRoll('');
        setResName('');
        setResMarks(0);
        setResSuccess(true);
      } else {
        const errorData = await resp.json();
        setFormErr(errorData.message || 'Verification rejected grade record.');
      }
    } catch (err) {
      setFormErr('Connecting to exam boards database failed.');
    }
  };

  return (
    <div id="admin-workspace-layout" className="space-y-8">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-md gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.5 uppercase tracking-wider rounded-sm">
              Role: {user.role} Authorized
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Token: SEC_VER_JSMU_VC</span>
          </div>
          <h2 className="font-serif font-bold text-lg">{user.name} Office</h2>
          <p className="text-[11px] text-slate-400">Manage admissions, publish news releases, upload student grades and review community query registers.</p>
        </div>

        <button 
          onClick={onLogout}
          className="bg-red-800 hover:bg-red-900 border border-red-750 text-white font-bold text-xs py-2.5 px-5 rounded-sm transition-colors flex items-center gap-1.5 uppercase tracking-wider cursor-pointer"
        >
          <LogOut size={14} /> Close Terminal
        </button>
      </div>

      {/* Stats Band */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Admissions Handled</span>
          <span className="text-xl font-serif font-black text-slate-900 block mt-1">{admissionApps.length} Applicants</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Active Gazette Notices</span>
          <span className="text-xl font-serif font-black text-slate-900 block mt-1">{newsList.length} Bulletins</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Milestones Logged</span>
          <span className="text-xl font-serif font-black text-slate-900 block mt-1">{eventsList.length} Announcements</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Practitioners registered</span>
          <span className="text-xl font-serif font-black text-slate-900 block mt-1">{facultyList.length} Doctors</span>
        </div>
      </div>

      {/* Navigation Sub-sections */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'admissions', label: 'Admissions Desk' },
          { id: 'news', label: 'News Gazette' },
          { id: 'events', label: 'Event Timelines' },
          { id: 'faculty', label: 'Faculty Roster' },
          { id: 'results', label: 'Results Upload' },
          { id: 'contacts', label: 'Student Inquiries' }
        ].map((sec) => (
          <button
            key={sec.id}
            onClick={() => { setActiveSegment(sec.id as any); setFormErr(''); setResSuccess(false); }}
            className={`px-4 py-2 rounded-sm text-xs font-bold tracking-tight uppercase transition-all cursor-pointer ${
              activeSegment === sec.id 
              ? 'bg-red-850 text-white shadow-sm' 
              : 'bg-white text-slate-600 border border-slate-250 hover:bg-slate-50'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Active Form segments */}
      <div className="bg-white border border-slate-250 rounded-2xl p-6 md:p-8 shadow-xs">
        {formErr && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-150 mb-6 flex items-start gap-2">
            <AlertTriangle size={15} className="shrink-0 mt-0.5" />
            <span>{formErr}</span>
          </div>
        )}

        {/* 1. Admissions segment */}
        {activeSegment === 'admissions' && (
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-slate-900 text-sm uppercase tracking-wider pb-3 border-b border-slate-100">Review Candidate Matriculation Files</h3>

            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-xs text-left divide-y divide-slate-200">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-extrabold text-[10px]">
                  <tr>
                    <th className="p-4">Applicant Index</th>
                    <th className="p-4">Candidate & Contacts</th>
                    <th className="p-4">Desired Program Track</th>
                    <th className="p-4">Submission Status</th>
                    <th className="p-4 text-center">Desk Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium whitespace-nowrap">
                  {admissionApps.map((adm) => (
                    <tr key={adm.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-mono font-bold text-red-900">{adm.id}</td>
                      <td className="p-4">
                        <strong className="block text-slate-900">{adm.fullName}</strong>
                        <span className="text-[10px] text-slate-400 block font-mono mt-0.5">{adm.email} | {adm.phone}</span>
                      </td>
                      <td className="p-4 text-slate-600">{adm.program}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full font-black uppercase text-[8.5px] border ${
                          adm.status === 'approved' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : adm.status === 'rejected'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-amber-45 text-amber-600 bg-amber-500/10 border-amber-500/20'
                        }`}>
                          {adm.status}
                        </span>
                      </td>
                      <td className="p-4 text-center space-x-2">
                        {adm.status !== 'approved' && (
                          <button
                            onClick={() => handleUpdateAdmissionStatus(adm.id, 'approved')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] px-2.5 py-1 rounded-sm uppercase tracking-wider cursor-pointer"
                          >
                            Approve
                          </button>
                        )}
                        {adm.status !== 'rejected' && (
                          <button
                            onClick={() => handleUpdateAdmissionStatus(adm.id, 'rejected')}
                            className="bg-red-800 hover:bg-red-900 text-white font-bold text-[10px] px-2.5 py-1 rounded-sm uppercase tracking-wider cursor-pointer"
                          >
                            Reject
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}

                  {admissionApps.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-400 font-bold uppercase tracking-wider">
                        No intake registrations recorded in database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. News/Gazette Editor */}
        {activeSegment === 'news' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form */}
            <form onSubmit={handleAddNews} className="lg:col-span-4 space-y-4">
              <h3 className="font-serif font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">Publish Board Bulletin</h3>
              
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Bulletin Header Title</label>
                <input 
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Sindh MDCAT slip instructions"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 font-sans"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Detailed Context / Content</label>
                <textarea 
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Official notification text..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Publication Slot Category</label>
                <select
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 bg-white"
                >
                  <option value="General">General Bulletin</option>
                  <option value="Admissions">Admissions Press</option>
                  <option value="Research">Research & Grants</option>
                  <option value="Exams">Exams & Grading</option>
                  <option value="Events">Campus Events</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Unsplash Photo Coordinate link</label>
                <input 
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-950 text-white hover:bg-slate-850 font-bold py-2 px-4 rounded-sm text-xs transition-colors uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus size={14} /> Add Announcement Notice
              </button>
            </form>

            {/* List */}
            <div className="lg:col-span-8 space-y-4">
              <h3 className="font-serif font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">Active Faculty Board Slates</h3>
              <div className="space-y-3 max-h-112.5 overflow-y-auto pr-2">
                {newsList.map((n) => (
                  <div key={n.id} className="p-4 border border-slate-200 rounded-xl flex justify-between items-center bg-slate-50 shadow-xs">
                    <div>
                      <span className="text-[8px] bg-red-800 text-white font-extrabold px-1.5 py-0.5 rounded tracking-wide uppercase">{n.category}</span>
                      <h4 className="font-serif font-bold text-xs text-slate-900 mt-1.5 leading-snug">{n.title}</h4>
                      <p className="text-[10px] text-slate-405 text-slate-500 mt-0.5 font-light line-clamp-1">{n.content}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteNews(n.id)}
                      className="p-1.5 hover:bg-red-50 text-red-650 hover:text-red-800 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-red-150"
                      title="De-publish notice"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. Event Timelines creator */}
        {activeSegment === 'events' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <form onSubmit={handleAddEvent} className="lg:col-span-4 space-y-4">
              <h3 className="font-serif font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">Schedule Academic Milestone</h3>
              
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-705 text-slate-700">Forum / Event Milestone Header</label>
                <input 
                  type="text"
                  value={evTitle}
                  onChange={(e) => setEvTitle(e.target.value)}
                  placeholder="e.g. SMC Surgical Syllabi Session"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 font-sans"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 font-sans">Timeline Brief Outline</label>
                <textarea 
                  rows={3}
                  value={evDesc}
                  onChange={(e) => setEvDesc(e.target.value)}
                  placeholder="Summary of syndicate speakers..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Target Date</label>
                <input 
                  type="date"
                  value={evDate}
                  onChange={(e) => setEvDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 font-mono bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Campus Venue Location</label>
                <input 
                  type="text"
                  value={evLoc}
                  onChange={(e) => setEvLoc(e.target.value)}
                  placeholder="e.g. Ground Floor Senate Hall"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 font-sans"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Event Track Classification</label>
                <select
                  value={evType}
                  onChange={(e) => setEvType(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 bg-white"
                >
                  <option value="Academic">Academic Lecture</option>
                  <option value="Seminar">Symposium Seminar</option>
                  <option value="Sports">Sports Arena Rally</option>
                  <option value="Conference">Medical Conference</option>
                  <option value="Exam">Exam Board Routine</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-950 text-white hover:bg-slate-850 font-bold py-2 px-4 rounded-sm text-xs transition-colors uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus size={14} /> Schedule Event
              </button>
            </form>

            <div className="lg:col-span-8 space-y-4">
              <h3 className="font-serif font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">Academic Calendar Reserves</h3>
              <div className="space-y-3 max-h-112.5 overflow-y-auto pr-2">
                {eventsList.map((e) => (
                  <div key={e.id} className="p-4 border border-slate-200 rounded-xl flex justify-between items-center bg-slate-50 shadow-xs">
                    <div>
                      <span className="text-[8px] bg-indigo-900 text-white font-extrabold px-1.5 py-0.5 rounded tracking-widest uppercase">{e.type}</span>
                      <h4 className="font-serif font-bold text-xs text-slate-900 mt-1.5 leading-snug">{e.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-2">
                        <span>Date: <b>{e.date}</b></span> | <span>Venue: <b>{e.location}</b></span>
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteEvent(e.id)}
                      className="p-1.5 hover:bg-red-50 text-red-650 hover:text-red-800 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-red-150"
                      title="De-register event"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. Faculty Roster Director */}
        {activeSegment === 'faculty' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <form onSubmit={handleAddFaculty} className="lg:col-span-4 space-y-4">
              <h3 className="font-serif font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">Add Executive Practitioner</h3>
              
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Practitioner Full Name</label>
                <input 
                  type="text"
                  value={facName}
                  onChange={(e) => setFacName(e.target.value)}
                  placeholder="e.g. Prof. Dr. Sameer Qureshi"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 font-sans"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Official Chair / Designation</label>
                <input 
                  type="text"
                  value={facDes}
                  onChange={(e) => setFacDes(e.target.value)}
                  placeholder="Head of Surgery, SMC"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Department Department</label>
                <input 
                  type="text"
                  value={facDept}
                  onChange={(e) => setFacDept(e.target.value)}
                  placeholder="e.g. Dentistry, Surgery, Biochemistry"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Official email Coordinate</label>
                <input 
                  type="email"
                  value={facMail}
                  onChange={(e) => setFacMail(e.target.value)}
                  placeholder="dean.surgical@jsmu.edu.pk"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Degrees & Board Credentials</label>
                <input 
                  type="text"
                  value={facEdu}
                  onChange={(e) => setFacEdu(e.target.value)}
                  placeholder="FCPS, FRCS London, MBBS"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Profile Photo Coordinate Link Coordinate Link</label>
                <input 
                  type="text"
                  value={facImg}
                  onChange={(e) => setFacImg(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-950 text-white hover:bg-slate-850 font-bold py-2 px-4 rounded-sm text-xs transition-colors uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus size={14} /> Register Practitioner
              </button>
            </form>

            <div className="lg:col-span-8 space-y-4">
              <h3 className="font-serif font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">Active Medical Deans Directory</h3>
              <div className="space-y-3 max-h-112.5 overflow-y-auto pr-2">
                {facultyList.map((f) => (
                  <div key={f.id} className="p-4 border border-slate-200 rounded-xl flex justify-between items-center bg-slate-50 shadow-xs">
                    <div className="flex gap-3 items-center">
                      <img referrerPolicy="no-referrer" src={f.profileImage} alt={f.name} className="w-9 h-9 rounded-full object-cover border" />
                      <div>
                        <h4 className="font-serif font-bold text-xs text-slate-900 leading-tight">{f.name}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">{f.designation} | Dept: <b>{f.department}</b></p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteFaculty(f.id)}
                      className="p-1.5 hover:bg-red-50 text-red-650 hover:text-red-800 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-red-150"
                      title="De-register doctor profile"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. Results Upload Board */}
        {activeSegment === 'results' && (
          <form onSubmit={handleUploadResult} className="max-w-xl mx-auto space-y-5">
            <h3 className="font-serif font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <Upload size={16} className="text-red-700" /> Log Academic Grade Sheets Transcript
            </h3>

            {resSuccess && (
              <div className="p-4 bg-emerald-50 text-emerald-700 border border-emerald-250 rounded-lg text-xs flex items-center gap-2">
                <CheckCircle size={16} className="shrink-0" />
                <span>Student grading transcript uploaded and committed to Central Examination Indexes successfully!</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Candidate Student Roll Number</label>
                <input 
                  type="text"
                  value={resRoll}
                  onChange={(e) => setResRoll(e.target.value)}
                  placeholder="e.g., JSMU-2024-105"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs font-mono text-slate-800 uppercase tracking-widest"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Student Legal Name</label>
                <input 
                  type="text"
                  value={resName}
                  onChange={(e) => setResName(e.target.value)}
                  placeholder="e.g., Sidra Qasim"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Marks Obtained</label>
                <input 
                  type="number"
                  value={resMarks}
                  onChange={(e) => setResMarks(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-805 text-slate-800 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Maximum Marks Scale</label>
                <input 
                  type="number"
                  value={resMax}
                  onChange={(e) => setResMax(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Subject Grade Rating</label>
                <select
                  value={resGrade}
                  onChange={(e) => setResGrade(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800 bg-white"
                >
                  <option value="A+">A+ Grade</option>
                  <option value="A">A Grade</option>
                  <option value="B+">B+ Grade</option>
                  <option value="B">B Grade</option>
                  <option value="C+">C+ Grade</option>
                  <option value="C">C Grade</option>
                  <option value="F">F Failed</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 font-sans">Full Study Program Syllabus Track & Semester</label>
              <input 
                type="text"
                value={resProg}
                onChange={(e) => setResProg(e.target.value)}
                placeholder="e.g. MBBS - First Year (Biochemistry & Genetics)"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs text-slate-800"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-4 rounded-sm text-xs transition-colors shadow-sm uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck size={14} /> Commit Transcript Record
            </button>
          </form>
        )}

        {/* 6. Contact Inquiries tracker */}
        {activeSegment === 'contacts' && (
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-1.5">
              Incoming Student Queries & Public Inquiries
            </h3>
            
            <div className="space-y-4">
              {contactsLog.map((con) => (
                <div key={con.id} className="p-5 border border-slate-205 border-slate-200 rounded-xl bg-slate-50 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-xs text-slate-900 block">{con.name}</strong>
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5">{con.email}</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono">{new Date(con.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-light leading-relaxed bg-white p-3 border border-slate-100 rounded">
                    {con.message}
                  </p>
                </div>
              ))}

              {contactsLog.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-12 bg-slate-50 border border-slate-200 rounded-xl font-bold uppercase tracking-wider">
                  No incoming queries files recorded this session.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
