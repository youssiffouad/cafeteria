import React, { useEffect, useState } from "react";
import { serverSocket } from "../backendSocket";

const SseComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSourceUrl = `${serverSocket}/notifications/stream?clientId=`; // replace with actual URL and client ID
    const eventSource = new EventSource(`${serverSocket}/notifications/stream`);

    eventSource.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
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
          <li key={index}>{msg.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default SseComponent;
