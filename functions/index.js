import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import { addTokenRequest, addUser } from "../src/mongoDB";


const whiteList = [process.env.WHITE_LIST];

const app = express();
app.use(cors({ origin: whiteList }));

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
  res.status(200).json({ "message": "Hello world!!!" });
});

/*router.get('/mongotest', async (req, res) => {
  try {
    const users = await getUser();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
  }
});*/

router.post('/create/tokenRequest', async (req, res) => {
  try {
    await addTokenRequest(req.body.userData);
    res.status(200).json({ "message": "Token request created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ "error": "Error to create token request" });
  }
});

router.post('/create/user', async (req, res) => {
  try {
    const result = await addUser(req.body);
    res.status(200).json({ "message": "User created", uidUser: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ "error": "Error to create User request" });
  }
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