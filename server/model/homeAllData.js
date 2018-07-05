const fs = require('fs');
const path = require('path')
function homeAllData(){
  let result = fs.readFileSync(path.join(__dirname,'/mock/home-alldata.json'));
  return result;
}
module.exports = {homeAllData:homeAllData};
