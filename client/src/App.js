import React, { Component } from "react";
import SimpleStorage from "./contracts/SimpleStorage.json";
import Voting from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";
import ShowOptions from "./ShowOptions";
import ProposalPage from "./ProposalPage";
import sigUtil from 'eth-sig-util';

import "./App.css";

class App extends Component {
  // state = { storageValue: 0, web3: null, accounts: null, contract: null, options:
  //     [{name: 'Hillary Clinton', vote: 0}, { name: 'Donald Trump', vote: 0}]};

  state = { storageValue: 0, web3: null, accounts: null, contract: null};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Voting.networks[networkId];
      const instance = new web3.eth.Contract(
        Voting.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.init);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  init = async () => {

  };

  handleVote = async (option) => {
    const { web3, accounts, contract } = this.state;
    const that = this;

    let msgParams = [
      {
        type: 'string',
        name: 'Message',
        value: 'Vote for ' + option
      }
    ]
    console.log(sigUtil.typedSignatureHash(msgParams));
    const from = accounts[0]
    const params = [msgParams, from]
    const method = 'eth_signTypedData'

    web3.currentProvider.sendAsync({
      method,
      params,
      from,
    }, function (err, result) {
      if (err) return console.dir(err)
      if (result.error) {
        alert(result.error.message)
      }
      const optionName = web3.utils.asciiToHex(option);
      contract.methods.voteForCandidate(optionName, from, result.result).send({ from: from }).then(function() {
        that.setState( { title: that.state.title + ' -' });
      })
    })
  }

  submit = async (proposalName, options) => {
    const { web3, accounts, contract } = this.state;
    const that = this;

    const mOptions = options.map(function(option) {
      return web3.utils.asciiToHex(option);
    })

    contract.methods.addProposal(web3.utils.asciiToHex(proposalName), mOptions).send({ from: accounts[0] }).then(function() {
      const mOptions = options.map(function(option) {
        return { name: option, vote: 0}
      })
      that.setState( { title: proposalName, options: mOptions } )
    })
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    if(this.state.options) {
      return (
        <ShowOptions title={this.state.title} vote={this.handleVote} options={this.state.options} web3={this.state.web3} contract={this.state.contract}></ShowOptions>
      )
    } else {
      return (
        <ProposalPage submit={this.submit}></ProposalPage>
      )
    }
  }
}

export default App;
