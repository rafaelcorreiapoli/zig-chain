import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-ignition-viem";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-verify";
import "@nomicfoundation/hardhat-viem";
import "@openzeppelin/hardhat-upgrades";

import { HardhatUserConfig } from "hardhat/config";

const INFURA_API_KEY = "a478db5dec5b40868c87f0a86a8ed7c0";
const SEPOLIA_PRIVATE_KEY =
	"ee6952ea225f3e2e70eabf43c3bde8c19147ec64c504896bed0c726c35337352";

const config: HardhatUserConfig = {
	solidity: "0.8.19",
	etherscan: {
		apiKey: "1DZHZMKCW5T5X4EU4PMP9V3HX9NJFC441W",
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
