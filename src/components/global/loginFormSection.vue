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
import { mapActions, mapGetters } from 'vuex';

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
    ...mapActions(['login', 'logout']),
    async loginUser() {
      try {
        const response = await axios.post('https://zkzk.softzm.cloud/api/registeration/login', {
          username: this.username,
          password: this.password,
        });

        this.login({
          token: response.data.token,
          user: response.data.user,
          superuser: response.data.is_superuser,
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

<style scoped>
#login-page-wrapper {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--bg-alt);
  padding: var(--space-2xl) var(--space-lg);
}

#login-form-wrapper {
  width: 100%;
  max-width: 400px;
  background: var(--bg-card);
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-dim);
  box-shadow: var(--shadow-lg);
  margin: 2rem;
}

h3 {
  margin-bottom: var(--space-lg);
  color: var(--text-hero);
}

hr {
  border-color: var(--border-dim);
  margin-bottom: var(--space-lg);
}

label {
  display: block;
  margin-bottom: var(--space-xs);
  color: var(--text-secondary);
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: var(--space-md);
  background: var(--bg-elelvated);
  border: 2px solid var(--border-dim);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  margin-bottom: var(--space-md);
  transition: var(--transition-fast);
}

.form-control:focus {
  outline: none;
  border-color: var(--emerald-500);
  background: var(--bg-main);
}

.btn-primary {
  width: 100%;
  padding: var(--space-md);
  background: var(--emerald-500);
  color: var(--obsidian-950);
  font-weight: 700;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-normal);
}

.btn-primary:hover {
  background: var(--emerald-400);
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

p {
  margin-top: var(--space-md);
  text-align: center;
  color: var(--text-muted);
}

p a {
  color: var(--emerald-500);
  font-weight: 600;
}

p a:hover {
  text-decoration: underline;
}
</style>