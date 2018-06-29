var express = require('express');
var router = express.Router();
const unirest = require('unirest');
/* GET home page. */
router.get('/', function(req, res) {
  res.end('ok!!');
});
router.get('/data',function (req,res) {
  let ct =req.query.city;
  let ctl = req.query.ctl;
  let mainm = 'mmm';
  console.log(req.query.city);
  console.log(req.query.ctl);
  let url = encodeURI(`https://search.damai.cn/external/gl.html?keyword=${mainm}&projects=151088&siteCity=${ct}&destCity=&ctl=${ctl}&type=1`);
  req.on('error', err=>console.error(err));
  unirest.get(url,function (response) {
    reponse = JSON.stringify(response);
    res.json(reponse);
  })
});
module.exports = router;