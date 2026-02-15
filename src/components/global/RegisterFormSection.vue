<template>
    <section id="login-page-wrapper">
        <div id="login-form-wrapper">
            <div class="alert alert-success" role="alert" v-if="successMessage">
                {{ successMessage }}
            </div>

            <div class="alert alert-danger" role="alert" v-if="errorMessage">
                {{ errorMessage }}
            </div>

            <h3 style="text-align: center">Register Account</h3>
            <hr>
            <form method="POST" action="" @submit.prevent="registerFunction">
                <label>username</label>
                <input class="form-control" type="text" name="username" v-model="username">
                <br>
                <label>first name</label>
                <input class="form-control" type="text" name="conf_password" v-model="f_name">
                <br>
                <label>Last name</label>
                <input class="form-control" type="text" name="conf_password" v-model="l_name">
                <br>
                <label>Email</label>
                <input class="form-control" type="email" name="email" v-model="email">
                <br>
                <label>Password</label>
                <input class="form-control" type="password" name="password" v-model="password">
                <br>
                <label>Confirm Password</label>
                <input class="form-control" type="password" name="conf_password" v-model="conf_password">
                <br>

                <input class="btn btn-primary btn-lg btn-block" type="submit" value="Register">
            </form>

            <br>
            <p>Already have an account? <router-link to="/login">Login</router-link></p>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    name: 'RegisterFormSection',
    data() {
        return {
            username: '',
            password: '',
            conf_password: '',
            email: '',
            f_name: '',
            l_name: '',
            errorMessage: '',
            successMessage: '',
        }
    },
    methods: {
        registerFunction() {
            if (this.password == this.conf_password) {
                axios
                    .post('https://zkzk.softzm.cloud/api/registeration/register', {
                        username: this.username,
                        email: this.email,
                        password: this.password,
                        first_name: this.f_name,
                        last_name: this.l_name,
                    })
                    .then((response) => {
                        this.successMessage = `Logged in as: ${this.username}`;
                        console.log(response)
                        setTimeout(() => {
                            this.$router.push('/login');
                        }, 1500);
                    }).catch((error) => {
                        console.error('register error:', error);
                        this.errorMessage = 'Invalid credentials';
                        setTimeout(() => {
                            this.errorMessage = '';
                            this.username = '';
                            this.password = '';
                            this.f_name = '';
                            this.l_name = '';
                            this.conf_password = '';
                            this.email = '';

                        }, 2000);
                    })
            } else {
                alert('your password is wrong')
            }

        }
    },
}
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
    max-width: 500px;
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
