<template>
  <section class="experience-section" id="experience">
    <div class="container container-custom">
      <h2 class="title text-center">
        <span class="text-primary-custom">Work</span> Experience
      </h2>
      <div class="timeline-container">
        <div v-for="(exp, i) in experiences" :key="i" class="timeline-item">
          <!-- Timeline Item Content here, adapted from previous design but cleaner -->
          <div class="timeline-dot"></div>
          <div class="card card-custom timeline-content">
            <div class="role-header">
              <h4 class="role-title">{{ exp.title }}</h4>
              <span class="role-type">{{ exp.type }}</span>
            </div>
            <div class="company-meta">
              <span class="company-name">{{ exp.company }}</span>
              <span class="separator">•</span>
              <span class="location">{{ exp.location }}</span>
              <span class="separator">•</span>
              <span class="date">{{ exp.date }}</span>
            </div>
            <p class="role-desc">{{ exp.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { experiences } from '@/data/content.js';

export default {
  name: 'ExperienceComponent',
  data() {
    return {
      experiences
    };
  }
};
</script>

<style scoped>
.experience-section {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.container-custom {
  max-width: 80rem;
  /* container mx-auto */
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

.text-center {
  text-align: center;
}

.title {
  font-size: 1.875rem;
  /* text-3xl */
  font-weight: 700;
  margin-bottom: 3rem;
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}

.text-primary-custom {
  color: var(--primary-color, #10b981);
}

.timeline-container {
  max-width: 42rem;
  /* max-w-2xl */
  margin-left: auto;
  margin-right: auto;
  position: relative;
  padding-left: 1rem;
  border-left: 2px solid var(--border-dim, #374151);
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Stagger animation delay */
.timeline-item:nth-child(1) {
  animation-delay: 0.1s;
}

.timeline-item:nth-child(2) {
  animation-delay: 0.2s;
}

.timeline-item:nth-child(3) {
  animation-delay: 0.3s;
}

.timeline-dot {
  position: absolute;
  left: -1.35rem;
  /* Adjust based on border and dot size */
  top: 1.5rem;
  width: 12px;
  height: 12px;
  background: var(--bg-main);
  border: 2px solid var(--emerald-500, #10b981);
  border-radius: 50%;
  z-index: 2;
}

.card-custom {
  background-color: var(--bg-card);
  border: 1px solid var(--border-dim);
  border-radius: 0.5rem;
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
  padding: 1.5rem;
  margin-left: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.card-custom:hover {
  border-color: rgba(16, 185, 129, 0.3);
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.12);
  transform: translateX(4px);
}

.role-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.role-title {
  font-size: 1.125rem;
  font-weight: 600;
  /* color: var(--text-foreground, #f3f4f6); */
  margin: 0;
}

.role-type {
  font-size: 0.75rem;
  color: var(--emerald-500, #10b981);
  background: rgba(16, 185, 129, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.company-meta {
  font-size: 0.875rem;
  color: var(--text-muted, #9ca3af);
  margin-bottom: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
}

.separator {
  color: var(--border-medium, #4b5563);
}

.company-name {
  color: var(--text-primary, #e5e7eb);
  font-weight: 600;
}

.role-desc {
  font-size: 0.95rem;
  color: var(--text-body, #d1d5db);
  line-height: 1.6;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
