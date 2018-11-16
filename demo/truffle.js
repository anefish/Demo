/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = "";
// var mnemonic = "";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/1e858967d64e4862a43012e373948456")
      },
      network_id: 3,
      gas: 4500000,
      gasPrice: 10000000000
    },
    mainnet: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/v3/31458f52344b4724a10dea350a1dfbc5")
      },
      network_id: 1,
      gas: 4500000,
      gasPrice: 10000000000
    }
  }
};
