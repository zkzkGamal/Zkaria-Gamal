<template>
    <div class="premium-hero-content">
        <p class="mission-statement">
            I specialize in bridging the gap between <span class="accent">AI research</span> and <span class="accent">production reality</span>.
            From training foundational models to architecting high-frequency, scalable inference systems.
        </p>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-inner">
                    <span class="stat-value">3+</span>
                    <span class="stat-label">Years Experience</span>
                    <div class="stat-decoration"></div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-inner">
                    <span class="stat-value">10+</span>
                    <span class="stat-label">AI Systems Built</span>
                    <div class="stat-decoration"></div>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-inner">
                    <span class="stat-value">99%</span>
                    <span class="stat-label">System Uptime</span>
                    <div class="stat-decoration"></div>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
export default {
    name: 'HeroPreview'
}
</script>

<style scoped>
.premium-hero-content {
    max-width: 700px;
}

.mission-statement {
    font-size: 1.25rem;
    line-height: 1.9;
    color: var(--text-body);
    margin-bottom: var(--space-2xl);
}

.accent {
    color: var(--text-hero);
    font-weight: 700;
    position: relative;
}

.accent::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--emerald-500), var(--indigo-500));
    opacity: 0.3;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: var(--space-md);
}

.stat-card {
    background: var(--bg-alt);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    padding: var(--space-md);
    transition: var(--transition-normal);
    position: relative;
    overflow: hidden;
}

.stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--emerald-500), var(--indigo-500));
    transform: scaleX(0);
    transition: var(--transition-normal);
}

.stat-card:hover {
    border-color: var(--emerald-500);
    transform: translateY(-4px);
    box-shadow: 0 8px 24px var(--glow-ambient);
}

.stat-card:hover::before {
    transform: scaleX(1);
}

.stat-inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    z-index: 1;
}

.stat-value {
    font-size: clamp(2rem, 4vw, 2.5rem);
    font-weight: 900;
    color: var(--text-hero);
    margin-bottom: 0.5rem;
    background: linear-gradient(135deg, var(--text-hero), var(--emerald-500));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.stat-label {
    font-size: 0.75rem;
    color: var(--text-body);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 600;
    line-height: 1.4;
}

.stat-decoration {
    position: absolute;
    bottom: -10px;
    right: -10px;
    width: 60px;
    height: 60px;
    background: radial-gradient(circle, var(--glow-ambient) 0%, transparent 70%);
    opacity: 0;
    transition: var(--transition-normal);
    pointer-events: none;
}

.stat-card:hover .stat-decoration {
    opacity: 1;
}

@media (max-width: 768px) {
    .stats-grid {
        grid-template-columns: 1fr;
    }
    
    .mission-statement {
        font-size: 1.125rem;
    }
}
</style>

