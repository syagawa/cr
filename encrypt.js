const CryptoJS = require("crypto-js");

const encrypt = function(txt, phrase){

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

module.exports = encrypt;