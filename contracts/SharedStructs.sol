// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.22;

library SharedStructs {
    struct Product {
        bool isEntity;
        uint256 id;
        string name;
        string imageUrl;
        uint256 price;
        uint32 stockQuantity;
    }
}
