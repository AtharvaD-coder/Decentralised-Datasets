// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract DatasetContract{

    struct Dataset{
        string title;
        string description;
        string ipfshash;
        address owner;
        uint256 upvotes;
        uint256 downvotes;
        bool verified;
        address verifier;
        mapping(address => bool) hasVoted;
    }

    mapping (uint256 => Dataset) public datasets;
    uint256 public datasetCount;
    uint256 public verificationReward;

    event uploadedDataset(uint256 indexed id, address indexed owner, string ipfsHash, string description, string title, uint256 upvotes, uint256 downvotes, bool verified);
    event DatasetUpvoted(uint256 indexed id, address indexed voter);
    event DatasetDownvoted(uint256 indexed id, address indexed voter);
    event DatasetVerified(uint256 indexed datasetId, address indexed verifier, uint256 rewardAmount);

    constructor(uint256 _verificationReward) payable {
        require(msg.value >= _verificationReward, "Initial funding must be greater than or equal to the verification reward");
        verificationReward = _verificationReward;
    }

    function uploadDataset(string memory _title, string memory _description, string memory _ipfshash) public {

        uint256 datasetId = datasetCount++;

        Dataset storage newDataset = datasets[datasetId];

        newDataset.owner = msg.sender;
        newDataset.title = _title;
        newDataset.description = _description;
        newDataset.ipfshash = _ipfshash;
        newDataset.upvotes = 0;
        newDataset.downvotes = 0;
        newDataset.verified = false;

        emit uploadedDataset(datasetId, msg.sender, _ipfshash, _description, _title, newDataset.upvotes, newDataset.downvotes, newDataset.verified);

    }

    function upvote(uint256 _datasetId ) public {
        
        Dataset storage dataset = datasets[_datasetId];

        require(!dataset.hasVoted[msg.sender], "You have already voted on this dataset!");

        dataset.hasVoted[msg.sender] = true;
        dataset.upvotes++;

        emit DatasetUpvoted(_datasetId, msg.sender);
    }

        function downvote(uint256 _datasetId ) public {
        
        Dataset storage dataset = datasets[_datasetId];

        require(!dataset.hasVoted[msg.sender], "You have already voted on this dataset!");

        dataset.hasVoted[msg.sender] = true;
        dataset.downvotes++;

        emit DatasetDownvoted(_datasetId, msg.sender);
    }

    function verifyDataset(uint256 _datasetId) public payable {
        
        Dataset storage dataset = datasets[_datasetId];

        require(!dataset.verified, "The dataset is already verified!");
        require(dataset.verifier != msg.sender, "You have already verified this dataset!");

        dataset.verified = true;
        dataset.verifier = msg.sender;

        require(address(this).balance >= verificationReward, "Contract doesn't have reward funds!");

        payable(msg.sender).transfer(verificationReward);

        emit DatasetVerified(_datasetId, msg.sender, verificationReward);

    }

    function fundContract() external payable {}

    function getBalance() public view returns (uint256){
        return address(this).balance;
    }

}