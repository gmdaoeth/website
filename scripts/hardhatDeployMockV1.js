async function main() {
	const [deployer] = await ethers.getSigners();

	console.log("Deploying contracts with the account:", deployer.address);
  
	console.log(
	  "Account balance:",
	  ethers.utils.formatEther(await deployer.getBalance())
	);

	const mintToAddress = "0x5AcD7caC9970180E4e044F53C470cB570c8BC720";

	// We get the contract to deploy
	const GmV1Contract = await ethers.getContractFactory('GmV1Mock');
	const gmv1 = await GmV1Contract.deploy(mintToAddress);
  
	console.log('DEPLOYED TO: ', gmv1.address);

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