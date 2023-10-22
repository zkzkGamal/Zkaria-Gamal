<template>
    <div class="about-me">	
        <h4>More about me</h4>
        <p>I build new projects just to tickle my brain and love work to lean new techniques and skills in the field</p>
        <p>I am eager to connect and explore potential
            collaborations. Let's leverage technology to shape the future together
        .</p>
        <hr>
        <h4>TOP EXPERTISE</h4>
        <p>Fullstack developer with primary focus on Django + Vue.js: <router-link arget="_blank" to="@/assets/Zkaria_Gamal _Resume.pdf">Download Resume</router-link></p>
        <skill/>
    </div>
</template>

<script>
import skill from '@/components/home/skills.vue'
    export default{
        name: 'aboutMe',
        components:{
            skill
        }
    }
</script>