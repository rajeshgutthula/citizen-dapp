import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { MdLogout } from 'react-icons/md';
import '../styles/Header.css';

function Header() {
  const [walletAddress, setWalletAddress] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) setWalletAddress(savedAddress);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const disconnectWallet = () => {
    localStorage.removeItem('walletAddress');
    navigate('/');
  };

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const getShortAddress = (address) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <>
      <nav className="navbar">
        <h1 className="app-title">Citizen Registry DApp</h1>

        {/* Mobile/Tablet: Hamburger Menu */}
        {isMobile ? (
          <button className="menu-toggle" onClick={toggleSidebar}>
            {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        ) : (
          // Desktop: Inline Wallet Info
          walletAddress && (
            <div className="wallet-inline">
              <span className="short-address">{getShortAddress(walletAddress)}</span>
              <button className="disconnect-btn" onClick={disconnectWallet}>
                <MdLogout size={18} />
                <span>Disconnect</span>
              </button>
            </div>
          )
        )}
      </nav>

      {/* Sidebar for Mobile/Tablet */}
      {isMobile && (
        <>
          <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            {walletAddress ? (
              <>
                <p className="short-address">{getShortAddress(walletAddress)}</p>
                <button className="disconnect-btn" onClick={disconnectWallet}>
                  <MdLogout size={18} />
                  <span>Disconnect</span>
                </button>
              </>
            ) : (
              <p>No wallet connected</p>
            )}
          </div>
          {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
        </>
      )}
    </>
  );
}

export default Header;
