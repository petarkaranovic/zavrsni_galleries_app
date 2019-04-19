<template lang="html">
    <div>
        <div class="container" >
            <filter-field @search="search"> </filter-field>
        </div>
        <div class="container jumbotron">
            <template v-if="authorsGalleries">
                <div v-for="gallery in authorsGalleries" :key="gallery.id" class="my-galleries">
                    <div class="card" style="width:18rem">
                        <img :src="gallery.images[0].url" alt="..." class="card-img-top">
                        <div class="card-body">
                            <router-link :to="{name:'single-gallery', params: {id: Number(gallery.id)}}">
                                <h4 class="card-title">{{ gallery.title }}</h4>
                            </router-link>
                            <p v-if="gallery.user" class="card-text">{{ gallery.user.first_name }} {{ gallery.user.last_name }}</p>
                            <p class="card-text">{{ gallery.created_at }}</p>
                        </div>
                    </div>
                </div> 
            </template>
        </div>
    </div>
</template>

<script>
import filterField from "@/components/partials/SearchField";
import galleryService from "@/utils/services/gallery-service";
export default {
  components: {
    filterField
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      galleryService
        .authorsGalleries(vm.$route.params.id)
        .then(response => (vm.authorsGalleries = response.data));
    });
  },
  data() {
    return {
      authorsGalleries: [],
      term: "",
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

<style scoped>
.my-container {
  display: flex;
  flex-wrap: unset;
  justify-content: space-around;
}
#filterField {
  margin: auto;
}
.my-galleries {
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  border: 1px solid grey;
}
</style>
