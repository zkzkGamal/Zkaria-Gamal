<template>
    <headerCom/>
    <div class="post-container">
      <router-link class="btn btn-sm btn-primary ll" to="/posts">&laquo; Back to Posts</router-link><br>

        <div v-if="superuser" style="margin: 5px;">
            <router-link class="space" :to="'/updatePost/' + id ">Edit</router-link>
            <span class="pASlink"  @click="confirmDelete()" >Delete</span>
        </div>
        <span v-else></span>
        
        <!-- post image -->
        <img class="featured_image" :src="thumbnail">
        <!-- loop for the tages -->
        <div>
          <span class="tag" v-for="tag in tags" :key="tag">
            {{ tagsNames[tag-12] }}
          </span>
        </div>
        
        <hr>
        <!-- post title -->
        <h1>{{title}}</h1>
        <!-- post sub head -->
        <h4>{{ sub_heading }}</h4>
        <br>
        <!-- post body -->
        <p v-html="body"></p>

        <ComentCard :post_id="postID"/>
    </div>

  </template>
  
  <script>
  import headerCom from '@/components/global/header.vue';
  import ComentCard from '@/components/ComentCard.vue';
  import'@/assets/post.css'
  import axios from 'axios';
  import { mapState } from 'vuex';
  export default {
    name: 'PostPage',
    components:{
      headerCom,
      ComentCard
    },
    data:function(){
      return{
        title:'',
        thumbnail:'',
        sub_heading:'',
        body:'',
        tags:[],
        id:'',
        tagsNames:[],
        postID : this.$route.params.id
      }
    },computed:{
      ...mapState(['superuser' , 'user', 'token']),
      csrfToken() {
          const cookieVal = document.cookie
              .split('; ')
              .find((row) => row.startsWith('csrftoken='));
          if (cookieVal) {
              return cookieVal.split('=')[1];
          }
          return '';
      },
    },mounted(){
      this.fetchData()
    },
    methods:{
      fetchData(){
        let postID = this.$route.params.id
        axios
        .get(`https://zkariag.pythonanywhere.com/api/posts/${postID}`)
        .then((response) => {
          this.title = response.data.title;
          this.id = response.data.id;
          this.thumbnail = response.data.thumbnail;
          this.body = response.data.body;
          this.sub_heading = response.data.sub_headline;
          this.tags = response.data.tags
        })
        .catch((error) => {
          console.error('Error getting data:', error);
        });

        axios
            .get('https://zkariag.pythonanywhere.com/api/tags')
            .then((response) => {
                response.data.forEach((element ) => {
                    this.tagsNames.push(element.name) ;
                    // this.tagsNames[element.id ] = element.name;
                });
                
            })
            .catch((error) => {
            console.error('Error fetching data:', error);
            });
      },
      confirmDelete(){
            let x = window.confirm("Are you sure you want to delete this post number : " + this.postID)
            if(x == true){
              const headers = {
                    Authorization: `Token ${this.token}`,
                    'Content-type': 'multipart/form-data',
                    'X-CSRFToken': this.csrfToken,
                }
              axios.delete(`https://zkariag.pythonanywhere.com/api/posts/${this.postID}` , {headers})
              .then((respone)=>{
                    console.log(respone)
                    alert('post deleted successfuly')
                    this.$router.push('/posts');
                }).catch(error =>{
                  console.warn('error deleting post' , error)
                })
            }else{
              console.log('as you wish bitch')
            }
      },
    }
  }
  </script>
  
<style scoped>
  .a{
    margin: 0 5px;
  }
  .space{
        margin: 0 5px;
        border-right: 1px solid;
        padding: 0 5px;
    }.pASlink{
      color: red;
      cursor: pointer;
    }
</style>

  