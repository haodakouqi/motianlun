var express = require('express');
var router = express.Router();
const unirest = require('unirest');
/* GET home page. */
router.get('/', function(req, res) {
  res.end('ok!!');
});
// 大麦网
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
// 练习
router.get('/protice',function (req,res) {
  req.on('error', err=>console.error(err));
  res.json(req);
});


// 摩天轮
router.get('/qsearch',function (req,res) {
  let offset =req.query.offset;
  let ct =req.query.keyword;
  let ctlm = req.query.city;
  let time = req.query.time;
  let length = req.query.length;
  // let mainm = 'mmm';
  let url = encodeURI(`https://m.moretickets.com/showapi/pub/active_show?offset=${offset}&length=${length}&key_words=${ct}&userOID=000&client=piaodashi_weixin&locationCityOID=${ctlm}&siteOID=${ctlm}&siteCityOID=${ctlm}&time=${time}&src=m_web`);
  req.on('error', err=>console.error(err));
  unirest.get(url,function (response) {
    reponse = JSON.stringify(response);
    res.json(reponse);
  })
});

router.get('/qconnect',function (req,res) {
  let offset =req.query.offset;
  let id =req.query.id;
  let time = req.query.time;
  let length = req.query.length;
  // let mainm = 'mmm';
  let url = encodeURI(`https://m.moretickets.com/showapi/pub/shows/${id}/recommendShows?offset=${offset}&length=${length}&time=${time}&src=m_web`);
  req.on('error', err=>console.error(err));
  unirest.get(url,function (response) {
    reponse = JSON.stringify(response);
    res.json(reponse);
  })
});


router.get('/qfind',function (req,res) {
  let city =req.query.city;
  let time = req.query.time;
  let url = encodeURI(`https://m.moretickets.com/showapi/pub/site/1009/banner/app?siteCityOID=${city}&time=${time}&src=m_web`);
  req.on('error', err=>console.error(err));
  unirest.get(url,function (response) {
    reponse = JSON.stringify(response);
    res.json(reponse);
  })
});


module.exports = router;