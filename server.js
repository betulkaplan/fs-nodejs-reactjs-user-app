const express = require("express");
const handleCorsPolicy = require("./utils/cors");

const userRouter = require("./routes/users");
const app = express();

app.use(express.json());
app.use(handleCorsPolicy);

app.use("/users", userRouter);

app.listen(5000, () => {
  console.log("Server is running on port http://localhost:5000");
});
