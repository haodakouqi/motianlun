function getRecommend(cb){
  fetch('http://localhost:8410/api/mock2').then(function (res) {
    res.json().then(data=>{
      cb(data);
    })
  })
}
export default getRecommend;
