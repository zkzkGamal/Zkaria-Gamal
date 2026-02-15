<template>
  <footer class="obsidian-footer">
    <div class="main-container">
      <div class="footer-content">
        <div class="footer-brand">
          <!-- <span class="logo-text">ZG<span class="dot">.</span>AI</span> -->
          <img src="../../assets/logo-bg.png" alt="Logo" class="logo">
          <p class="brand-tagline">Architecting Intelligence</p>
        </div>

        <div class="footer-links">
          <router-link to="/posts" @click="closeMenu">Work</router-link>
          <a href="/#about" class="footer-link">About</a>
          <a href="/#contact" class="footer-link">Contact</a>
        </div>

        <div class="footer-social">
          <a href="https://github.com/zkzkGamal" target="_blank" class="social-icon-link" aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
              </path>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/zkaria-gamal-82b486267/" target="_blank" class="social-icon-link"
            aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a href="mailto:zekogml11@gmail.com" class="social-icon-link" aria-label="Email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">© {{ new Date().getFullYear() }} Zkaria Gamal. All rights reserved.</p>
        <div class="legal-links">
          <a href="#" class="legal-link">Privacy Policy</a>
          <a href="#" class="legal-link">Terms of Use</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterCom'
}
</script>

<style scoped>
.obsidian-footer {
  background: var(--bg-alt);
  border-top: 1px solid var(--border-dim);
  /* padding: var(--space-2xl) 0 var(--space-lg); */
  position: relative;
  overflow: hidden;
}

.logo {
  width: 75px;
  height: 75px;
  object-fit: contain;
  object-position: center;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2xl);
  flex-wrap: wrap;
  gap: var(--space-xl);
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.logo-text {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.5rem;
  letter-spacing: -0.02em;
  color: var(--text-hero);
}

.dot {
  color: var(--emerald-500);
}

.brand-tagline {
  font-size: 0.875rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.footer-links {
  display: flex;
  gap: var(--space-xl);
}

.footer-link {
  color: var(--text-body);
  font-weight: 500;
  transition: var(--transition-fast);
  position: relative;
}

.footer-link:hover {
  color: var(--emerald-500);
}

.footer-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--emerald-500);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.footer-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.footer-social {
  display: flex;
  gap: var(--space-md);
}

.social-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-alt);
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  transition: var(--transition-bounce);
}

.social-icon-link:hover {
  background: var(--bg-hover);
  color: var(--emerald-500);
  border-color: var(--emerald-500);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--glow-ambient);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding-top: var(--space-lg); */
  border-top: 1px solid var(--border-subtle);
  flex-wrap: wrap;
  gap: var(--space-md);
}

.copyright {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.legal-links {
  display: flex;
  gap: var(--space-lg);
}

.legal-link {
  font-size: 0.875rem;
  color: var(--text-muted);
  transition: var(--transition-fast);
}

.legal-link:hover {
  color: var(--text-hero);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
    gap: var(--space-lg);
  }

  .footer-bottom {
    flex-direction: column-reverse;
    text-align: center;
  }

  .footer-links {
    flex-direction: column;
    gap: var(--space-md);
  }
}
</style>
