const { readFileSync } = require('fs')

const load = () => {
  try {
    const file = readFileSync('./wallets.json', 'utf8')
    const { wallets } = JSON.parse(file)
  
    return wallets.reduce((wallets, wallet) => {
      return {
        ...wallets,
        [wallet.address]: wallet.amount,
      }
    }, {})
  } catch {
    console.error('Please generate wallets first. Using "yarn generate" or "npm run generate".')
    process.exit(1)
  }
}

exports.loadWallets = load
