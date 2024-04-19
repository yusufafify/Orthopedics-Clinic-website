import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cloudinaryRoute from './routes/cloudinary.js'


dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use('/api/v1/imageUploader',cloudinaryRoute)


const startServer = async () => {
  try {
      app.listen(3000, () => {
        console.log("server is listening on port http://localhost:3000");
      });
  } catch (error) {
      console.log(error)
  }
};
startServer();