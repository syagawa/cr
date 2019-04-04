const decrypt = require("./decrypt.js");
const fs = require("fs");

const mode = process.argv[2];
let b, pp;

if(mode === "-t"){
  b = process.argv[3];
  pp = process.argv[4];
}else{
  b = fs.readFileSync(mode, "utf8");
  pp = process.argv[3];
}

const d = decrypt(b, pp);

fs.writeFile("./out/res", d, "utf8", function(err, data){
  if(err){
    console.log("error", err);
  }
});