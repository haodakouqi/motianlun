import * as types from "./mutations_type"

export default {
    [types.COUNT](state,city){
        state.add=city;
    },
    [types.SCOUNT](state,item){
        state.detail=item;
        console.log(item);
    },
    [types.QHISTORY](state,item){
        state.search_history=item;
        console.log(item);
    },
    // [types.ADD_DB](state){
    //     localStorage.setItem('vuex_cart',JSON.stringify(state.add));
    // },
}