<template>
  <div class="premium-post-card">
    <div class="thumbnail-wrapper">
      <img class="thumbnail-img" :src="thumbnail" :alt="title">
      <div class="gradient-overlay"></div>
      <div class="hover-overlay">
        <router-link :to="'/post/' + id" class="view-case-study-btn">
          <span>View Case Study</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </router-link>
      </div>
    </div>
    <div class="content-body">
      <div class="card-header">
        <span class="tech-badge">AI Solution</span>
      </div>
      <h3 class="card-title">{{title}}</h3>
      <p class="card-description">{{ sub_heading }}</p>
      <div class="card-footer">
        <router-link :to="'/post/' + id" class="arrow-link">
          <span>Explore</span>
          <svg class="arrow-icon" width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name : 'HomeCards',
    props:['thumbnail' , 'title' , 'sub_heading' ,'id']
}
</script>

<style scoped>
.premium-post-card {
    background: var(--bg-card);
    border: 1px solid var(--border-dim);
    border-radius: var(--radius-xl);
    overflow: hidden;
    transition: var(--transition-slow);
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
}

.premium-post-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--emerald-500), var(--indigo-500));
    opacity: 0;
    transition: var(--transition-normal);
}

.premium-post-card:hover {
    border-color: var(--emerald-500);
    transform: translateY(-10px);
    box-shadow: 0 25px 50px -15px var(--glow-primary-strong);
}

.premium-post-card:hover::before {
    opacity: 1;
}

.thumbnail-wrapper {
    position: relative;
    height: 240px;
    overflow: hidden;
    background: var(--obsidian-800);
}

.thumbnail-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition-slow);
}

.premium-post-card:hover .thumbnail-img {
    transform: scale(1.08);
    filter: brightness(0.8);
}

.gradient-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(10, 10, 11, 0.5) 100%);
    pointer-events: none;
}

.hover-overlay {
    position: absolute;
    inset: 0;
    background: rgba(10, 10, 11, 0.9);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: var(--transition-normal);
}

.premium-post-card:hover .hover-overlay {
    opacity: 1;
}

.view-case-study-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--emerald-500);
    color: var(--obsidian-950);
    padding: 0.875rem 1.75rem;
    border-radius: var(--radius-md);
    font-weight: 700;
    font-size: 0.9rem;
    transition: var(--transition-bounce);
    transform: translateY(10px);
    opacity: 0;
}

.premium-post-card:hover .view-case-study-btn {
    transform: translateY(0);
    opacity: 1;
    transition-delay: 0.1s;
}

.view-case-study-btn:hover {
    background: var(--emerald-400);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px var(--glow-primary);
}

.view-case-study-btn svg {
    transition: var(--transition-fast);
}

.view-case-study-btn:hover svg {
    transform: translateX(3px);
}

.content-body {
    padding: var(--space-lg);
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.card-header {
    margin-bottom: 1rem;
}

.tech-badge {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--emerald-500);
    background: var(--glow-ambient);
    padding: 0.35rem 0.75rem;
    border-radius: var(--radius-sm);
    letter-spacing: 0.05em;
    border: 1px solid var(--emerald-500);
}

.card-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--text-hero);
    line-height: 1.3;
    transition: var(--transition-fast);
}

.premium-post-card:hover .card-title {
    color: var(--emerald-500);
}

.card-description {
    font-size: 0.95rem;
    color: var(--text-body);
    line-height: 1.7;
    margin-bottom: auto;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card-footer {
    padding-top: var(--space-md);
    margin-top: var(--space-md);
    border-top: 1px solid var(--border-subtle);
}

.arrow-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    color: var(--text-hero);
    font-size: 0.95rem;
    transition: var(--transition-fast);
}

.arrow-link:hover {
    color: var(--emerald-500);
}

.arrow-icon {
    transition: var(--transition-fast);
}

.arrow-link:hover .arrow-icon {
    transform: translateX(4px);
}

@media (max-width: 768px) {
    .thumbnail-wrapper {
        height: 200px;
    }
    
    .content-body {
        padding: var(--space-md);
    }
}
</style>