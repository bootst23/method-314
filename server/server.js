import express from "express";
import cors from "cors";
import userAccountController from "./controllers/userAccountController.js";
import loginController from "./controllers/loginController.js";
import userProfileController from "./controllers/userProfileController.js";
import categoryController from "./controllers/categoryController.js";
import serviceController from "./controllers/serviceController.js";
import viewController from "./controllers/viewController.js";
import shortlistController from "./controllers/shortlistController.js";
import logController from "./controllers/logController.js";
import { config } from "dotenv";
import { initialiseDB } from "./db.js";

config();

initialiseDB(
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_DATABASE
);

const app = express();
const port = 3001;

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://0.0.0.0:8080",
      "http://127.0.0.1:8080",
    ],
  })
);

// Controllers
app.use(userAccountController);
app.use(loginController);
app.use(userProfileController);
app.use(categoryController);
app.use(serviceController);
app.use(viewController);
app.use(shortlistController);
app.use(logController);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
