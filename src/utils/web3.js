import Web3 from 'web3';
import ABI from './abi.json';

const ALCHEMY_URL = import.meta.env.VITE_ALCHEMY_RPC_URL;
const CONTRACT_ADDRESS = '0xa011799d9467d2b33768fb1a3512f1b468b87e96';

export const web3 = new Web3(new Web3.providers.HttpProvider(ALCHEMY_URL));
export const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

// Check if MetaMask is installed
export const isMetaMaskInstalled = typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';

// Conditionally export MetaMask web3 and contract
export const web3MetaMask = isMetaMaskInstalled ? new Web3(window.ethereum) : null;
export const contractWithMetaMask = isMetaMaskInstalled
  ? new web3MetaMask.eth.Contract(ABI, CONTRACT_ADDRESS)
  : null;

// Prompt user to install MetaMask
export const promptMetaMaskInstall = () => {
  if (!isMetaMaskInstalled) {
    alert('🦊 MetaMask is not installed. Please install MetaMask from https://metamask.io to use this feature.');
  }
};
