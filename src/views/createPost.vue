<template>
    <headerCom/>
    <CreatePostForm/>
  </template>
  
  <script>
  import headerCom from '@/components/global/header.vue';
  import CreatePostForm from '@/components/CreatePostForm.vue';
  export default {
    name: 'CreatePost',
    components:{
      headerCom,
      CreatePostForm
    }
  }
  </script>
  
  