// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.22;
import "./SharedStructs.sol";
import "hardhat/console.sol";

// Author: @rafaelcorreiapoli
contract Menu {
    SharedStructs.Product[] public stores;

    mapping(uint256 => SharedStructs.Product) public products;
    mapping(uint256 => uint256[]) public productIdsByStoreId;

    function createProductForStore(
        uint256 _storeId,
        string calldata _name,
        string calldata _imageUrl,
        uint256 _price,
        uint32 _stockQuantity
    ) public returns (SharedStructs.Product memory) {
        // TODO: Check if store exists?
        // TODO: Generate id?
        uint256 productId = 1;
        products[productId] = SharedStructs.Product(
            true,
            productId,
            _name,
            _imageUrl,
            _price,
            _stockQuantity
        );

        productIdsByStoreId[_storeId].push(productId);

        return products[productId];
    }

    function getProductsByStore(
        uint256 _storeId
    ) public view returns (SharedStructs.Product[] memory retProductsByStore) {
        SharedStructs.Product[]
            memory productsByStore = new SharedStructs.Product[](
                productIdsByStoreId[_storeId].length
            );

        for (uint i = 0; i < productIdsByStoreId[_storeId].length; i++) {
            SharedStructs.Product memory product = products[
                productIdsByStoreId[_storeId][i]
            ];
            productsByStore[i] = product;
        }
        return productsByStore;
    }

    // function x(
    //     uint256 _storeId,
    //     uint256 _productId
    // ) private view returns (SharedStructs.Product memory product) {
    //     for (uint i = 0; i < productsByStore[_storeId].length; i++) {
    //         if (productsByStore[_storeId][i].id == _productId) {
    //             return productsByStore[_storeId][i];
    //         }
    //     }
    //     revert("Not found");
    // }

    function getProductById(
        uint256 _productId
    ) public view returns (SharedStructs.Product memory product) {
        if (products[_productId].isEntity == false) {
            revert("Product not found");
        }
        return products[_productId];
    }
}
