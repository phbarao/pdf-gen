import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(PORT, () => console.log(`>>> Server listening on PORT: ${PORT}`));
