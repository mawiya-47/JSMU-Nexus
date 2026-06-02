import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Landmark, Clock, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!name || !email || !message) {
      setError('Please provide Name, Email address, and a detailed query Message.');
      return;
    }

    setLoading(true);

    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.message || 'File transmit query failed, try again later.');
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Failed connecting to central messaging server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact-root" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Off-canvas coordinates info */}
      <div className="lg:col-span-5 space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] bg-red-50 text-red-900 border border-red-100 font-extrabold px-3 py-1 rounded-sm uppercase tracking-widest inline-block">
            JSMU Public Exchange Unit
          </span>
          <h1 className="text-3xl font-serif font-medium text-slate-900 leading-tight">
            Contact JSMU <span className="italic text-red-900 font-normal">Public Cell</span>
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            Need transcript certification, eligibility guidelines, verification details, or clinical electives access? Get in direct contact with registrar executives.
          </p>
        </div>

        {/* Directory Card */}
        <div className="bg-slate-900 text-slate-300 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
          <h3 className="font-serif font-bold text-white text-sm uppercase tracking-widest border-b border-slate-800 pb-3">Campus Coordinates</h3>
          
          <div className="space-y-4 text-xs font-medium leading-relaxed divide-y divide-slate-800/40">
            <div className="flex gap-3 py-3 items-start">
              <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Central Registrar Block</strong>
                <span className="opacity-80">Rafiqui H.J. Shaheed Road, Karachi Cantonment, Sindh, Pakistan.</span>
              </div>
            </div>

            <div className="flex gap-3 py-3 items-start">
              <Phone size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Exchange Desk & Hotlines</strong>
                <span className="opacity-80">Exchange: +92-21-99205185 <br/>Admissions: +92-21-35223812</span>
              </div>
            </div>

            <div className="flex gap-3 py-3 items-start">
              <Mail size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Query Inboxes</strong>
                <span className="opacity-80">admissions@jsmu.edu.pk <br/>examinations@jsmu.edu.pk</span>
              </div>
            </div>

            <div className="flex gap-3 py-3 items-start">
              <Clock size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white">Working Hours</strong>
                <span className="opacity-80">Monday - Friday: 08:30 AM to 03:30 PM <br/>Closed on Public Holidays & Weekends</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Submission View */}
      <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-md">
        <h3 className="font-serif font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-100 pb-3 mb-5">Transmit Query Slip</h3>

        {success ? (
          <div id="contact-success" className="text-center py-12 space-y-4">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-150">
              <CheckCircle size={32} />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wide">Query Dispatched!</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2 leading-relaxed">
                Thank you! Your academic query has been successfully routed to the Registrar Desk. We aim to respond to verified filings within 48 business hours.
              </p>
            </div>
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
            >
              Submit Another Query
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-150 flex items-start gap-2">
                <AlertCircle size={15} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Your Full Family Name</label>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Dr. Zainab Malik"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-red-900 focus:outline-none bg-white font-sans text-slate-850"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">Email Coordinate Address</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="zainab@example.com"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-red-900 focus:outline-none bg-white font-mono text-slate-850"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 font-sans">Details of Academic Query</label>
              <textarea 
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Provide details about registration numbers, exam marks discrepancy, college choices, or clinical training logs..."
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-red-900 focus:outline-none bg-white font-sans text-slate-850"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-4 rounded-sm text-xs transition-colors shadow-sm flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Transmitting slip...
                </>
              ) : (
                <>
                  Transmit Message Slip
                  <FileText size={14} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
