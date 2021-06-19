var Rating = artifacts.require("./Rating.sol");

module.exports = function(deployer) {
  deployer.deploy(Rating, ['皇樓中餐廳', '星亞自助餐', 'Casa義大利餐廳'])
    // Option 2) Console log the address:
    .then(() => console.log(Rating.address))
    // Option 3) Retrieve the contract instance and get the address from that:
    .then(() => Rating.deployed())
    .then(_instance => console.log(_instance.address));
};
