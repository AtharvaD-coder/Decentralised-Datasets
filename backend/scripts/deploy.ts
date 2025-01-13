const hre = require("hardhat");
import {ethers} from 'ethers';

async function sleep(ms: any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {

  

  const verificationReward = ethers.parseEther("0.1"); // 0.1 ETH = 100000000000000000 wei

  // Get the signer (owner) for deploying the contract
  const signers = await hre.ethers.getSigners();
  const ownerSigner = signers[0];
  console.log("The owner Signer is: ", ownerSigner.address);

  const datasetContract = await hre.ethers.deployContract("DatasetContract", [verificationReward], {
    value: verificationReward, 
  });

  // Wait for deployment to be mined
  await datasetContract.waitForDeployment();
  console.log("Dataset contract deployed to:", datasetContract.target);

  const datasetContractAddress = await datasetContract.getAddress();
  console.log("The datasetContractAddress is: ", datasetContractAddress);

  // Sleep for 30 seconds to let Etherscan catch up with the deployments (optional)
  await sleep(30 * 1000);

  await hre.run("verify:verify", {
    address: datasetContract.target,
    constructorArguments: [verificationReward],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
