// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./WorkContract.sol";

contract WorkContractFactory {

	mapping(address => address[]) workContracts;
		
    WorkContract[] openContracts;

    function getContractsForClient(address _user) 
        public
        view
        returns(address[] memory)
    {
        return workContracts[_user];
    }

    // TODO: parameters
    function newContract(TypeOfWork typeOfWork)
        payable
        public
        returns(address)
    {
        WorkContract workContract = new WorkContract(msg.sender, typeOfWork);
        workContracts[msg.sender].push(address(workContract));
				openContracts.push(workContract);

				emit ContractCreated(address(workContract));
				return address(workContract);
    }


	 function getOpenContracts() public view returns(WorkContract[] memory) {
			return openContracts;
	 }

	 function delistContract(WorkContract workContract, address payable _workerAddress) public {
		 	// workContract.assignWorker(_workerAddress); // TODO: what is a safe way to do this?

			// remove from open contracts
			for(uint i = 0; i < openContracts.length; i++) {
				if(address(openContracts[i]) == address(workContract)) { // is this safe?
					delete openContracts[i];
				}
			}

			// TODO: event?
	 }


    event ContractCreated(address wallet);

}