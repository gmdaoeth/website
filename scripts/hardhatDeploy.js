async function main() {
	const GmV2Contract = await ethers.getContractFactory('GmV2');
	const gmv2 = await GmV2Contract.deploy();
  
	console.log('DEPLOYED TO: ', gmv2.address);
  }
  
  main()
	.then(() => process.exit(0))
	.catch(error => {
	  console.error(error);
	  process.exit(1);
	});