// store/index.js

// import Vue from 'vue';
import Vuex from 'vuex';

// Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: null, // Initial state for the token
    user: null,  // Initial state for user info
    superuser:false,  //Initial state for superuser
    isAuth:false  //Initial state for superuser

  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    setSuperUser(state , superuser){
        state.superuser = superuser
    },
    setAuth(state , isAuth){
      state.isAuth = isAuth
    },
    clearAuth(state) {
      state.token = null;
      state.user = null;
      state.superuser = false;
      state.isAuth = false
    },
  },
  actions: {
    login({ commit }, { token, user , superuser  }) {
      commit('setToken', token);
      commit('setUser', user);
      commit('setSuperUser' , superuser)
      commit('setAuth' , true)

      // Store the user's data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('superuser' , superuser);
      localStorage.setItem('isAuth' , true);

    },
    logout({ commit }) {
      commit('clearAuth');
      // Store the user's data in localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuth');
      localStorage.removeItem('superuser');

    },
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuth;
    },
    isSuperUser(state){
      return state.superuser
    }
  },
});

export default store;
