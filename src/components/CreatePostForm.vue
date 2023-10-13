<template>
    <div class="main-container">
        <router-link class="btn btn-sm btn-primary ll" to="/posts">&laquo; Back to Posts</router-link>
        
        <form action="" method="POST" enctype="multipart/form-data" @submit.prevent="CreatePost">
            <label>title</label>
            <input class="form-control" type="text" name="title" v-model="title">
            <br>
            <label>sub_title</label>
            <input class="form-control" type="text" name="sub_headline" v-model="sub_headline">
            <br>
            <label>body</label>
            <textarea class="form-control" type="text" name="body" v-model="body" max="5000"></textarea>
            <br>
            <label>thunbnail</label>
            <input class="form-control" type="file" name="thumbnail" accept="image/*" @change="handleFileChange">
            <br>
            <div class="check">
                <label>active</label>
                <input  type="checkbox" name="active" v-model="active">
                <label>featured</label>
                <input  type="checkbox" name="featured" v-model="featured">
            </div>
            <label>tags</label>
            <!-- <input class="form-control" type="select" name="tags"> -->
            <select name="tags" class="form-control" multiple v-model="SelectedTags">
                <!-- loop for options -->
                <option v-for="tag in tags" :key="tag.id" :value="tag.id">{{tag.name}}</option>
            </select>
            <br>
            <input class="btn btn-primary ll" type="submit" value="Submit Post">
            
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
    export default{
        name:'CreatePostform',
        data(){
            return {
                tags:[],
                title:'',
                sub_headline:'',
                body:'',
                thumbnail:null,
                active:false,
                featured:false,
                SelectedTags:[],
            }
        },
        computed:{
            ...mapState(['user', 'token']),
            csrfToken() {
                const cookieVal = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('csrftoken='));
                if (cookieVal) {
                    return cookieVal.split('=')[1];
                }
                return '';
            },
        },
        mounted(){
            this.getTags()
        },
        methods:{
            getTags(){
                axios
                .get('http://127.0.0.1:8000/api/tags')
                .then((response)=>{
                    this.tags=response.data
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
            },
            handleFileChange(event) {
                this.thumbnail = event.target.files[0]; // Store the selected file
            },
            CreatePost(){
                const headers = {
                    Authorization: `Token ${this.token}`,
                    'Content-type': 'multipart/form-data',
                    'X-CSRFToken': this.csrfToken,
                }

                const formData = new FormData(); // Create a FormData object to send files
                formData.append('title', this.title);
                formData.append('sub_headline', this.sub_headline);
                formData.append('body', this.body);
                formData.append('active', this.active);
                formData.append('featured', this.featured);
                this.SelectedTags.forEach((id)=>{
                    console.log(id)
                    formData.append('tags', id);
                });
                // formData.append('tags',this.SelectedTags)
                if (this.thumbnail) {
                    formData.append('thumbnail', this.thumbnail);
                }
                console.log(formData)
                axios
                .post('http://127.0.0.1:8000/api/posts', formData , {headers})
                .then((respone)=>{
                    console.log(respone)
                    alert('post created successfuly')
                    this.$router.push('/posts');
                }).catch((error)=>{
                    console.warn('error creating post' , error)
                    this.title=''
                    this.sub_headline=''
                    this.body=''
                    this.SelectedTags=[]
                    this.thumbnail = null
                    this.active= false
                    this.featured = false
                })
            }
        }
    }
</script>

<style scoped>
    #div_id_tags > div{
        max-height: 100px;
        overflow-y: scroll;
        border:1px solid #888;
        padding: 5px;
        border-radius: 5px;
    }
</style>
