var express = require('express');
var router = express.Router();
const unirest = require('unirest');
const homeListData = require('../model/homeListData');
const homeComments = require('../model/homeComments');
const homeAllData = require('../model/homeAllData');
const homeaddress = require('../model/homeaddress');

/* GET home page. */
router.get('/', function(req, res) {
  res.end('ok!!');
});
router.get('/data',function (req,res) {
  let ct =req.query.city;
  let ctlm = req.query.value;
  let mainm = 'mmm';
  let url = encodeURI(`https://search.damai.cn/external/gl.html?keyword=${mainm}&projects=151088&siteCity=${ct}&destCity=&ctl=${ctlm}&type=1`);
  console.log(ct, ctlm, "结束");
  req.on('error', err=>console.error(err));
  unirest.get(url,function (response) {
    reponse = JSON.stringify(response);
    res.json(reponse);
  })
});
router.get('/search',function (req,res) {
  let word ='周杰伦';
  let url = encodeURI(`https://search.damai.cn/suggest.html?callback=suggestJsonp&keyword=${word}&_time=1530149541997`);
  req.on('error', err=>console.error(err));
  unirest.get(url,function (response) {
    reponse = JSON.stringify(response);
    res.json(reponse);
  })
});
router.get('/address',function (req,res) {
  let word =req.query.word;
  let num =req.query.num;
  num = parseInt(num);
  let url = `http://m.elong.com/hotel/api/gethotelcitysbyletter?_rt=${num}&letter=${word}`;
  req.on('error', err=>console.error(err));
  unirest.get(url,function (response) {
    reponse = JSON.stringify(response);
    res.json(reponse);
  })
});
router.get('/timemsg',function (req,res) {
  let time =req.query.time;
  let now = req.query.now;
  let url = `https://m.moretickets.com/showapi/pub/site/6101/calendarShow?fromDate=${now}&offset=0&length=10&siteCityOID=6101&time=${time}&src=m_web`;
  console.log(url);
  req.on('error', err=>console.error(err));
  unirest.get(url,function (response) {
    reponse = JSON.stringify(response);
    res.json(reponse);
  })
});
router.get('/mock',function (req,res) {
  let result = homeListData.homeListData();
  result = result.toString();
  res.end(result);
});
router.get('/mock1',function (req,res) {
  let result = homeComments.homeComments();
  result = result.toString();
  res.end(result);
});
router.get('/mock2',function (req,res) {
  let result = homeAllData.homeAllData();
  result = result.toString();
  res.end(result);
});
router.get('/mock3',function (req,res) {
  let result = homeaddress.homeaddress();
  result = result.toString();
  res.end(result);
});
module.exports = router;
