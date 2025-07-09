import app from "./app/app";
import connectDB from "./config/db";
import { port } from "./config/secret";

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
