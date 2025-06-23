# 🧾 Citizen Registry DApp

This is a decentralized application (DApp) built with **React** and **Web3.js** that interacts directly with a deployed **Ethereum smart contract** on the **Sepolia testnet**. It allows users to:

- 🔍 View a list of all registered citizens (read from blockchain event logs)
- ➕ Add a new citizen entry (write to the smart contract)
- 📝 View additional notes stored for each citizen

The app uses **MetaMask** for transaction signing and **Alchemy RPC** for querying the blockchain.

---

## 🔧 Features

- 📜 **Read Citizens** from emitted smart contract events (`Citizen(...)`)
- 🧾 **Fetch Notes** per citizen using a view function `getNoteByCitizenId(...)`
- 🧍‍♂️ **Add New Citizen** data on-chain via MetaMask interaction
- 🏗️ Production-ready with chunked log fetching, error handling, and Redux-based state management

---

## 🧠 Tech Stack

| Layer      | Technology                      |
|------------|----------------------------------|
| Frontend   | React + Vite                    |
| Web3       | Web3.js                         |
| State Mgmt | Redux Toolkit                   |
| Blockchain | Ethereum (Sepolia Testnet)      |
| RPC Node   | Alchemy                         |
| Wallet     | MetaMask                        |
| Contract   | Deployed Solidity Smart Contract|

---

## 📦 Project Structure

src/
│
├── components/ # Reusable React UI components
├── pages/ # Page-level components (Dashboard, CreateCitizen)
├── redux/ # Redux slices (citizenSlice.js)
├── utils/ # Blockchain utilities (web3.js, abi.json)
├── App.jsx # Main React component
├── main.jsx # Entry point
├── styles/ # Global styles
└── index.html

Connect MetaMask (ensure Sepolia network is selected)

View existing citizens on the dashboard

Use the "Add Citizen" page to submit a new citizen

Notes are loaded per citizen via the smart contract