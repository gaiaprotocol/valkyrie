// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "./ERC721GEnumerable.sol";

contract Valkyrie is ERC721GEnumerable {
    constructor() ERC721GEnumerable("Gaia Protocol Valkyrie", "VKR", "https://backend.gaiaprotocol.com/metadata/valkyrie/") {}
}
