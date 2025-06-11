import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Button from '../components/common/Button'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react';

function Navbar() {
     const {user,logout}=useContext(AuthContext)
     const navigate=useNavigate()
  return (
    <nav className='flex justify-between px-4 py-2 border-b border-gray-300 shadow-sm z-50 items-center'>
        <div>
            <Link to={'/'} className='font-extrabold uppercase text-blue-600 text-2xl'>E-Talk</Link>

        </div>
        <div>
            {user?<div className='flex gap-2 items-center'><img className='rounded-full border w-12 h-12 border-gray-300 ' src={user?.profileImage||''} alt="" /><LogOut onClick={()=>{logout()}} color='red'/></div>:<div><Button onClick={()=>navigate('/signup')} label={'Register Now'} /></div>}

        </div>

      
    </nav>
  )
}

export default Navbar
