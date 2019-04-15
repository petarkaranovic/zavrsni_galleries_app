<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link :to="{ name: 'home' }" class="navbar-brand">Galleries</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link :to="{ name: 'login' }" class="navbar-brand">Login</router-link>
        </li>
        <li class="nav-item active">
          <router-link :to="{ name: 'register' }" class="navbar-brand">Register</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  
};
</script>