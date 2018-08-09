function getTimeMsg(now,time,cb){
  fetch('http://localhost:8410/api/timemsg?time='+time+"&now="+now).then(function (res) {
    res.json().then(data=>{
      cb(data);
    })
  })
}
export default getTimeMsg;
