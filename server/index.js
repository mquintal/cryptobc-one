const express = require("express");
const app = express();
const cors = require("cors");
const { loadWallets } = require('./load-wallets')
const { getAddressFromSignature, getPublicKeyFromSignature } = require('./helpers')
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = loadWallets()
console.log(balances)

app.get("/balance/:signature", (req, res) => {
  const { signature: sig } = req.params;
  const signature = getPublicKeyFromSignature(sig)
  const address = getAddressFromSignature(signature)
  const balance = balances[address] || 0;

  res.send({ balance, address });
});

app.post("/send", (req, res) => {
  const { signature: sig, recipient, amount } = req.body;
  const signature = getPublicKeyFromSignature(sig)
  const sender = getAddressFromSignature(signature)

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
