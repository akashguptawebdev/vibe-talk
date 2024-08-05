import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice';

const OtherSingleUser = ({ user}) => {
  const dispatch = useDispatch();
  const {selectedUser ,onlineUsers} = useSelector(store => store.user);

  const isOnline = onlineUsers ? onlineUsers?.includes(user?._id) : false;
  const selectedUserHandler = (user)=>{ 
    dispatch(setSelectedUser(user))
  }

 
  return (
    <div >
      <div onClick={()=> selectedUserHandler(user) } className={` ${selectedUser?._id === user?._id ? 'bg-gray-500': '' } flex gap-2 items-center  hover:bg-gray-500  rounded-md p-2 cursor-pointer`}>
        <div className={`avatar ${isOnline?"online":""}`}>
          <div className="w-8 rounded-full">
            <img
              src={user?.profilePhoto}
              alt="user Profile"
            />
          </div>
        </div>

        <div className=" flex flex-col flex-1">
          <div className="flex justify-between  gap-2 ">
            <p>{user?.fullname}</p>
          </div>
        </div>
      </div>

      <div className="divider  my-0 py-0 h-[0.2px] bg-gray-500"></div>
    </div>
  )
}

export default OtherSingleUser