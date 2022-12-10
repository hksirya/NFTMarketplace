const fs = require('fs');
require('@nomiclabs/hardhat-waffle');

// eslint-disable-next-line no-unused-vars
const privateKey = fs.readFileSync('.secret').toString().trim();

module.exports = {
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/DnkEYyucAxO9XwRY3i25ThSdEaCLBNSu',
      accounts: [
        '233ed33897d693379925092ad8816f93084790fa76801ca7ffb5b4b6997305ed',
      ],
    },
  },
  solidity: '0.8.4',
};
