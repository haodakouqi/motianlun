function getAddress(num,word,cb){
  fetch('http://localhost:8410/api/address?num='+num+'&word='+word).then(function (res) {
    res.json().then(data=>{
      cb(data);
    })
  })
}
export default getAddress;
