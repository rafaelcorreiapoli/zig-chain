import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { getAddress } from "viem";

export const ZigChainModule = buildModule("ZigChain", (m) => {
	const initialStores = m.getParameter("initialStores", []);

	const stores = m.contract("Stores", [initialStores]);
	const menu = m.contract("Menu");

	const productCheckout = m.contract("ProductCheckout", [
		getAddress("0x5FbDB2315678afecb367f032d93F642f64180aa3"),
	]);

	return { stores, menu, productCheckout };
});

export default ZigChainModule;
