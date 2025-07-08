require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');

const app = express();
app.use(cors());
app.use(express.json());

const provider = new ethers.providers.JsonRpcProvider(process.env.ZENCHAIN_RPC);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const swapAbi = [
  {
    "inputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],
    "name": "swapZUSDTtoZCT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const swapContract = new ethers.Contract(process.env.SWAP_ADDRESS, swapAbi, wallet);

app.post('/swap', async (req, res) => {
  try {
    const amount = req.body.amount;
    const tx = await swapContract.swapZUSDTtoZCT(ethers.utils.parseUnits(amount, 18));
    await tx.wait();
    res.json({ txHash: tx.hash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
