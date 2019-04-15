import Vue from 'vue'
import VueRouter from 'vue-router'
import AppLogin from '@/components/Auth/AppLogin'
import AppRegister from '@/components/Auth/AppRegister'

Vue.use(VueRouter)

const routes=[
    {path:'/',name:'home'},
    {path:'/login', name:'login', component:AppLogin, meta:{guest:true}},
    {path:'/register', name:'register', component:AppRegister, meta:{guest:true}}
]

const router = new VueRouter({
    routes,
    mode:'history'
})

export default router