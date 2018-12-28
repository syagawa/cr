const CryptoJS = require("crypto-js");
const fs = require("fs");

let tx = process.argv[2];
let pp = process.argv[3];

const mode = tx;
if(mode === "file"){
  let file = process.argv[3];
  tx = fs.readFileSync(file, "utf8");
  pp = process.argv[4];
}

const makeCrypt = function(txt, phrase){

  const text = CryptoJS.enc.Utf8.parse(txt);
  const passphrase = CryptoJS.enc.Utf8.parse(phrase);

  const salt = CryptoJS.lib.WordArray.random(128 / 8);
  const key128Bits500Iterations = CryptoJS.PBKDF2(passphrase, salt, {keySize: 128 / 8, iterations: 500});
  const initialVector = CryptoJS.lib.WordArray.random(128 / 8);
  const options = {
    iv: initialVector,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  };

  const encrypted = CryptoJS.AES.encrypt(text, key128Bits500Iterations, options);

  const binary = CryptoJS.enc.Hex.stringify(salt) + "," + CryptoJS.enc.Hex.stringify(initialVector) + "," + encrypted;

  return binary;

};

const b = makeCrypt(tx, pp);

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
