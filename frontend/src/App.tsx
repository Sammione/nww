import React, { useState } from 'react';
import {
    Video,
    Sparkles,
    Type,
    Mic2,
    Layers,
    ChevronRight,
    Play,
    Zap,
    Loader2,
    CheckCircle2,
    Download,
    ArrowRight,
    Plus,
    Monitor,
    Smartphone,
    Info
} from 'lucide-react';
import axios from 'axios';

const API_BASE = "http://localhost:8080";

const TEMPLATES = [
    { id: 'football', title: 'Football', icon: '⚽', color: 'from-green-500/20 to-emerald-500/20' },
    { id: 'crypto', title: 'Crypto', icon: '₿', color: 'from-orange-500/20 to-yellow-500/20' },
    { id: 'motivation', title: 'Motivation', icon: '🔥', color: 'from-red-500/20 to-orange-500/20' },
    { id: 'business', title: 'Business', icon: '💼', color: 'from-blue-500/20 to-indigo-500/20' },
    { id: 'relationship', title: 'Advice', icon: '❤️', color: 'from-pink-500/20 to-rose-500/20' },
    { id: 'news', title: 'Gist/News', icon: '🗞️', color: 'from-purple-500/20 to-violet-500/20' },
];

function App() {
    const [topic, setTopic] = useState('');
    const [tone, setTone] = useState('motivational');
    const [platform, setPlatform] = useState('TikTok');
    const [loading, setLoading] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [status, setStatus] = useState('');

    const handleGenerate = async () => {
        if (!topic) return;
        setLoading(true);
        setVideoUrl(null);
        setStatus('Crafting viral script...');
        try {
            const response = await axios.post(`${API_BASE}/generate-video`, {
                topic,
                tone,
                length: 30,
                platform: platform,
            });

            setStatus('Polishing visuals and voice...');
            if (response.data.video_url) {
                setVideoUrl(`${API_BASE}${response.data.video_url}`);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to generate video. Ensure backend is running and API key is valid.');
        } finally {
            setLoading(false);
            setStatus('');
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#0A0A0B] text-slate-200">
            {/* Dynamic Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-indigo/10 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-purple/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-[30%] left-[40%] w-[20%] h-[20%] bg-brand-cyan/5 rounded-full blur-[100px]" />
            </div>

            {/* Header */}
            <nav className="border-b border-white/5 bg-black/40 backdrop-blur-2xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.location.reload()}>
                        <div className="w-10 h-10 bg-gradient-to-br from-brand-indigo via-brand-purple to-brand-cyan rounded-xl flex items-center justify-center shadow-lg shadow-brand-indigo/20 group-hover:scale-105 transition-all">
                            <Video className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-extrabold tracking-tight text-white font-outfit">Hirena <span className="text-brand-cyan">Studio</span></span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Features</a>
                        <a href="#" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Templates</a>
                        <a href="#" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Pricing</a>
                        <div className="h-5 w-[1px] bg-white/10" />
                        <button className="text-sm font-bold text-white hover:text-brand-cyan transition-colors">Log In</button>
                        <button className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:bg-slate-200 transition-all shadow-xl shadow-white/5">
                            Start Free Trial
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-indigo/10 border border-brand-indigo/20 text-brand-indigo text-xs font-bold uppercase tracking-widest mb-8">
                        <Sparkles className="w-4 h-4" />
                        The Future of Content Creation
                    </div>
                    <h1 className="text-6xl md:text-8xl font-extrabold text-white leading-[1.05] tracking-tight mb-8 font-outfit">
                        AI Videos with <br />
                        <span className="gradient-text">Zero Effort.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                        Clipora is the ultimate faceless video generator. Turn any idea into a viral masterpiece in seconds.
                    </p>
                </div>

                {/* Generator Section */}
                <div id="generator" className="grid lg:grid-cols-12 gap-8 items-start mb-32">
                    {/* Controls */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="glass rounded-[2.5rem] p-10 border border-white/10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 text-slate-500 opacity-20">
                                <Plus className="w-12 h-12" />
                            </div>

                            <div className="relative space-y-8">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <Type className="w-4 h-4" /> Video Topic
                                        </label>
                                        <span className="text-xs text-brand-indigo font-bold">{topic.length}/100</span>
                                    </div>
                                    <textarea
                                        placeholder="Enter your idea (e.g., The best places to visit in Africa)..."
                                        rows={3}
                                        className="w-full bg-white/[0.03] border border-white/5 rounded-3xl px-6 py-6 focus:outline-none focus:border-brand-indigo/30 focus:bg-white/[0.05] transition-all text-xl text-white placeholder:text-slate-600 resize-none"
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value.slice(0, 100))}
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <Mic2 className="w-4 h-4" /> Narrative Tone
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['Motivational', 'Dramatic', 'Funny', 'Educational'].map((t) => (
                                                <button
                                                    key={t}
                                                    onClick={() => setTone(t.toLowerCase())}
                                                    className={`px-4 py-4 rounded-2xl text-sm font-bold transition-all border ${tone === t.toLowerCase()
                                                        ? 'bg-brand-indigo text-white border-brand-indigo shadow-lg shadow-brand-indigo/20'
                                                        : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                                                        }`}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <Smartphone className="w-4 h-4" /> Target Platform
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['TikTok', 'Shorts', 'Reels'].map((p) => (
                                                <button
                                                    key={p}
                                                    onClick={() => setPlatform(p)}
                                                    className={`px-4 py-4 rounded-2xl text-sm font-bold transition-all border ${platform === p
                                                        ? 'bg-brand-cyan text-white border-brand-cyan shadow-lg shadow-brand-cyan/20'
                                                        : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                                                        }`}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleGenerate}
                                    disabled={!topic || loading}
                                    className="w-full py-6 rounded-3xl bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-cyan text-white font-extrabold text-2xl hover:scale-[1.01] active:scale-[0.99] transition-all shadow-2xl shadow-brand-indigo/40 flex items-center justify-center gap-4 disabled:opacity-30 disabled:cursor-not-allowed group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-500" />
                                    <Zap className="w-8 h-8 fill-current text-white group-hover:rotate-12 transition-transform" />
                                    Generate Video
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Quick Templates Block */}
                        <div className="glass rounded-[2rem] p-10 border border-white/5">
                            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                                <Layout className="w-5 h-5 text-brand-cyan" /> Quick Templates
                            </h3>
                            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                                {TEMPLATES.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => setTopic(`${t.title} news today...`)}
                                        className={`flex flex-col items-center gap-3 p-4 rounded-2xl border border-white/5 hover:bg-white/5 transition-all group`}
                                    >
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                                            {t.icon}
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Preview Panel */}
                    <div className="lg:col-span-5 sticky top-32">
                        <div className="glass rounded-[3rem] p-4 border border-white/10 shadow-2xl aspect-[9/16] relative bg-black/40 overflow-hidden flex flex-col items-center justify-center">
                            {loading ? (
                                <div className="flex flex-col items-center text-center px-10">
                                    <div className="relative mb-8">
                                        <div className="w-24 h-24 rounded-full border-4 border-brand-indigo/20 border-t-brand-indigo animate-spin" />
                                        <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-brand-cyan animate-pulse" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-3 font-outfit">Magic in Progress...</h3>
                                    <p className="text-slate-400 font-medium leading-relaxed">{status}</p>
                                </div>
                            ) : videoUrl ? (
                                <div className="w-full h-full relative group">
                                    <video
                                        src={videoUrl}
                                        controls
                                        autoPlay
                                        loop
                                        className="w-full h-full object-cover rounded-[2.5rem]"
                                    />
                                    <div className="absolute top-6 left-6 right-6 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => setVideoUrl(null)}
                                            className="flex-1 py-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl text-white font-bold text-sm hover:bg-white/20 transition-all"
                                        >
                                            New Draft
                                        </button>
                                        <a
                                            href={videoUrl}
                                            download
                                            className="p-4 bg-brand-cyan rounded-2xl text-white shadow-xl shadow-brand-cyan/20 hover:scale-110 transition-all"
                                        >
                                            <Download className="w-6 h-6" />
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center px-12">
                                    <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/5">
                                        <Play className="w-8 h-8 text-slate-600 fill-current" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-500 mb-4 font-outfit italic">Preview your masterpiece</h3>
                                    <p className="text-slate-600 text-sm">Once configuration is set, your vertical video will appear here in high definition.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Features Bento Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="glass p-12 rounded-[2.5rem] md:col-span-2 relative overflow-hidden group border-brand-indigo/10 hover:border-brand-indigo/30 transition-all">
                        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brand-indigo/5 rounded-full blur-3xl" />
                        <Sparkles className="w-12 h-12 text-brand-indigo mb-8" />
                        <h3 className="text-4xl font-bold text-white mb-4 font-outfit">AI Script Mastery</h3>
                        <p className="text-slate-400 text-xl leading-relaxed max-w-lg italic">
                            "We analyze over 100,000 viral shorts every week to ensure your scripts are biologically programmed for retention."
                        </p>
                    </div>
                    <div className="glass p-12 rounded-[2.5rem] border-brand-cyan/10 hover:border-brand-cyan/30 transition-all">
                        <Mic2 className="w-10 h-10 text-brand-cyan mb-8" />
                        <h3 className="text-3xl font-bold text-white mb-4 font-outfit">Neural Voices</h3>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Ultra-realistic human voices with local accent options for maximum relatability.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 bg-black/40 py-20">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                            <Video className="w-4 h-4 text-slate-400" />
                        </div>
                        <span className="text-xl font-bold text-white font-outfit">Hirena <span className="text-brand-cyan">Studio</span></span>
                    </div>
                    <p className="text-slate-500 text-sm">© 2026 Hirena Studio. Built for the next generation of African creators.</p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-slate-400 hover:text-white transition-colors"><Info className="w-5 h-5" /></a>
                        <a href="#" className="px-6 py-2 rounded-full border border-white/10 text-white font-bold text-sm hover:bg-white/5 transition-all">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
