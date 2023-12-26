// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.22;
import "./Menu.sol";
import "./SharedStructs.sol";

// interface

contract ProductCheckout {
    Menu private menu;

    constructor(address _menuAddress) {
        menu = Menu(_menuAddress);
    }

    // TODO: do we need both? or only _productId
    function buyProduct(uint256 _productId) public payable returns (uint256) {
        SharedStructs.Product memory product = menu.getProductById(_productId);
        // Receive money
        require(msg.value >= product.price, "Not enough value");
        // Check price
        // mint NFT

        return _productId;
    }
}
