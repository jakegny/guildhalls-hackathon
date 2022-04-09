// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

enum Status{ BIDDING, PENDING, IN_PROGRESS, HALTED, DISPUTED, COMPLETE, INCOMPLETE, CHANGE_REQUEST }

// TODO: improve this, make it expandable
enum TypeOfWork { ELECTRICAL, PLUMBING, PROGRAMMING, OTHER }

contract WorkContract {

	Status status;
    Status constant initialState = Status.BIDDING;

    string[] TypeOfWorkStr = [
        "ELECTRICAL", "PLUMBING", "PROGRAMMING", "OTHER"
    ];


	TypeOfWork public typeOfWork;

	address client;
	address payable worker;
	string statementOfWork; // TODO: needs lots more thought, probably file. Hashed statement of work?

    address[] biddingAddresses;
	mapping(address => uint) bids;
	uint acceptedBid;

	uint requestedDrawValue;
	bool isDrawApproved;

	modifier onlyClient {
		require(msg.sender == client, "Only the client can perform this operation");
		_;
	}
	modifier onlyWorker {
		require(msg.sender == worker, "Only the accepted worker can perform this operation");
		_;
	}
	modifier eitherClientOrWorker {
		require(msg.sender == client || msg.sender == worker, "Only the worker or the client can perform this operation");
		_;
	}

	constructor (
        address _client,
				TypeOfWork tow
    ) {
        client = _client;
				typeOfWork = tow;
				status = Status.BIDDING;

				// TODO: statementOfWork;
    }

    function getStatementOfWork() public view returns (string memory) {
        return statementOfWork;
    }

   function getStatus() public view returns (Status) {
      return status;
   }

   function getTypeOfWorkStr(uint enumIndex) public view returns (string memory) {
      return TypeOfWorkStr[enumIndex];
   }

	 function getRequestedDrawValue() public view returns (uint) {
      return requestedDrawValue;
   }

	 function assignWorker(address payable _worker) onlyClient public  {
		 worker = _worker;
		 // TODO: event?
	 }

	 // TODO: require a verified worker token?
	 function bidWork(uint bid) public {
         biddingAddresses.push(msg.sender);
		 bids[msg.sender] = bid;
	 }

     function getBiddingAddress() onlyClient public view returns (address[] memory) {
         return biddingAddresses;
     }

     function getBidByAddress(address bidAddress) public view returns (uint) {
         return bids[bidAddress];
     }

	 function acceptBid(address _worker) onlyClient public  {
		 acceptedBid = bids[_worker];
		 status = Status.PENDING;
			// TODO: event
	 }

		function workStarted() onlyClient public payable {
			// ensure client has enough to pay
      // NOTE: client.balance in gwei?
			require(client.balance >= msg.value, "Client does not have enough liquidity to start work.");
			
			// ensure the value being sent matches the bid
      require(msg.value == acceptedBid, "Value does not match bid.");

			status = Status.IN_PROGRESS;

			// TODO: event
		}

		function changeWorkStatus(Status _status) onlyClient public {
			require(status != Status.DISPUTED, "This contract is being disputed.");
			status = _status;
		}

		function contractComplete() onlyWorker public payable {
			require(status == Status.COMPLETE, "Client has not marked work as complete");

			(bool sent, bytes memory data) = msg.sender.call{value: address(this).balance}("");
			require(sent, "Failed to send Ether");

			// TODO: event
		}

		function disputeContract() onlyWorker public {
			status = Status.DISPUTED;
			// TODO: event
		}

		function releaseDispute() onlyWorker public {
			status = Status.IN_PROGRESS; // TODO: might need another type here?
			// TODO: event
		}

		function requestDraw() onlyWorker public payable{
			require(address(this).balance >= msg.value, "Contract does not have sufficient funds for draw.");

			isDrawApproved = false; // Make sure that the worker cant change the draw request.
			requestedDrawValue = msg.value;
		}

		// approveDraw
		function approveDraw() onlyClient public {
			// (bool sent, bytes memory data) = msg.sender.call{value: requestedDrawValue}("");
			// require(sent, "Failed to send Ether");
			// requestedDrawValue = 0;
			isDrawApproved = true;

			// TODO: event
		}

		function rejectDraw() onlyClient public {
			// require(address(this).balance >= msg.value, "Contract does not have sufficient funds for draw.");
			requestedDrawValue = 0;
			isDrawApproved = false;

			// TODO: event
		}

		function withdrawFunds() onlyWorker public payable {
			require(address(this).balance >= msg.value, "Contract does not have sufficient funds for withdraw.");

			(bool sent, bytes memory data) = msg.sender.call{value: requestedDrawValue}("");
			require(sent, "Failed to send Ether");

			requestedDrawValue = 0;
			isDrawApproved = false;

			// TODO: event;
		}
		
		// TODO: changeRequest
		function changeRequest() onlyClient public {
			// changing statementOfWork -

			// TODO: event
		}

		// TODO: need a way for the client to withdraw funds

}
