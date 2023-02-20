const fs = require('fs');


module.exports = {
   
    getAllList,
   
};




async function getAllList() {
   
    let rawdata = fs.readFileSync('log.txt');
 let whatsupData = JSON.parse(rawdata);

  return whatsupData
}



