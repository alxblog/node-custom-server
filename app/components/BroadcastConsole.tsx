import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const BroadcastConsole: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000"); // À adapter selon ton domaine

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onopen = () => console.log("WebSocket connecté");
    ws.onerror = (err) => console.error("WebSocket erreur :", err);
    ws.onclose = () => console.log("WebSocket fermé");

    return () => ws.close();
  }, []);

  const handleSend = async () => {
    try {
      const res = await fetch("http://localhost:3000/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi");
      setInput("");
    } catch (err) {
      console.error("Erreur HTTP :", err);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Console WebSocket</h2>
      <div className="space-y-2">
        <Input
          placeholder="Ton message ici"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
				<Button  onClick={handleSend}>Broadcast</Button>
      </div>

      <div>
        <h3 className="font-semibold mt-4">Messages reçus :</h3>
        <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
          {messages.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};