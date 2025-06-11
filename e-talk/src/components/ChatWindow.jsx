import React, { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import axios from "axios";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

const ChatWindow = ({ senderId, receiverId }) => {
  console.log(receiverId);
  
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [receiver, setReceiver] = useState("");

  const bottomRef = useRef(null);

  // ✅ Fetch chat history and receiver info
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`https://datingapp-production-4dc1.up.railway.app/api/chat/${senderId}/${receiverId}`);
        setChat(res.data);
      } catch (error) {
        console.error("Failed to load chat history:", error);
      }
    };

    const fetchReceiver = async () => {
      try {
        const res = await axios.get(`https://datingapp-production-4dc1.up.railway.app/api/auth/user/${receiverId}`);
        setReceiver(res.data?.user || "User");
      } catch (err) {
        console.error("Failed to load receiver info:", err);
        setReceiver("User");
      }
    };

    fetchMessages();
    fetchReceiver();
  }, [senderId, receiverId]);

  // ✅ Listen for new incoming messages
  useEffect(() => {
    const handleReceive = (newMsg) => {
      setChat((prev) => [...prev, newMsg]);
    };

    socket.on("receive_message", handleReceive);
    return () => socket.off("receive_message", handleReceive);
  }, []);

  // ✅ Scroll to bottom when chat updates
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  // ✅ Send a message
  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      sender: senderId,
      receiver: receiverId,
      content: message,
    };

    socket.emit("send_message", msgData);
   
    setMessage("");
  };

  console.log(chat);
  

  // ✅ Format time
  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex gap-4 items-center p-4 border-b border-gray-300 bg-white font-bold text-lg uppercase">
        <img className="w-10 h-10 rounded-full" src={receiver?.profileImage||'https://www.shutterstock.com/image-vector/person-gray-photo-placeholder-man-260nw-1406263799.jpg'} alt="" />
        <div>{receiver?.name||''} <br /> <p className="text-xs font-normal text-gray-700">online</p> </div></div>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {chat.length > 0 ? (
          chat.map((msg, i) => (
            <MessageBubble
              key={i}
              align={msg.sender._id === senderId ? "right" : "left"}
              text={msg.content}
              time={formatTime(msg.createdAt)}
            />
          ))
        ) : (
          <div className="text-gray-500 italic text-center mt-10">No messages yet</div>
        )}
        <div ref={bottomRef} />
      </div>
      <MessageInput
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onSend={sendMessage}
      />
    </div>
  );
};

export default ChatWindow;
