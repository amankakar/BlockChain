import web3 from "./web3";
import CampiagnFactory from "./build/CompaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampiagnFactory.interface),
  "0x0D973E5FFB1fF9b201Ab4E41bcfaD87Aa7b5FeF6"
);
export default instance;
