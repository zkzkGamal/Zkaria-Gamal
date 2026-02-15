<template>
  <div class="portfolio-obsidian">
    <headerCom />
    <UpdatepostForm :id="postID" />
  </div>
</template>

<script>
import headerCom from '@/components/global/header.vue';
import UpdatepostForm from '@/components/UpdatepostForm.vue';
export default {
  name: 'UdatePost',
  components: {
    headerCom,
    UpdatepostForm
  },
  data() {
    return {
      postID: this.$route.params.id
    }
  },
}
</script>

<style scoped>
.portfolio-obsidian {
  min-height: 100vh;
  background: var(--bg-alt);
  padding-top: 80px;
}
</style>