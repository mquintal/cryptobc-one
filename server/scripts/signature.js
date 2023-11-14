
const { secp256k1 } = require("ethereum-cryptography/secp256k1.js")
const { readFileSync } = require("fs")
const { join } = require("path")
const { hexToBytes, utf8ToBytes } = require('ethereum-cryptography/utils.js')

const privateKey = process.argv[2]

if (!privateKey) {
  console.log('Please provide a valid private key.')
  process.exit(1)
}

const { wallets } = JSON.parse(readFileSync(join(__dirname, "..", "wallets.json")))

if(!wallets.some(wallet => wallet.private === privateKey)) {
  console.log("This private key does not exist in the system.")
  process.exit(1)
}

const message =  utf8ToBytes('')
const signature = secp256k1.sign(message, hexToBytes(privateKey))
console.log('Public Key: ', signature.recoverPublicKey(message).toHex())
console.log('Signature:  ', signature.toCompactHex())
