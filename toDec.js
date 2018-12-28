const decrypt = require("./decrypt.js");
const fs = require("fs");
let b = process.argv[2];
let pp = process.argv[3];

const mode = b;
if(mode === "file"){
  let file = process.argv[3];
  b = fs.readFileSync(file, "utf8");
  pp = process.argv[4];
}

const d = decrypt(b, pp);

fs.writeFile("./out/res", d, "utf8", function(err, data){
  if(err){
    console.log("error", err);
  }
});