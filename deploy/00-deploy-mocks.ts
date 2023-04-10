import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DECIMALS, INITIAL_PRICE, developmentChains } from "../helper-hardhat-config";

module.exports = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  const chainName = network.name!;

  if (developmentChains.includes(chainName)) {
    log("Local network detected! Deploying mocks...");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_PRICE],
    });
    log("Mocks Deployed!");
    log("----------------------------------");
  }
};

module.exports.tags = ["all", "mocks"];
