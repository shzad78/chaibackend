import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDB from "./db/index.js";
import app from "./app.js";

connectDB()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
