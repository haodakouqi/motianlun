var express = require('express');
var router = express.Router();
const https = require('https');

/* GET home page. */
router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
    const options = {
       host: "search.damai.cn",
        hostname:"search.damai.cn",
        href:"https://search.damai.cn/external/gl.html?keyword=mmm&projects=151088&siteCity=%E8%A5%BF%E5%AE%89&destCity=&ctl=%E6%AD%8C%E5%89%A7&type=1",
        path:"/external/gl.html?keyword=mmm&projects=151088&siteCity=%E8%A5%BF%E5%AE%89&destCity=&ctl=%E6%AD%8C%E5%89%A7&type=1",
        pathname:"/external/gl.html",
        port:443,
        protocol:"https:",
        query:"keyword=mmm&projects=151088&siteCity=%E8%A5%BF%E5%AE%89&destCity=&ctl=%E6%AD%8C%E5%89%A7&type=1",
        search:"?keyword=mmm&projects=151088&siteCity=%E8%A5%BF%E5%AE%89&destCity=&ctl=%E6%AD%8C%E5%89%A7&type=1",
        slashes:true
    }
    https.request(options,(response)=>{
        var datas='';
        response.on("data",(chunk)=>{
            datas +=chunk
        });
        response.on("end",()=>{
            res.json(JSON.parse(datas.toString()));
        })
    })
});

module.exports = router;

// https.get("https://www.apiopen.top/meituApi?page=1",(response)=>{
//         var datas='';
//         console.log(req.url);
//         response.on("data",(chunk)=>{
//             datas +=chunk
//         });
//         response.on("end",()=>{
//             res.json(JSON.parse(datas.toString()));
//         })
//     })