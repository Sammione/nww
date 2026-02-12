// API Configuration
const API_BASE = 'http://localhost:8000';

// State
let selectedTone = 'motivational';
let selectedPlatform = 'TikTok';
let currentVideoUrl = null;

// DOM Elements
const topicInput = document.getElementById('topicInput');
const charCount = document.getElementById('charCount');
const generateBtn = document.getElementById('generateBtn');
const previewEmpty = document.getElementById('previewEmpty');
const previewLoading = document.getElementById('previewLoading');
const previewVideo = document.getElementById('previewVideo');
const videoPlayer = document.getElementById('videoPlayer');
const loadingStatus = document.getElementById('loadingStatus');
const newVideoBtn = document.getElementById('newVideoBtn');
const downloadBtn = document.getElementById('downloadBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Character counter
topicInput.addEventListener('input', () => {
    charCount.textContent = `${topicInput.value.length}/100`;
    updateGenerateButton();
});

// Tone selection
document.querySelectorAll('[data-tone]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('[data-tone]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedTone = btn.dataset.tone;
    });
});

// Platform selection
document.querySelectorAll('[data-platform]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('[data-platform]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedPlatform = btn.dataset.platform;
    });
});

// Template selection
document.querySelectorAll('[data-template]').forEach(btn => {
    btn.addEventListener('click', () => {
        const template = btn.dataset.template;
        topicInput.value = `${template} content ideas...`;
        charCount.textContent = `${topicInput.value.length}/100`;
        updateGenerateButton();
        topicInput.focus();
    });
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Update generate button state
function updateGenerateButton() {
    generateBtn.disabled = topicInput.value.trim().length === 0;
}

// Generate video
generateBtn.addEventListener('click', async () => {
    const topic = topicInput.value.trim();
    if (!topic) return;

    // Show loading state
    previewEmpty.style.display = 'none';
    previewLoading.style.display = 'block';
    previewVideo.style.display = 'none';
    generateBtn.disabled = true;

    try {
        loadingStatus.textContent = 'Crafting your viral script...';

        const response = await fetch(`${API_BASE}/generate-video`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                topic: topic,
                tone: selectedTone,
                length: 30,
                platform: selectedPlatform,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate video');
        }

        loadingStatus.textContent = 'Adding voiceover and visuals...';

        const data = await response.json();

        if (data.video_url) {
            currentVideoUrl = `${API_BASE}${data.video_url}`;
            videoPlayer.src = currentVideoUrl;

            // Show video
            previewLoading.style.display = 'none';
            previewVideo.style.display = 'block';
        } else {
            throw new Error('No video URL in response');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to generate video. Please ensure the backend is running at ' + API_BASE);

        // Reset to empty state
        previewLoading.style.display = 'none';
        previewEmpty.style.display = 'block';
    } finally {
        generateBtn.disabled = false;
    }
});

// New video button
newVideoBtn.addEventListener('click', () => {
    previewVideo.style.display = 'none';
    previewEmpty.style.display = 'block';
    currentVideoUrl = null;
    videoPlayer.src = '';
});

// Download button
downloadBtn.addEventListener('click', () => {
    if (currentVideoUrl) {
        const a = document.createElement('a');
        a.href = currentVideoUrl;
        a.download = 'clipora-video.mp4';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.style.display = 'none';
        }
    });
});

// Initialize
updateGenerateButton();
