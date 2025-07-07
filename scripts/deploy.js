async function main() {
  const [deployer] = await ethers.getSigners();

  const zusdtAddr = "0x249aaf2c2e5ab25518cc3dbc5be471eaf23686c2";
  const zctAddr   = "0x83505A3447d50f74174a1b910115577D7f68dC07";
  const ethSepoliaAddr = "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43";

  const Swap = await ethers.getContractFactory("SwapZUSDTZCT");
  const swap = await Swap.deploy(zusdtAddr, zctAddr);
  await swap.deployed();
  console.log("Swap deployed:", swap.address);

  const Sender = await ethers.getContractFactory("ZUSDTBridgeSender");
  const sender = await Sender.deploy(zusdtAddr);
  await sender.deployed();
  console.log("BridgeSender deployed:", sender.address);

  const Receiver = await ethers.getContractFactory("SepoliaETHBridgeReceiver");
  const receiver = await Receiver.deploy(ethSepoliaAddr);
  await receiver.deployed({ network: "sepolia" });
  console.log("BridgeReceiver deployed:", receiver.address);
}
main()
  .then(() => process.exit(0))
  .catch(err => { console.error(err); process.exit(1); });
