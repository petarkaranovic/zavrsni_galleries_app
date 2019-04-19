<template>
  <div class="container jumbotron">
    <div class="alert alert-danger" v-if="!galleries">
      <h2>We are sorry. There are no created galleries :(</h2>
    </div>
    <template v-if="galleries">
      <h1 class="container">All galleries</h1>
      <div class="SearchGalleries">
        <filterField @search="search">Filter Galleries</filterField>
        <br>
      </div>
      <div class="container">
        <div v-for="(gallery,key) in galleries" :key="key" class="my-galleries">
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
      galleries: null,
      lastPage: null,
      page: 1,
      term: null
    };
  },
  methods: {
    loadMore() {
      this.page++;
      galleryService.getAll(this.term, this.page).then(response => {
        this.galleries.push(...response.data);
      });
    },
    search(term) {
      this.page = 1;
      this.term = term;
      this.galleries = {};
      galleryService.getAll(this.term, this.page).then(response => {
        this.galleries = response.data;
        this.lastPage = response.last_page;
      });
    }
  }
};
</script>

<style lang="css">
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.my-galleries {
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  border: 1px solid grey;
}
#filterField {
  margin: auto;
}
</style>
