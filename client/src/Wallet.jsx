import { useState } from "react";
import server from "./server";

function Wallet({ signature, setSignature, balance, setBalance }) {
  const [address, setAddress] = useState('')
  async function onChange(evt) {
    const signature = evt.target.value;
    setSignature(signature);
    if (signature) {
      const {
        data: { balance, address },
      } = await server.get(`balance/${signature}`);
      setBalance(balance);
      setAddress(address)
    } else {
      setBalance(0);
      setAddress('')
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Signature
        <input placeholder="Type an signature, for example: 0x1" value={signature} onChange={onChange}></input>
        <span>Address: {address}</span>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
