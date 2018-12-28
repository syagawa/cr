const encrypt = require("./encrypt.js");
const fs = require("fs");

let tx = process.argv[2];
let pp = process.argv[3];

const mode = tx;
if(mode === "file"){
  let file = process.argv[3];
  tx = fs.readFileSync(file, "utf8");
  pp = process.argv[4];
}

const b = encrypt(tx, pp);

fs.writeFile("./out/binary", b, "utf8", function(err, data){
  if(err){
    console.log("error", err);
  }
});

fs.writeFile("./out/pp", pp, "utf8", function(err, data){
  if(err){
    console.log("error", err);
  }
});
