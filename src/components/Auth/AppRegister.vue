<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="first_name">First name</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter your first name"
          v-model="user.first_name"
          required
        >
      </div>
      <div v-if="errors">
        <error-form v-if="errors.first_name">{{errors.first_name[0]}}</error-form>
      </div>

      <div class="form-group">
        <label for="last_name">Last name</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter your last name"
          v-model="user.last_name"
          required
        >
      </div>
      <div v-if="errors">
        <error-form v-if="errors.last_name">{{errors.last_name[0]}}</error-form>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter your email"
          v-model="user.email"
          required
        >
      </div>
      <div v-if="errors">
        <error-form v-if="errors.email">{{errors.email[0]}}</error-form>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          placeholder="Enter your password"
          v-model="user.password"
          required
          minlength="8"
        >
      </div>
      <div v-if="errors">
        <error-form v-if="errors.password">{{errors.password[0]}}</error-form>
      </div>

      <div class="form-group">
        <label for="password">Confirm password</label>
        <input
          type="password"
          class="form-control"
          placeholder="Please confirm your password"
          v-model="user.password_confirmation"
          required
          minlength="8"
        >
      </div>
      <div v-if="errors">
        <error-form v-if="errors.password_confirmation">{{errors.password_confirmation[0]}}</error-form>
      </div>

      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" v-model="user.terms" required>
        <label for="terms">Check to accept terms and conditions</label>
      </div>
      <button type="submit" class="btn btn-dark">Register</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ErrorForm from "@/components/partials/ErrorForm";
export default {
  components: {
    ErrorForm
  },
  data() {
    return {
      user: {}
    };
  },
  methods: {
    ...mapActions(["register"]),
    onSubmit() {
      this.register(this.user);
    }
  },
  computed: {
    ...mapGetters({
      errors: "getErrors"
    })
  }
};
</script>

<style>
</style>
