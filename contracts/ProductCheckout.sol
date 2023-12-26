// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Menu.sol";
import "./ProductToken.sol";
import "./SharedStructs.sol";

// interface

contract ProductCheckout {
    Menu private menu;
    ProductToken private productToken;

    constructor(address _menuAddress, address _productTokenAddress) {
        menu = Menu(_menuAddress);
        productToken = ProductToken(_productTokenAddress);
    }

    // Receive money
    // Check price
    // Check stock quantity
    // Mint NFT

    function buyProduct(uint256 _productId) public payable returns (uint256) {
        SharedStructs.Product memory product = menu.getProductById(_productId);
        require(msg.value >= product.price, "Not enough value");
        productToken.mintProductToken(msg.sender, _productId);

        return _productId;
    }
}
