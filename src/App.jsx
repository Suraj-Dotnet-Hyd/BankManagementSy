import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginPage from './components/login'
import Register from './components/Register'
import { BrowserRouter } from "react-router-dom";
import BankManagement from './components/BankManagement'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './components/Profile'
import MiniTransactions from './components/Transactions'
import Deposit from './components/Deposit'
import Withdraw from './components/Withdraw'
import React from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/BankManagement" element={
          <BankManagement/>
        }/>
        <Route path="/BankManagement/Profile" element={<Profile/>}/>
        <Route path="/BankManagement/Transaction" element={<MiniTransactions/>}/>
        <Route path="/BankManagement/Deposit" element={<Deposit/>}/>
        <Route path='/Bankmanagement/Withdraw' element={<Withdraw/>} />
   
      
    </Routes>
    </>
  )
}

export default App
