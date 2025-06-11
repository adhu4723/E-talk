import React from 'react'
import Button from '../components/common/Button'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate=useNavigate()

  return (
    <div className='text-center flex justify-center h-80 items-center'>
        <div>
      <h1 className='lg:text-4xl font-bold mb-4 uppercase'>Welcome to E-Talk</h1>
      <div className='w-40 mx-auto'>
      <Button  onClick={()=>navigate('/message')} label={'Start Messageing'}/>
      </div>
      </div>
    </div>
  )
}

export default Home
