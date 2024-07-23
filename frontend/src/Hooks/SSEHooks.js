import { useEffect } from "react";
import { useSelector } from "react-redux";

const useSSE = (url, onMessage) => {
  const id = useSelector((state) => state.auth?.user?.user_id);
  useEffect(() => {
    console.log("i am in effect");
    if (id) {
      const eventSource = new EventSource(url);
      console.log("i connected to event at url", url);
      eventSource.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        console.log("i receive new message from SSE", newMessage);
        onMessage(newMessage);
      };

      eventSource.onerror = (error) => {
        console.error("SSE error:", error);
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    }
  }, [url, onMessage, id]);
};

export default useSSE;
