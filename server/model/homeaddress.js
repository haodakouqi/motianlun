const fs = require('fs');
const path = require('path')
function homeaddress(){
  let result = fs.readFileSync(path.join(__dirname,'/mock/address.json'));
  return result;
}
module.exports = {homeaddress:homeaddress};
