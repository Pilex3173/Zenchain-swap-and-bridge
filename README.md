# 🔁 ZenChain Swap & Bridge (Testnet)

Proyek ini berisi 3 smart contract utama:

- **SwapZUSDTZCT**: Tukar ZUSDT ↔ ZCT di jaringan ZenChain
- **ZUSDTBridgeSender**: Lock ZUSDT untuk dikirim ke jaringan Sepolia
- **SepoliaETHBridgeReceiver**: Terima ETH (token) di Sepolia dari bridge ZenChain

---

## ⚙️ Deploy Kontrak

### 1. Install Hardhat dan dependensi

```bash
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers
npx hardhat
