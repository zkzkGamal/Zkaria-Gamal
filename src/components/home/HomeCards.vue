<template>
        <div class="post">
            <img class="thumbnail" :src="thumbnail">
            <div class="post-preview">
                <h6 class="post-title">{{title}}</h6>
                <p class="post-intro">{{ sub_heading }}</p>
                <router-link :to="'/post/' + id">read more</router-link>
            </div>
        </div>
</template>

<script>
    export default {
        name : 'HomeCards',
        props:['thumbnail' , 'title' , 'sub_heading' ,'id']
    }
</script>