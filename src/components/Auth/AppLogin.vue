<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="onSubmit">
            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" 
            v-model="user.email" required>
            <br>
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password"
            v-model="user.password" required>
            <br>
            <br>
            <button type="submit" class="btn btn-dark">Login</button>
        </form>
        <br>
        <small> <router-link :to="{name:'register'}">Please register if you dont have an account</router-link></small>
        <error-form v-if="errors">{{ errors }}</error-form>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import ErrorForm from '@/components/Partials/ErrorForm'
export default {
    components:{
        ErrorForm
    },
    data(){
        return{
            user:{}
        }
    },
    methods:{
        ...mapActions(['login']),
        onSubmit(){
            this.login(this.user)
        }
    },
    computed:{
        ...mapGetters({
            errors:'getErrors'
        })
    }

}
</script>

<style>

</style>
