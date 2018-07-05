function getAddress(cb){
  fetch('http://localhost:8410/api/mock3').then(function (res) {
    res.json().then(data=>{
      cb(data);
    })
  })
}
export default getAddress;
