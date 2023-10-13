<template>
    <section id="login-page-wrapper">
      <div id="login-form-wrapper">
        <div class="alert alert-success" role="alert" v-if="successMessage">
          {{ successMessage }}
        </div>
  
        <div class="alert alert-danger" role="alert" v-if="errorMessage">
          {{ errorMessage }}
        </div>
  
        <h3 style="text-align: center">Member Login</h3>
        <hr>
        <form @submit.prevent="loginUser">
          <label>Username</label>
          <input class="form-control" type="text" name="username" v-model="username">
          <br>
          <label>Password</label>
          <input class="form-control" type="password" name="password" v-model="password">
          <br>
          <button class="btn btn-primary btn-lg btn-block" type="submit">Login</button>
        </form>
  
        <br>
        <p>Dont have an account? <router-link to="/register">Register</router-link></p>
        <p>Forgot your password? <router-link to="/login">Reset</router-link></p>
      </div>
    </section>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapActions ,  mapGetters} from 'vuex';
  
  export default {
    name: 'LoginFormSection',
    data() {
      return {
        username: '',
        password: '',
        successMessage: '',
        errorMessage: '',
      };
    },
    computed: {
        ...mapGetters(['user']),
        isSuperuser() {
      // Check if the user object exists and if is_superuser is true
            return this.user && this.user.is_superuser;
        },
    },
    methods: {
      ...mapActions(['login' ,'logout']),
      async loginUser() {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/registeration/login', {
            username: this.username,
            password: this.password,
          });
  
          this.login({
            token: response.data.token,
            user: response.data.user,
            superuser: response.data.is_superuser,
            isAuth: true,
          });
  
          this.successMessage = `Logged in as: ${response.data.user.first_name} ${response.data.user.last_name}`;
  
          setTimeout(() => {
            this.$router.push('/');
          }, 2000);
        } catch (error) {
          console.error('Login error:', error);
          this.errorMessage = 'Invalid credentials';
          this.logout()
          setTimeout(() => {
            this.errorMessage = '';
            this.username = '';
            this.password = '';
          }, 2000);
        }
      },
    },
  };
  </script>
  