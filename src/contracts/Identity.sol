// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721Connector.sol';

contract Identity is ERC721Connector {

    // array to store our nfts
    address [] public identities;

    mapping(address => bool) _identitiesExists;

    function mint(address _identityAddress, string memory identityType, string memory organizationType) public {

        require(!_identitiesExists[_identityAddress],
        'Error - identity already exists');
        // this is deprecated - uint _id = KryptoBirdz.push(_identityAddress);
        identities.push(_identityAddress);
        uint _id = identities.length - 1; // ???

				address issuedBy = msg.sender;

        // .push no longer returns the length but a ref to the added element
        _mint(_identityAddress, _id, identityType, organizationType, issuedBy);

        _identitiesExists[_identityAddress] = true;

    }

		// GHT - Guild Hall Token???
    constructor() ERC721Connector('GuildHall','GHT') 
 {}

}


