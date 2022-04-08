// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Base64.sol";

// Off Chain Attributes

// https://dev.to/rounakbanik/writing-an-nft-collectible-smart-contract-2nh8

// https://docs.openzeppelin.com/contracts/4.x/erc721
contract Guild is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

		mapping(uint256 => Attr) public guildInfo;

    struct Attr {
        string profession;
				// TODO: what else should be here?
    }

    constructor() ERC721("Guild", "GUILD") {}

		function mint(
        address to,
        string memory _profession
				) 
    public  { // TODO: limit to contract creator?
				_tokenIds.increment();
				uint256 tokenId = _tokenIds.current();
        _safeMint(to, tokenId);
        guildInfo[tokenId] = Attr(_profession);
    }

		function tokenURI(uint256 tokenId) override(ERC721) public view returns (string memory) {
        string memory json = Base64.encode(
            bytes(string(
							abi.encodePacked(
                    '{"profession": "', guildInfo[tokenId].profession, '"}'
                )
            ))
        );
        return string(abi.encodePacked('data:application/json;base64,', json));
    }
}