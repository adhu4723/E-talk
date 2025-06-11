import React from 'react'
import Message from './pages/Message'
import { Route, Routes } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import Login from './pages/Login'
import Layout from './layout/Layout'
import ProtectRoute from './components/ProtectRoute'
import Home from './pages/Home'

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Layout/>}>
        <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectRoute/>}>
          <Route path='/message' element={<Message />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
