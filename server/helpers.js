const { utf8ToBytes, toHex, hexToBytes  } = require('ethereum-cryptography/utils')
const { keccak256 } = require('ethereum-cryptography/keccak')
const { secp256k1 } = require('ethereum-cryptography/secp256k1')

const getPublicKeyFromSignature = (signature) => {
  const sig = secp256k1.Signature.fromCompact(signature)
  sig.recovery = 0
  return sig
}

const getAddressFromSignature = (signature) => {
  const publicKey = signature.recoverPublicKey(toHex(utf8ToBytes(''))).toHex()
  return toHex(keccak256(hexToBytes(publicKey)).slice(-20))
}

exports.getPublicKeyFromSignature = getPublicKeyFromSignature
exports.getAddressFromSignature = getAddressFromSignature
