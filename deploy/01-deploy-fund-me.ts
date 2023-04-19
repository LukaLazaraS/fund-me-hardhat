import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { verify } from "../utils/verify";

module.exports = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId!;
  const chainName = network.name!;

  let ethUsdPriceFeedAddress: string;
  let blockConfirmations: number = 0;
  if (developmentChains.includes(chainName)) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainName].ethUsdPriceFeed!;
    blockConfirmations = networkConfig[network.name].blockConfirmations!;
  }

  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress],
    log: true,
    waitConfirmations: blockConfirmations,
  });

  if (!developmentChains.includes(chainName) && process.env.ETHERSCAN_API_KEY) {
    await verify(fundMe.address, [ethUsdPriceFeedAddress]);
  }

  log("-------------------------------------------------");
};

module.exports.tags = ["all", "fundme"];
