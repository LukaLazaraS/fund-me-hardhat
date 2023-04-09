import { HardhatRuntimeEnvironment } from "hardhat/types";
import { networkConfig } from "../helper-hardhat-config";

module.exports = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId!;
  const chainName = network.name!;

  const ethUsdPriceFeedAddress = networkConfig[chainName].ethUsdPriceFeed!;

  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [],
    log: true,
  });
};
