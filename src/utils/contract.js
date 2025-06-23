import Web3 from 'web3';
import ABI from './abi.json';

const web3 = new Web3(window.ethereum);
const contractAddress = '0xa011799d9467d2b33768fb1a3512f1b468b87e96';

const contract = new web3.eth.Contract(ABI, contractAddress);

export default contract;
export const address = contractAddress;

