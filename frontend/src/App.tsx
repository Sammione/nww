import React, { useState } from 'react';
import {
    Video,
    Sparkles,
    Wand2,
    Mic2,
    Zap,
    Play,
    Download,
    ArrowRight,
    Check,
    Star,
    TrendingUp,
    Users,
    Clock,
    Menu,
    X
} from 'lucide-react';
import axios from 'axios';

const API_BASE = "http://localhost:8080";

const TEMPLATES = [
    { id: 'football', title: 'Sports', icon: '⚽', gradient: 'from-emerald-500 to-teal-500' },
    { id: 'crypto', title: 'Finance', icon: '💰', gradient: 'from-amber-500 to-orange-500' },
    { id: 'motivation', title: 'Motivation', icon: '🔥', gradient: 'from-rose-500 to-pink-500' },
    { id: 'business', title: 'Business', icon: '💼', gradient: 'from-blue-500 to-indigo-500' },
    { id: 'tech', title: 'Technology', icon: '🚀', gradient: 'from-purple-500 to-violet-500' },
    { id: 'lifestyle', title: 'Lifestyle', icon: '✨', gradient: 'from-cyan-500 to-blue-500' },
];

const FEATURES = [
    { icon: Wand2, title: 'AI Script Generation', description: 'Viral-optimized scripts in seconds' },
    { icon: Mic2, title: 'Neural Voices', description: 'Ultra-realistic AI voiceovers' },
    { icon: Sparkles, title: 'Auto B-Roll', description: 'AI-generated visuals' },
    { icon: Zap, title: 'Instant Export', description: 'Ready-to-upload videos' },
];

const STATS = [
    { value: '50K+', label: 'Videos Created' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '24/7', label: 'AI Available' },
];

function App() {
    const [topic, setTopic] = useState('');
    const [tone, setTone] = useState('motivational');
    const [platform, setPlatform] = useState('TikTok');
    const [loading, setLoading] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [status, setStatus] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            {/* Navigation */}
            <nav className="relative z-50 border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/50 group-hover:shadow-indigo-500/70 transition-all group-hover:scale-105">
                                <Video className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">Clipora</h1>
                                <p className="text-xs text-slate-400">by Hirena Studio</p>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</a>
                            <a href="#templates" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Templates</a>
                            <a href="#pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</a>
                            <div className="h-6 w-px bg-white/10" />
                            <button className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors">Sign In</button>
                            <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/50 transition-all hover:scale-105">
                                Get Started
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-xl">
                        <div className="px-4 py-6 space-y-4">
                            <a href="#features" className="block text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</a>
                            <a href="#templates" className="block text-sm font-medium text-slate-300 hover:text-white transition-colors">Templates</a>
                            <a href="#pricing" className="block text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</a>
                            <div className="pt-4 space-y-3">
                                <button className="w-full text-sm font-semibold text-white hover:text-indigo-400 transition-colors text-left">Sign In</button>
                                <button className="w-full px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            <main className="relative z-10">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-8 backdrop-blur-sm">
                            <Sparkles className="w-4 h-4" />
                            AI-Powered Video Creation
                        </div>

                        {/* Headline */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                            Create Viral Videos
                            <br />
                            <span className="gradient-text">In Seconds</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-xl sm:text-2xl text-slate-400 mb-8 leading-relaxed max-w-3xl mx-auto">
                            Transform any idea into professional faceless videos with AI-powered scripts, voiceovers, and visuals.
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-8 mb-12">
                            {STATS.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                                    <div className="text-sm text-slate-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Generator Section */}
                    <div className="grid lg:grid-cols-2 gap-8 items-start mb-20">
                        {/* Left: Controls */}
                        <div className="space-y-6">
                            {/* Main Control Panel */}
                            <div className="glass rounded-3xl p-8 border border-white/10 shadow-2xl">
                                <div className="space-y-6">
                                    {/* Topic Input */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center justify-between">
                                            <span className="flex items-center gap-2">
                                                <Wand2 className="w-4 h-4 text-indigo-400" />
                                                Video Topic
                                            </span>
                                            <span className="text-xs text-slate-500">{topic.length}/100</span>
                                        </label>
                                        <textarea
                                            placeholder="e.g., Top 5 productivity hacks for entrepreneurs..."
                                            rows={3}
                                            className="w-full input-modern resize-none text-lg"
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value.slice(0, 100))}
                                        />
                                    </div>

                                    {/* Tone Selection */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                                            <Mic2 className="w-4 h-4 text-teal-400" />
                                            Narrative Tone
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['Motivational', 'Dramatic', 'Casual', 'Professional'].map((t) => (
                                                <button
                                                    key={t}
                                                    onClick={() => setTone(t.toLowerCase())}
                                                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all border ${tone === t.toLowerCase()
                                                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-lg shadow-indigo-500/30'
                                                            : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                                                        }`}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Platform Selection */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                                            <Video className="w-4 h-4 text-purple-400" />
                                            Target Platform
                                        </label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {['TikTok', 'Shorts', 'Reels'].map((p) => (
                                                <button
                                                    key={p}
                                                    onClick={() => setPlatform(p)}
                                                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all border ${platform === p
                                                            ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white border-transparent shadow-lg shadow-teal-500/30'
                                                            : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                                                        }`}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Generate Button */}
                                    <button
                                        onClick={handleGenerate}
                                        disabled={!topic || loading}
                                        className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/50 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 group relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <Zap className="w-6 h-6 relative z-10" />
                                        <span className="relative z-10">Generate Video</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                                    </button>
                                </div>
                            </div>

                            {/* Quick Templates */}
                            <div id="templates" className="glass rounded-3xl p-6 border border-white/10">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Star className="w-5 h-5 text-amber-400" />
                                    Quick Templates
                                </h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {TEMPLATES.map((template) => (
                                        <button
                                            key={template.id}
                                            onClick={() => setTopic(`${template.title} content ideas...`)}
                                            className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-105"
                                        >
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.gradient} flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl transition-shadow`}>
                                                {template.icon}
                                            </div>
                                            <span className="text-xs font-semibold text-slate-300">{template.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Preview */}
                        <div className="lg:sticky lg:top-24">
                            <div className="glass rounded-3xl p-6 border border-white/10 shadow-2xl aspect-[9/16] max-w-md mx-auto bg-slate-900/50 flex flex-col items-center justify-center relative overflow-hidden">
                                {loading ? (
                                    <div className="text-center px-8">
                                        <div className="relative mb-8">
                                            <div className="w-24 h-24 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                                            <Sparkles className="absolute inset-0 m-auto w-10 h-10 text-indigo-400 animate-pulse" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">Creating Magic...</h3>
                                        <p className="text-slate-400 font-medium">{status}</p>
                                    </div>
                                ) : videoUrl ? (
                                    <div className="w-full h-full relative group">
                                        <video
                                            src={videoUrl}
                                            controls
                                            autoPlay
                                            loop
                                            className="w-full h-full object-cover rounded-2xl"
                                        />
                                        <div className="absolute top-4 left-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => setVideoUrl(null)}
                                                className="flex-1 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white font-semibold text-sm hover:bg-white/20 transition-all"
                                            >
                                                New Video
                                            </button>
                                            <a
                                                href={videoUrl}
                                                download
                                                className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all"
                                            >
                                                <Download className="w-6 h-6" />
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center px-8">
                                        <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                                            <Play className="w-10 h-10 text-slate-500" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-400 mb-3">Your Video Preview</h3>
                                        <p className="text-slate-500 text-sm">Configure your settings and hit generate to see your video here</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <section id="features" className="mb-20">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
                            <p className="text-xl text-slate-400">Everything you need to create viral content</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {FEATURES.map((feature, index) => (
                                <div key={index} className="glass rounded-2xl p-6 border border-white/10 hover:border-indigo-500/30 transition-all card-hover">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/30">
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                                    <p className="text-slate-400 text-sm">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </section>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/10 bg-slate-900/50 backdrop-blur-xl py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <Video className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Clipora</h3>
                                <p className="text-xs text-slate-400">by Hirena Studio</p>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm">© 2026 Hirena Studio. Empowering African creators.</p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Privacy</a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Terms</a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Support</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
