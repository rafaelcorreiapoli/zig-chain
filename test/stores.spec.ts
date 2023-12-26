import { describe, expect, it } from "bun:test";
import hre from "hardhat";
import ZigChainModule from "../ignition/modules/ZigChain";
import { deployContracts } from "./fixtures/deployContracts";

const STORE_1 = {
	id: 1,
	name: "Próximo",
	logoUrl: "https://placehold.it/300x300",
	location: {
		lat: BigInt(10),
		long: BigInt(20),
	},
};
const STORE_2 = {
	id: 2,
	name: "Porão",
	logoUrl: "https://placehold.it/300x300",
	location: {
		lat: BigInt(10),
		long: BigInt(20),
	},
};

describe("Stores", () => {
	describe("Create Store", () => {
		it("should create Store when correct paramters are provided", async () => {
			const { stores } = await deployContracts();
			const transaction = await stores.write.createStore([
				"Picles",
				"https://placehold.it/300x300",
				{
					lat: BigInt(10),
					long: BigInt(20),
				},
			]);

			// What to expect here?
			expect(transaction).toBeString();
		});
	});
	describe("Get Stores", () => {
		it("should list empty array when there are no Stores", async () => {
			const { stores } = await deployContracts();

			const storesList = await stores.read.getStores();
			expect(storesList).toBeEmpty();
		});
		it("should list array when there are Stores", async () => {
			const { stores } = await deployContracts({
				initialStores: [STORE_1, STORE_2],
			});
			const storesList = await stores.read.getStores();
			expect(storesList).toHaveLength(2);
			expect(storesList[0].name).toEqual("Próximo");
			expect(storesList[1].name).toEqual("Porão");
		});
	});
});
