const fs = require('fs');
const path = require('path')
function homeComments(){
  let result = fs.readFileSync(path.join(__dirname,'/mock/home-comments.json'));
  return result;
}
module.exports = {homeComments:homeComments};
