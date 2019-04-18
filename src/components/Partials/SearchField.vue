<template>
  <div>
    <form @submit.prevent="filterGallery" class="form-inline my-2 my-lg-0">
      <input
        type="search"
        v-model="term"
        class="form-control mr-sm-2"
        placeholder="Filter galleries"
        aria-label="Search"
      >
      <button class="btn btn-dark" type="submit">Filter</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      term: ""
    };
  },
  methods: {
    filterGallery() {
      this.$emit("search", this.term);
    }
  }
};
</script>

