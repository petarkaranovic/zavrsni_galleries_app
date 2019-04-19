<template>
  <div id="app">
    <nav-bar/>
    <router-view class="container"/>
  </div>
</template>

<script>
import NavBar from "@/components/partials/NavBar";
export default {
  name: "app",
  components: {
    NavBar
  }
};
</script>
<style>
.gallery-list {
  display: flex;
  flex-wrap: wrap;
}
</style>


