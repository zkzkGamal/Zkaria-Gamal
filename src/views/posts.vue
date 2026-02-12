<template>
  <div class="portfolio-obsidian">
    <headerCom />
    
    <main class="posts-page">
      <div class="main-container">
        <!-- Page Header -->
        <div class="page-header">
          <h1 class="page-title">Professional Work</h1>
          <p class="page-subtitle">Explore my portfolio of AI solutions and technical articles</p>
        </div>

        <!-- Create Post Button -->
        <div v-if="superuser" class="admin-actions">
          <router-link to="/createPost" class="create-post-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4V16M4 10H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Create New Post
          </router-link>
        </div>

        <!-- Search & Filter Section -->
        <div class="search-section glass-card">
          <form @submit.prevent="fetchDataFilter" class="search-form">
            <div class="search-input-wrapper">
              <svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="2"/>
                <path d="M14 14L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <input 
                type="text" 
                v-model="filterData.title" 
                placeholder="Search by title..." 
                class="search-input"
              >
            </div>

            <div v-if="tagsDatas.length > 0" class="filter-tags">
              <h4 class="filter-label">Filter by Tags</h4>
              <div class="tags-grid">
                <label 
                  v-for="tag in tagsDatas" 
                  :key="tag.id" 
                  class="tag-checkbox"
                  :class="{ 'active': filterData.tags.includes(tag.id) }"
                >
                  <input 
                    type="checkbox" 
                    :value="tag.id" 
                    v-model="filterData.tags"
                    class="checkbox-input"
                  >
                  <span class="tag-label">{{ tag.name }}</span>
                </label>
              </div>
            </div>

            <button type="submit" class="search-btn">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M13 7L7 13M7 7L13 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="2"/>
              </svg>
              Apply Filters
            </button>
          </form>
        </div>

        <!-- Posts Grid -->
        <div class="posts-grid">
          <PostCards 
            v-for="post in paginatedPosts" 
            :key="post.id"
            :title="post.title" 
            :subHead="post.sub_headline" 
            :thumbnail="post.thumbnail" 
            :tags="post.tags"
            :id="post.id" 
          />
        </div>

        <!-- Empty State -->
        <div v-if="paginatedPosts.length === 0" class="empty-state">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
            <path d="M8 12H16M12 8V16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <h3>No posts found</h3>
          <p>Try adjusting your filters or search query</p>
        </div>

        <!-- Pagination -->
        <nav v-if="totalPages > 1" class="pagination-nav">
          <ul class="pagination">
            <li :class="{ disabled: currentPage === 1 }">
              <button @click="goToPage(currentPage - 1)" class="page-btn" :disabled="currentPage === 1">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M12 4L6 10L12 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </li>

            <li :class="{ active: currentPage === 1 }">
              <button @click="goToPage(1)" class="page-btn">1</button>
            </li>

            <li v-if="currentPage > 3" class="ellipsis">
              <span>...</span>
            </li>

            <li 
              v-for="page in visiblePages" 
              :key="page" 
              :class="{ active: page === currentPage }"
            >
              <button @click="goToPage(page)" class="page-btn">{{ page }}</button>
            </li>

            <li v-if="currentPage < totalPages - 2" class="ellipsis">
              <span>...</span>
            </li>

            <li v-if="totalPages > 1" :class="{ active: currentPage === totalPages }">
              <button @click="goToPage(totalPages)" class="page-btn">{{ totalPages }}</button>
            </li>

            <li :class="{ disabled: currentPage === totalPages }">
              <button @click="goToPage(currentPage + 1)" class="page-btn" :disabled="currentPage === totalPages">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M8 4L14 10L8 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  </div>
</template>
  
<script>
import headerCom from '@/components/global/header.vue';
import PostCards from '@/components/PostCards.vue';
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'PostsPage',
  components: {
    headerCom,
    PostCards,
  },
  data() {
    return {
      posts: [],
      tagsDatas: [],
      filterData: {
        title: '',
        tags: [],
      },
      currentPage: 1,
      pageSize: 6,
    };
  },
  computed: {
    ...mapState(['superuser']),
    paginatedPosts() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.posts.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.posts.length / this.pageSize);
    },
    visiblePages() {
      const pages = [];
      const start = Math.max(2, this.currentPage - 1);
      const end = Math.min(this.totalPages - 1, this.currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== this.totalPages) {
          pages.push(i);
        }
      }
      return pages;
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get('http://127.0.0.1:8000/api/posts')
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => {
          console.error('Error getting data:', error);
        });

      axios.get('http://127.0.0.1:8000/api/tags')
        .then((response) => {
          this.tagsDatas = response.data;
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    },
    fetchDataFilter() {
      const queryParams = [];

      if (this.filterData.title.trim() !== '') {
        queryParams.push(`title=${encodeURIComponent(this.filterData.title)}`);
      }

      for (const tagId of this.filterData.tags) {
        queryParams.push(`tags=${tagId}`);
      }

      const url = 'http://127.0.0.1:8000/api/posts?' + queryParams.join('&');

      axios.get(url)
        .then((response) => {
          this.posts = response.data;
          this.currentPage = 1;
        })
        .catch((error) => {
          console.error('Error filtering data:', error);
        });
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
  },
};
</script>

<style scoped>
.portfolio-obsidian {
  min-height: 100vh;
  background: var(--bg-main);
}

.posts-page {
  padding: var(--space-2xl) 0;
}

/* Page Header */
.page-header {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.page-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: var(--space-sm);
  background: linear-gradient(135deg, var(--text-hero), var(--emerald-500));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.125rem;
  color: var(--text-body);
}

/* Admin Actions */
.admin-actions {
  margin-bottom: var(--space-xl);
  display: flex;
  justify-content: flex-end;
}

.create-post-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background: var(--emerald-500);
  color: var(--obsidian-950);
  border-radius: var(--radius-md);
  font-weight: 700;
  transition: var(--transition-normal);
  box-shadow: 0 4px 12px var(--glow-ambient);
}

.create-post-btn:hover {
  background: var(--emerald-400);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px var(--glow-primary);
}

/* Search Section */
.search-section {
  padding: var(--space-xl);
  margin-bottom: var(--space-2xl);
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.search-input-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: var(--space-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: var(--space-md) var(--space-md) var(--space-md) 3.5rem;
  background: var(--bg-alt);
  border: 2px solid var(--border-subtle);
  border-radius: var(--radius-md);
  color: var(--text-hero);
  font-size: 1rem;
  transition: var(--transition-fast);
}

.search-input:focus {
  outline: none;
  border-color: var(--emerald-500);
  box-shadow: 0 0 0 4px var(--glow-ambient);
}

.filter-label {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-bottom: var(--space-md);
  font-weight: 700;
}

.tags-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.tag-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: var(--bg-alt);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-fast);
  user-select: none;
}

.tag-checkbox.active {
  background: var(--glow-ambient);
  border-color: var(--emerald-500);
}

.tag-checkbox:hover {
  border-color: var(--emerald-500);
  transform: translateY(-2px);
}

.checkbox-input {
  margin: 0;
  cursor: pointer;
}

.tag-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.tag-checkbox.active .tag-label {
  color: var(--emerald-500);
}

.search-btn {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background: var(--emerald-500);
  color: var(--obsidian-950);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition-normal);
}

.search-btn:hover {
  background: var(--emerald-400);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px var(--glow-primary);
}

/* Posts Grid */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: var(--space-lg);
  margin-bottom: var(--space-2xl);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: var(--space-3xl);
  color: var(--text-muted);
}

.empty-state svg {
  color: var(--text-muted);
  margin-bottom: var(--space-md);
  opacity: 0.5;
}

.empty-state h3 {
  color: var(--text-hero);
  margin-bottom: var(--space-sm);
}

/* Pagination */
.pagination-nav {
  display: flex;
  justify-content: center;
}

.pagination {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.pagination li {
  display: flex;
}

.page-btn {
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--space-sm);
  background: var(--bg-card);
  border: 1px solid var(--border-dim);
  border-radius: var(--radius-md);
  color: var(--text-hero);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-fast);
}

.page-btn:hover:not(:disabled) {
  border-color: var(--emerald-500);
  background: var(--bg-hover);
}

.pagination li.active .page-btn {
  background: var(--emerald-500);
  color: var(--obsidian-950);
  border-color: var(--emerald-500);
}

.pagination li.disabled .page-btn {
  opacity: 0.5;
  cursor: not-allowed;
}

.ellipsis {
  display: flex;
  align-items: center;
  padding: 0 var(--space-sm);
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .posts-grid {
    grid-template-columns: 1fr;
  }
  
  .search-section {
    padding: var(--space-lg);
  }
  
  .pagination {
    flex-wrap: wrap;
  }
}
</style>

  