import Web3 from "web3";

const COW_PROTOCOL_ADDRESS = "0x9008d19f58aabd9ed0d60971565aa8510560ab41";

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://mainnet.infura.io/v3/6cae6c56511b4bfa82afea21b80bd640"
  )
);

const block = await web3.eth.getBlock(16482894);
const transactions = block.transactions;

for (var i = 0; i < transactions.length; i++) {
  const transactionString = transactions[i];
  const transaction = await web3.eth.getTransaction(transactionString);
  if (transaction.to?.toLowerCase() === COW_PROTOCOL_ADDRESS) {
    console.log(transaction.transactionIndex);
  }
}
