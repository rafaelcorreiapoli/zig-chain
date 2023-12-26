// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.22;

// Author: @rafaelcorreiapoli
contract Stores {
    struct Coordinate {
        uint256 lat;
        uint256 long;
    }

    struct Store {
        uint256 id;
        string name;
        string logoUrl;
        Coordinate location;
    }

    Store[] public stores;

    constructor(Store[] memory _stores) {
        for (uint i = 0; i < _stores.length; i++) {
            stores.push(_stores[i]);
        }
    }

    function createStore(
        string calldata _name,
        string calldata _logoUrl,
        Coordinate calldata _location
    ) public returns (Store memory) {
        // TODO: Generate id?
        stores.push(Store(1, _name, _logoUrl, _location));

        return stores[stores.length - 1];
    }

    function getStores() public view returns (Store[] memory) {
        return stores;
    }
}
