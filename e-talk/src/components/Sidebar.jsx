import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

function Sidebar({ selectedUser, onUserSelect }) {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://datingapp-production-4dc1.up.railway.app/api/auth/users');
      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {/* Toggle Button (Always Visible) */}
      <button
        className="fixed top-1/2 left-4 z-50 bg-white border border-gray-300 rounded-full p-2 shadow-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ArrowLeft size={40} /> : <ArrowRight size={40} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full z-40 bg-white border-r border-gray-300 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          w-64 p-4 md:relative md:translate-x-0 md:w-64 md:block
        `}
      >
        {/* Search bar (only visible when sidebar is open) */}
        {isOpen && (
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 mb-4 border border-gray-300 outline-none rounded"
          />
        )}

        <ul className="space-y-4 overflow-y-auto h-[90vh]">
          {users.map((user, i) => (
            <li
              key={i}
              className={`flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-100 ${
                selectedUser === user.name ? 'bg-gray-200' : ''
              }`}
              onClick={() => {
                onUserSelect(user);
                setIsOpen(false); // auto-close on mobile
              }}
            >
              <img
                width={40}
                className="rounded-full h-10 w-10"
                src={user?.profileImage || 'https://www.shutterstock.com/image-vector/person-gray-photo-placeholder-man-260nw-1406263799.jpg'}
                alt=""
              />
              <div className="hidden md:block">
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm text-gray-500">Active {user.active || '1h ago'}</div>
              </div>
              {isOpen && (
                <div className="md:hidden">
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-sm text-gray-500">Active {user.active || '1h ago'}</div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Background overlay on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;
