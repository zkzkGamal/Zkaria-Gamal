<template>
    <headerCom/>
    <UpdatepostForm :id="postID"/>
  </template>
  
  <script>
  import headerCom from '@/components/global/header.vue';
  import UpdatepostForm from '@/components/UpdatepostForm.vue';
  export default {
    name: 'UdatePost',
    components:{
      headerCom,
      UpdatepostForm
    },
    data(){
        return {
            postID :  this.$route.params.id
        }
    },
  }
  </script>
  
  