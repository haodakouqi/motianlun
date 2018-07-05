function getComments(cb){
  fetch('http://localhost:8410/api/mock1').then(function (res) {
    res.json().then(data=>{
      cb(data);
    })
  })
}
export default getComments;
