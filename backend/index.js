import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware za prosljedjivanje eq body-a
app.use(express.json());

// Middleware za handlanje CORS POLICY
// 1 option dozvola za sve origins sa default cors(*)
app.use(cors());

// 2 option Allow custom origins

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Hello");
});

app.use("/books", bookRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
    console.log("App connected to database");
  })
  .catch((error) => {
    console.log(error);
  });
