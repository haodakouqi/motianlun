function getData(ct,ctl,cb){
  fetch('http://localhost:8410/api/data?city='+ct+'&value='+ctl).then(function (res) {
    res.json().then(data=>{
      cb(data);
    })
  })
}
export default getData;
