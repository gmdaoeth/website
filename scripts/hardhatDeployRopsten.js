const gmDaoMetadataURI = "https://gmdao.ai/metadata/";
const ropstenV1ContractAddress = "0x776a46cCB1629dD11B08fe7fb70e5164e7393f2a";

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
		gmDaoMetadataURI,
		ropstenV1ContractAddress
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