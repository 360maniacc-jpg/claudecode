/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink, 
  Cpu, 
  Zap, 
  Globe, 
  Monitor, 
  Youtube, 
  ChevronRight,
  Info,
  AlertTriangle,
  Download,
  Key,
  Settings,
  Wrench,
  Search,
  MousePointerClick,
  Apple,
  LayoutGrid
} from 'lucide-react';

// Custom Cursor Component
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Direct DOM manipulation for zero-latency movement
      cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      trail.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      
      // Update global CSS variables for board glow effects
      document.documentElement.style.setProperty('--mouse-x', `${clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${clientY}px`);
      
      // Detect pointer cursor to scale main dot
      const target = e.target as HTMLElement;
      if (target) {
        const isPointer = window.getComputedStyle(target).cursor === 'pointer';
        if (isPointer) {
          cursor.classList.add('is-pointer');
        } else {
          cursor.classList.remove('is-pointer');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className="custom-cursor"
      />
      <div 
        ref={trailRef}
        className="cursor-trail"
        style={{ 
          transition: 'transform 0.1s ease-out'
        }}
      />
    </>
  );
};

const CodeBlock = ({ code, language = 'bash' }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="code-block-container" className="relative group mt-6 rounded-xl overflow-hidden border border-white/10 bg-black/60 transition-all hover:border-claude-green/50 box-glow-hover animate-pulse-glow">
      <div className="absolute inset-0 bg-claude-green/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      <div className="flex items-center justify-between px-5 py-3 bg-white/5 border-b border-white/10 relative z-10">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] font-bold">{language}</span>
        <button 
          onClick={copyToClipboard}
          className="flex items-center gap-2 text-xs text-zinc-400 hover:text-claude-green transition-all"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div 
                key="check"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-2 text-claude-green font-bold text-glow"
              >
                <Check size={14} strokeWidth={3} />
                <span>Copied!</span>
              </motion.div>
            ) : (
              <motion.div 
                key="copy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Copy size={14} />
                <span>Copy</span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
      <div className="p-6 overflow-x-auto relative z-10">
        <pre className="font-mono text-sm text-zinc-300 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

const Section = ({ id, title, label, children, icon: Icon }: any) => {
  return (
    <motion.section 
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className="py-32 border-b border-white/5 relative"
    >
      <div className="absolute -left-4 top-32 w-1 h-12 bg-claude-green opacity-20 blur-sm rounded-full"></div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-claude-green/10 border border-claude-green/20">
          {Icon && <Icon className="text-claude-green" size={16} />}
        </div>
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500">{label}</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-semibold mb-16 tracking-tight text-white">{title}</h2>
      {children}
    </motion.section>
  );
};

const TerminalSnippet = () => {
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="terminal-mockup" className="relative w-full max-w-2xl mx-auto md:mx-0">
      <div className="absolute -inset-4 bg-claude-green/10 rounded-[2rem] blur-3xl opacity-40"></div>
      <div className="relative bg-[#080808] rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 bg-zinc-900 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="flex-1 text-center pr-12">
            <span className="text-[10px] text-zinc-600 font-mono tracking-widest uppercase">claude-terminal</span>
          </div>
        </div>
        <div className="p-8 font-mono text-sm md:text-base space-y-3 leading-relaxed">
          <div className="flex gap-3">
            <span className="text-claude-green font-bold animate-pulse">❯</span>
            <span className="text-zinc-200">claude init</span>
          </div>
          <div className="text-zinc-500 pl-6 border-l border-claude-green/20 py-2 my-4">
             Initializing Claude Code v1.0.0...<br/>
             <span className="text-claude-green/80">Configuring model:</span> minimax-m2.5-free<br/>
             <span className="text-claude-green/80">Base URL:</span> opencode.ai/zen
          </div>
          <div className="flex gap-3 pt-2">
            <span className="text-zinc-400 font-bold tracking-tight">Ready to build the future.</span>
            <span className={`w-2 h-5 bg-claude-green shadow-[0_0_8px_var(--color-claude-green)] ${cursor ? 'opacity-100' : 'opacity-0'}`}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav id="main-nav" className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 group"
        >
          <div className="p-1.5 bg-claude-green/10 rounded-lg group-hover:bg-claude-green/20 transition-colors">
            <Terminal className="text-claude-green" size={20} />
          </div>
          <span className="font-semibold tracking-tighter text-lg uppercase">Claude Free</span>
        </motion.div>
        
        <div className="hidden lg:flex items-center gap-10">
          <a href="#hero" className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500 hover:text-white transition-all">Start</a>
          <a href="#step-1" className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500 hover:text-white transition-all">Install</a>
          <a href="#step-2" className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500 hover:text-white transition-all">Configure</a>
          <a href="#step-troubleshoot" className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500 hover:text-white transition-all">Fixes</a>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://www.youtube.com/@AifortheStreets" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-5 py-2.5 bg-red-600/10 hover:bg-red-600/20 text-red-500 rounded-xl text-xs font-bold border border-red-600/20 transition-all group animate-pulse"
          >
            <Youtube size={16} className="group-hover:scale-110 transition-transform" />
            <span>AI for the Streets</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default function App() {
  const [device, setDevice] = useState<'mac' | 'windows' | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectDevice = (type: 'mac' | 'windows') => {
    setDevice(type);
    document.getElementById('step-1')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="root-container" className="selection:bg-claude-green/30 selection:text-white bg-[#050505] text-[#d4d4d8] min-h-screen">
      <Nav />
      <CustomCursor />
      <div className="premium-gradient absolute inset-0 pointer-events-none opacity-50"></div>

      <main className="max-w-7xl mx-auto px-8 pt-20 pb-32">
        {/* Hero Section */}
        <section id="hero" className="flex flex-col lg:flex-row items-center gap-24 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 space-y-10"
          >
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-[10px] font-mono font-medium text-zinc-400 mb-6 group/badge hover:border-claude-green/50 transition-colors shadow-2xl">
              <span className="text-claude-green font-bold">$</span>
              <span className="opacity-70 text-zinc-500">claude</span>
              <span className="text-white">--mode 100%_free</span>
              <span className="terminal-cursor !ml-0.5"></span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white leading-[0.95]">
              Claude Code <br />
              <span className="text-[#333] text-glow transition-all duration-700 hover:text-white">for $0.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-500 max-w-xl leading-relaxed font-medium">
              Bypass subscriptions. Deploy <span className="text-white">MiniMax 2.5</span> for free via Open Code. The ultimate setup for high-speed AI engineering.
            </p>
            
            <div className="space-y-6 pt-8">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-600">Select your hardware ecosystem</p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => selectDevice('mac')}
                  className={`flex-1 min-w-[200px] flex items-center justify-center gap-3 p-6 rounded-2xl border transition-all duration-500 group ${device === 'mac' ? 'bg-white text-black border-white animate-pulse-glow' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
                >
                  <Apple size={24} className="group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <span className="block text-xs font-bold tracking-widest uppercase opacity-50">macOS / Linux</span>
                    <span className="block text-lg font-bold">Standard</span>
                  </div>
                </button>
                <button 
                  onClick={() => selectDevice('windows')}
                  className={`flex-1 min-w-[200px] flex items-center justify-center gap-3 p-6 rounded-2xl border transition-all duration-500 group ${device === 'windows' ? 'bg-claude-green text-black border-claude-green animate-pulse-glow' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
                >
                  <Monitor size={24} className="group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <span className="block text-xs font-bold tracking-widest uppercase opacity-50">Windows OS</span>
                    <span className="block text-lg font-bold">Recommended</span>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full relative"
          >
             <TerminalSnippet />
          </motion.div>
        </section>

        {/* Step 1: Install */}
        <Section id="step-1" title="01. Install the Core" label="The Foundation" icon={Download}>
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <p className="text-xl text-zinc-400 font-medium">
                Install the Claude Code CLI. This gives the AI model agency over your local environment.
              </p>
              
              <AnimatePresence mode="wait">
                {(!device || device === 'mac') && (
                  <motion.div 
                    key="mac-install"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                       <Apple size={18} className="text-zinc-500" />
                       <span className="text-sm font-bold text-white uppercase tracking-widest">macOS / Linux Command</span>
                    </div>
                    <CodeBlock code="curl -fsSL https://claude.ai/install.sh | bash" />
                  </motion.div>
                )}

                {(!device || device === 'windows') && (
                  <motion.div 
                    key="win-install"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4 pt-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                       <Monitor size={18} className="text-zinc-500" />
                       <span className="text-sm font-bold text-white uppercase tracking-widest">Windows PowerShell Host</span>
                    </div>
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex gap-3 mb-4">
                      <AlertTriangle className="text-yellow-500 shrink-0" size={18} />
                      <p className="text-xs text-yellow-200/80 leading-relaxed font-medium">
                        Windows requires <b>Node.js</b> to run NPM commands. If you don't have it, download it from <a href="https://nodejs.org/" target="_blank" className="text-white underline hover:text-claude-green transition-colors">nodejs.org</a> or your terminal will return "command not found".
                      </p>
                    </div>
                    <CodeBlock code="npm install -g @anthropic-ai/claude-code" language="powershell" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-claude-green/30 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-claude-green/10 border border-claude-green/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Cpu size={20} className="text-claude-green" />
                </div>
                <h4 className="text-white font-bold mb-2">Why CLI?</h4>
                <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                  Direct terminal access allows the AI to perform complex architectural refactoring across multiple files simultaneously.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-claude-green/30 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-claude-green/10 border border-claude-green/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap size={20} className="text-claude-green" />
                </div>
                <h4 className="text-white font-bold mb-2">Efficiency</h4>
                <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                  Zero latency compared to web interfaces. Instant file-system awareness makes "vibe coding" truly continuous.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Step 2: Open Code */}
        <Section id="step-2" title="02. Generate Your Credentials" label="Auth Layer" icon={Key}>
          <div className="max-w-4xl space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-12 bg-white/[0.02] border border-white/5 p-12 rounded-[2rem]">
               <div className="flex-1 space-y-6">
                  <h3 className="text-2xl font-bold text-white tracking-tight">Access the Model Engine</h3>
                  <p className="text-zinc-400 font-medium leading-relaxed">
                    We use the <span className="text-white text-glow">Open Code Zen</span> platform to proxy requests to MiniMax 2.5 for free. This is a promotional gateway—use it while it lasts.
                  </p>
                  <a 
                    href="https://opencode.ai/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-claude-green hover:text-black transition-all group animate-pulse-glow hover:scale-105"
                  >
                    Go to Open Code
                    <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
               </div>
               <div className="w-full md:w-1/3 bg-black/40 p-6 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <Info size={14} className="text-claude-green" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">How to get Zen key</span>
                  </div>
                  <ol className="space-y-3 text-xs text-zinc-500 font-medium">
                    <li className="flex gap-2"><span className="text-white">1.</span> Login with Social Auth</li>
                    <li className="flex gap-2"><span className="text-white">2.</span> Find "Zen" in Dashboard</li>
                    <li className="flex gap-2"><span className="text-white">3.</span> Select "MiniMax 2.5 Free"</li>
                    <li className="flex gap-2"><span className="text-white">4.</span> Copy "sk-..." key</li>
                  </ol>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5 border-l-4 border-l-red-500">
                <AlertTriangle className="text-red-500 mb-4" size={20} />
                <h5 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">No Card Needed</h5>
                <p className="text-xs text-zinc-500 font-medium">If you reach a "Enable Billing" screen, you clicked the wrong option. Reset and find "Zen".</p>
              </div>
              <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5 border-l-4 border-l-claude-green">
                <Key className="text-claude-green mb-4" size={20} />
                <h5 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">Key Masking</h5>
                <p className="text-xs text-zinc-500 font-medium"> Treat your API key like a password. Do not hardcode it in public files.</p>
              </div>
              <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5 border-l-4 border-l-blue-500">
                <LayoutGrid className="text-blue-500 mb-4" size={20} />
                <h5 className="text-white font-bold mb-2 uppercase text-[10px] tracking-widest">Dashboard</h5>
                <p className="text-xs text-zinc-500 font-medium">Monitor your request limits and model availability in the Open Code UI.</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Step 3: Configure */}
        <Section id="step-3" title="03. Virtual Configuration" label="The Handshake" icon={Settings}>
          <div className="grid lg:grid-cols-12 gap-12 items-start">
             <div className="lg:col-span-5 space-y-8">
                <p className="text-xl text-zinc-400 font-medium leading-relaxed">
                  Bridge the Claude CLI to the free model endpoint. <b>Copy the terminal command below</b>, paste it into your terminal, and press Enter. This will create and open your settings file.
                </p>
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all glow-card">
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-4 flex items-center gap-2">
                       <Terminal size={12} />
                       1. Create the File
                    </h5>
                    {(!device || device === 'mac') && (
                      <div className="space-y-2">
                        <p className="text-xs font-mono text-zinc-400 italic">macOS / Linux Command:</p>
                        <CodeBlock code="mkdir -p ~/.claude && nano ~/.claude/settings.json" language="terminal" />
                      </div>
                    )}
                    {(!device || device === 'windows') && (
                      <div className="space-y-4 pt-4">
                         <p className="text-xs font-mono text-zinc-400 italic">Windows PowerShell Command:</p>
                         <CodeBlock code="mkdir -p $env:USERPROFILE\.claude; notepad $env:USERPROFILE\.claude\settings.json" language="powershell" />
                         <p className="text-sm text-zinc-500 font-medium italic mt-2">Running this will open a Notepad window.</p>
                      </div>
                    )}
                  </div>
                </div>
             </div>
             
             <div className="lg:col-span-7 bg-[#0c0c0c] rounded-[2rem] border border-white/10 p-4 shadow-2xl relative overflow-hidden group">
                <div className="absolute -inset-1 bg-claude-green/5 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"></div>
                <div className="flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-white/5 rounded-t-2xl relative z-10">
                   <div className="flex items-center gap-2">
                     <Settings size={14} className="text-zinc-500" />
                     <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-500">2. Paste this into the file</span>
                   </div>
                   <div className="px-2 py-1 rounded bg-claude-green/10 border border-claude-green/20 text-[8px] font-bold text-claude-green uppercase">Required</div>
                </div>
                <div className="relative z-10">
                  <CodeBlock 
                    language="json" 
                    code={`{
  "env": {
    "ANTHROPIC_BASE_URL": "https://opencode.ai/zen",
    "ANTHROPIC_MODEL": "minimax-m2.5-free",
    "ANTHROPIC_API_KEY": "sk-YOUR_API_KEY",
    "ENABLE_TOOL_SEARCH": "true"
  },
  "model": "minimax-m2.5-free",
  "theme": "dark"
}`} />
                </div>
                <div className="px-8 py-6 text-xs text-zinc-500 font-medium flex items-center gap-3 relative z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-claude-green animate-pulse"></div>
                  <span>Replace <code className="text-white">sk-YOUR_API_KEY</code> with your real key from Step 02.</span>
                </div>
             </div>
          </div>
        </Section>

        {/* Troubleshooting */}
        <Section id="step-troubleshoot" title="04. Deployment Recovery" label="Operations" icon={Wrench}>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-yellow-500/30 transition-all group overflow-hidden relative">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                 <Search size={120} className="text-zinc-500" />
               </div>
               <div className="relative z-10 space-y-6">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Windows Bug #01</div>
                 <h4 className="text-2xl font-bold text-white tracking-tight leading-tight">The "Invisible" .txt Extension</h4>
                 <p className="text-sm text-zinc-500 leading-relaxed font-medium font-mono">
                   If your file is named <code className="text-white text-glow">settings.json.txt</code>, Claude will ignore it. 
                 </p>
                 <div className="p-4 bg-zinc-950 rounded-xl border border-white/5 text-xs text-zinc-500 space-y-3 font-medium">
                   <p className="flex items-center gap-2"><ChevronRight size={12} className="text-claude-green" /> Path: <b>%USERPROFILE%\.claude\settings.json</b></p>
                   <p className="flex items-center gap-2"><ChevronRight size={12} className="text-claude-green" /> Go to File Explorer and paste the path above in the address bar</p>
                   <p className="flex items-center gap-2"><ChevronRight size={12} className="text-claude-green" /> If not found: Run <code className="text-white">mkdir $env:USERPROFILE\.claude</code> in PowerShell first</p>
                   <p className="flex items-center gap-2"><ChevronRight size={12} className="text-claude-green" /> Click 'View' ❯ 'Show' ❯ 'File name extensions'</p>
                   <p className="flex items-center gap-2"><ChevronRight size={12} className="text-claude-green" /> Ensure the file is NOT <b>settings.json.txt</b></p>
                 </div>
               </div>
            </div>

            <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-claude-green/30 transition-all group overflow-hidden relative">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                 <Zap size={120} className="text-zinc-500" />
               </div>
               <div className="relative z-10 space-y-6">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 text-[10px] font-bold uppercase tracking-widest text-zinc-400">Windows Power Method</div>
                 <h4 className="text-2xl font-bold text-white tracking-tight leading-tight">The Terminal Injection Fix</h4>
                 <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                   Bypass configuration files entirely by forcing variables into your current PowerShell session.
                 </p>
                 <CodeBlock language="powershell" code={`$env:ANTHROPIC_BASE_URL="https://opencode.ai/zen"\n$env:ANTHROPIC_MODEL="minimax-m2.5-free"\n$env:ANTHROPIC_API_KEY="sk-YOUR_API_KEY"`} />
               </div>
            </div>
          </div>
        </Section>

        {/* Closing / YouTube Support */}
        <div id="support" className="mt-48 text-center space-y-8 bg-gradient-to-b from-white/[0.05] to-transparent p-24 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden">
           <div className="absolute inset-0 bg-red-600/5 blur-3xl rounded-full"></div>
           <div className="relative z-10 space-y-6">
              <Youtube size={64} className="mx-auto text-red-600 animate-pulse" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">Master AI Automation</h2>
              <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium">
                 Subscribe to <b>AI for the Streets</b> for more loopholes, model comparisons, and zero-dollar engineering strategies.
              </p>
              <div className="pt-8">
                 <a 
                   href="https://www.youtube.com/@AifortheStreets" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center gap-4 px-12 py-5 bg-red-600 text-white font-bold rounded-2xl hover:bg-white hover:text-black transition-all group animate-pulse scale-110"
                 >
                   Open YouTube Channel
                   <Youtube size={22} className="group-hover:scale-110 transition-transform" />
                 </a>
              </div>
           </div>
        </div>
      </main>

      <footer className="py-24 border-t border-white/5 mt-48 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-24 mb-24">
            <div className="lg:col-span-2 space-y-8">
               <div className="flex items-center gap-3">
                  <Terminal className="text-claude-green" size={24} />
                  <span className="font-bold tracking-tighter text-2xl uppercase">Claude Free</span>
               </div>
               <p className="text-zinc-600 font-medium max-w-md leading-relaxed">
                 An educational project dedicated to democratizing access to high-tier AI engineering tools. Built with Minimax 2.5 and Open Code infrastructure.
               </p>
            </div>
            <div className="space-y-6">
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Resources</h5>
              <div className="flex flex-col gap-4 text-xs font-bold text-zinc-400">
                <a href="https://opencode.ai/" target="_blank" className="hover:text-claude-green transition-all">Open Code Zen</a>
                <a href="https://nodejs.org/" target="_blank" className="hover:text-claude-green transition-all">Node.js Engine</a>
                <a href="https://www.youtube.com/@AifortheStreets" target="_blank" className="hover:text-claude-green transition-all">AI for the Streets</a>
              </div>
            </div>
            <div className="space-y-6 text-xs text-zinc-600 font-medium">
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Legal</h5>
              <p>Promotional offer subject to availability. Model quality depends on Open Code infrastructure stability.</p>
              <p>© 2026 Claude Code Free Guide.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
