var express = require('express');
var router = express.Router();
const unirest = require('unirest');
/* GET home page. */
router.get('/', function(req, res) {
  res.end('ok!!');
});

router.get('/data',function (req,res) {
  let ct =req.query.city;
  let ctlm = req.query.ctl;
  let mainm = 'mmm';
  console.log(ct);
  console.log(ctlm);
  let url = encodeURI(`https://search.damai.cn/external/gl.html?keyword=${mainm}&projects=151088&siteCity=${ct}&destCity=&ctl=${ctlm}&type=1`);
  req.on('error', err=>console.error(err));
  unirest.get(url,function (response) {
    reponse = JSON.stringify(response);
    res.json(reponse);
  })
});

router.get('/detail',function (req,res) {
  let smalla =req.query.small;
  let url = encodeURI(`http://damaimaitian.oss-cn-beijing.aliyuncs.com/v1/proj/${smalla}?t=1530277987923`);
  req.on('error', err=>console.error(err));
  unirest.get(url,function (response) {
    reponse = JSON.stringify(response);
    res.json(reponse);
  })
});
module.exports = router;