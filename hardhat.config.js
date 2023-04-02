require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();


/** @type import('hardhat/config').HardhatUserConfig */
const Goreli_url = process.env.GORELI_URL;
const Private_key= process.env.PRIVATE_KEY;



module.exports = {
  solidity: "0.8.18",
  networks : {
    goreli: {
      url: Goreli_url,
      accounts: [Private_key]
    }
  }
  
};
