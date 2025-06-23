import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Web3 from 'web3';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        toast.error('MetaMask not installed.');
        return;
      }

      // 👇 This forces MetaMask to pop even if already unlocked
      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
      });

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (!accounts || accounts.length === 0) {
        toast.error('No wallet account found.');
        return;
      }

      // Get current network
      const networkId = await window.ethereum.request({ method: 'net_version' });

      if (networkId !== '11155111') {
        toast.error('Please switch MetaMask to Sepolia Testnet.');
        return;
      }

      // ✅ Save connected account in localStorage or state
      localStorage.setItem('walletAddress', accounts[0]);

      toast.success('Wallet connected successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('MetaMask connection error:', error);
      if (error.code === 4001) {
        toast.error('User rejected connection request.');
      } else {
        toast.error('Wallet connection failed.');
      }
    }
  };

  return (
    <Box className="home-container">
      <Typography variant="h4" gutterBottom>
        Welcome to the Citizen Registry DApp
      </Typography>
      <Button variant="contained" color="primary" onClick={connectWallet}>
        Connect Wallet
      </Button>
    </Box>
  );
}

export default Home;
