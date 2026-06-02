import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, KeyRound, Mail, AlertTriangle, Loader2 } from 'lucide-react';

interface StudentPortalProps {
  onLoginSuccess: (token: string, user: any) => void;
}

export default function StudentPortal({ onLoginSuccess }: StudentPortalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide correct credentials: email address and security password.');
      return;
    }

    setLoading(true);

    try {
      const resp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.message || 'Authentication rejected by security board.');
      }

      onLoginSuccess(data.token, data.user);
    } catch (err: any) {
      setError(err.message || 'Connecting to security server failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="login-portal" className="max-w-md mx-auto space-y-8">
      {/* Header */}
      <section className="text-center space-y-2">
        <span className="text-[10px] bg-red-50 text-red-900 border border-red-100 font-extrabold px-3 py-1 rounded-sm uppercase tracking-widest inline-block mx-auto">
          VC Security Core Access
        </span>
        <h1 className="text-3xl font-serif font-medium text-slate-900 leading-tight">
          Syndicate Staff <span className="italic text-red-900 font-normal">Command Center</span>
        </h1>
        <p className="text-xs text-slate-500">
          Sign into official clinical dashboards or admissions intake panels.
        </p>
      </section>

      {/* Login Card */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xl space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="font-bold text-xs text-slate-800 uppercase tracking-widest">Sign in to Executive Office</h3>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-750 text-xs rounded border border-red-150 flex items-start gap-1.5">
              <AlertTriangle size={15} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">Official Staff Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                <Mail size={13} />
              </span>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. admin@jsmu.edu.pk"
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-md text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-900"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 font-sans">Security API Access Key</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                <KeyRound size={13} />
              </span>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-md text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-4 rounded-sm text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 uppercase tracking-wider cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                Authorizing Security Credentials...
              </>
            ) : (
              <>
                Credentials Authorization
                <ShieldCheck size={14} />
              </>
            )}
          </button>
        </form>

        {/* Development Diagnostic Information */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
          <span className="text-[9px] font-black uppercase text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-sm w-fit block tracking-wider">
            Pre-seeded Developer Accounts Sandbox:
          </span>
          <div className="text-[10.5px] text-slate-600 space-y-1 font-mono leading-relaxed">
            <div>
              <b className="text-slate-800 font-bold block">1. Chancellor Director Block:</b>
              <span>Email: <code className="text-red-900 font-extrabold bg-white px-1 border">admin@jsmu.edu.pk</code> / Code: <code className="text-slate-800 bg-white px-1 border">admin123</code></span>
            </div>
            <div className="pt-1.5 border-t border-slate-150">
              <b className="text-slate-800 font-bold block">2. Registrar Staff Cell:</b>
              <span>Email: <code className="text-red-900 font-extrabold bg-white px-1 border">staff@jsmu.edu.pk</code> / Code: <code className="text-slate-800 bg-white px-1 border">admin123</code></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
