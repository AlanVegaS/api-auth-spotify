import express from "express";
import cors from "cors";
import serverless from "serverless-http";

const whiteList = ['https://spotify-alanvm.netlify.app/'];

const app = express();
app.use(cors({ origin: whiteList }));

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ "message": "Hello world!!" });
});

router.post('/auth/spotify/token', async (req, res) => {
  const token = await getToken();
  if (token)
    res.status(200).json({ ...token });
  else
    res.status(500).json({ "error": "Error to obtain spotify token" });
});

app.use('/.netlify/functions/index', router);
export const handler = serverless(app);

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