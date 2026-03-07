'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';


/**
 * ReactSphereLogo
 * An animated SVG component that recreates the complex orbital sphere 
 * using SVG shapes and Framer Motion for performance-efficient animations.
 */
const ReactSphereLogo = () => (
  <motion.div 
    className="relative w-32 h-32 mx-auto mb-6"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="coreGradient">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Central Glow Core */}
      <circle cx="50" cy="50" r="35" fill="url(#coreGradient)" opacity="0.4" />
      
      {/* Orbital Rings - Rotating at different speeds */}
      {[0, 45, 90, 135].map((rotation, i) => (
        <motion.ellipse
          key={i}
          cx="50"
          cy="50"
          rx="45"
          ry="15"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="0.5"
          initial={{ rotate: rotation }}
          animate={{ rotate: rotation + 360 }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Satellite Nodes along the sphere edge */}
      {[...Array(6)].map((_, i) => (
        <motion.circle
          key={i}
          cx={50 + 30 * Math.cos((i * 60 * Math.PI) / 180)}
          cy={50 + 30 * Math.sin((i * 60 * Math.PI) / 180)}
          r="1.5"
          fill="#fff"
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
      
      {/* Static Central Core Node */}
      <circle cx="50" cy="50" r="3" fill="#fff" />
      <motion.circle
        cx="50"
        cy="50"
        r="5"
        fill="none"
        stroke="#fff"
        strokeWidth="0.5"
        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </svg>
  </motion.div>
);

export default function JoinPage() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const handleJoin = async () => {
    if (!username.trim()) return;
    
    setLoading(true);
    setMessage('');
    setStatus(null);

    try {
      // In a Next.js environment, this would typically point to /api/invite
      const res = await fetch('/api/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'Failed to join');
      
      setMessage(`Successfully localized. Welcome to the sphere, ${username}.`);
      setStatus('success');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Signal lost in the nebula. Re-attempt required.');
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050507] text-slate-100 overflow-hidden relative">
      {/* Background Decorative Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full animate-pulse pulse-delay-1s" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-sm px-4"
      >
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
          
          <ReactSphereLogo />

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              ReactSphere
            </h1>
            <p className="text-slate-400 text-sm mt-1 uppercase tracking-widest font-medium opacity-60">
              Neural Gateway
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="text"
                placeholder="GitHub identifier"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all text-slate-200 placeholder:text-slate-600 text-sm"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleJoin}
              disabled={loading || !username}
              className={`w-full flex items-center justify-center gap-2 p-4 rounded-2xl font-bold transition-all
                ${loading || !username 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50' 
                  : 'bg-white/90 text-black shadow-lg shadow-cyan-500/10'
                }`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Initialize</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>

          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-6 p-4 rounded-2xl border text-xs flex items-center gap-3 ${
                  status === 'success' 
                    ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-300' 
                    : 'bg-red-500/5 border-red-500/20 text-red-400'
                }`}
              >
                {status === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                <p>{message}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic footer decoration */}
        <div className="text-center mt-8 space-y-1">
          <p className="text-[10px] text-slate-700 tracking-[0.2em] uppercase font-bold">
            Encryption Active
          </p>
          <div className="flex justify-center gap-1">
            <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse" />
            <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse delay-75" />
            <div className="w-1 h-1 rounded-full bg-cyan-500 animate-pulse delay-150" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}