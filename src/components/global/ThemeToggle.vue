<template>
  <button @click="toggleTheme" class="theme-toggle" :aria-label="'Switch to ' + nextTheme + ' mode'">
    <span v-if="theme === 'light'" class="icon">🌙</span>
    <span v-else class="icon">☀️</span>
  </button>
</template>

<script>
export default {
  name: 'ThemeToggle',
  data() {
    return {
      theme: 'light'
    }
  },
  computed: {
    nextTheme() {
      return this.theme === 'light' ? 'dark' : 'light'
    }
  },
  mounted() {
    const savedTheme = localStorage.getItem('user-theme') || 'light'
    this.setTheme(savedTheme)
  },
  methods: {
    toggleTheme() {
      const newTheme = this.theme === 'light' ? 'dark' : 'light'
      this.setTheme(newTheme)
    },
    setTheme(theme) {
      this.theme = theme
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('user-theme', theme)
    }
  }
}
</script>

<style scoped>
.theme-toggle {
  background: var(--card-bg);
  backdrop-filter: blur(8px);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--card-shadow);
  transition: var(--transition);
  font-size: 1.2rem;
  padding: 0;
}

.theme-toggle:hover {
  transform: scale(1.1) rotate(10deg);
  border-color: var(--accent-primary);
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
