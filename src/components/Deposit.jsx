// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Deposit() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("userProfile"));

//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleDeposit = async (e) => {
//     e.preventDefault();

//     if (amount <= 0) {
//       setMessage("Enter a valid amount");
//       return;
//     }

//     setLoading(true);
//     setMessage("");

//     try {
//       await axios.post("https://localhost:7218/api/Transactions/deposit", {
//         accountNumber: user.accountNumber,
//         balance: Number(amount),
//       });

//       setMessage("✅ Amount deposited successfully");
//       setAmount("");

//       setTimeout(() => navigate("/BankManagement"), 1500);
//     } catch (err) {
//       setMessage("❌ Deposit failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="txn-container">
//       <h2>Deposit Amount</h2>

//       <form onSubmit={handleDeposit} className="txn-form">
//         <label>Account Number</label>
//         <input value={user.accountNumber} disabled />

//         <label>Amount</label>
//         <input
//           type="number"
//           placeholder="Enter amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />

//         <button disabled={loading}>
//           {loading ? "Processing..." : "Deposit"}
//         </button>

//         {message && <p className="message">{message}</p>}
//       </form>
//     </div>
//   );
// }

// export default Deposit;

import React, { useEffect, useState } from "react";
import axios  from "axios";
import { useNavigate } from "react-router-dom";

function Deposit(){
    const navigate = useNavigate()
//    const [user,setUser]=useState({})
const user = JSON.parse(localStorage.getItem("user"))
    const [Amount , SetAmt ]= useState("");
    const [loading, setloading]=useState(false)
    const [err,setErr]=useState("");
    // useEffect(()=>{
    //     setUser(JSON.parse(localStorage.getItem("user")))
    // },[])

    const handleSubmit=(e)=>{
        e.preventDefault()

 
          try{

          
            const fetch=async()=>{

                console.log(user.accountNum+" : " +Number(Amount))
                const res = await axios.post(`https://localhost:7218/api/Transactions/deposit`,{
                    accountNumber:user.accountNum,
                    balance:Number(Amount)
                   
                });

                console.log(res.status);
                 
               
               
            }
            fetch();
        }catch{
            setErr("Deposit Failed")
        }
        finally{
            navigate("/BankManagement")
        }
            
        
       
            
        
    }
    return(
        <>
        <div>
            {/* <h3 style={{color:"red" }}>Logout</h3>
             */}
             <button style={{color:"red", cursor:"pointer", textAlign:"right", alignItems:"right", position:"right" }} onClick={()=>navigate("/BankManagement")}>Back to Main</button>
        </div>
        <div className="txn-container">
            <h2>Deposit</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label>Account Number</label>
                <input
                name="accountNumber"
                value={user.accountNum}
                disabled
                />
                <label>Amount</label>
                <input
                name="amount"
                type="number"
                value={Amount}
                onChange={(e)=>SetAmt(e.target.value)}
                />
                <button type="submit">
                    {loading ? "processing" : "Deposit"}
                </button>
            </form>
            <p>{err}</p>
        </div>
        
        
        </>
    )
}
export default Deposit;