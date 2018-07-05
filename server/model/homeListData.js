const fs = require('fs');
const path = require('path')
function homeListData(){
  let result = fs.readFileSync(path.join(__dirname,'/mock/home-list.json'));
  return result;
}
module.exports = {homeListData:homeListData};
