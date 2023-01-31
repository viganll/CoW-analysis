import { BigNumber, ethers, providers, utils } from "ethers";
import { cowProtocolService } from "./CowProtocolService";

const INFURA_RPC_URL =
  "https://mainnet.infura.io/v3/6cae6c56511b4bfa82afea21b80bd640";
const COW_PROTOCOL_ADDRESS = "0x9008d19f58aabd9ed0d60971565aa8510560ab41";

const provider = new providers.StaticJsonRpcProvider(INFURA_RPC_URL);

async function main() {
  console.log("Entrypoint...");

  provider.on(
    {
      address: COW_PROTOCOL_ADDRESS,
      topics: [
        utils.id(
          "Trade(address,address,address,uint256,uint256,uint256,bytes)"
        ),
      ],
    },
    async (log, event) => {
      const [
        sellToken,
        buyToken,
        sellAmountHex,
        buyAmountHex,
        feeAmountHex,
        orderUid,
      ] = ethers.utils.defaultAbiCoder.decode(
        ["address", "address", "uint256", "uint256", "uint256", "bytes"],
        log.data
      );

      console.log(
        `Sell token: ${sellToken}\n`,
        `Buy token: ${buyToken}\n`,
        `Sell amount: ${sellAmountHex.toString()}\n`,
        `Buy amount: ${buyAmountHex.toString()}\n`,
        `Fee amount: ${feeAmountHex.toString()}\n`,
        `Buy + fee: ${buyAmountHex.add(feeAmountHex).toString()}\n`,
        `Order id: ${orderUid}\n`,
        `Transaction hash: ${log.transactionHash}\n`
      );

      try {
        const order = await cowProtocolService.getOrder(orderUid);
        const buyAmount = BigNumber.from(order.data.buyAmount);

        console.log("Surplus:", buyAmountHex.sub(buyAmount).toString());
        console.log(order.data);
      } catch (err) {
        console.error(err);
      }
    }
  );
}

main();
