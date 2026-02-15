<template>
    <div class="professional-profile">
        <h2 class="section-title">Professional Profile</h2>
        <div class="profile-content">
            <p class="bio-main">
                Experienced AI Engineer specialized in designing and deploying production-oriented AI systems.
                Proven track record in building end-to-end ML pipelines with a focus on system reliability,
                low-latency APIs, and extreme scalability.
            </p>
            <div class="expertise-wrap">
                <h4 class="mini-kicker">Core Expertise</h4>
                <p class="expertise-list">Production AI • LLM Systems • Computer Vision • High-Perf Inference</p>
                <div class="action-bar">
                    <button @click="getresume" class="cta-button">
                        <span class="button-content">
                            <svg class="button-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 14L10 4M10 14L6 10M10 14L14 10" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M4 17H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            </svg>
                            Download Full Curriculum Vitae
                        </span>
                        <span class="button-ripple"></span>
                    </button>
                    <div class="status-indicator">
                        <span class="status-dot"></span>
                        Available for Senior Roles
                    </div>
                </div>
            </div>

            <Publications />

            <Experience />

            <div class="cv-section mt-12">
                <h3 class="cv-section-title">
                    <span class="icon-wrapper">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                        </svg>
                    </span>
                    Education
                </h3>
                <div class="glass-card education-card">
                    <h4 class="edu-degree">Bachelor of Science in Computer Science</h4>
                    <p class="edu-school">Cairo Higher Institute</p>
                </div>
            </div>
            <h3 class="cv-section-title">
                <span class="icon-wrapper">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                </span>
                Technical Skills
            </h3>
            <TechSkills />
        </div>
    </div>
</template>

<script>
import TechSkills from '@/components/home/TechSkills.vue'
import Publications from '@/components/home/Publications.vue'
import Experience from '@/components/home/Experience.vue'
import axios from 'axios';

export default {
    name: 'aboutMe',
    components: {
        TechSkills,
        Publications,
        Experience
    },
    methods: {
        getresume() {
            axios
                .get('https://zkzk.softzm.cloud/api/resume')
                .then((response) => {
                    this.resume = response.data
                    window.open(this.resume.file, '_blank');
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        },
    }
}
</script>

<style scoped>
.professional-profile {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
}

.section-title {
    font-size: clamp(2rem, 4vw, 2.5rem);
    margin-bottom: var(--space-md);
    background: linear-gradient(135deg, var(--text-hero), var(--emerald-500));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.bio-main {
    font-size: 1.125rem;
    color: var(--text-body);
    margin-bottom: 2.5rem;
    max-width: 800px;
    line-height: 1.9;
}

.expertise-wrap {
    margin-bottom: var(--space-xl);
}

.mini-kicker {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--text-muted);
    margin-bottom: 0.75rem;
    font-weight: 700;
}

.expertise-list {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-hero);
    margin-bottom: 2rem;
    letter-spacing: -0.02em;
}

.action-bar {
    display: flex;
    align-items: center;
    gap: var(--space-lg);
    margin-bottom: var(--space-xl);
    flex-wrap: wrap;
}

.cta-button {
    background: var(--emerald-500);
    color: var(--obsidian-950);
    border: none;
    padding: 1rem 2rem;
    border-radius: var(--radius-md);
    font-weight: 700;
    cursor: pointer;
    transition: var(--transition-normal);
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    box-shadow: 0 4px 12px var(--glow-ambient);
}

.button-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    position: relative;
    z-index: 1;
}

.button-icon {
    transition: var(--transition-fast);
}

.button-ripple {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
    opacity: 0;
    transform: scale(0);
    transition: transform 0.6s, opacity 0.6s;
}

.cta-button:hover {
    background: var(--emerald-400);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px var(--glow-primary);
}

.cta-button:hover .button-icon {
    transform: translateY(2px);
}

.cta-button:active {
    transform: translateY(0);
}

.cta-button:active .button-ripple {
    opacity: 1;
    transform: scale(2);
}

.status-indicator {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-body);
    padding: 0.75rem 1.25rem;
    background: var(--bg-alt);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
}

.status-dot {
    width: 8px;
    height: 8px;
    background: var(--emerald-500);
    border-radius: 50%;
    box-shadow: 0 0 12px var(--emerald-500);
    animation: pulse-glow 2s ease-in-out infinite;
}

@media (max-width: 768px) {
    .section-title {
        font-size: 2rem;
    }

    .bio-main {
        font-size: 1rem;
    }

    .expertise-list {
        font-size: 1.1rem;
    }

    .action-bar {
        flex-direction: column;
        align-items: stretch;
        gap: var(--space-md);
    }

    .cta-button {
        width: 100%;
        justify-content: center;
    }
}

.mt-12 {
    margin-top: 3rem;
}

/* ========= CV Grid Layout Reused for Education ========= */

.cv-section-title {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    font-size: 1.25rem;
    color: var(--emerald-500);
    margin-bottom: var(--space-lg);
    border-bottom: 1px solid var(--border-dim);
    padding-bottom: var(--space-xs);
}

.icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-alt);
    padding: 0.4rem;
    border-radius: var(--radius-md);
    color: var(--emerald-500);
}

/* ========= Education Card ========= */
.education-card {
    padding: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    margin-bottom: 1rem;
}

.edu-degree {
    font-size: 1.125rem;
    color: var(--text-hero);
}

.edu-school {
    color: var(--emerald-500);
    font-weight: 500;
}
</style>