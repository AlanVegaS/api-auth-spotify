import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import dotenv from "dotenv";

const dotenvConfig = dotenv.config();

const app = express();
app.use(cors());

const PORT = 5000;

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ "message": "Hello world" });
});

router.get('/auth/spotify/token', async (req, res) => {
  const token = await getToken();
  if (token)
    res.status(200).json({ ...token });
    else 
    res.status(500).json({ "error": "Error to obtain sptofy token" });
});

app.use('/.netlify/functions/index', router);
export const handler = serverless(app);
// app.listen(port);

async function getToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: new URLSearchParams({
      'grant_type': 'client_credentials',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')),
    },
  });

  return await response.json();
}