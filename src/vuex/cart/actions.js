import * as types from "./mutations_type"

export default{
    tianjia:({commit},{city})=>{
        commit(types.COUNT,city);
        // commit(types.ADD_DB);
    },
    Detail_a:({commit},{item})=>{
        commit(types.SCOUNT,item);
        // commit(types.ADD_DB);
    }
}