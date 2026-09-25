import React, { useState } from 'react';
import { LockKeyhole, Mail, Recycle, ShieldCheck, UserRound, AlertCircle } from 'lucide-react';
import { login } from '../lib/api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const user = await login(email.trim(), password);
      onLogin(user);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 bg-tech-grid">
      <section className="w-full max-w-md glass-panel rounded-3xl border border-emerald-500/20 p-8 shadow-2xl shadow-emerald-500/10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Recycle className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">EcoSanctuary AI</h1>
            <p className="text-xs text-slate-400">SurroClean operations portal</p>
          </div>
        </div>
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-emerald-400">Secure access</p>
          <h2 className="text-xl font-bold text-white mt-2">Sign in to your workspace</h2>
          <p className="text-sm text-slate-400 mt-1">Use the credentials assigned to your role.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-xs font-semibold text-slate-300">Email address</span>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <input required type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900/80 py-3 pl-10 pr-3 text-sm text-white outline-none focus:border-emerald-400" placeholder="you@surroclean.local" />
            </div>
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-slate-300">Password</span>
            <div className="relative mt-1.5">
              <LockKeyhole className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-900/80 py-3 pl-10 pr-3 text-sm text-white outline-none focus:border-emerald-400" placeholder="Enter your password" />
            </div>
          </label>
          {error && <p role="alert" className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300"><AlertCircle className="w-4 h-4 shrink-0" />{error}</p>}
          <button disabled={isSubmitting} className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-wait disabled:opacity-60">
            {isSubmitting ? 'Authenticating...' : 'Sign in securely'}
          </button>
        </form>
        <div className="mt-6 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-500">
          <span><ShieldCheck className="mx-auto mb-1 h-4 w-4 text-emerald-400" />Admin</span>
          <span><UserRound className="mx-auto mb-1 h-4 w-4 text-cyan-400" />Student</span>
          <span><LockKeyhole className="mx-auto mb-1 h-4 w-4 text-amber-400" />Staff</span>
        </div>
      </section>
    </main>
  );
}