import { useEffect, useRef, useState, useCallback } from "react";

export function useWebSocket(url: string) {
  const [messages, setMessages] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connecté");
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onerror = (err) => {
      console.error("WebSocket erreur :", err);
    };

    ws.onclose = () => {
      console.log("WebSocket fermé");
    };

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = useCallback((data: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(data);
    } else {
      console.warn("WebSocket non connecté");
    }
  }, []);

  return {
    messages, // Liste des messages reçus
    sendMessage, // Méthode pour envoyer un message
    isConnected: wsRef.current?.readyState === WebSocket.OPEN, // État de connexion
  };
}
