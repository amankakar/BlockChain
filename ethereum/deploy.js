const hdWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CompaignFactory.json");

const provider = new hdWalletProvider(
  "van open family document riot cry when velvet release session drop people",
  "https://ropsten.infura.io/v3/07ca66b591474d489461652e9b83a23b"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("attemping to deploy", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("deployed to address", result.options.address);
};
deploy();
