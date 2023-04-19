import { run } from "hardhat";

export async function verify(contractAddress: string, args: any[]) {
  console.log("verifying");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constuctorArguments: args,
    });
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(e);
    }
  }
}
