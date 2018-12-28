const CryptoJS = require("crypto-js");

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

  const u8 = decrypted.toString(CryptoJS.enc.Utf8);

  return u8;

};

module.exports = decrypt;