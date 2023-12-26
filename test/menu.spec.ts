import { describe, expect, it } from "bun:test";

import { PRODUCT_1 } from "./fixtures/MOCKS";
import { deployContracts } from "./fixtures/deployContracts";

describe("Menu", () => {
  describe("createProductForStore", () => {
    it("should create product", async () => {
      const { menu } = await deployContracts();

      const product = await menu.write.createProductForStore(PRODUCT_1);

      expect(product).toBeString();
    });
  });

  describe("getProductsByStore", () => {
    it("should list products by storeId when there are products", async () => {
      const { menu } = await deployContracts();

      await menu.write.createProductForStore(PRODUCT_1);

      const products = await menu.read.getProductsByStore([BigInt(1)]);
      expect(products).toHaveLength(1);
      expect(products[0].name).toEqual("Cerveja heineken 600ml");
    });

    it("should list empty array when there are no products", async () => {
      const { menu } = await deployContracts();
      const products = await menu.read.getProductsByStore([BigInt(2)]);
      expect(products).toBeEmpty();
    });
  });

  describe("getProductByStoreIdAndProductId", () => {
    it("should return product when it exists", async () => {
      const { menu } = await deployContracts();

      await menu.write.createProductForStore(PRODUCT_1);

      const product = await menu.read.getProductById([BigInt(1)]);

      expect(product).toBeDefined();
      expect(product.name).toEqual("Cerveja heineken 600ml");
    });

    it("should return null when product does not exist", async () => {
      const { menu } = await deployContracts();
      // TODO: check revert message
      // chai-matchers not working with bun
      // Implement a bun's version based on this:
      // https://github.com/NomicFoundation/hardhat/blob/main/packages/hardhat-chai-matchers/src/internal/reverted/utils.ts
      expect(menu.read.getProductById([BigInt(0)])).rejects.toThrow();
    });
  });
});
