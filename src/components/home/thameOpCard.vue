<template>
  <div id="theme-options-wrapper">
    <div
      v-for="theme in themes"
      :key="theme.mode"
      :data-mode="theme.mode"
      :id="theme.id"
      class="theme-dot"
      @click="setTheme(theme.mode)"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'themeCard',
  data() {
    return {
      currentTheme: 'default', // Default theme
      themes: [
        { mode: 'default', id: 'light-mode' },
        { mode: 'blue', id: 'blue-mode' },
        { mode: 'green', id: 'green-mode' },
        { mode: 'purple', id: 'purple-mode' },
      ],
    };
  },
  methods: {
    setTheme(mode) {
      this.currentTheme = mode; // Update the current theme

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
  watch: {
    currentTheme(newTheme) {
      // Create a new link element for the stylesheet
      const style = document.createElement('link');
      style.id = 'theme-style';
      style.rel = 'stylesheet';
      style.setAttribute('href' , `../../assets/${newTheme}.css` ) ; // Use relative path

      // Replace the existing stylesheet (if any) with the new one
      const existingStyle = document.getElementById('theme-style');
      if (existingStyle) {
        existingStyle.parentNode.removeChild(existingStyle);
      }

      // Append the new stylesheet to the head of the document
      document.head.appendChild(style);
    },
  },
};
</script>
