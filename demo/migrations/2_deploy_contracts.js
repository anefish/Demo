// var ESAToken = artifacts.require("./ESAToken.sol");
//
// module.exports = function(deployer) {
//   deployer.deploy(ESAToken);
// };


// var ESADrop = artifacts.require("./ESADrop.sol");
//
// module.exports = function(deployer) {
//   deployer.deploy(
//     ESADrop,
//     "0x4b46b59e1b2f2383b1dd3fe8a4b12ee8cfe324ef"
//   );
// };


// var ESACrowdsale = artifacts.require("./ESACrowdsale.sol");
//
// module.exports = function(deployer) {
//   deployer.deploy(
//     ESACrowdsale,
//
//     "0x2f5006dbe10a006294d2f7d6129a0d24d180eb6d",
//     "0x6b506123a54f34cd45f8940e0cc68103042cf3f2",
//     "0xd1e2b157f74e9cb3d6ae144b3c9d67c9d7d9721f",
//     "0x759c77229989e65987ba0f5035cc0d9c276bd7a8",
//     "0x8b4b857f74c841b3abc3388c8e800c46689280fa",
//
//     "0x281fb7e0DD8229E8082887C01F6bB5210671a397"
//   );
// };


var Scheme = artifacts.require("./Scheme.sol");

module.exports = function(deployer) {
  deployer.deploy(Scheme, 1123);
};
