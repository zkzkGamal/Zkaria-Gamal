<template>
  <div id="theme-options-wrapper">
    <div data-mode="default" id="light-mode" class="theme-dot" @click="setTheme('default')"></div>
    <div data-mode="blue" id="blue-mode" class="theme-dot" @click="setTheme('blue')"></div>
    <div data-mode="green" id="green-mode" class="theme-dot" @click="setTheme('green')"></div>
    <div data-mode="purple" id="purple-mode" class="theme-dot" @click="setTheme('purple')"></div>
  </div>
</template>

<script>

export default {
  name: 'themeCard',
  data() {
    return {
      currentTheme: 'default', // Default theme
    };
  },
  methods: {
    setTheme(mode) {
      this.currentTheme = mode; // Update the current theme

      // Create a new link element for the stylesheet
      const style = document.createElement('link');
      style.id = 'theme-style';
      style.rel = 'stylesheet';

      // Set the appropriate CSS file based on the selected mode
      switch (mode) {
        case 'default':
          style.href = 'default.css';
          break;
        case 'blue':
          style.href = 'blue.css';
          break;
        case 'green':
          style.href = 'green.css';
          break;
        case 'purple':
          style.href = 'purple.css';
          break;
        default:
          style.href = 'default.css';
      }

      const existingStyle = document.getElementById('theme-style');
      if (existingStyle) {
        existingStyle.parentNode.removeChild(existingStyle);
      }

      // Append the new stylesheet to the head of the document
      document.head.appendChild(style);

      // Save theme to localStorage
      localStorage.setItem('theme', mode);
    },
  },
  created() {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.setTheme(savedTheme);
    }
  },
};
</script>
