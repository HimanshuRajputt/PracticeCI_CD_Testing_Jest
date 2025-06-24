
import app from "./config/index.js";
import { ConnectDB } from "./db/db.js";
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await ConnectDB();
  console.log(`Server is running on port ${PORT}`);
});
