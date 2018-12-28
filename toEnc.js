const encrypt = require("./encrypt.js");
const fs = require("fs");

const mode = process.argv[2];

let tx, pp;

if(mode === "-t"){
  tx = process.argv[3];
  pp = process.argv[4];
}else{
  tx = fs.readFileSync(mode, "utf8");
  pp = process.argv[3];
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
