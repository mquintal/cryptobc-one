const { writeFileSync } = require('fs')
const { join } = require('path')
const { secp256k1 } = require('ethereum-cryptography/secp256k1.js')
const { toHex } = require('ethereum-cryptography/utils.js')
const { keccak256 } = require('ethereum-cryptography/keccak.js')


function generateKeys() {
  const privateKey = secp256k1.utils.randomPrivateKey()
  const publicKey = secp256k1.getPublicKey(privateKey)

  return {
    private: toHex(privateKey),
    public: toHex(publicKey),
    address: toHex(keccak256(publicKey).slice(-20)),
  }
}

const wallets = [100, 75, 50].map(amount => {
  return {
    amount,
    ...generateKeys(),
  }
})

writeFileSync(join(__dirname , '..', 'wallets.json'), JSON.stringify({ wallets }, null, 2))
console.log('Balances generated.')