<template>
    <div class="obsidian-social">
        <h4 class="social-kicker">Connect</h4>
        <div class="social-links-grid">
            <a target="_blank" href="https://www.linkedin.com/in/zkaria-gamal-82b486267/" class="social-box linkedin">
                <div class="social-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                </div>
                <div class="social-content">
                    <span class="platform">LinkedIn</span>
                    <span class="handle">@Zkaria_Gamal</span>
                </div>
                <div class="arrow">→</div>
            </a>
            
            <a target="_blank" href="https://twitter.com/zkzkgamal11" class="social-box twitter">
                <div class="social-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.46 6c-.85.38-1.78.64-2.75.76 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.96-3.06 1.17-.88-.93-2.13-1.52-3.51-1.52-2.66 0-4.81 2.15-4.81 4.81 0 .38.04.75.13 1.1-4-.2-7.54-2.11-9.92-5.02-.42.72-.66 1.55-.66 2.44 0 1.67.85 3.14 2.14 4-.79-.02-1.53-.24-2.18-.6v.06c0 2.33 1.66 4.27 3.86 4.72-.4.11-.83.17-1.27.17-.31 0-.62-.03-.92-.09.62 1.94 2.42 3.35 4.55 3.39-1.67 1.31-3.77 2.09-6.05 2.09-.39 0-.78-.02-1.17-.07 2.18 1.4 4.77 2.21 7.56 2.21 9.05 0 14-7.5 14-14 0-.21 0-.42-.02-.63.96-.69 1.8-1.56 2.46-2.55z"/>
                    </svg>
                </div>
                <div class="social-content">
                    <span class="platform">Twitter</span>
                    <span class="handle">@Zkaria_Gamal</span>
                </div>
                <div class="arrow">→</div>
            </a>
            
            <a target="_blank" href="https://github.com/zkzkGamal" class="social-box github">
                <div class="social-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                    </svg>
                </div>
                <div class="social-content">
                    <span class="platform">GitHub</span>
                    <span class="handle">@zkzkGamal</span>
                </div>
                <div class="arrow">→</div>
            </a>
        </div>
    </div>
</template>

<style scoped>
.obsidian-social {
    padding-top: var(--space-sm);
}

.social-kicker {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--text-muted);
    margin-bottom: 1.5rem;
    font-weight: 700;
}

.social-links-grid {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
}

.social-box {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-md);
    background: var(--bg-alt);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    transition: var(--transition-normal);
    position: relative;
    overflow: hidden;
}

.social-box::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: var(--emerald-500);
    transform: scaleY(0);
    transition: var(--transition-normal);
}

.social-box:hover {
    border-color: var(--emerald-500);
    background: var(--bg-hover);
    transform: translateX(8px);
    box-shadow: 0 8px 24px var(--glow-ambient);
}

.social-box:hover::before {
    transform: scaleY(1);
}

.social-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--obsidian-900);
    border-radius: var(--radius-md);
    color: var(--emerald-500);
    transition: var(--transition-fast);
}

.social-box:hover .social-icon {
    background: var(--emerald-500);
    color: var(--obsidian-950);
    transform: rotate(5deg) scale(1.1);
}

.social-content {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.platform {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--emerald-500);
    text-transform: uppercase;
    margin-bottom: 0.25rem;
    letter-spacing: 0.05em;
}

.handle {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-hero);
    transition: var(--transition-fast);
}

.social-box:hover .handle {
    color: var(--emerald-500);
}

.arrow {
    color: var(--text-muted);
    font-size: 1.25rem;
    transition: var(--transition-fast);
    opacity: 0;
}

.social-box:hover .arrow {
    opacity: 1;
    transform: translateX(4px);
}

@media (max-width: 768px) {
    .social-box {
        padding: var(--space-sm);
    }
    
    .social-icon {
        width: 36px;
        height: 36px;
    }
}
</style>

