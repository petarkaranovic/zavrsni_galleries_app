import authService from '@/utils/services/auth-service'
import router from '@/router'

const getUserFromLocalStorage=()=>{
    let user = localStorage.getItem('user')
    return JSON.parse(user)
}

export default {
    state:{
        user:getUserFromLocalStorage(),
        errors:null,
    },

    mutations:{
        SET_DATA(state,{user}){
            state.user=user
            state.errors=null
        },
        SET_ERRORS(state,errors){
            state.errors=errors
        }
    },

    actions:{
        async login({commit}, {email,password}){
            try{
                commit('SET_DATA',await authService.login(email,password))
                router.push({name:'home'})
            } catch(error){
                commit('SET_ERRORS',error.response.data.message)
            }
        },

        async register({commit},user){
            try{
                commit('SET_DATA',await authService.register(user))
                router.push({name:'home'})
            } catch(error){
                commit('SET_ERRORS', error)
            }
        }
    },

    getters:{
        getUser:state=>state.user,
        getErrors:state=>state.errors
    }
}

