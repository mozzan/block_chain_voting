pragma solidity ^0.4.17;
contract Rating {
mapping (bytes32 => uint8) public ratingsReceived;
bytes32[] public restaurantList;
// 1 - 合約初始化
function Rating(bytes32[] restaurantNames) public {
    restaurantList = restaurantNames;
  }
// 2 - 回傳餐廳的投票數
function totalVotesFor(bytes32 restaurant) view public returns (uint8) {
    return ratingsReceived[restaurant];
  }
// 3 - 投票，將目前投票數+1
function voteForRestaurant(bytes32 restaurant) public {
    ratingsReceived[restaurant] += 1;
  }
}