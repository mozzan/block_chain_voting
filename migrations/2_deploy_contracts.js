var Voting = artifacts.require("./Voting.sol");
var ECRecovery = artifacts.require("./ECRecovery.sol");

const sigUtil = require("../client/node_modules/eth-sig-util")

var options = ['Hillary Clinton', 'Donald Trump']

const hashMap = options.map(function(option) {
  sigUtil.typedSignatureHash([{ type: 'string', name: 'Message', value: `Vote for ${option}`}])
});
module.exports = function(deployer) {
  deployer.deploy(ECRecovery);
  deployer.link(ECRecovery, Voting);
  deployer.deploy(Voting, options, hashMap);
};

// var SimpleStorage = artifacts.require("./SimpleStorage.sol");
//
// module.exports = function(deployer) {
//   deployer.deploy(SimpleStorage)
//     // Option 2) Console log the address:
//     .then(() => console.log(SimpleStorage.address))
//     // Option 3) Retrieve the contract instance and get the address from that:
//     .then(() => SimpleStorage.deployed())
//     .then(_instance => console.log(_instance.address));
// };
