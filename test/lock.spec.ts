import { describe, expect, it } from "bun:test";
import {
	loadFixture,
	time,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import hre from "hardhat";
import { parseGwei } from "viem";

describe("Lock", () => {
	// We define a fixture to reuse the same setup in every test.
	// We use loadFixture to run this setup once, snapshot that state,
	// and reset Hardhat Network to that snapshot in every test.
	async function deployOneYearLockFixture() {
		const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;

		const lockedAmount = parseGwei("1");
		const unlockTime = BigInt((await time.latest()) + ONE_YEAR_IN_SECS);

		// Contracts are deployed using the first signer/account by default
		const [owner, otherAccount] = await hre.viem.getWalletClients();

		const lock = await hre.viem.deployContract("Lock", [unlockTime], {
			value: lockedAmount,
		});

		const publicClient = await hre.viem.getPublicClient();

		return {
			lock,
			unlockTime,
			lockedAmount,
			owner,
			otherAccount,
			publicClient,
		};
	}

	describe("Deployment", () => {
		it("Should set the right unlockTime", async () => {
			const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

			expect(await lock.read.unlockTime()).toEqual(unlockTime);
		});
	});
});
