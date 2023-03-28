import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-solhint";
import "hardhat-deploy";

module.exports = {
  solidity: "0.8.18",
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
