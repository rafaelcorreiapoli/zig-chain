import { describe, expect, it } from "bun:test";
import hre from "hardhat";
import { getAddress } from "viem";
import { PRODUCT_1 } from "./fixtures/PRODUCT_1";
import { deployContracts } from "./fixtures/deployContracts";

describe("ProductToken", () => {
	describe("mintProductToken", () => {
		it("should mint the token to the buyer", async () => {
			const { productToken, menu } = await deployContracts();
			const [buyer] = await hre.viem.getWalletClients();

			await menu.write.createProductForStore(PRODUCT_1);

			const tx = await productToken.write.mintProductToken([
				buyer.account.address,
				PRODUCT_1[0],
			]);

			const publicClient = await hre.viem.getPublicClient();
			await publicClient.waitForTransactionReceipt({
				hash: tx,
			});

			const ownerOf = await productToken.read.getOwner([BigInt(1)]);
			expect(ownerOf).toEqual(getAddress(buyer.account.address));
		});
	});
});
