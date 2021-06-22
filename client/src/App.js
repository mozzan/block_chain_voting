import React, { Component } from "react";
import SimpleStorage from "./contracts/SimpleStorage.json";
import Voting from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";
import ShowOptions from "./ShowOptions";
import sigUtil from 'eth-sig-util';

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, options:
      [{name: 'Hillary Clinton', vote: 0}, { name: 'Donald Trump', vote: 0}]};

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
    const { web3, accounts, contract } = this.state;

    // // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });
    //
    // // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();
    let that = this;
    const options = this.state.options;
    options.map(function(option) {
      contract.methods.totalVotesFor(web3.utils.asciiToHex(option.name)).call().then(function(count) {
        debugger
        let target = options.find(element => element.name == option.name);
        target.vote = count;
        that.setState({ options: options });
      })
    });
  };

  handleVote = async (option) => {
    const { web3, accounts, contract } = this.state;

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
      contract.methods.voteForCandidate(optionName, from, result.result).send({ from: from })
    })
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <ShowOptions vote={this.handleVote} options={this.state.options}></ShowOptions>
    );
  }
}

export default App;
