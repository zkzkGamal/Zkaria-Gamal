<template>
    <headerCom/>
    <RegisterFormSection/>
</template>
  
<script>
import RegisterFormSection from '@/components/global/RegisterFormSection.vue';
import headerCom from '../components/global/header.vue'

export default {
  name: 'RegisterPage',
  components:{
        RegisterFormSection,
        headerCom,
  }
}
</script>
  
  