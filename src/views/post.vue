<template>
  <div class="portfolio-obsidian">
    <headerCom/>
    
    <main class="post-detail-page">
      <div class="main-container">
        <!-- Back Button -->
        <router-link to="/posts" class="back-button">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Back to Posts
        </router-link>

        <!-- Featured Image -->
        <div class="featured-image-wrapper">
          <img class="featured-image" :src="thumbnail" :alt="title">
        </div>

        <!-- Article Content -->
        <article class="article-content glass-card">
          <!-- Admin Actions -->
          <div v-if="super1" class="admin-actions">
            <router-link :to="'/updatePost/' + id" class="edit-btn">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M14 6L14.5 5.5C14.8978 5.10217 15.0967 4.90326 15.3124 4.81654C15.5998 4.70073 15.9259 4.73731 16.1832 4.91716C16.3753 5.052 16.5269 5.30062 16.83 5.79786C17.1332 6.29511 17.2847 6.54373 17.3284 6.79533C17.3857 7.11196 17.3031 7.43765 17.1016 7.6832C16.9519 7.86378 16.6993 8.01527 16.1939 8.31826L4 16L2 18L4 16L14 6Z" stroke="currentColor" stroke-width="1.5"/>
              </svg>
              Edit Post
            </router-link>
            <button @click="confirmDelete()" class="delete-btn">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M3 5H17M8 9V15M12 9V15M4 5L5 17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19H13C13.5304 19 14.0391 18.7893 14.4142 18.4142C14.7893 18.0391 15 17.5304 15 17L16 5M7 5V3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H12C12.2652 2 12.5196 2.10536 12.7071 2.29289C12.8946 2.48043 13 2.73478 13 3V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              Delete Post
            </button>
          </div>

          <!-- Tags -->
          <div class="tags-wrapper" v-if="tags && tags.length > 0">
            <span class="tag" v-for="tag in tags" :key="tag">
              {{ tagsNames[tag-12] }}
            </span>
          </div>

          <!-- Title & Subtitle -->
          <h1 class="article-title">{{ title }}</h1>
          <h2 class="article-subtitle">{{ sub_heading }}</h2>

          <!-- Article Body -->
          <div class="article-body" v-html="body"></div>
        </article>

        <!-- Comments Section -->
        <div class="comments-section glass-card">
          <ComentCard :post_id="postID"/>
        </div>
      </div>
    </main>
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
  },
  computed:{
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
    super1() {
      if (this.user){
        return this.user.is_superuser ? true : false;
      }else{
        return this.superuser? false : false;
      }
    },
  },
  mounted(){
    this.fetchData()
  },
  methods:{
    fetchData(){
      let postID = this.$route.params.id
      axios.get(`http://127.0.0.1:8000/api/posts/${postID}`)
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

      axios.get('http://127.0.0.1:8000/api/tags')
      .then((response) => {
        response.data.forEach((element ) => {
          this.tagsNames.push(element.name) ;
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    },
    confirmDelete(){
      let x = window.confirm("Are you sure you want to delete this post?")
      if(x == true){
        const headers = {
          Authorization: `Token ${this.token}`,
          'Content-type': 'multipart/form-data',
          'X-CSRFToken': this.csrfToken,
        }
        axios.delete(`http://127.0.0.1:8000/api/posts/${this.postID}` , {headers})
        .then((respone)=>{
          console.log(respone)
          alert('Post deleted successfully')
          this.$router.push('/posts');
        }).catch(error =>{
          console.warn('error deleting post' , error)
        })
      }
    },
  }
}
</script>

<style scoped>
.portfolio-obsidian {
  min-height: 100vh;
  background: var(--bg-main);
}

.post-detail-page {
  padding: var(--space-2xl) 0;
}

/* Back Button */
.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-dim);
  border-radius: var(--radius-md);
  color: var(--text-hero);
  font-weight: 600;
  margin-bottom: var(--space-xl);
  transition: var(--transition-fast);
}

.back-button:hover {
  border-color: var(--emerald-500);
  background: var(--bg-hover);
  transform: translateX(-4px);
}

/* Featured Image */
.featured-image-wrapper {
  margin-bottom: var(--space-2xl);
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--border-dim);
}

.featured-image {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  display: block;
}

/* Article Content */
.article-content {
 padding: var(--space-2xl);
  max-width: 900px;
  margin: 0 auto var(--space-2xl);
}

.admin-actions {
  display: flex;
  gap: var(--space-sm);
  margin-bottom: var(--space-xl);
  padding-bottom: var(--space-lg);
  border-bottom: 1px solid var(--border-subtle);
}

.edit-btn,
.delete-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
  transition: var(--transition-fast);
  border: 1px solid var(--border-dim);
}

.edit-btn {
  background: var(--bg-alt);
  color: var(--text-hero);
}

.edit-btn:hover {
  border-color: var(--emerald-500);
  background: var(--bg-hover);
  color: var(--emerald-500);
}

.delete-btn {
  background: transparent;
  color: #ef4444;
  border-color: #ef4444;
  cursor: pointer;
}

.delete-btn:hover {
  background: rgba(239, 68, 68, 0.1);
}

.tags-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: var(--space-xl);
}

.tag {
  padding: 0.5rem 1rem;
  background: var(--bg-alt);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  color: var(--emerald-500);
  font-weight: 600;
}

.article-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: var(--space-md);
  line-height: 1.2;
  color: var(--text-hero);
}

.article-subtitle {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: var(--text-body);
  font-weight: 600;
  margin-bottom: var(--space-2xl);
  padding-bottom: var(--space-xl);
  border-bottom: 2px solid var(--border-subtle);
}

.article-body {
  font-size: 1.125rem;
  line-height: 1.9;
  color: var(--text-body);
}

.article-body >>> h1,
.article-body >>> h2,
.article-body >>> h3,
.article-body >>> h4,
.article-body >>> h5,
.article-body >>> h6 {
  color: var(--text-hero);
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.article-body >>> p {
  margin-bottom: 1.5rem;
}

.article-body >>> a {
  color: var(--emerald-500);
  text-decoration: underline;
}

.article-body >>> img {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-lg);
  margin: var(--space-lg) 0;
}

.article-body >>> pre {
  background: var(--bg-alt);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  overflow-x: auto;
  margin: var(--space-lg) 0;
}

.article-body >>> code {
  background: var(--bg-alt);
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

/* Comments Section */
.comments-section {
  padding: var(--space-2xl);
  max-width: 900px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .article-content,
  .comments-section {
    padding: var(--space-lg);
  }
  
  .admin-actions {
    flex-direction: column;
  }
}
</style>
