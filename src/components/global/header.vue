<template>
  <header class="glass-header" :class="{ 'scrolled': isScrolled && !isMenuOpen, 'menu-open': isMenuOpen }">
    <div class="main-container nav-content">
      <!-- Logo -->
      <router-link :to="{ name: 'home' }" class="brand-logo">
        <!-- <span class="logo-text">Z.G</span> -->
         <img src="../../assets/logo-bg.png" alt="Logo" class="logo">
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="desktop-nav">
        <ul class="nav-links">
          <li><router-link to="/" class="header-link">Home</router-link></li>
          <li><router-link to="/posts" class="header-link">Work</router-link></li>
          <li><a href="/#about" class="header-link">About</a></li>
          <li><a href="/#contact" class="header-link">Contact</a></li>

          <li v-if="user" class="user-menu">
            <router-link :to="{ name: 'profile' }" class="header-link notification-link">
              Notifications
              <span class="notification-dot" v-if="hasNotifications"></span>
            </router-link>
            <a href="#" @click.prevent="logout" class="header-link logout-btn">Logout</a>
          </li>
          <li v-else>
            <router-link to="/login" class="header-link login-btn">Login</router-link>
          </li>
        </ul>

        <div class="divider"></div>
        <ThemeToggle />
      </nav>

      <!-- Mobile Menu Button -->
      <button class="mobile-menu-btn" @click="toggleMenu" aria-label="Toggle menu">
        <div class="hamburger" :class="{ 'active': isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <!-- Mobile Navigation -->
      <teleport to="body">
        <div class="mobile-nav" :class="{ 'open': isMenuOpen }">
          <div class="mobile-nav-content">
            <ul class="mobile-links">
              <li><router-link to="/" @click="closeMenu">Home</router-link></li>
              <li><router-link to="/posts" @click="closeMenu">Work</router-link></li>
              <li><a href="/#about" @click="closeMenu">About</a></li>
              <li><a href="/#contact" @click="closeMenu">Contact</a></li>

              <hr class="mobile-divider">

              <li v-if="user">
                <router-link :to="{ name: 'profile' }" @click="closeMenu">Notifications</router-link>
                <a href="#" @click.prevent="logoutAndClose">Logout</a>
              </li>
              <li v-else>
                <router-link to="/login" @click="closeMenu">Login</router-link>
              </li>
            </ul>
            <div class="mobile-theme-toggle">
              <span class="theme-label">Switch Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </teleport>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ThemeToggle from '@/components/global/ThemeToggle.vue';

export default {
  name: 'headerCom',
  components: {
    ThemeToggle
  },
  data() {
    return {
      isMenuOpen: false,
      isScrolled: false,
      hasNotifications: false
    };
  },
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    ...mapActions(['logout']),
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    closeMenu() {
      this.isMenuOpen = false;
      document.body.style.overflow = '';
    },
    logoutAndClose() {
      this.logout();
      this.closeMenu();
      this.$router.push('/login');
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 20;
    }
  }
}
</script>

<style scoped>
.glass-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
}

.logo {
  width: 75px;
  height: 75px;
}

.glass-header.scrolled {
  padding: 1rem 0;
  background: rgba(var(--bg-alt-rgb), 0.85);
  /* Slightly more opaque */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-subtle);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.glass-header.menu-open {
  /* Ensure transparent background correctly when menu is open */
  background: transparent !important;
  border-bottom: none !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-logo {
  text-decoration: none;
  z-index: 1100;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-text {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 1.75rem;
  letter-spacing: -0.02em;
  color: var(--text-hero);
}

.dot {
  color: var(--emerald-500);
}

/* Desktop Nav */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.header-link {
  color: var(--text-body);
  font-weight: 600;
  font-size: 0.95rem;
  transition: var(--transition-fast);
  position: relative;
  text-decoration: none;
}

.header-link:hover,
.header-link.router-link-active {
  color: var(--emerald-500);
}

.notification-link {
  position: relative;
}

.notification-dot {
  position: absolute;
  top: -2px;
  right: -8px;
  width: 8px;
  height: 8px;
  background: var(--emerald-500);
  border-radius: 50%;
  box-shadow: 0 0 0 2px var(--bg-main);
}

.login-btn {
  padding: 0.5rem 1.25rem;
  background: var(--bg-alt);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
}

.login-btn:hover {
  border-color: var(--emerald-500);
  color: var(--emerald-500);
  transform: translateY(-1px);
}

.divider {
  width: 1px;
  height: 24px;
  background: var(--border-dim);
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1100;
  padding: 0.5rem;
}

.hamburger {
  width: 24px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--text-hero);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger.active span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

/* Mobile Nav Overlay */
.mobile-nav {
  position: fixed;
  inset: 0;
  background: var(--bg-main);
  z-index: 999;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-nav.open {
  transform: translateX(0);
}

.mobile-nav-content {
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.mobile-links {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.mobile-links a {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-hero);
  display: block;
  text-decoration: none;
  transition: color 0.3s;
}

.mobile-links a:hover,
.mobile-links a.router-link-active {
  color: var(--emerald-500);
}

.mobile-divider {
  width: 100px;
  height: 1px;
  background: var(--border-dim);
  border: none;
  margin: 0 auto;
}

.mobile-theme-toggle {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.theme-label {
  font-size: 0.875rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Change breakpoint from 768px to 1024px for earlier switching */
@media (max-width: 1024px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .glass-header {
    padding: 1rem 0;
    /* consistent padding on mobile */
  }
}
</style>
