import React, { useEffect, useState } from "react";
import { serverSocket } from "../backendSocket";
import { useSelector } from "react-redux";

const SseComponent = () => {
  const [messages, setMessages] = useState([]);
  const id = useSelector((state) => state.auth.user.user_id);

  useEffect(() => {
    const eventSourceUrl = `${serverSocket}/notifications/stream?clientId=${id}`; // replace with actual URL and client ID
    const eventSource = new EventSource(eventSourceUrl);

    eventSource.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      console.log("a new message arrived", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>SSE Messages</h1>
      <ul>
        <li>length of msgs is ${messages.length}</li>
        {messages.map((msg, index) => (
          <li key={index}>{msg.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default SseComponent;
