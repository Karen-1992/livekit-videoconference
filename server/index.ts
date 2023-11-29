import * as dotenv from "dotenv";
dotenv.config({ path: `./configs/.env.${process.env.NODE_ENV || "test"}` });
import { createServer } from "http";
import express from "express";
import cors from "cors";
import { createLKToken } from "./src/token";
import { Room, RoomServiceClient } from "livekit-server-sdk";
const bodyParser = require('body-parser');
const app = express();
const server = createServer(app);
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/token', (req, res) => {    
  const { identity, name, roomName } = req?.body;
  try {
      const accessToken = createLKToken(identity, name, roomName);
      res.json({ accessToken });
  } catch (error) {
      res.status(401).json({ error: 'Invalid data' });
  }
});

app.get('/rooms', (req, res) => {
  const svc = new RoomServiceClient(process.env.livekitHost, process.env.livekitApiKey, process.env.livekitApiSecret);
  
  try {
    svc.listRooms().then((rooms: Room[]) => {
      res.json({ rooms });
    });
  } catch (error) {
      res.status(401).json({ error: 'cannot get rooms' });
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
