<template>
  <div class="container jumbotron text-center">
    <div class="alert alert-danger" v-if="!galleries">
      <h2>We are sorry. There are no created galleries :(</h2>
    </div>
    <template v-if="galleries">
      <h1>All galleries</h1>
      <div class="SearchGalleries">
        <filterField @search="search">Filter Galleries</filterField>
        <hr>
      </div>
      <div class="gallery-list">
        <div v-for="gallery in galleries" :key="gallery.id" class="my-galleries">
          <gallery-row :gallery="gallery"/>
        </div>
      </div>
      <button
        v-show="page != lastPage"
        @click="loadMore"
        class="btn btn-secondary"
        type="button"
      >Load more content</button>
    </template>
  </div>
</template>

<script>
import filterField from "@/components/partials/SearchField";
import galleryService from "@/utils/services/gallery-service";
import galleryRow from "@/components/galleriesViews/GalleryRow.vue";
export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      galleryService.getAll().then(response => {
        vm.galleries = response.data;
        vm.lastPage = response.last_page;
      });
    });
  },
  components: {
    filterField,
    galleryRow
  },
  data() {
    return {
      galleries: [],
      lastPage: null,
      page: 1,
      term: ''
    };
  },
  methods: {
    loadMore() {
      this.page++;
      galleryService.getAll(this.term, this.page)
      .then(response => {
        this.galleries.push(...response.data);
        this.lastPage=response.last_page
      });
    },
    search(term) {
      this.page = 1;
      this.term = term;
      galleryService.getAll(this.term, this.page).then(response => {
        this.galleries = response.data;
        this.lastPage = response.last_page;
      });
    }
  }
};
</script>

<style>
#filterField {
  margin: auto;
}
</style>
