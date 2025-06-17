import React, { useEffect, useState } from "react";

const BroadcastListener: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000"); // Adapter l’URL si nécessaire

    ws.onmessage = (event) => {
      const data = event.data;
      setMessages((prev) => [...prev, data]); // Ajoute le message à la liste
    };

    ws.onopen = () => {
      console.log("WebSocket connecté !");
    };

    ws.onerror = (error) => {
      console.error("WebSocket erreur :", error);
    };

    ws.onclose = () => {
      console.log("WebSocket fermé");
    };

    return () => {
      ws.close(); // Nettoyage à la destruction du composant
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Messages reçus</h2>
      <ul className="mt-2 list-disc pl-4">
        {messages.map((msg, index) => (
          <li key={index} className="text-sm text-gray-700">
            {msg}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BroadcastListener;
