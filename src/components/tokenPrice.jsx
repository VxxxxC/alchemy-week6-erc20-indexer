import { Utils } from "alchemy-sdk";
import alchemy from "../../alchemy.config.js";

export default async function TokenPrice({ symbol }) {
  const apiKey = alchemy.config.apiKey;

  const options = {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  };
  const price = await fetch(
    `https://api.g.alchemy.com/prices/v1/${apiKey}/tokens/by-symbol?symbols=${symbol}`,
    options,
  );
  console.log("price : ", price);

  return <></>;
}
