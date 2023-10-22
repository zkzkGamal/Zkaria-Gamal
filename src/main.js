import { createApp } from 'vue'
import { createRouter , createWebHistory} from 'vue-router';
// call css ,js lib
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'normalize.css'
// import VueRouter from 'vue-router'
// this is the pages
import HomePage from './views/index'
import LoginPage from './views/login'
import register from './views/regiser.vue'
import post from './views/post'
import posts from './views/posts'
import profile from './views/profile'
import createpost from './views/createPost'
import updateProfie from './views/updateProfile'
import updatePost from './views/updatePost.vue'
// to call app to run serve
import App from './App.vue'
import store from './store';


// to create routes
const routes = [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/post/:id',
      name: 'post',
      component: post,
      props:true,
    },
    {
      path: '/updatePost/:id',
      name: 'updatePost',
      component: updatePost,
      props:true,
    },
    {
      path: '/posts',
      name: 'posts',
      component: posts,
    },
    {
      path: '/createpost',
      name: 'createpost',
      component: createpost,
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
    },
    {
      path: '/updateProfile',
      name: 'updateprofile',
      component: updateProfie,
    },
  ];

// Create a router instance and pass in your routes
const router = new createRouter({
    history: createWebHistory(),
    base: process.env.BASE_URL,
    routes,
  });

  // Check if user data is stored in localStorage
const storedToken = localStorage.getItem('token');
const storedUserData = localStorage.getItem('user');
const superuser = localStorage.getItem('superuser')
const isAuth = localStorage.getItem('isAuth')


if (storedToken && storedUserData && isAuth === 'true') {
  // Parse the stored user data
  const user = JSON.parse(storedUserData);

  // Dispatch the login action with the stored data
  store.dispatch('login', { token: storedToken, user , superuser });
}
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['isAuthenticated'];
  const isSuperUser = store.getters['isSuperUser'];


  if (to.name === 'login' && isAuthenticated) {
    // If the user is already authenticated, redirect to the home page
    next({ name: 'home' });
  } else if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    // If the route requires authentication and the user is not authenticated, redirect to the login page
    next({ name: 'login' });
  }else if( to.name === 'createpost' && !isSuperUser){
    next({ name: 'home' });
  }else if( to.name === 'updatePost' && !isSuperUser){
    next({ name: 'home' });
  } else {
    // Otherwise, proceed with navigation
    next();
  }
});


// createApp(App).mount('#app')
// 5. Create and mount the root instance.
createApp(App).use(store).use(router).mount('#app')


