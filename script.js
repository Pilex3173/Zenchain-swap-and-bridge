const swapContractAddress = "0x32A7Acf247F49aAf49A69Fd812dEb3F4fCEF650B";
const swapContractABI = [
  {
    "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }],
    "name": "swapZUSDTtoZCT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

let web3Modal;
let provider;
let signer;
let userAddress;
let instance;

async function init() {
  const providerOptions = {
    walletconnect: {
      package: window.WalletConnectProvider.default,
      options: {
        infuraId: "1c84a99f763144348d5fa28316d42b49" // Infura untuk WalletConnect
      }
    },
    okxwallet: {
      package: window.okxwallet,
      connector: async () => {
        if (!window.okxwallet) {
          alert("OKX Wallet belum terpasang. Silakan install dari Chrome Web Store.");
          throw new Error("OKX Wallet tidak tersedia");
        }
        await window.okxwallet.request({ method: 'eth_requestAccounts' });
        return window.okxwallet;
      }
    }
  };

  web3Modal = new window.Web3Modal.default({
    cacheProvider: false,
    providerOptions,
    theme: "dark"
  });
}

async function connectWallet() {
  try {
    instance = await web3Modal.connect();
    provider = new ethers.providers.Web3Provider(instance);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();

    const { chainId } = await provider.getNetwork();
    if (chainId !== 11155111) {
      alert("Pastikan kamu berada di jaringan Sepolia (Chain ID 11155111)");
      return false;
    }

    document.querySelectorAll('.wallet-btn, .connect-wallet').forEach(btn => {
      btn.textContent = `Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
      btn.disabled = true;
    });

    return true;
  } catch (err) {
    console.error("Gagal connect wallet:", err);
    alert("Gagal koneksi wallet: " + err.message);
    return false;
  }
}

async function swapToken() {
  const amount = document.getElementById("amountFrom").value;
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    alert("Masukkan jumlah yang valid.");
    return;
  }

  if (!userAddress) {
    const connected = await connectWallet();
    if (!connected) return;
  }

  const contract = new ethers.Contract(swapContractAddress, swapContractABI, signer);
  try {
    const tx = await contract.swapZUSDTtoZCT(ethers.utils.parseUnits(amount, 18));
    await tx.wait();
    alert("Swap berhasil!");
  } catch (err) {
    console.error("Swap gagal:", err);
    alert("Swap gagal: " + err.message);
  }
}

window.addEventListener('load', async () => {
  await init();

  document.querySelectorAll('.wallet-btn, .connect-wallet').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!userAddress) await connectWallet();
    });
  });
});
