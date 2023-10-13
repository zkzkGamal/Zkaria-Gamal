<template>
    <div class="nav-wrapper">

        <!-- Link around dots-wrapper added after tutorial video -->
        <router-link :to="{ name: 'home' }">
            <div class="dots-wrapper">
                <div id="dot-1" class="browser-dot"></div>
                <div id="dot-2" class="browser-dot"></div>
                <div id="dot-3" class="browser-dot"></div>
            </div>
        </router-link>


        <ul id="navigation">
            <h2 id="close-btn" style="text-align: center">X</h2>
            <li><a href="/#contact">Contact</a></li>
            <span v-if="!user">
                <li><router-link to="/login">Login</router-link></li>
            </span>
            <span v-else>
                <li><router-link :to="{ name: 'profile' }"> Account</router-link></li>
                <li><a href="/login" @click="logout">Logout</a></li>
            </span>

        </ul>
        <img id="menu-icon" src="@/assets/menu.png" @click="showMenu()">

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'headerCom',
    computed: {
        ...mapState(['user'])
    },
    methods: {
        ...mapActions(['logout']),
        showMenu() {
            let nav = document.getElementById('navigation');
            if (nav.style.display === 'block') {
                nav.style.display = 'none';
            } else {
                nav.style.display = 'block';
            }
        }
    }
}
</script>


