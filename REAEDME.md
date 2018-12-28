# Crypt

## About
Encrypt / Decrypt strings.

## How to

```
# clone this repository

$ cd cr
$ npm install
$ mkdir out

## Encrypt

$ node toEnc.js <filename> <passphrase>

or

$ node toEnc.js -t <String> <passphrase>

### Encrypted character string is outputted to "./out/binary".
### And passphrase is outputted to "./out/pp".


## Decrypt

### 

$ node toDec.js <binaryfilename> <passphrase>

or

$ node toDec.js -t <BinaryString> <passphrase>

### Decrypted string is outputted to "./out/res".


```
