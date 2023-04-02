//add the instance of hardhat to the global scope
const hre = require("hardhat");

async function main() {

    const mess = await hre.ethers.getContractFactory("Message");
    const contract = await mess.deploy();  
  
    contract.deployed();
    console.log("Address of Contract ", contract.address);
} 

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
