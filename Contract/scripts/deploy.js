import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Vote = await hre.ethers.getContractFactory("Vote");
  const vote = await Vote.deploy();
  await vote.waitForDeployment();

  console.log("Vote contract deployed to:", await vote.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
