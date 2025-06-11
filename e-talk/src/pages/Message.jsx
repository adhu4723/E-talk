import React, { useContext, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import { AuthContext } from '../context/AuthContext';

function Message() {
  const [selectedUser, setSelectedUser] = useState(null);
  const {user}=useContext(AuthContext)
  console.log(user);
  

  const senderId = user?._id; // Replace with real user ID (auth context, localStorage, etc.)
  const receiverId = selectedUser?._id;
  console.log(selectedUser);
  

  return (
    <div className="flex h-[90vh] bg-gray-50">
      <Sidebar selectedUser={selectedUser?.name} onUserSelect={(user) => setSelectedUser(user)} />
      {receiverId ? (
        <ChatWindow senderId={senderId} receiverId={receiverId} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">Select a user to start chatting</div>
      )}
    </div>
  );
}

export default Message;
