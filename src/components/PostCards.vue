<template>
  <div class="premium-post-card">
    <div class="thumbnail-wrapper">
      <img class="thumbnail-img" :src="thumbnail" :alt="title">
      <div class="gradient-overlay"></div>
      <div class="hover-overlay">
        <router-link :to="'/post/' + id" class="view-case-study-btn">
          <span>Read Article</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </router-link>
      </div>
    </div>
    <div class="content-body">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ subHead }}</p>
      
      <div class="tags-wrapper" v-if="tags && tags.length > 0">
        <span class="tag" v-for="tag in tags" :key="tag">
          {{ tagsNames[tag - 12] }}
        </span>
      </div>

      <div class="card-footer">
        <router-link :to="'/post/' + id" class="arrow-link">
          <span>Read More</span>
          <svg class="arrow-icon" width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </router-link>

        <div v-if="super1" class="admin-controls">
          <router-link :to="'/updatePost/' + id" class="edit-link">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M14 6L14.5 5.5C14.8978 5.10217 15.0967 4.90326 15.3124 4.81654C15.5998 4.70073 15.9259 4.73731 16.1832 4.91716C16.3753 5.052 16.5269 5.30062 16.83 5.79786L16.83 5.79787C17.1332 6.29511 17.2847 6.54373 17.3284 6.79533C17.3857 7.11196 17.3031 7.43765 17.1016 7.6832C16.9519 7.86378 16.6993 8.01527 16.1939 8.31826L4 16L2 18L4 16L14 6Z" stroke="currentColor" stroke-width="1.5"/>
            </svg>
            Edit
          </router-link>
          <button @click="confirmDelete()" class="delete-btn">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M3 5H17M8 9V15M12 9V15M4 5L5 17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19H13C13.5304 19 14.0391 18.7893 14.4142 18.4142C14.7893 18.0391 15 17.5304 15 17L16 5M7 5V3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H12C12.2652 2 12.5196 2.10536 12.7071 2.29289C12.8946 2.48043 13 2.73478 13 3V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'PostCards',
  props: ['title', 'subHead', 'thumbnail', 'tags', 'tagsm', 'id'],
  computed: {
    ...mapState(['superuser', 'user', 'token']),
    csrfToken() {
      const cookieVal = document.cookie.split('; ').find((row) => row.startsWith('csrftoken='));
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
  data() {
    return {
      tagsNames: [],
      ii: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get('https://zkzk.softzm.cloud/api/tags')
        .then((response) => {
          response.data.forEach((element, i) => {
            this.tagsNames.push(element.name);
            this.ii = i;
          });
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    },
    confirmDelete() {
      let x = window.confirm(`Are you sure you want to delete this post?`);
      if (x == true) {
        const headers = {
          Authorization: `Token ${this.token}`,
          'Content-type': 'multipart/form-data',
          'X-CSRFToken': this.csrfToken,
        };
        axios.delete(`https://zkzk.softzm.cloud/api/posts/${this.id}`, { headers })
          .then((respone) => {
            console.log(respone);
            alert('Post deleted successfully');
            location.reload();
          })
          .catch((error) => {
            console.warn('Error deleting post', error);
          });
      }
    },
  },
};
</script>

<style scoped>
.premium-post-card {
  background: var(--bg-card);
  border: 1px solid var(--border-dim);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: var(--transition-slow);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.premium-post-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--emerald-500), var(--indigo-500));
  opacity: 0;
  transition: var(--transition-normal);
}

.premium-post-card:hover {
  border-color: var(--emerald-500);
  transform: translateY(-10px);
  box-shadow: 0 25px 50px -15px var(--glow-primary-strong);
}

.premium-post-card:hover::before {
  opacity: 1;
}

.thumbnail-wrapper {
  position: relative;
  height: 240px;
  overflow: hidden;
  background: var(--obsidian-800);
}

.thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-slow);
}

.premium-post-card:hover .thumbnail-img {
  transform: scale(1.08);
  filter: brightness(0.8);
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(10, 10, 11, 0.5) 100%);
  pointer-events: none;
}

.hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 11, 0.9);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-normal);
}

.premium-post-card:hover .hover-overlay {
  opacity: 1;
}

.view-case-study-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--emerald-500);
  color: var(--obsidian-950);
  padding: 0.875rem 1.75rem;
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 0.9rem;
  transition: var(--transition-bounce);
  transform: translateY(10px);
  opacity: 0;
}

.premium-post-card:hover .view-case-study-btn {
  transform: translateY(0);
  opacity: 1;
  transition-delay: 0.1s;
}

.view-case-study-btn:hover {
  background: var(--emerald-400);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--glow-primary);
}

.content-body {
  padding: var(--space-lg);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-hero);
  line-height: 1.3;
  transition: var(--transition-fast);
}

.premium-post-card:hover .card-title {
  color: var(--emerald-500);
}

.card-description {
  font-size: 0.95rem;
  color: var(--text-body);
  line-height: 1.7;
  margin-bottom: auto;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tags-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: var(--space-md) 0;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: var(--bg-alt);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  color: var(--emerald-500);
  font-weight: 600;
}

.card-footer {
  padding-top: var(--space-md);
  margin-top: var(--space-md);
  border-top: 1px solid var(--border-subtle);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.arrow-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  color: var(--text-hero);
  font-size: 0.95rem;
  transition: var(--transition-fast);
}

.arrow-link:hover {
  color: var(--emerald-500);
}

.arrow-icon {
  transition: var(--transition-fast);
}

.arrow-link:hover .arrow-icon {
  transform: translateX(4px);
}

.admin-controls {
  display: flex;
  gap: var(--space-sm);
}

.edit-link,
.delete-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.875rem;
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 600;
  transition: var(--transition-fast);
  border: 1px solid var(--border-dim);
}

.edit-link {
  background: var(--bg-alt);
  color: var(--text-hero);
}

.edit-link:hover {
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

@media (max-width: 768px) {
  .thumbnail-wrapper {
    height: 200px;
  }
  
  .content-body {
    padding: var(--space-md);
  }
  
  .card-footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>