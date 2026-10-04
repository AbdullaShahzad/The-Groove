import React, { useState } from 'react';
import { AuthUser, UserRole, HogwartsHouse } from '../types';
import { ShieldCheck, UserCheck, Lock, Mail, ArrowRight, BookOpen, KeyRound, CheckCircle2, Check } from 'lucide-react';
import { HOGWARTS_HOUSES } from '../data/houses';
import { HouseCrest } from './HouseCrest';

interface AuthScreenProps {
  onLogin: (user: AuthUser) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [tab, setTab] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [selectedHouse, setSelectedHouse] = useState<HogwartsHouse>(() => {
    try {
      const saved = localStorage.getItem('hogwarts_house');
      return (saved as HogwartsHouse) || 'gryffindor';
    } catch {
      return 'gryffindor';
    }
  });
  const [error, setError] = useState<string | null>(null);
  const [fillNotice, setFillNotice] = useState<string | null>(null);

  // Pre-fill credentials when clicking quick access cards
  // REQUIREMENT: DO NOT auto-submit; fill username & password, then user presses the button!
  const handlePreFillCredentials = (role: UserRole) => {
    setError(null);
    setTab('signin');
    setSelectedRole(role);

    if (role === 'admin') {
      setEmail('curator.vance@thegroove.com');
      setPassword('grooveAdmin2026!');
      setName('Julian Vance');
      setSelectedHouse('gryffindor');
      setFillNotice('Curatorial Admin credentials loaded. Press "ENTER ARCHIVE & BOOKSTORE" below to sign in.');
    } else {
      setEmail('e.sterling@oxford.edu');
      setPassword('patronReader2026!');
      setName('Eleanor Sterling');
      setSelectedHouse('ravenclaw');
      setFillNotice('Patron Reader credentials loaded. Press "ENTER ARCHIVE & BOOKSTORE" below to sign in.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please provide your archival credentials.');
      return;
    }

    if (tab === 'register' && !name.trim()) {
      setError('Please enter your full name for the ledger registry.');
      return;
    }

    // Role inference if admin email is used or role is picked
    const isSpecialAdmin =
      selectedRole === 'admin' ||
      email.toLowerCase().includes('admin') ||
      email.toLowerCase().includes('curator');

    const determinedRole: UserRole = isSpecialAdmin ? 'admin' : 'user';

    try {
      localStorage.setItem('hogwarts_house', selectedHouse);
    } catch {}

    const authenticatedUser: AuthUser = {
      id: `usr_${Date.now().toString(36)}`,
      name: name.trim() || (determinedRole === 'admin' ? 'Julian Vance' : 'Eleanor Sterling'),
      email: email.trim(),
      role: determinedRole,
      house: selectedHouse,
      title: determinedRole === 'admin' ? 'Master Curator & Conservator' : 'Archival Patron Member',
      memberSince: new Date().getFullYear().toString(),
    };

    onLogin(authenticatedUser);
  };

  return (
    <div className="min-h-screen bg-white text-[#1C1917] flex flex-col justify-between selection:bg-[#740001] selection:text-white relative overflow-hidden">
      
      {/* Subtle Archival Texture & Watermark */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#1C1917_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Top Header Bar - Pure Minimal White */}
      <header className="border-b border-[#EEEEEE] bg-white/95 backdrop-blur-sm px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#1C1917]">
            THE GROOVE
          </span>
          <span className="text-[#E0E0E0] hidden sm:inline">|</span>
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#7A7165] uppercase hidden sm:inline">
            CANONICAL ARCHIVE &amp; BINDERY
          </span>
        </div>
        <div className="text-[10px] sm:text-[11px] font-mono text-[#740001] tracking-wider uppercase font-semibold flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5" />
          <span>AUTHENTICATION &amp; HOUSE ONBOARDING</span>
        </div>
      </header>

      {/* Central Split Stage */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 z-10">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 bg-white border border-[#E8E8E8] rounded-[4px] shadow-xl overflow-hidden">
          
          {/* Left Column: Curatorial Archival Brand Presentation */}
          <div className="md:col-span-5 bg-[#141210] text-[#FAF8F5] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-[#26221E]">
            {/* Ambient cloth lighting */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/85 pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
                <BookOpen className="w-3.5 h-3.5 text-[#E2C26E]" />
                <span>CANONICAL REGISTRY</span>
              </div>
              
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight uppercase leading-tight">
                ACCESS THE PRESERVED CANON
              </h2>

              <p className="text-xs text-[#C5BBAA] leading-relaxed">
                Twelve definitive clothbound editions bound by hand with 24kt gold blind-stamping. Select your Hogwarts house and enter your credentials to embark into the archive.
              </p>
            </div>

            {/* Quick Demo Access Stations - FILLS CREDENTIALS */}
            <div className="relative z-10 pt-6 mt-6 border-t border-white/10 space-y-2.5">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#9E9182]">
                SELECT PROFILE TO FILL CREDENTIALS
              </div>

              {/* Admin Button */}
              <button
                type="button"
                onClick={() => handlePreFillCredentials('admin')}
                className={`w-full text-left p-3 rounded-[2px] transition-all group cursor-pointer flex items-center justify-between border ${
                  selectedRole === 'admin'
                    ? 'bg-[#38261C] border-[#D4AF37] ring-1 ring-[#D4AF37]/50'
                    : 'bg-[#2A1D15] hover:bg-[#38261C] border-[#D4AF37]/50'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5 text-[#E2C26E] text-xs font-mono font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#BC472A]" />
                    <span>CURATORIAL ADMIN</span>
                  </div>
                  <div className="text-[10px] text-[#A6998A] mt-0.5 font-mono">
                    Click to fill: Stock &amp; ledger clearance
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#D4AF37] group-hover:underline">
                  FILL IN →
                </span>
              </button>

              {/* User Button */}
              <button
                type="button"
                onClick={() => handlePreFillCredentials('user')}
                className={`w-full text-left p-3 rounded-[2px] transition-all group cursor-pointer flex items-center justify-between border ${
                  selectedRole === 'user' && email.includes('oxford')
                    ? 'bg-[#2F2722] border-[#7A9C86] ring-1 ring-[#7A9C86]/50'
                    : 'bg-[#241E1A] hover:bg-[#2F2722] border-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5 text-[#FAF8F5] text-xs font-mono font-semibold">
                    <UserCheck className="w-3.5 h-3.5 text-[#7A9C86]" />
                    <span>PATRON / READER</span>
                  </div>
                  <div className="text-[10px] text-[#A6998A] mt-0.5 font-mono">
                    Click to fill: Browse, preview &amp; ordering
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#C5BBAA] group-hover:underline">
                  FILL IN →
                </span>
              </button>
            </div>

            <div className="relative z-10 pt-4 text-[9px] font-mono text-[#8C827A] uppercase tracking-widest">
              OCTAVO &amp; FOLIO PRESS · EST. MMXXVI
            </div>
          </div>

          {/* Right Column: Authentication Form */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            
            {/* Form Header & Tabs */}
            <div>
              <div className="flex items-center justify-between border-b border-[#E7E2D6] pb-3 mb-5">
                <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-wider">
                  <button
                    type="button"
                    onClick={() => {
                      setTab('signin');
                      setError(null);
                    }}
                    className={`pb-1 transition-colors cursor-pointer select-none font-semibold ${
                      tab === 'signin'
                        ? 'text-[#1C1917] border-b-2 border-[#1C1917]'
                        : 'text-[#8C827A] hover:text-[#1C1917]'
                    }`}
                  >
                    SIGN IN
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTab('register');
                      setError(null);
                      setFillNotice(null);
                    }}
                    className={`pb-1 transition-colors cursor-pointer select-none font-semibold ${
                      tab === 'register'
                        ? 'text-[#1C1917] border-b-2 border-[#1C1917]'
                        : 'text-[#8C827A] hover:text-[#1C1917]'
                    }`}
                  >
                    NEW REGISTRY
                  </button>
                </div>

                <span className="text-[10px] font-mono text-[#7A7165] uppercase">
                  {tab === 'signin' ? 'REGISTERED ACCESS' : 'PATRON ENROLLMENT'}
                </span>
              </div>

              {/* Feedback notice when credentials filled */}
              {fillNotice && !error && (
                <div className="mb-4 bg-[#E2EDE5] border border-[#A5D6A7] text-[#1E5638] text-xs font-mono p-2.5 rounded-[2px] flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#2E4A3D]" />
                  <span>{fillNotice}</span>
                </div>
              )}

              {/* Error Notification */}
              {error && (
                <div className="mb-4 bg-[#FBE9E7] border border-[#FFAB91] text-[#C62828] text-xs font-mono p-2.5 rounded-[2px] animate-fadeIn">
                  {error}
                </div>
              )}

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {tab === 'register' && (
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#6B6359] mb-1">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Julian Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#EFECE5] text-[#1C1917] placeholder-[#8C827A] text-xs font-mono px-3.5 py-2.5 rounded-[2px] border border-transparent focus:bg-white focus:border-[#D5CDC0] focus:outline-none transition-all"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#6B6359] mb-1">
                    Archival Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-[#8C827A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      placeholder="name@thegroove.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#EFECE5] text-[#1C1917] placeholder-[#8C827A] text-xs font-mono pl-9 pr-4 py-2.5 rounded-[2px] border border-transparent focus:bg-white focus:border-[#D5CDC0] focus:outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#6B6359] mb-1">
                    Password / Master Passkey
                  </label>
                  <div className="relative">
                    <KeyRound className="w-3.5 h-3.5 text-[#8C827A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#EFECE5] text-[#1C1917] placeholder-[#8C827A] text-xs font-mono pl-9 pr-4 py-2.5 rounded-[2px] border border-transparent focus:bg-white focus:border-[#D5CDC0] focus:outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {tab === 'register' && (
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#6B6359] mb-1.5">
                      Assigned Registry Role
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <button
                        type="button"
                        onClick={() => setSelectedRole('user')}
                        className={`p-2.5 rounded-[2px] border text-left cursor-pointer transition-all ${
                          selectedRole === 'user'
                            ? 'bg-[#1C1917] text-white border-[#1C1917]'
                            : 'bg-[#EFECE5] text-[#473F35] border-transparent hover:border-[#DDD5C7]'
                        }`}
                      >
                        <div className="font-bold uppercase text-[11px]">Patron / Reader</div>
                        <div className="text-[9.5px] opacity-80 mt-0.5">Order &amp; preview books</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedRole('admin')}
                        className={`p-2.5 rounded-[2px] border text-left cursor-pointer transition-all ${
                          selectedRole === 'admin'
                            ? 'bg-[#BC472A] text-white border-[#BC472A]'
                            : 'bg-[#EFECE5] text-[#473F35] border-transparent hover:border-[#DDD5C7]'
                        }`}
                      >
                        <div className="font-bold uppercase text-[11px]">Curator Admin</div>
                        <div className="text-[9.5px] opacity-80 mt-0.5">Manage stock &amp; ledger</div>
                      </button>
                    </div>
                  </div>
                )}

                {/* CHOOSE YOUR HOUSE - Pure Minimal Editorial Style */}
                <div className="pt-2">
                  <label className="block text-[11px] font-mono uppercase tracking-[0.2em] text-[#16120F] mb-2 font-bold">
                    CHOOSE YOUR HOUSE
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {(['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'] as HogwartsHouse[]).map((hKey) => {
                      const h = HOGWARTS_HOUSES[hKey];
                      const isSelected = selectedHouse === hKey;
                      return (
                        <button
                          key={hKey}
                          type="button"
                          onClick={() => setSelectedHouse(hKey)}
                          className={`relative p-3 rounded-[2px] border text-left cursor-pointer transition-all duration-200 overflow-hidden flex items-center justify-between ${
                            isSelected
                              ? 'bg-white border-[#16120F] shadow-xs translate-x-0.5'
                              : 'bg-white hover:bg-[#F8F7F4] border-[#E8E5DF] text-[#6B6359]'
                          }`}
                        >
                          {/* Left Accent Color Line when selected */}
                          {isSelected && (
                            <div
                              className="absolute left-0 top-0 bottom-0 w-1 transition-all"
                              style={{ backgroundColor: h.colors.primary }}
                            />
                          )}

                          <div className="flex items-center gap-2.5 pl-1">
                            <HouseCrest house={hKey} size={18} />
                            <div>
                              <div
                                className={`font-serif font-bold text-xs uppercase leading-tight ${
                                  isSelected ? 'text-[#16120F]' : 'text-[#524B43]'
                                }`}
                              >
                                {h.name}
                              </div>
                              <div className="text-[8.5px] font-mono text-[#8C857B]">
                                {h.traits.slice(0, 3).join(' • ')}
                              </div>
                            </div>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 shrink-0 text-[#16120F]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#1C1917] hover:bg-black text-[#FAF8F5] text-xs font-mono uppercase tracking-wider py-3.5 rounded-[2px] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <span>{tab === 'signin' ? 'ENTER ARCHIVE & BOOKSTORE' : 'ENROLL AS ARCHIVAL MEMBER'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E2C26E]" />
                  </button>
                </div>
              </form>
            </div>

            {/* Curatorial Footer Note */}
            <div className="pt-6 mt-6 border-t border-[#E7E2D6] text-[10.5px] font-mono text-[#7A7165] flex items-center justify-between">
              <span>SECURITY PROTOCOL 256-BIT</span>
              <span className="text-[#BC472A] font-semibold">THE GROOVE AUTHENTICATION</span>
            </div>

          </div>

        </div>
      </main>

      {/* Bottom Footer Bar */}
      <footer className="border-t border-[#E7E2D6] px-4 sm:px-8 py-3 text-center text-[10px] font-mono text-[#8C827A] uppercase tracking-wider z-10">
        CANONICAL PRESS MMXXVI · ALL ACCESS RIGHTS RESERVED
      </footer>

    </div>
  );
};
