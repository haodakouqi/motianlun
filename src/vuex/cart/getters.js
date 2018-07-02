export default{
    getadd(state){
        return state.add;
    },
    getdata(state){
        fetch('http://localhost:8410/qpa/data?city='+state.add[0]+'&ctl='+state.add[1])
        .then(res=>res.json())
        .then(data=>{
            state.cdd =JSON.parse(data);
            
        });
        return state.cdd;
    } ,
    getdetail(state){
        return state.detail;
    },
}