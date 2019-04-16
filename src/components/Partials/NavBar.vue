<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link :to="{ name: 'home' }" class="navbar-brand">All Galleries</router-link>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul  class="navbar-nav">
        <li v-if="user" class="nav-item active">
          <router-link :to="{name:'my-galleries'}" class="navbar-brand">My galleries</router-link>
        </li>
        <li v-if="user" class="nav-item active">
          <router-link :to="{name:'create-gallery'}" class="navbar-brand">Create gallery</router-link>
        </li>
        </ul>
        <ul v-if="!user" class="navbar-nav ">
        <li  class="nav-item active">
          <router-link :to="{ name: 'login' }" class="navbar-brand">Login</router-link>
        </li>
        <li class="nav-item active">
          <router-link :to="{ name: 'register' }" class="navbar-brand">Register</router-link>
        </li>
      </ul>
        <ul v-else class="navbar-nav">
            <li class="navbar-item ">
                <a href="#" class="navbar-brand" @click="onClick">Logout</a>
            </li>
        </ul>
    </div>
  </nav>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed:{
    ...mapGetters({
      user:'getUser'
    })
  },
  methods:{
    ...mapActions(['logout']),
    onClick(){
      this.logout()
    }
  }
  
};
</script>