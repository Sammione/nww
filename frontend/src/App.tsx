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
    Menu,
    X,
    Check
} from 'lucide-react';
import axios from 'axios';

const API_BASE = "http://localhost:8080";

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
        setStatus('Crafting your viral script...');

        try {
            const response = await axios.post(`${API_BASE}/generate-video`, {
                topic,
                tone,
                length: 30,
                platform: platform,
            });

            setStatus('Adding voiceover and visuals...');
            if (response.data.video_url) {
                setVideoUrl(`${API_BASE}${response.data.video_url}`);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to generate video. Please ensure the backend is running.');
        } finally {
            setLoading(false);
            setStatus('');
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0B0D] text-white">
            {/* Gradient Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
            </div>

            {/* Navigation */}
            <nav className="relative z-50 border-b border-white/10 bg-[#0A0B0D]/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <Video className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold font-display">Clipora</h1>
                                <p className="text-[10px] text-gray-400">by Hirena Studio</p>
                            </div>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-sm text-gray-300 hover:text-white transition-colors">Features</a>
                            <a href="#pricing" className="text-sm text-gray-300 hover:text-white transition-colors">Pricing</a>
                            <button className="text-sm text-gray-300 hover:text-white transition-colors">Sign In</button>
                            <button className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all">
                                Get Started
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden py-4 border-t border-white/10">
                            <div className="flex flex-col gap-4">
                                <a href="#features" className="text-sm text-gray-300">Features</a>
                                <a href="#pricing" className="text-sm text-gray-300">Pricing</a>
                                <button className="text-sm text-gray-300 text-left">Sign In</button>
                                <button className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative z-10">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12">
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6">
                            <Sparkles className="w-4 h-4" />
                            AI-Powered Video Creation
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display mb-6 leading-tight">
                            Create Viral Videos
                            <br />
                            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                In Seconds
                            </span>
                        </h1>

                        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                            Transform any idea into professional faceless videos with AI-powered scripts, voiceovers, and visuals.
                        </p>

                        <div className="flex flex-wrap justify-center gap-12 mb-12">
                            <div>
                                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-1">50K+</div>
                                <div className="text-sm text-gray-400">Videos Created</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">98%</div>
                                <div className="text-sm text-gray-400">Satisfaction</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent mb-1">24/7</div>
                                <div className="text-sm text-gray-400">AI Available</div>
                            </div>
                        </div>
                    </div>

                    {/* Generator Section */}
                    <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Left: Controls */}
                        <div className="space-y-6">
                            {/* Main Panel */}
                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                                <div className="space-y-6">
                                    {/* Topic Input */}
                                    <div>
                                        <label className="flex items-center justify-between text-sm font-semibold text-gray-300 mb-3">
                                            <span className="flex items-center gap-2">
                                                <Wand2 className="w-4 h-4 text-indigo-400" />
                                                Video Topic
                                            </span>
                                            <span className="text-xs text-gray-500">{topic.length}/100</span>
                                        </label>
                                        <textarea
                                            placeholder="e.g., Top 5 productivity hacks for entrepreneurs..."
                                            rows={3}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all resize-none"
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value.slice(0, 100))}
                                        />
                                    </div>

                                    {/* Tone */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
                                            <Mic2 className="w-4 h-4 text-purple-400" />
                                            Narrative Tone
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['Motivational', 'Dramatic', 'Casual', 'Professional'].map((t) => (
                                                <button
                                                    key={t}
                                                    onClick={() => setTone(t.toLowerCase())}
                                                    className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all ${tone === t.toLowerCase()
                                                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                                                            : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                                                        }`}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Platform */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
                                            <Video className="w-4 h-4 text-pink-400" />
                                            Target Platform
                                        </label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {['TikTok', 'Shorts', 'Reels'].map((p) => (
                                                <button
                                                    key={p}
                                                    onClick={() => setPlatform(p)}
                                                    className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all ${platform === p
                                                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                                                            : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
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
                                        className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                    >
                                        <Zap className="w-5 h-5" />
                                        Generate Video
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Quick Templates */}
                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                                <h3 className="text-sm font-bold text-white mb-4">Quick Start Templates</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { emoji: '⚽', label: 'Sports', color: 'from-green-500 to-emerald-500' },
                                        { emoji: '💰', label: 'Finance', color: 'from-yellow-500 to-orange-500' },
                                        { emoji: '🔥', label: 'Motivation', color: 'from-red-500 to-pink-500' },
                                        { emoji: '💼', label: 'Business', color: 'from-blue-500 to-indigo-500' },
                                        { emoji: '🚀', label: 'Tech', color: 'from-purple-500 to-violet-500' },
                                        { emoji: '✨', label: 'Lifestyle', color: 'from-cyan-500 to-blue-500' },
                                    ].map((template, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setTopic(`${template.label} content ideas...`)}
                                            className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                                        >
                                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${template.color} flex items-center justify-center text-xl`}>
                                                {template.emoji}
                                            </div>
                                            <span className="text-[10px] font-semibold text-gray-400">{template.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Preview */}
                        <div className="lg:sticky lg:top-24 h-fit">
                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 aspect-[9/16] max-w-sm mx-auto flex flex-col items-center justify-center">
                                {loading ? (
                                    <div className="text-center">
                                        <div className="w-20 h-20 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin mb-6 mx-auto" />
                                        <h3 className="text-2xl font-bold mb-2">Creating Magic...</h3>
                                        <p className="text-gray-400">{status}</p>
                                    </div>
                                ) : videoUrl ? (
                                    <div className="w-full h-full relative group">
                                        <video
                                            src={videoUrl}
                                            controls
                                            autoPlay
                                            loop
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                        <div className="absolute top-4 left-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => setVideoUrl(null)}
                                                className="flex-1 py-2 bg-white/10 backdrop-blur-md rounded-lg text-white text-sm font-semibold hover:bg-white/20 transition-all"
                                            >
                                                New Video
                                            </button>
                                            <a
                                                href={videoUrl}
                                                download
                                                className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white hover:shadow-lg transition-all"
                                            >
                                                <Download className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center px-8">
                                        <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                                            <Play className="w-8 h-8 text-gray-500" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-400 mb-2">Your Video Preview</h3>
                                        <p className="text-sm text-gray-500">Configure settings and generate to see your video</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <section id="features" className="mt-24">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold font-display mb-4">Powerful Features</h2>
                            <p className="text-xl text-gray-400">Everything you need to create viral content</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: Wand2, title: 'AI Script Generation', desc: 'Viral-optimized scripts' },
                                { icon: Mic2, title: 'Neural Voices', desc: 'Realistic AI voiceovers' },
                                { icon: Sparkles, title: 'Auto B-Roll', desc: 'AI-generated visuals' },
                                { icon: Zap, title: 'Instant Export', desc: 'Ready-to-upload videos' },
                            ].map((feature, idx) => (
                                <div key={idx} className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-indigo-500/30 transition-all">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4">
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-400">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </section>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/10 bg-[#0A0B0D]/80 backdrop-blur-xl py-12 mt-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <Video className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold font-display">Clipora</h3>
                                <p className="text-xs text-gray-400">by Hirena Studio</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400">© 2026 Hirena Studio. Empowering African creators.</p>
                        <div className="flex gap-6">
                            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms</a>
                            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Support</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
