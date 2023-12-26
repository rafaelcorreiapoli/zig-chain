// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.22;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract ProductToken is ERC721Full {
    private _tokenIds;

    constructor() public ERC721Full("ProductToken", "ZIG") {}

    function mintProductToken(
        address _buyer,
        uint256 _productId
    ) public returns (uint256) {
        _tokenIds++

        uint256 newItemId = _tokenIds
        _mint(buyer, newItemId);

        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
