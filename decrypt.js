const CryptoJS = require("crypto-js");
const fs = require("fs");
let b = process.argv[2];
let pp = process.argv[3];

const mode = b;
if(mode === "file"){
  let file = process.argv[3];
  b = fs.readFileSync(file, "utf8");
  pp = process.argv[4];
}

const decrypt = function(binary, phrase){
  const array = binary.split(",");

  const salt = CryptoJS.enc.Hex.parse(array[0]);
  const initialVector = CryptoJS.enc.Hex.parse(array[1]);
  const encrypted = CryptoJS.enc.Base64.parse(array[2]);

  const passphrase = CryptoJS.enc.Utf8.parse(phrase);
  const key128Bits500Iterations = CryptoJS.PBKDF2(passphrase, salt, {keySize: 128 / 8, iterations: 500});

  const options = {
    iv: initialVector,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  };

  let decrypted = CryptoJS.AES.decrypt({ ciphertext: encrypted }, key128Bits500Iterations, options);

  // const u8 = decrypted;
  const u8 = decrypted.toString(CryptoJS.enc.Utf8);


  return u8;

};

const d = decrypt(b, pp);

fs.writeFile("./out/res", d, "utf8", function(err, data){
  if(err){
    console.log("error", err);
  }
});