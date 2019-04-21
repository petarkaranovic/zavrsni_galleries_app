<template>
  <form @submit.prevent="submitForm" class="form-signin">
    <h1 class="h3 mb-3 font-weight-normal">Edit Gallery</h1>

    <label for="inputGalleryTitle" class="sr-only">Title of the Gallery</label>
    <input
      v-model="title"
      type="text"
      id="inputGalleryTitle"
      class="form-control"
      placeholder="Gallery title"
      required
    >
    <div v-if="errors">
      <error-form v-if="errors.title">{{errors.title[0]}}</error-form>
    </div>
    <label for="inputDescription">Description</label>
    <textarea
      id="inputDescription"
      class="form-control"
      rows="8"
      cols="80"
      v-model="description"
      placeholder="Describe your gallery here..."
    ></textarea>
    <div v-if="errors">
      <error-form v-if="errors.description">{{errors.description[0]}}</error-form>
    </div>

    <div class="imgUrlContainer">
      <label>You need to input at least 1 image url</label>
      <span id="imgSpan" v-for="(num, key) in images" :key="key">
        <input
          v-model="images[key].url"
          type="url"
          id="inputImageUrl"
          class="form-control"
          placeholder="url must end with jpg,png or jpeg"
          pattern="https?://.+(png|jpg|jpeg)"
          title="Url must be https:// and end with jpg,png or jpeg"
        >
        <div v-if="errors">
          <error-form v-if="errors.images">At least one image is required</error-form>
          <error-form v-if="errors[`images.${key}.url`]">Invalid format</error-form>
        </div>
        <a
          v-show="counter > 1"
          @click.prevent="removeInput(key)"
          class="badge badge-danger"
          href="#"
        >Remove</a>
        <div>
          <a @click.prevent="moveInputUp(key)" class="badge badge-primary" href="#">Move Up</a>
          <a @click.prevent="moveInputDown(key)" class="badge badge-secondary" href="#">Move Down</a>
        </div>
      </span>
    </div>
    <button
      @click="createInput"
      id="addField"
      type="button"
      class="outline-secondary"
    >Add Another URL</button>
    <span>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Edit</button>
      <button @click="cancel" class="btn btn-lg btn-secondary btn-block" type="button">Cancel</button>
    </span>
  </form>
</template>

<script>
import galleryService from "@/utils/services/gallery-service";
import ErrorForm from "@/components/Partials/ErrorForm";
export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      galleryService.show(Number(vm.$route.params.id)).then(data => {
        vm.title = data.title;
        (vm.description = data.description),
          (vm.images = []),
          (vm.images = data.images);
        vm.counter = vm.images.length;
      });
    });
  },
  components: {
    ErrorForm
  },
  data() {
    return {
      title: "",
      description: "",
      images: [{ url: "" }],
      counter: 0,
      errors: null
    };
  },
  methods: {
    submitForm() {
      this.images = this.images.filter(item => item.url !== undefined);
      galleryService
        .edit(
          {
            title: this.title,
            description: this.description,
            images: this.images
          },
          this.$route.params.id
        )
        .then(() =>
          this.$router.push({
            name: "single-gallery",
            params: { id: Number(this.$route.params.id) }
          })
        )
        .catch(errors => {
          this.errors = errors.response.data.errors;
        });
    },
    cancel() {
      this.$router.push({
        name: "single-gallery",
        params: { id: Number(this.$route.params.id) }
      });
    },
    createInput() {
      this.counter++;
      this.images.push({});
    },
    removeInput(key) {
      this.images.splice(key, 1);
      this.counter--;
    },
    moveInputUp(key) {
      if (key) {
        this.images.splice(key - 1, 0, this.images.splice(key, 1)[0]);
      }
    },
    moveInputDown(key) {
      if (key != this.range - 1) {
        this.images.splice(key + 1, 0, this.images.splice(key, 1)[0]);
      }
    }
  }
};
</script>

<style scoped>
  #addField {
    margin-bottom: 10px
  }
  #inputImageUrl {
    margin-bottom: 5px;
    border-bottom: 2px solid grey
  }
  #imgSpan {
    border-bottom: 1px solid black
  }
</style>
