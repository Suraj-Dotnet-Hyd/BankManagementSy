import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BankManagement() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  // console.log(user.accountNum)

  useEffect(() => {
    if (!user?.userId) return;

    const fetchAccount = async () => {
      try {
        const res = await axios.get(
          `https://localhost:7218/api/Users/GetById${user.userId}`
        );
        localStorage.setItem("userProfile", JSON.stringify(res.data));
        setAccount(res.data);
      } catch (err) {
        console.error("Failed to load account", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [user?.userId]);

  const accountNumber = JSON.parse(localStorage.getItem("user")).accountNum
  // console.log(accountNumber)

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) return <div className="loading">Loading Dashboard...</div>;

  return (
    <>
     
      <header className="navbar">
        <div className="nav-left">
          <span className="logo">BMS</span>
        </div>

        <div className="nav-right">
          <span onClick={() => navigate("/BankManagement")}>Dashboard</span>
          <span onClick={() => navigate("/BankManagement/Transaction")}>
            Transactions
          </span>
          <span onClick={() => navigate("/BankManagement/Profile")}>Profile</span>
          <span className="logout" onClick={handleLogout}>
            Logout
          </span>
        </div>
      </header>

     
      <main className="dashboard">
        <h1 className="welcome-text">
          Welcome, <span>{user?.name}</span>
        </h1>

       
        <section className="account-card">
          <h3>Account Summary</h3>

          <div className="account-info">
            <p><strong>Name:</strong> {account?.name}</p>
            <p><strong>Account No:</strong> {account?.accountNumber}</p>
          </div>

          <div className="balance">
            ₹ {account?.balance}
          </div>
        </section>

   
        <section className="actions">
          <button onClick={() => navigate("/BankManagement/deposit")}>Deposit</button>
          <button onClick={() => navigate("/BankManagement/withdraw")}>Withdraw</button>
          <button onClick={() => navigate("/BankManagement/Transaction")}>Mini Statement</button>
          {/* <button onClick={() => navigate("/BankManagement/Transaction")}>All Transactions</button> */}
        </section>
      </main>
    </>
  );
}

export default BankManagement;
