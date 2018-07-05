function getPic(cb){
  fetch('http://localhost:8410/api/mock').then(function (res) {
    res.json().then(data=>{
      cb(data);
    })
  })
}
export default getPic;
