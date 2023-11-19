const gmDaoMetadataURI = "https://gmdao.org/metadata/";
const raribleContractAddress = "0xd07dc4262BCDbf85190C01c996b4C06a461d2430";

// Deploy: npx hardhat run --network mainnet scripts/hardhatDeploy.js
// Verify on Etherscan: npx hardhat verify --network mainnet CONTRACT_ADDRESS "constructor_arg_1" "constructor_arg_2" ...

async function main() {
	const [deployer] = await ethers.getSigners();

	console.log("Deploying contracts with the account:", deployer.address);
  
	console.log(
	  "Account balance: ",
	  ethers.utils.formatEther(await deployer.getBalance())
	);

	// We get the contract to deploy
	const GmV2Contract = await ethers.getContractFactory('GmV2');
	const gmv2 = await GmV2Contract.deploy(
		gmDaoMetadataURI, // baseURI
		raribleContractAddress // raribleAddress
	);
  
	console.log('DEPLOYED TO: ', gmv2.address);

	console.log(
		"Account balance after deploy:",
		ethers.utils.formatEther(await deployer.getBalance())
	  );
  }
  
  main()
	.then(() => process.exit(0))
	.catch(error => {
	  console.error(error);
	  process.exit(1);
	});
