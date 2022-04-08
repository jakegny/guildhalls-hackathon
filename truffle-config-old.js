const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonicDev =
  "approve board satisfy slender emotion acid canal object number cloud brass achieve"; // Taken from Ganache UI on start up
// "age cave twist peasant cram secret system iron parade grief august uncle";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    // development: {
    //   provider: () =>
    //     new HDWalletProvider(mnemonicDev, "http://127.0.0.1:7545"),
    //     network_id: "*" // Any network (default: none)
    // },
    ganache: {
      provider: () =>
        new HDWalletProvider(mnemonicDev, "http://127.0.0.1:8545"),
      network_id: "*",
    },

    // Another network with more advanced options...
    advanced: {
      // port: 8777,             // Custom port
      // network_id: 1342,       // Custom network
      // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
      // from: <address>,        // Account to send txs from (default: accounts[0])
      // websockets: true        // Enable EventEmitter interface for web3 (default: false)
    },

    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://ropsten.infura.io/v3/<Your key here>`,
        ),
      network_id: 3, // Ropsten's id
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 1000, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },

    // Useful for private networks
    private: {
      // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
      // network_id: 2111,   // This network is yours, in the cloud.
      // production: true    // Treats this network as if it was a public net. (default: false)
    },
    harmony: {
      provider: () => {
        return new HDWalletProvider({
          privateKeys: [mnemonic],
          providerOrUrl: "https://api.s0.b.hmny.io",
        });
      },
      network_id: 1666700000,
    },
    // 0x6c6CC587D296F32510211B1ceC57b6FCabdC8028
    // dec9f1d33eac382e797291fc963207f3b51e02adb9a9ab6fa23fe065f551b5fc
  },

  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis",

  compilers: {
    solc: {
      version: "^0.8.0",
      optimizer: {
        enabled: "true",
        runs: 200,
      },
    },
  },
};
