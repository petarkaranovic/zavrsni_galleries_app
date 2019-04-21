<template>
  <div class="container jumbotron">
    <div class="searchMyGalleries">
      <filterField @search="search">Filter Galleries</filterField>
    </div>
    <div class="gallery-list">
      <div v-if="!galleries.length" class="alert alert-danger">
        <h3>You have no galleries</h3>
      </div>
      <template v-if="galleries">
        <div v-for="gallery in galleries" :key="gallery.id" class="my-galleries">
          <div class="card">
            <img class="card-img-top" :src="gallery.images[0].url" alt="Card image cap">
            <div class="card-body">
              <router-link :to="{ name: 'single-gallery', params: {id: Number(gallery.id)} }">
                <h5 class="card-title">{{ gallery.title }}</h5>
              </router-link>
              <router-link
                :to="{ name: 'authors-galleries', params: {id: Number(gallery.user.id)} }"
              >
                <p class="card-text">{{gallery.user.first_name}} {{gallery.user.last_name}}</p>
              </router-link>
              <p class="card-text">{{gallery.created_at}}</p>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <h1>Empty</h1>
      </template>
    </div>
    <div v-if="galleries.length">
      <button
        v-show="page != lastPage"
        @click="loadMore"
        class="btn btn-secondary"
        type="button"
      >Load More</button>
    </div>
  </div>
</template>

<script>
import galleryService from "@/utils/services/gallery-service";
import filterField from "@/components/Partials/SearchField";
export default {
  components: {
    filterField
  },
  beforeRouteEnter(to, from, next) {
    galleryService.myGalleries().then(response => {
      next(vm => {
        vm.galleries = response.data;
        vm.lastPage = response.last_page;
      });
    });
  },
  data() {
    return {
      galleries: [],
      lastPage: null,
      page: 1,
      term: null
    };
  },
  methods: {
    loadMore() {
      this.page++;
      galleryService.myGalleries(this.term, this.page).then(response => {
        this.galleries.push(...response.data);
      });
    },
    search(term) {
      this.page = 1;
      this.term = term;
      this.galleries = {};
      galleryService.myGalleries(this.term, this.page).then(response => {
        this.galleries = response.data;
        this.lastPage = response.last_page;
      });
    }
  }
};
</script>

<style>
</style>
