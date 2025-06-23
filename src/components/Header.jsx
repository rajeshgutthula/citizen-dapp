import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const [walletAddress, setWalletAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }
  }, []);

  const disconnectWallet = () => {
    localStorage.removeItem('walletAddress');
    navigate('/');
  };

  return (
    <header className="header">
      <h1>Citizen Registry DApp</h1>
      {walletAddress && (
        <div className="wallet-info">
          <span>
            Connected: <strong>{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</strong>
          </span>
          <button onClick={disconnectWallet} className="disconnect-btn">
            Disconnect
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
