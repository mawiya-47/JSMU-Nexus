import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Landmark, ClipboardCheck, Mail, Phone, FileText, CheckCircle, ShieldAlert, Loader2 } from 'lucide-react';

interface AdmissionsViewProps {
  onApplySuccess: () => void;
}

export default function AdmissionsView({ onApplySuccess }: AdmissionsViewProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState('MBBS (Sindh Medical College)');
  const [documents, setDocuments] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!fullName || !email || !phone) {
      setError('Please fill out all mandatory fields: Full Name, Email, and Phone.');
      return;
    }

    setLoading(true);

    try {
      const resp = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          program,
          documents: documents || 'https://example.com/mock-transcript.pdf'
        })
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.message || 'Credential registration failed, please try again.');
      }

      setSuccess(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setDocuments('');
      onApplySuccess();
    } catch (err: any) {
      setError(err.message || 'Error occurred while contacting central database.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="admissions-root" className="max-w-2xl mx-auto space-y-8">
      {/* Title */}
      <section className="text-center space-y-2">
        <span className="text-[10px] bg-red-50 text-red-900 border border-red-100 font-extrabold px-3 py-1 rounded-sm uppercase tracking-widest inline-block mx-auto">
          Registrar General Office
        </span>
        <h1 className="text-3xl font-serif font-medium text-slate-900 leading-tight">
          Admissions Program <span className="italic text-red-900 font-normal">Syllabus 2026-27</span>
        </h1>
        <p className="text-xs text-slate-500 leading-relaxed max-w-lg mx-auto">
          Matriculate into Sindh Medical College or the Sindh Institute of Oral Sciences. Submit details of secondary certificates and MDCAT percentiles for rapid board assessment.
        </p>
      </section>

      {/* Main card */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-lg space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="font-bold text-xs text-slate-800 uppercase tracking-widest">Candidate Intake Information Form</h3>
        </div>

        {success ? (
          <div id="admissions-success" className="text-center py-10 space-y-4">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-150">
              <CheckCircle size={32} />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">Application Transported Successfully!</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
                Thank you! Your Jinnah Sindh Medical University registration file has been safely synchronized with the administrative intake records. The admissions desk will contact you via your provided email of any verification tasks required.
              </p>
            </div>
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-sm tracking-wider uppercase transition-colors pointer-cursor cursor-pointer"
            >
              Submit Another File
            </button>
          </div>
        ) : (
          <form onSubmit={handleApply} className="space-y-4">
            {error && (
              <div className="p-3.5 bg-red-50 text-red-700 text-xs rounded-md border border-red-150 flex items-start gap-2">
                <ShieldAlert size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Your Full Legal Name</label>
                <input 
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Bilal Ahmed Qureshi"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-red-900 focus:outline-none bg-white font-sans text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Email Address Coordinator</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                    <Mail size={13} />
                  </span>
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="bilal.ahmed@example.com"
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-red-900 focus:outline-none bg-white font-mono text-slate-800"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Telephone Contact Number</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                    <Phone size={13} />
                  </span>
                  <input 
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +92-300-1234567"
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-red-900 focus:outline-none bg-white font-mono text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 font-sans">Desired Study Program Track</label>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-red-900 focus:outline-none bg-white font-sans text-slate-800"
                >
                  <option value="MBBS (Sindh Medical College)">MBBS - Sindh Medical College</option>
                  <option value="BDS (Sindh Institute of Oral Sciences)">BDS - Institute of Oral Sciences</option>
                  <option value="Pharm.D (Pharmaceutical Sciences)">Pharm.D - Pharmacy College</option>
                  <option value="BS Nursing (Standard Semester Course)">BS Nursing - Jinnah Nursing Wing</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Link to Digital Documents / Certificates Portfolio (Optional)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                  <FileText size={13} />
                </span>
                <input 
                  type="text"
                  value={documents}
                  onChange={(e) => setDocuments(e.target.value)}
                  placeholder="e.g., https://drive.google.com/file/d/your-id"
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-red-900 bg-white font-mono text-slate-850"
                />
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Please host your secondary certificates and MDCAT transcripts on Dropbox, Google Drive, or OneDrive and paste the shared access link above.</p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-150 rounded-lg space-y-1">
              <h5 className="font-extrabold text-[11px] uppercase tracking-wide text-slate-700">Central Intake Declaration</h5>
              <p className="text-[10.5px] text-slate-500 leading-relaxed">
                By submitting this medical candidate registration form, you certify that all entered metrics correspond exactly with secondary grade catalogs and MDCAT board papers. Falsified filings trigger direct review from the Registrar General office.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-4 rounded-sm text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm uppercase tracking-wider cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Transmitting Candidate Files...
                </>
              ) : (
                <>
                  Register Intake Files
                  <ClipboardCheck size={14} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
