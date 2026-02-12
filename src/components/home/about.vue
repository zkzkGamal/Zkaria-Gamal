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
                                <path d="M10 14L10 4M10 14L6 10M10 14L14 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4 17H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
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

            <!-- Enhanced CV Content -->
            <div class="cv-grid">
                <!-- Work Experience Column -->
                <div class="cv-column">
                    <h3 class="cv-section-title">
                        <span class="icon-wrapper">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                        </span>
                        Work Experience
                    </h3>
                    
                    <div class="timeline">
                        <!-- Role 1 -->
                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <div class="premium-card timeline-content">
                                <div class="role-header">
                                    <h4 class="role-title">AI Engineer (RAG & LLM Systems)</h4>
                                    <span class="role-type">Part-time</span>
                                </div>
                                <div class="company-meta">
                                    <span class="company-name">thepost</span>
                                    <span class="separator">•</span>
                                    <span class="location">Cairo</span>
                                    <span class="separator">•</span>
                                    <span class="date">Oct 2025 – Present</span>
                                </div>
                                <p class="role-desc">Building RAG pipelines and LLM-based systems for content intelligence and automated workflows.</p>
                            </div>
                        </div>

                        <!-- Role 2 -->
                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <div class="premium-card timeline-content">
                                <div class="role-header">
                                    <h4 class="role-title">AI Engineer</h4>
                                    <span class="role-type">Full-time</span>
                                </div>
                                <div class="company-meta">
                                    <span class="company-name">Alohadot</span>
                                    <span class="separator">•</span>
                                    <span class="location">Cairo</span>
                                    <span class="separator">•</span>
                                    <span class="date">Aug 2024 – Present</span>
                                </div>
                                <p class="role-desc">Designing and deploying production AI systems across computer vision, NLP, and LLM applications. End-to-end ML pipelines with real-time inference.</p>
                            </div>
                        </div>

                        <!-- Role 3 -->
                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <div class="premium-card timeline-content">
                                <div class="role-header">
                                    <h4 class="role-title">Software Engineer</h4>
                                    <span class="role-type">Freelance</span>
                                </div>
                                <div class="company-meta">
                                    <span class="company-name">Freelance</span>
                                    <span class="separator">•</span>
                                    <span class="location">Remote</span>
                                    <span class="separator">•</span>
                                    <span class="date">Dec 2022 – Present</span>
                                </div>
                                <p class="role-desc">Full-stack development and AI consulting. Built custom solutions using FastAPI, Django, React, and various ML frameworks.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Education & Publications Column -->
                <div class="cv-column">
                    <!-- Education -->
                    <div class="cv-section">
                        <h3 class="cv-section-title">
                            <span class="icon-wrapper">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                            </span>
                            Education
                        </h3>
                        <div class="glass-card education-card">
                            <h4 class="edu-degree">Bachelor of Science in Computer Science</h4>
                            <p class="edu-school">Cairo Higher Institute</p>
                        </div>
                    </div>

                    <!-- Publications -->
                    <div class="cv-section">
                        <h3 class="cv-section-title">
                            <span class="icon-wrapper">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                            </span>
                            Publications
                        </h3>
                        <div class="premium-card publication-card">
                            <div class="pub-badge">Research</div>
                            <h4 class="pub-title">A Unified Deep Learning Framework for Robust Multi-Class Tumor Classification in Skin and Brain MRI</h4>
                            <div class="pub-meta">
                                <span class="pub-journal">MDPI</span>
                                <span class="separator">•</span>
                                <span class="pub-date">August 2025</span>
                            </div>
                            <p class="pub-abstract">Research on a unified deep learning approach for multi-class tumor classification across skin lesion images and brain MRI scans.</p>
                        </div>
                    </div>
                </div>
            </div>

            <TechSkills/>
        </div>
    </div>
</template>

<script>
import TechSkills from '@/components/home/TechSkills.vue'
import axios from 'axios';

export default {
    name: 'aboutMe',
    components: {
        TechSkills
    },
    methods:{
        getresume(){
            axios
            .get('https://zkariag.pythonanywhere.com/api/resume')
            .then((response)=>{
                this.resume=response.data
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

    .cv-grid {
        grid-template-columns: 1fr;
        gap: var(--space-xl);
    }

    .timeline {
        padding-left: 0;
        border-left: none;
        gap: var(--space-xl);
    }

    .timeline-item {
        padding-left: 0;
    }

    .timeline-dot {
        display: none; /* Hide dots on mobile for cleaner look */
    }

    .timeline-content {
        margin-left: 0;
        border-left: 2px solid var(--emerald-500);
        padding-left: var(--space-md);
    }
}

/* ========= CV Grid Layout ========= */
.cv-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: var(--space-2xl);
    margin-top: var(--space-xl);
}

.cv-column {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
}

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

/* ========= Timeline Styles ========= */
.timeline {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    position: relative;
    padding-left: 1rem;
    border-left: 2px solid var(--border-dim);
}

.timeline-item {
    position: relative;
}

.timeline-dot {
    position: absolute;
    left: -1.35rem; /* Adjust based on border and dot size */
    top: 1.5rem;
    width: 12px;
    height: 12px;
    background: var(--obsidian-950);
    border: 2px solid var(--emerald-500);
    border-radius: 50%;
    z-index: 2;
}

.timeline-content {
    margin-left: var(--space-md);
}

.role-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-xs);
    flex-wrap: wrap;
    gap: 0.5rem;
}

.role-title {
    font-size: 1.125rem;
    color: var(--text-hero);
    margin: 0;
}

.role-type {
    font-size: 0.75rem;
    color: var(--emerald-500);
    background: rgba(16, 185, 129, 0.1);
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-full);
    border: 1px solid rgba(16, 185, 129, 0.2);
}

.company-meta {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin-bottom: var(--space-sm);
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    align-items: center;
}

.separator {
    color: var(--border-medium);
}

.company-name {
    color: var(--text-primary);
    font-weight: 600;
}

.role-desc {
    font-size: 0.95rem;
    color: var(--text-body);
}

/* ========= Education Card ========= */
.education-card {
    padding: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
}

.edu-degree {
    font-size: 1.125rem;
    color: var(--text-hero);
}

.edu-school {
    color: var(--emerald-500);
    font-weight: 500;
}

/* ========= Publication Card ========= */
.publication-card {
    border-color: var(--indigo-500); /* Special accent for research */
}

.pub-badge {
    position: absolute;
    top: 0;
    right: 0;
    background: var(--indigo-600);
    color: white;
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
    border-bottom-left-radius: var(--radius-md);
    font-weight: 700;
    text-transform: uppercase;
}

.pub-title {
    font-size: 1rem;
    color: var(--text-hero);
    margin-bottom: var(--space-xs);
    line-height: 1.4;
    padding-right: 1rem;
}

.pub-meta {
    font-size: 0.8rem;
    color: var(--indigo-400);
    margin-bottom: var(--space-sm);
    font-weight: 600;
}

.pub-abstract {
    font-size: 0.9rem;
    color: var(--text-body);
    font-style: italic;
}
</style>