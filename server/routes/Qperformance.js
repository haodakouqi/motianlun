var express = require('express');
var router = express.Router();
const https = require('https');

/* GET home page. */
router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
    
    https.get("https://www.apiopen.top/meituApi?page=1",(response)=>{
        var datas='';
        console.log(req.url);
        response.on("data",(chunk)=>{
            datas +=chunk
        });
        response.on("end",()=>{
            res.json(JSON.parse(datas.toString()));
        })
    })
});

module.exports = router;

