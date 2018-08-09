import Vue from "vue"
import Vuex from "vuex"
import state from "./cart/state"
import actions from "./cart/actions"
import getters from "./cart/getters"
import mutations from "./cart/mutations"
Vue.use(Vuex);

export default new Vuex.Store({
        state,
        mutations,
        actions,
        getters
})