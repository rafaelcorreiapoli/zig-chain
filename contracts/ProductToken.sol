// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {ERC721} from "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Base {
    constructor(string memory _name) {}
}

contract ProductToken is ERC721("ProductToken", "ZIG") {
    uint256 private _nextTokenId = 0;
    mapping(uint256 => uint256) tokenIdToProductId;

    function mintProductToken(
        address _buyer,
        uint256 _productId
    ) public returns (uint256) {
        _nextTokenId++;
        uint256 tokenId = _nextTokenId;
        _mint(_buyer, tokenId);

        tokenIdToProductId[tokenId] = _productId;
        return tokenId;
    }

    function getOwner(uint256 _tokenId) public view returns (address) {
        return ownerOf(_tokenId);
    }
}
