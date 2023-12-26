import { parseEther } from "viem";

export const PRODUCT_1: [bigint, string, string, bigint, number] = [
  BigInt(1),
  "Cerveja heineken 600ml",
  "https://placehold.it/300x300",
  parseEther("1"),
  10,
];
export const STORE_1 = {
  id: 1,
  name: "Próximo",
  logoUrl: "https://placehold.it/300x300",
  location: {
    lat: BigInt(10),
    long: BigInt(20),
  },
};
export const STORE_2 = {
  id: 2,
  name: "Porão",
  logoUrl: "https://placehold.it/300x300",
  location: {
    lat: BigInt(10),
    long: BigInt(20),
  },
};
