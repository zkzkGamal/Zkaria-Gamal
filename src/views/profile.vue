<template>
  <div class="portfolio-obsidian">
    <headerCom/>
    
    <main class="profile-page">
      <div class="main-container">
        <div class="page-header">
          <h1 class="page-title">Notifications</h1>
          <p class="page-subtitle">Stay updated with your latest interactions</p>
        </div>

        <!-- New Notifications -->
        <div v-if="notificationNew.length > 0" class="notifications-section">
          <h2 class="section-title">New Notifications</h2>
          <div class="notifications-grid">
            <div 
              v-for="notification in notificationNew" 
              :key="notification.post_id"
              class="notification-card glass-card new"
            >
              <div class="notification-content">
                <div class="notification-badge">New</div>
                <p class="notification-message">{{ notification.message }}</p>
                <router-link :to="'/post/' + notification.post_id" class="notification-link">
                  <span>View Post</span>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- All Notifications -->
        <div v-if="ALLNotify.length > 0" class="notifications-section">
          <h2 class="section-title">All Notifications</h2>
          <div class="notifications-grid">
            <div 
              v-for="notification in ALLNotify" 
              :key="notification.post_id"
              class="notification-card glass-card"
            >
              <div class="notification-content">
                <p class="notification-message">{{ notification.text }}</p>
                <router-link :to="'/post/' + notification.notify_post" class="notification-link">
                  <span>View Post</span>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="notificationNew.length === 0 && ALLNotify.length === 0" class="empty-state">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h3>No notifications yet</h3>
          <p>We'll notify you when there's something new</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import headerCom from '@/components/global/header.vue';
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'ProfileC',
  components: {
    headerCom
  },
  data() {
    return {
      notificationNew: [],
      ALLNotify:[],
    };
  },
  computed:{
    ...mapState(['user', 'token']),
  },
  mounted() {
    const socket = new WebSocket('ws://127.0.0.1:8000/ws/socket-server/');
    
    Notification.requestPermission()
    console.log(Notification.permission)

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      this.notificationNew.push(notification);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    this.getNotify()
  },
  methods:{
    getNotify(){
      const headers = {
        Authorization: `Token ${this.token}`,
        'Content-type': 'get/json',
      }
      axios.get('http://127.0.0.1:8000/api/notifications', {headers})
      .then((response)=>{
        this.ALLNotify= response.data
      })
      .catch((error)=>{
        console.error(error)
      })
    }
  }
};
</script>

<style scoped>
.portfolio-obsidian {
  min-height: 100vh;
  background: var(--bg-main);
}

.profile-page {
  padding: var(--space-2xl) 0;
}

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

.notifications-section {
  margin-bottom: var(--space-2xl);
}

.section-title {
  font-size: 1.5rem;
  color: var(--text-hero);
  margin-bottom: var(--space-lg);
  padding-left: var(--space-sm);
}

.notifications-grid {
  display: grid;
  gap: var(--space-md);
}

.notification-card {
  padding: var(--space-lg);
  transition: var(--transition-normal);
  position: relative;
}

.notification-card.new {
  border-left: 3px solid var(--emerald-500);
}

.notification-card:hover {
  transform: translateX(8px);
  border-color: var(--emerald-500);
}

.notification-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.notification-badge {
  display: inline-block;
  width: fit-content;
  padding: 0.25rem 0.75rem;
  background: var(--emerald-500);
  color: var(--obsidian-950);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.notification-message {
  font-size: 1rem;
  color: var(--text-hero);
  line-height: 1.6;
}

.notification-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--emerald-500);
  font-weight: 600;
  font-size: 0.9rem;
  align-self: flex-start;
  transition: var(--transition-fast);
}

.notification-link:hover {
  gap: 0.75rem;
}

.notification-link svg {
  transition: var(--transition-fast);
}

.notification-link:hover svg {
  transform: translateX(4px);
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
  font-size: 1.5rem;
}

.empty-state p {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .notification-card {
    padding: var(--space-md);
  }
}
</style>
