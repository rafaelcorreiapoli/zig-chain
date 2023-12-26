import hre from "hardhat";
import merge from "lodash.merge";
import { getAddress } from "viem";

const DEFAULT_VALUES = {
	initialStores: [],
	initialProducts: [],
};

export type Product = {
	id: bigint;
	name: string;
	imageUrl: string;
	price: bigint;
	stockQuantity: number;
};
export type DeployContractsParams = {
	initialStores: Array<{ name: string }>;
};

export const deployContracts = async (
	params?: Partial<DeployContractsParams>,
) => {
	const { initialStores, initialProducts } = merge(DEFAULT_VALUES, params);

	const storesDeploy = hre.viem.deployContract("Stores", [initialStores]);
	const menuDeploy = hre.viem.deployContract("Menu");
	const productTokenDeploy = hre.viem.deployContract("ProductToken");

	const [stores, menu, productToken] = await Promise.all([
		storesDeploy,
		menuDeploy,
		productTokenDeploy,
	]);

	const productCheckout = await hre.viem.deployContract("ProductCheckout", [
		menu.address,
		productToken.address,
	]);

	return { stores, menu, productCheckout, productToken };
};
