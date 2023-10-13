<template>
  <headerCom/>
  <loginFormSection/>
</template>

<script>
import headerCom from '../components/global/header.vue'
import loginFormSection from '@/components/global/loginFormSection.vue';
import '../assets/default.css'

export default {
  name: 'LoginPage',
  components:{
    headerCom,
    loginFormSection,
  }
}
</script>
  
  