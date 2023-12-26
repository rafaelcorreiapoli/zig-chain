import hre from "hardhat";
import { getAddress, parseEther } from "viem";
import { PRODUCT_1 } from "./fixtures/PRODUCT_1";
import { deployContracts } from "./fixtures/deployContracts";

import { describe, expect, it } from "bun:test";

describe("ProductCheckout", () => {
	describe("buyProduct", () => {
		it("should buy existing product with enough ETH", async () => {
			const { menu, productCheckout, productToken } = await deployContracts();
			const publicClient = await hre.viem.getPublicClient();
			const product = await menu.write.createProductForStore(PRODUCT_1);

			const testClient = await hre.viem.getTestClient();

			const response = await productCheckout.write.buyProduct([BigInt(1)], {
				value: parseEther("1.0"),
			});
			await publicClient.waitForTransactionReceipt({
				hash: response,
			});

			expect(response).toBeString();

			const productCheckoutBalance = await publicClient.getBalance({
				address: productCheckout.address,
			});

			const [buyer] = await hre.viem.getWalletClients();

			testClient.impersonateAccount({
				address: buyer.account.address,
			});
			expect(productCheckoutBalance).toEqual(parseEther("1.0"));
			expect(
				await publicClient.getBalance({
					address: buyer.account.address,
				}),
			).toBeLessThan(parseEther("9999.0"));

			expect(await productToken.read.getOwner([BigInt(1)])).toEqual(
				getAddress(buyer.account.address),
			);
		});

		it("should revert with 'Not enough balance' when buying product with not enough ETH", async () => {
			const { menu, productCheckout } = await deployContracts();

			const product = await menu.write.createProductForStore(PRODUCT_1);

			expect(
				productCheckout.write.buyProduct([BigInt(1)], {
					value: parseEther("0.5"),
				}),
			).rejects.toThrow();
		});
	});
});
