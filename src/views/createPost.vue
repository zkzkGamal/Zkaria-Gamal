<template>
  <div class="portfolio-obsidian">
    <headerCom />
    <CreatePostForm />
  </div>
</template>

<script>
import headerCom from '@/components/global/header.vue';
import CreatePostForm from '@/components/CreatePostForm.vue';
export default {
  name: 'CreatePost',
  components: {
    headerCom,
    CreatePostForm
  }
}
</script>

<style scoped>
.portfolio-obsidian {
  min-height: 100vh;
  background: var(--bg-alt);
  padding-top: 80px;
  /* Space for fixed header */
}
</style>