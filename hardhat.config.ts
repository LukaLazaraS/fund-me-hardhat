import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-solhint";
import "dotenv/config";
import "hardhat-deploy";

const GOERLY_RPC_URL = process.env.GOERLY_RPC_URL!;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;

module.exports = {
  solidity: {
    compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
  },
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
    goerli: {
      url: GOERLY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
