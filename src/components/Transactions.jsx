import React, { useEffect, useState } from "react";
import axios from "axios";

function MiniTransactions() {
  const [count, setCount] = useState(5);
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sno,setSno]=useState(0);

  
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
   

    if (storedProfile) {
      setUser(storedProfile);
    }
  }, []);

  // Fetch mini statement
  useEffect(() => {
    if (!user?.accountNumber) return;

    const fetchMiniStatement = async () => {
      try {
        const res = await axios.get(
          "https://localhost:7218/api/Transactions/mini-statement",
          {
            params: {
              AccountNum: user.accountNumber,
              Count: count
            }
          }
        );
        setTransactions(res.data);
      } catch (error) {
        console.error("Failed to fetch mini statement", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMiniStatement();
  }, [user?.accountNumber, count]);

  if (!user) return <p className="loading">Loading user...</p>;

  return (
    <div className="mini-container">
      <h2>Mini Statement</h2>

    
      <div className="mini-user-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Account Number:</strong> {user.accountNumber}</p>
        <p><strong>Account Type:</strong> {user.accountType}</p>
      </div>

    +
      <div className="mini-controls">
        <label>Show last</label>
        <input
          type="number"
          min="1"
          max="20"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <span>transactions</span>
      </div>

  
      {loading ? (
        <p className="loading">Loading transactions...</p>
      ) : (
        <div className="mini-table-wrapper">
          <table className="mini-table">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Transaction ID</th>
                <th>Account No</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="5">No transactions found</td>
                </tr>
              ) : (
                transactions.map((t,index) => ( 
                 
                  <tr key={t.id}>
                    <td>{index+1}</td>
                    <td>{t.id}</td>
                    <td>{t.accountNumber}</td>
                    <td className={t.transactionType === "Deposit" ? "credit" : "debit"} >
                      ₹{t.amount}
                    </td>
                    <td>{t.transactionType}</td>
                    <td>{new Date(t.transactionDate).toLocaleString()}</td>
                  </tr>
                  
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MiniTransactions;
