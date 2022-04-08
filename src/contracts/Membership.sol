// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Base64.sol";

// TODO
// https://github.com/radek1st/time-locked-wallets/blob/master/contracts/TimeLockedWallet.sol

// ON CHAIN Attributes

// https://gist.github.com/Chmarusso/045ee79fa9a1fae55928a613044c9067
contract Membership is ERC721, ERC721Enumerable, Ownable {

		mapping(uint256 => Attr) public attributes;

    struct Attr {
        string verifiedBy;
        string memberOf;
				string role; // title?
				bool inGoodStanding;
				string certifications;
    }

		constructor() ERC721("Membership", "MOG") {}

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721) {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function mint(
        address to, 
        uint256 tokenId, 
        string memory _verifiedBy, 
        string memory _memberOf, 
        string memory _role, 
        bool _inGoodStanding, 
        string memory _certifications
				) 
    public onlyOwner { // TODO: onlyVerifier?
        _safeMint(to, tokenId);
        attributes[tokenId] = Attr(_verifiedBy, _memberOf, _role, _inGoodStanding, _certifications);
    } 

    function tokenURI(uint256 tokenId) override(ERC721) public view returns (string memory) {
        string memory json = Base64.encode(
            bytes(string(
							abi.encodePacked(
                    '{"verifiedBy": "', attributes[tokenId].verifiedBy, '",',
										'"memberOf": "', attributes[tokenId].memberOf, '",',
										'"role": "', attributes[tokenId].role, '",',
										'"inGoodStanding": "', attributes[tokenId].inGoodStanding, '",',
										'"certifications": "', attributes[tokenId].certifications, '"',
										'}'
                )
            ))
        );
        return string(abi.encodePacked('data:application/json;base64,', json));
    }

		// TODO: Update Attributes

		// TODO: get tokenIds with specifiedAttributes
}

