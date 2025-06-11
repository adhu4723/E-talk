import React from 'react'
import { Paperclip, Smile } from 'lucide-react'

function MessageInput({ value, onChange, onSend }) {
    const handleKeyPress = (e) => {
    if (e.key === "Enter") onSend();
  };
  return (
    <div className="shadow-sm p-4 flex bg-white border-t border-gray-300 items-center space-x-2">
      <input
        type="text"
        placeholder="Type a message"
        className="flex-1 p-2 border border-gray-400 outline-none rounded-lg"
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
      />
      <button className="text-gray-500 hover:text-gray-700"><Paperclip size={20} /></button>
      <button className="text-gray-500 hover:text-gray-700"><Smile size={20} /></button>
      <button  onClick={onSend} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Send</button>
    </div>
  )
}

export default MessageInput
