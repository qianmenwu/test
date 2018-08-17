
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex) 
 const state= {
        username: localStorage.getItem('username')
    }
const mutations={
    // setUserName(state,name){
    //     state.username=name
    // }
}
export default new Vuex.Store({
    state,
    mutations
})