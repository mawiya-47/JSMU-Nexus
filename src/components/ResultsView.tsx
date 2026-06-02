import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, ShieldCheck, ClipboardCheck, Loader2, Award, Printer, AlertTriangle } from 'lucide-react';
import { Result } from '../types';

export default function ResultsView() {
  const [rollNumber, setRollNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSearched(false);
    setResults([]);

    const trimmed = rollNumber.trim().toUpperCase();
    if (!trimmed) {
      setError('Please provide a valid Roll Number to search examinations.');
      return;
    }

    setLoading(true);

    try {
      const resp = await fetch(`/api/results/search?rollNumber=${encodeURIComponent(trimmed)}`);
      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.message || 'Search execution failed on the database engine.');
      }

      setResults(data);
      setSearched(true);
    } catch (err: any) {
      setError(err.message || 'Connecting to Controller of Examinations index failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="results-view" className="max-w-2xl mx-auto space-y-8">
      {/* Intro */}
      <section className="text-center space-y-2">
        <span className="text-[10px] bg-red-50 text-red-900 border border-red-100 font-extrabold px-3 py-1 rounded-sm uppercase tracking-widest inline-block mx-auto">
          Controller of Examinations portal
        </span>
        <h1 className="text-3xl font-serif font-medium text-slate-900 leading-tight">
          Grades checking & <span className="italic text-red-900 font-normal">Transcripts Directory</span>
        </h1>
        <p className="text-xs text-slate-500">
          Sync clinical course marks, dental ward logs, and exam board certifications. Query using official registration numbers below.
        </p>
      </section>

      {/* Checking Area Card */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-md space-y-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">Enter Student Roll Number / Identifier</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                <Search size={14} />
              </span>
              <input 
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="e.g. JSMU-2024-101"
                className="w-full pl-9 pr-24 py-3 border border-slate-300 rounded-md text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-900 uppercase tracking-widest"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute inset-y-1 right-1 px-5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-sm tracking-wide uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {loading ? <Loader2 size={13} className="animate-spin" /> : 'Search DB'}
              </button>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Pre-seeded demo identifiers: JSMU-2024-101, JSMU-2024-102, JSMU-2024-103, JSMU-2024-104</p>
          </div>
        </form>

        {error && (
          <div className="p-3.5 bg-red-50 text-red-700 text-xs rounded-md border border-red-150 flex items-start gap-2">
            <AlertTriangle size={15} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {searched && results.length > 0 && (
          <div className="space-y-6 pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center bg-slate-50 p-4 border border-slate-200 rounded-lg">
              <div>
                <span className="text-[9px] bg-red-100 text-red-900 font-extrabold px-2 py-0.5 rounded-sm uppercase tracking-wider block w-fit">
                  Verified Matriculation Record
                </span>
                <h4 className="font-serif font-bold text-sm text-slate-900 mt-1">{results[0].studentName}</h4>
              </div>
              <button 
                onClick={() => window.print()}
                className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors border border-slate-200 cursor-pointer"
                title="Print official transcript sheet"
              >
                <Printer size={15} />
              </button>
            </div>

            <div className="space-y-4">
              <h5 className="font-extrabold text-[10px] uppercase tracking-wider text-slate-400">Recorded Academic Transcript:</h5>
              <div className="space-y-3">
                {results.map((res) => {
                  const percentage = Math.round((res.marks / res.maxMarks) * 100);

                  return (
                    <div 
                      key={res.id} 
                      className="p-4 border border-slate-200 rounded-xl space-y-3 shadow-xs bg-white"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-xs text-slate-800 uppercase block">{res.program}</span>
                          <span className="text-[9.5px] font-semibold text-slate-400 block mt-0.5">Ident Registration: {res.rollNumber}</span>
                        </div>

                        {/* Grade Shield */}
                        <div className="w-12 h-12 bg-slate-900 text-amber-400 rounded-full flex flex-col items-center justify-center border border-slate-800 shadow-inner shrink-0">
                          <span className="font-serif font-black text-sm">{res.subjectGrade}</span>
                          <span className="text-[7.5px] uppercase font-bold text-slate-400 leading-none">Grade</span>
                        </div>
                      </div>

                      {/* Marks tracking bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                          <span>Exam Score: <b className="text-slate-800 font-bold">{res.marks}</b> out of {res.maxMarks}</span>
                          <span>{percentage}% Percentile</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-150 relative">
                          <div 
                            className="bg-red-700 h-full rounded-full" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-[10px] text-slate-500 font-medium leading-relaxed bg-slate-50 p-3 rounded border border-slate-150 text-center">
              Official JSMU transcripts carry registered QR signatures. If you find transcript discrepancies, contact the Chancellor Examination Desk immediately with course indexes.
            </p>
          </div>
        )}

        {searched && results.length === 0 && (
          <div className="py-12 text-center text-xs text-slate-400 font-bold uppercase tracking-wider bg-slate-50 p-4 border border-dashed border-slate-200">
            No grading records verified under roll identifier: "{rollNumber.toUpperCase()}"
          </div>
        )}
      </div>
    </div>
  );
}
