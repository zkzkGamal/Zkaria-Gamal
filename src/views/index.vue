<template>
  <div class="portfolio-obsidian">
    <!-- Header is now in global component included in individual views or App.vue, 
         but since we kept headerCom in views, we remove the hardcoded header here 
         and ensure headerCom is used if not already. 
         Wait, index.vue didn't have <headerCom>, it had a hardcoded header.
         I'll replace the hardcoded header with the global <headerCom /> 
    -->
    <headerCom />

    <main>
      <section class="hero-section">
        <div class="main-container">
          <div class="intro-wrapper">
            <div class="hero-image-container">
              <img id="profile_pic" src="../assets/me.jpg" class="premium-border">
              <div class="floating-badge">Available for Projects</div>
            </div>
            <div class="hero-text-container">
              <h4 class="kicker">Experienced AI Engineer</h4>
              <h1 class="hero-title">Refining the future of <span class="gradient-text-alt">Intelligent Systems</span>
              </h1>
              <HeroPreview />
            </div>
          </div>
        </div>
      </section>
      <a name="about"></a>
      <section class="profile-section">
        <div class="main-container">
          <div class="profile-grid">
            <aboutme />
            <socialL />
          </div>
        </div>
      </section>

      <section class="projects-section">
        <div class="main-container">
          <div class="section-header">
            <h2 class="section-title">Case Studies & Research</h2>
            <p class="section-subtitle">Production-grade AI solutions and scalable system architectures.</p>
          </div>
          <div class="post-wrapper">
            <HomeCards v-for="(post) in posts.slice(0, 6)" :key="post.id" :title="post.title" :id="post.id"
              :sub_heading="post.sub_headline" :thumbnail="post.thumbnail" />
          </div>
          <div class="footer-cta">
            <router-link to="/posts" class="premium-button">
              View All Professional Work
            </router-link>
          </div>
        </div>
      </section>

      <section class="contact-section" id="contact">
        <div class="main-container">
          <div class="glass-card contact-card">
            <contactForm />
          </div>
        </div>
      </section>
    </main>

    <!-- Footer is now global in App.vue -->
  </div>
</template>

<script>
import headerCom from '@/components/global/header.vue' // Import global header
import HeroPreview from '@/components/home/HeroPreview.vue'
import aboutme from '@/components/home/about.vue'
import socialL from '@/components/home/socialLink.vue'
import HomeCards from '@/components/home/HomeCards.vue'
import contactForm from '@/components/global/contactForm.vue'
import axios from 'axios'
import { mapState } from 'vuex';

export default {
  name: 'HomePage',
  components: {
    headerCom, // Register global header
    HeroPreview,
    aboutme,
    socialL,
    HomeCards,
    contactForm,
  },
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      posts: [],
    }
  },
  methods: {
    fetchData() {
      axios
        .get('https://zkzk.softzm.cloud/api/posts')
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => {
          console.error('Error getting data:', error);
        });
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped>
.portfolio-obsidian {
  background-color: var(--bg-alt);
  min-height: 100vh;
  margin-bottom: 2rem;
}

/* Removed old nav styles since we use headerCom now */

.hero-section {
  padding: 10rem 0 6rem;
}

.kicker {
  color: var(--emerald-500);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 1rem;
}

.hero-title {
  font-size: 4.5rem;
  margin-bottom: 2.5rem;
  line-height: 1.1;
  max-width: 900px;
}

.floating-badge {
  position: absolute;
  bottom: 2rem;
  right: -1rem;
  background: var(--bg-card);
  border: 1px solid var(--emerald-500);
  color: var(--emerald-500);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.75rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
  transition: var(--transition-fast);
}

.floating-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.25);
}

.hero-image-container {
  position: relative;
  width: fit-content;
}

.profile-section {
  padding: 6rem 0;
}

.profile-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
}

.section-header {
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--text-body);
}

.footer-cta {
  margin-top: 5rem;
  text-align: center;
}

.premium-button {
  display: inline-block;
  padding: 1.25rem 3rem;
  background: transparent;
  border: 1px solid var(--border-dim);
  color: var(--text-hero);
  border-radius: 9999px;
  font-weight: 700;
  transition: var(--transition-fast);
  margin-bottom: 1rem;
}

.premium-button:hover {
  border-color: var(--emerald-500);
  background: var(--glow-primary);
  transform: translateY(-2px);
}

.contact-card {
  padding: 4rem;
  max-width: 800px;
  margin: 0 auto;
}

/* Footer styles moved to global footer component */

@media (max-width: 900px) {
  .hero-title {
    font-size: 3rem;
  }

  .profile-grid {
    grid-template-columns: 1fr;
  }

  .contact-card {
    padding: 2rem;
  }
}
</style>
