<template>
  <headerCom />
  <div class="main-container">
    <router-link class="btn btn-warning ll" to="/createPost" v-if="superuser">Create Post</router-link><br>
    <form id="searchForm" method="GET" @submit.prevent="fetchDataFilter">
      <!-- {{myFilter.form|crispy}} -->
      <input type="text" name="title" placeholder="headline" class="form-control" v-model="filterData.title">
      <div class="abs">
        <div v-for="tn in tagsDatas" :key="tn">
          <input type="checkbox" name="tags" placeholder="tag" :value="tn.id" v-model="filterData.tags">
          <label for="searchForm">{{ tn.name }}</label> <br>
        </div>
      </div>

      <input class="btn btn-primary" type="submit" value="search">
    </form>
    <br>
    <div class="post-wrapper">
      <!-- Use the paginatedPosts computed property to display posts -->
      <div id="post-card-con" v-for="post in paginatedPosts" :key="post.id">
        <PostCards :title="post.title" :subHead="post.sub_headline" :thumbnail="post.thumbnail" :tags="post.tags"
          :id="post.id" />
      </div>

      <h3 v-if="paginatedPosts.length === 0">No posts found...</h3>
    </div>

    <!-- Pagination controls -->
    <div class="row">
      <ul class="pagination">
        <!-- Previous page button -->
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a @click="goToPage(currentPage - 1)" class="page-link">&laquo;</a>
        </li>
        <!-- First page button -->
        <li class="page-item">
          <a @click="goToPage(1)" class="page-link">First</a>
        </li>

        <!-- Render page numbers dynamically based on the total number of pages -->
        <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
          <a @click="goToPage(page)" class="page-link">{{ page }}</a>
        </li>

        <!-- Last page button -->
        <li class="page-item">
          <a @click="goToPage(totalPages)" class="page-link">Last</a>
        </li>

        <!-- Next page button -->
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a @click="goToPage(currentPage + 1)" class="page-link">&raquo;</a>
        </li>
      </ul>
    </div>
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
        tags: [],  // Initialize with your filter criteria
      },
      currentPage: 1,
      pageSize: 6, // Number of cards to display per page
    };
  }, computed: {
    ...mapState(['superuser']),
    paginatedPosts() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.posts.slice(startIndex, endIndex);
    },totalPages() {
      return Math.ceil(this.posts.length / this.pageSize);
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      // to gst all posts
      axios
        .get('https://zkariag.pythonanywhere.com/api/posts')
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => {
          console.error('Error getting data:', error);
        });
      // to get all tags
      axios
        .get('https://zkariag.pythonanywhere.com/api/tags')
        .then((response) => {
          this.tagsDatas = response.data

        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
      // to get searhed posts only

    }, fetchDataFilter() {
      // Build an array of query parameters
      const queryParams = [];

      // Add the title parameter if it's not empty
      if (this.filterData.title.trim() !== '') {
        queryParams.push(`title=${encodeURIComponent(this.filterData.title)}`);
      }

      // Add each selected tag as a separate parameter
      for (const tagId of this.filterData.tags) {
        queryParams.push(`tags=${tagId}`);
      }

      // Construct the URL with the query parameters
      const url = 'https://zkariag.pythonanywhere.com/api/posts?' + queryParams.join('&');

      // Make the GET request with the constructed URL
      axios.get(url)
        .then((response) => {
          this.posts = response.data;
        })
        .catch((error) => {
          console.error('Error filtering data:', error);
        });
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  props: ['childData']
};
</script>


<style scoped>
#div_id_tags,
#id_tags {
  overflow-y: scroll;
  max-height: 100px;
  border-radius: 5px;
  padding: 5px;
  border: 1px solid #888;
}

.abs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
} li a{
  cursor: pointer;
  transition: .3s ease-in-out;
}li:hover a{
  background-color: rgb(78, 78, 177);
}
</style>
  