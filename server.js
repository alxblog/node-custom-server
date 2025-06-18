import compression from "compression";
import express from "express";
import morgan from "morgan";
import { WebSocketServer } from "ws"; // Ajout de WebSocketServer
import http from "http"; // Import du serveur HTTP requis pour attacher ws
import bodyParser from "body-parser"; // Pour parser les requêtes POST JSON

// Short-circuit the type-checking of the built output.
const BUILD_PATH = "./build/server/index.js";
const DEVELOPMENT = process.env.NODE_ENV === "development";
const PORT = Number.parseInt(process.env.PORT || "3000");

const app = express();

app.use(compression());
app.disable("x-powered-by");
app.use(bodyParser.json()); // Ajout du middleware pour lire les requêtes JSON


const server = http.createServer(app); // Création manuelle du serveur HTTP

const wss = new WebSocketServer({ server }); // Création du serveur WebSocket lié au serveur HTTP

app.all("/relay", async (req, res)=> {
  try {
    const resp = await fetch('http://192.168.40.17:3030/dashboard')
    res.send('OK')
  } catch (error) {
    res.send('petite erreur')
  }
})
// Broadcast vers tous les clients connectés
app.post("/broadcast", (req, res) => {
  const message = JSON.stringify(req.body); // Convertit les données en JSON string
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(message); // Envoie le message à chaque client connecté
    }
  });
  res.status(200).json({ status: "Message broadcasted" }); // Répond au client HTTP
}); // Ajout de la route POST /broadcast


if (DEVELOPMENT) {
  console.log("Starting development server");
  const viteDevServer = await import("vite").then((vite) =>
    vite.createServer({
      server: { middlewareMode: true },
    }),
  );
  app.use(viteDevServer.middlewares);
  app.use(async (req, res, next) => {
    try {
      const source = await viteDevServer.ssrLoadModule("./server/app.ts");
      return await source.app(req, res, next);
    } catch (error) {
      if (typeof error === "object" && error instanceof Error) {
        viteDevServer.ssrFixStacktrace(error);
      }
      next(error);
    }
  });
} else {
  console.log("Starting production server");
  app.use(
    "/assets",
    express.static("build/client/assets", { immutable: true, maxAge: "1y" }),
  );
  app.use(morgan("tiny"));
  app.use(express.static("build/client", { maxAge: "1h" }));
  app.use(await import(BUILD_PATH).then((mod) => mod.app));
}

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Changement : on écoute avec `server` au lieu de `app`
}); // Remplacé app.listen par server.listen pour supporter WebSocket