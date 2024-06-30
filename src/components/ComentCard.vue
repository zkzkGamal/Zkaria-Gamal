<template>
    <div class="comments-wrapper">
        <h5>Comments: 5</h5>
        <hr>
        <!--
            - Not logged in, output form and say "Register to comment and give room for a message"
            - When given username 
        -->
        <form @submit.prevent="PostComment" v-if="user">
            <input required class="form-control" placeholder="Leave a comment..."
            v-model="commentbody">
            <br>
            <input class="btn btn-info" type="submit" value="Submit">
        </form>
        <span v-else>
            <p>Create an account to comment:</p>
            <router-link class="btn btn-primary" to="/register">Register/Login</router-link>
        </span>
        <hr>
        <!-- loop for comments -->
            <div class="comment" v-for="cm in comments" :key="cm.id">
                <img class="author-pic" :src="getAuthorThumbnail(cm.user)">
                <div>
                    <p class="comment-author">{{ getAuthorFullName(cm.user) }}</p>
                    <p class="comment-body">{{ cm.comment }}</p>
                </div>
            </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
    export default{
        name : 'CommentCard',
        props:['post_id'],
        computed: {
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
        },data:function (){
            return{
                comments : [],
                userProfile:[],
                commentbody:'',
            }
        }
        ,mounted(){
            this.getComments()
        }
        ,methods:{
            getComments(){
                axios
                .get(`http://127.0.0.1:8000/api/comment/${this.post_id}`)
                .then((response)=>{
                    this.comments = response.data

                     // Iterate through comments and fetch user data for each comment
                    this.comments.forEach(comment => {
                        this.getUser(comment.user);
                    });
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
            },
            getUser(id){
                axios
                .get(`http://127.0.0.1:8000/api/ProfileDetail/${id}`)
                .then((response)=>{
                    this.userProfile.push(response.data)
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
            }
            ,getAuthorThumbnail(userId) {
                let pic = ''
                this.userProfile.forEach(element  => {
                    if (element[0].user == userId) {
                        pic = element[0].thumbnail;
                    }
                });
                return pic
            },getAuthorId(userId) {
                let id = ''
                this.userProfile.forEach(element => {
                    if (element[0].user == userId) {
                        id = element[0].id;
                        return id
                    }
                });
                return id
            },
            getAuthorFullName(userId) {
                let full_name = 'Unknown Author'
                this.userProfile.forEach(ele =>{
                    if (ele[0].user == userId) {
                        const  first_name = ele[0].f_name
                        const last_name = ele[0].l_name
                        full_name =  first_name+' '+ last_name
                    }
                })
                return full_name
                // Handle it as needed
            },PostComment(){
                // this.getUser(this.user.id)
                const headers = {
                    Authorization: `Token ${this.token}`,
                    'Content-type': 'application/json',
                    'X-CSRFToken': this.csrfToken,
                }
                axios.post(`http://127.0.0.1:8000/api/comment/${this.post_id}` ,{
                    post:this.post_id,
                    user:this.user.id,
                    comment:this.commentbody,
                } ,{headers}).then((response)=>{
                    console.log(response.data);
                    // Optionally, add the posted comment to your comments array
                    this.comments.push(response.data);
                    // Clear the comment input field
                    this.commentbody = '';
                    location.reload()
                }).catch((error)=>{
                    console.error('can not post comment ' + this.csrfToken +error) ;
                    if (error.response) {
                        console.error('Response status:', error.response.status);
                        console.error('Response data:', error.response.data);
                    }
                    alert(this.token)
                })
            }
        }
    }
</script>
