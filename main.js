const CryptoJS = require("crypto-js");

const tx = process.argv[2];
const pp = process.argv[3];


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

console.log(d);

// fs.writeFile("out.js", "aa");