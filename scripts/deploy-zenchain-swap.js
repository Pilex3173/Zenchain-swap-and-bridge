const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with address:", deployer.address);

  const zusdt = "0x249aaf2c2e5ab25518cc3dbc5be471eaf23686c2"; // ZUSDT Zenchain
  const zct   = "0x83505A3447d50f74174a1b910115577D7f68dC07"; // ZCT Zenchain

  const Swap = await ethers.getContractFactory("SwapZUSDTZCT");
  const swap = await Swap.deploy(zusdt, zct);
  await swap.waitForDeployment();

  const address = await swap.getAddress();
  console.log("✅ SwapZUSDTZCT deployed at:", address);
}

main().catch((err) => {
  console.error("❌ Deployment failed:", err);
  process.exit(1);
});
