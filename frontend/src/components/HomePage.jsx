import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'

const HomePage = () => {
  return (
    <div className='flex sm:h-[450px] h-[450px] lg:h-[550px] w-full md:h-[550px]  rounded-lg overflow-auto bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'> 
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default HomePage; 