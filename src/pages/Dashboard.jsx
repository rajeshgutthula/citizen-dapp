import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CitizenList from '../components/CitizenList';
import AddCitizen from '../components/AddCitizen';
import { useDispatch } from 'react-redux';
import { fetchCitizens } from '../redux/citizenSlice';
import '../styles/Dashboard.css';
import Web3 from 'web3';
import { toast } from 'react-toastify';

function Dashboard() {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();

        // if (networkId !== 11155111) {
        //   toast.error('Please switch to Sepolia Testnet in MetaMask.');
        //   return;
        // }

        const accounts = await web3.eth.getAccounts();
        if (!accounts || accounts.length === 0) {
          toast.error('No MetaMask account found. Please connect your wallet.');
          return;
        }

        dispatch(fetchCitizens());
      } catch (error) {
        console.error('Dashboard error:', error);
        toast.error('Failed to initialize Dashboard. Check MetaMask.');
      }
    };

    init();
  }, [dispatch]);

  const toggleForm = () => setShowForm(prev => !prev);

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-toolbar">
        <h2>Citizen Records</h2>
        <button onClick={toggleForm} className="add-btn">
          {showForm ? 'Close Form' : 'Add New Citizen'}
        </button>
      </div>

      {showForm && (
        <div className="add-form-container">
          <AddCitizen onClose={toggleForm} />
        </div>
      )}

      <CitizenList />
    </div>
  );
}

export default Dashboard;
