import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "OOtxwJ1E2d0QWoHMFl6-2qh-hMjY0CMq",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

export default alchemy;
