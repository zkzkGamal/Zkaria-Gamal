<template>
    <div class="publications-section">
        <div class="container container-custom">
            <h2 class="title">
                <span class="text-primary-custom">Publications</span>
            </h2>
            <p class="subtitle">Research and academic publications.</p>

            <div class="space-y-4">
                <div v-for="(pub, i) in publications" :key="i" class="card-wrapper"
                    :style="{ animationDelay: i * 0.1 + 's' }">
                    <div class="card card-custom">
                        <div class="card-content">
                            <div class="flex-container">
                                <div class="icon-box">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="icon-primary">
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                    </svg>
                                </div>
                                <div class="content-box">
                                    <h3 class="pub-title">{{ pub.title }}</h3>
                                    <p class="pub-meta">{{ pub.journal }} · {{ pub.date }}</p>
                                    <p class="pub-desc">{{ pub.description }}</p>
                                    <a v-if="pub.url && pub.url !== '#'" :href="pub.url" target="_blank"
                                        rel="noopener noreferrer" class="view-link">
                                        View Publication
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" class="ml-1">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                            <polyline points="15 3 21 3 21 9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { publications } from '@/data/content.js';

export default {
    name: 'PublicationsComponent',
    data() {
        return {
            publications
        };
    }
};
</script>

<style scoped>
.publications-section {
    padding-top: 2rem;
    padding-bottom: 2rem;
    /* min-height: 100vh; */
}

.container-custom {
    max-width: 48rem;
    /* max-w-3xl */
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
}

.title {
    font-size: 2.25rem;
    /* text-4xl */
    font-weight: 700;
    margin-bottom: 0.5rem;
    opacity: 0;
    animation: fadeInUp 0.6s ease-out forwards;
}

.text-primary-custom {
    color: var(--primary-color, #10b981);
    /* Default to emerald if var not set */
}

.subtitle {
    color: var(--text-muted, #6b7280);
    margin-bottom: 2rem;
}

.space-y-4>*+* {
    margin-top: 1rem;
}

.card-wrapper {
    opacity: 0;
    animation: fadeInUp 0.6s ease-out forwards;
}

.card-custom {
    background-color: var(--bg-card);
    border: 1px solid var(--border-dim);
    border-radius: 0.5rem;
    transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.card-custom:hover {
    border-color: rgba(16, 185, 129, 0.3);
    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.12);
    transform: translateY(-2px);
}

.card-content {
    padding: 1.5rem;
}

.flex-container {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.icon-box {
    padding: 0.5rem;
    background-color: rgba(16, 185, 129, 0.1);
    /* primary/10 */
    border-radius: 0.5rem;
    margin-top: 0.25rem;
}

.icon-primary {
    color: var(--primary-color, #10b981);
}

.content-box {
    flex: 1;
}

.pub-title {
    font-weight: 600;
    /* color: var(--text-foreground, #f3f4f6); */
    margin-bottom: 0.25rem;
    font-size: 1.125rem;
}

.pub-meta {
    font-size: 0.875rem;
    color: var(--primary-color, #10b981);
    font-weight: 500;
}

.pub-desc {
    font-size: 0.875rem;
    color: var(--text-muted, #9ca3af);
    margin-top: 0.5rem;
    line-height: 1.625;
}

.view-link {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    color: var(--primary-color, #10b981);
    margin-top: 0.75rem;
    text-decoration: none;
}

.view-link:hover {
    text-decoration: underline;
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
