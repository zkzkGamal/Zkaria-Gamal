<template>
  <div class="technical-skills-obsidian">
    <div class="skill-category-group">
      <h5 class="cat-title">
        <svg class="title-icon" width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L13 8L20 9L15 14L16 20L10 17L4 20L5 14L0 9L7 8L10 2Z" fill="currentColor"/>
        </svg>
        Inference & Intelligence
      </h5>
      <div class="tag-cloud">
        <span class="p-tag">LLMs & RAG</span>
        <span class="p-tag">LangGraph/Chain</span>
        <span class="p-tag">Computer Vision</span>
        <span class="p-tag">PyTorch</span>
      </div>
    </div>
    
    <div class="skill-category-group">
      <h5 class="cat-title">
        <svg class="title-icon" width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M2 4C2 2.89543 2.89543 2 4 2H16C17.1046 2 18 2.89543 18 4V16C18 17.1046 17.1046 18 16 18H4C2.89543 18 2 17.1046 2 16V4Z" stroke="currentColor" stroke-width="2"/>
          <path d="M6 10H14M10 6V14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Scale & Infrastructure
      </h5>
      <div class="tag-cloud">
        <span class="p-tag">FastAPI</span>
        <span class="p-tag">Redis Inference</span>
        <span class="p-tag">Docker Containerization</span>
        <span class="p-tag">Vector Search</span>
      </div>
    </div>

    <div class="skill-category-group">
      <h5 class="cat-title">
        <svg class="title-icon" width="16" height="16" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2"/>
          <path d="M10 6V10L13 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Ecosystem
      </h5>
      <div class="tag-cloud">
        <span class="p-tag">PostgreSQL</span>
        <span class="p-tag">CI/CD Pipelines</span>
        <span class="p-tag">Linux Systems</span>
        <span class="p-tag">GCP/AWS</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'TechSkills'
}
</script>

<style scoped>
.technical-skills-obsidian {
    display: grid;
    gap: var(--space-xl);
}

.skill-category-group {
    padding: var(--space-lg);
    background: var(--glass-bg);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    transition: var(--transition-normal);
}

.skill-category-group:hover {
    border-color: var(--border-dim);
    transform: translateX(4px);
}

.cat-title {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--emerald-500);
    margin-bottom: 1.25rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.title-icon {
    color: var(--emerald-500);
}

.tag-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.p-tag {
    background: var(--bg-alt);
    border: 1px solid var(--border-dim);
    color: var(--text-secondary);
    padding: 0.625rem 1.125rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: 600;
    transition: var(--transition-fast);
    cursor: default;
    position: relative;
    overflow: hidden;
}

.p-tag::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1), transparent);
    transition: left 0.5s;
}

.p-tag:hover {
    border-color: var(--emerald-500);
    color: var(--text-hero);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 12px var(--glow-ambient);
}

.p-tag:hover::before {
    left: 100%;
}

@media (max-width: 768px) {
    .skill-category-group {
        padding: var(--space-md);
    }
    
    .tag-cloud {
        gap: 0.5rem;
    }
    
    .p-tag {
        font-size: 0.8rem;
        padding: 0.5rem 0.875rem;
    }
}
</style>