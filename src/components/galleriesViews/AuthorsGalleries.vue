<template>
  <div class="container jumbotron">
    <div>
      <filter-field @search="search"></filter-field>
    </div>
        <div class="gallery-list">
      <template v-if="authorsGalleries">
        <div v-for="gallery in authorsGalleries" :key="gallery.id" class="authors-galleries">
          <div class="card">
            <img :src="gallery.images[0].url" alt="..." class="card-img-top">
            <div class="card-body">
              <router-link :to="{name:'single-gallery', params: {id: Number(gallery.id)}}">
                <h5 class="card-title">{{ gallery.title }}</h5>
              </router-link>
              <p
                v-if="gallery.user"
                class="card-text"
              >{{ gallery.user.first_name }} {{ gallery.user.last_name }}</p>
              <p class="card-text">{{ gallery.created_at }}</p>
            </div>
          </div>
        </div>
      </template>
        </div>
    <button
      v-show="page != lastPage"
      @click="loadMore"
      class="btn btn-secondary"
      type="button"
    >Load more content</button>
  </div>
</template>

<script>
import filterField from "@/components/Partials/SearchField";
import galleryService from "@/utils/services/gallery-service";
export default {
  components: {
    filterField
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      galleryService
        .authorsGalleries(vm.$route.params.id)
        .then(
          response => (
            (vm.authorsGalleries = response.data),
            (vm.lastPage = response.last_page)
          )
        );
    });
  },
  data() {
    return {
      authorsGalleries: [],
      term: null,
      page: 1,
      lastPage: null,
      id: null
    };
  },
  methods: {
    loadMore() {
      this.page++;
      galleryService
        .authorsGalleries(this.id, this.term, this.page)
        .then(response => {
          this.authorsGalleries.push(...response.data);
          this.lastPage = response.last_page;
        });
    },

    search(term) {
      this.page = 1;
      this.term = term;
      this.authorsGalleries = {};
      galleryService
        .authorsGalleries(this.$route.params.id, this.term, this.page)
        .then(response => {
          this.authorsGalleries = response.data;
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
 .card {
  width: 12rem;
  margin: 30px 10px;
}
.card-body {
  min-height: 220px;
}
</style>
