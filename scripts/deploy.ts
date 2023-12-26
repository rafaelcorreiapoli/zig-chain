import hre from "hardhat";
import { formatEther, getAddress, parseEther } from "viem";

async function main() {
	// const initialStores = m.getParameter("initialStores", []);
	const initialStores = [] as Array<{ name: string }>;

	const stores = hre.viem.deployContract("Stores", [initialStores]);
	const menu = hre.viem.deployContract("Menu");

	const [_, deployedMenu] = await Promise.all([stores, menu]);

	const productCheckout = await hre.viem.deployContract("ProductCheckout", [
		getAddress(deployedMenu.address),
	]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
