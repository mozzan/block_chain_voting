pragma solidity ^0.4.18;
import "./ECRecovery.sol";

contract Voting {
  using ECRecovery for bytes32;

  mapping (bytes32 => uint8) public votesReceived;

  mapping(bytes32 => bytes32) public candidateHash;

  mapping(address => bool) public voterStatus;

  mapping(bytes32 => bool) public validCandidates;

  bytes32 public proposal;

  mapping(bytes32 => bytes32[]) public proposalOptions;

  function Voting() public {
  }

  function addProposal(bytes32 _proposal, bytes32[] _options) public {
    proposal = _proposal;
    proposalOptions[proposal] = _options;

    for(uint i = 0; i < _options.length; i++) {
      validCandidates[_options[i]] = true;
      candidateHash[_options[i]] = _options[i];
    }
  }

  function getProposal() public returns (bytes32) {
    return proposal;
  }

  function getProposalOptions() public returns (bytes32[]) {
    return proposalOptions[proposal];
  }

  function totalVotesFor(bytes32 _candidate) view public returns (uint8) {
    require(validCandidates[_candidate]);
    return votesReceived[_candidate];
  }

  function voteForCandidate(bytes32 _candidate, address _voter, bytes _signedMessage) public {
    require(!voterStatus[_voter]);

    bytes32 voteHash = candidateHash[_candidate];
    address recoveredAddress = voteHash.recover(_signedMessage);

    require(recoveredAddress == _voter);
    require(validCandidates[_candidate]);

    votesReceived[_candidate] += 1;
    voterStatus[_voter] = true;
  }
}

