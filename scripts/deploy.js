// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getBalance(address) {
  const balance = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balance);
}
async function consoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(` Address ${counter} Balance`, await getBalance(address));
    counter++;
  }
}

async function checkall(infos) {
  for (const info of infos) {
    const timestamp = info.timestamp;
    const name = info.name;
    const add = info.from;
    const message = info.message;
    console.log(`At ${timestamp}, name ${name},address ${add}, message${message} `)
  }
}
async function main() {

  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const mess = await hre.ethers.getContractFactory("Message");
  const contract = await mess.deploy(); //This is The instance of Contract message

  contract.deployed();
  console.log("Address of Contract ", contract.address);

  const addresses=[owner.address,from1.address,from2.address,from3.address];
  console.log("Address Before Sending Message");
  await consoleBalances(addresses);

  const amount = { value: hre.ethers.utils.parseEther("1") };
  await contract.connect(from1).Send_Message("from1", "Very nice chai", amount);
  await contract.connect(from2).Send_Message("from2", "Very nice course", amount);
  await contract.connect(from3).Send_Message("from3", "Very nice information", amount);

  
  console.log("After Making Transction");
  await consoleBalances(addresses);

  const info = await contract.Get_Message();
  checkall(info);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
