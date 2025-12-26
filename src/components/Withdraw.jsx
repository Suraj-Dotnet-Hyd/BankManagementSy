import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Withdraw() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userProfile"));

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleWithdraw = async (e) => {
    e.preventDefault();

    if (amount <= 0) {
      setMessage("Enter a valid amount");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await axios.post("https://localhost:7218/api/Transactions/withdraw", {
    
        accountNumber: user.accountNumber,
        balance: Number(amount)
       
       
      });

      setMessage("Amount withdrawn successfully");
      setAmount("");

      setTimeout(() => navigate("/BankManagement"), 1500);
    } catch (err) {
      setMessage("Insufficient balance or error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="txn-container">
      <h2>Withdraw Amount</h2>

      <form onSubmit={handleWithdraw} className="txn-form">
        <label>Account Number</label>
        <input value={user.accountNumber} disabled />

        <label>Amount</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type="submit">
          {/* {loading ? "Processing..." : "Withdraw"} */}
          withdraw
        </button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default Withdraw;




// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import {useNavigate} from "react-router-dom"


// function Withdraw(){
//  const navigate = useNavigate();
//   const [curBal, SetBal] = useState(0);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [msg,setmsg]=useState();
// // console.log(user.userId)
//   const handleSubmit=async(e)=>{
//     e.preventDefault();
// console.log("handleSubmit")
  


//     const fetchUser = async ()=>
//     {
//       console.log(user.userId)
//       const res = await axios.get(`https://localhost:7218/api/Users/GetById${user.userId}`);

//       console.log(res.status)
//       if(res.data.balance<curBal){
//           setmsg("❌ insufficient balance")
//       }else{

      
//         console.log(curBal+" :"+res.data.accountNumber)
//       const res2= await axios.post(`https://localhost:7218/api/Transactions/withdraw`,{
//         accountNumber:res.data.accountNumber,
//         balance:curBal
//       })
//       console.log(res2.status)
//       setmsg("✅ withdrawn successfully");
//     }
//     setTimeout(()=>navigate("/BankManagement"),1000);
//     }
//     fetchUser();
 
// }
//   return(
//     <>
//       <div className="txn-container">
//         <h2 className="text-center mt-10 pb-2 pt-2 flex justify-center bg-blue-500 w-full">Withdraw</h2>
//         <form onSubmit={handleSubmit}>
//         <label>Account Number : </label>
//         <input
//         name="accountNumber"
//         value={user.accountNum}
//         disabled
//         />
//         <label>Enter Amount : </label>
//         <input
//         name="balance"
//         type="number"
        
//         onChange={(e)=>SetBal(e.target.value)}
//         />
//         <button type="submit">Withdraw</button>
//         </form>
//         {msg && <p>{msg}</p>}
//       </div>
//     </>
//   )
// }

// export default Withdraw;

