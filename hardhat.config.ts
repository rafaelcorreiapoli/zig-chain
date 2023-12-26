import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-ignition-viem";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-verify";
import "@nomicfoundation/hardhat-viem";
import { HardhatUserConfig } from "hardhat/config";

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

if (!INFURA_API_KEY) {
	throw new Error("INFURA_API_KEY not defined");
}
if (!SEPOLIA_PRIVATE_KEY) {
	throw new Error("SEPOLIA_PRIVATE_KEY not defined");
}
if (!ETHERSCAN_API_KEY) {
	throw new Error("ETHERSCAN_API_KEY not defined");
}

const config: HardhatUserConfig = {
	solidity: "0.8.22",
	etherscan: {
		apiKey: ETHERSCAN_API_KEY,
	},
	sourcify: {
		enabled: true,
	},
	networks: {
		sepolia: {
			url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
			accounts: [SEPOLIA_PRIVATE_KEY],
		},
	},
};

export default config;
