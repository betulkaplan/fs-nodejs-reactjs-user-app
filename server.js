const express = require("express");
const handleCorsPolicy = require("./utils/cors");
const mongoose = require('mongoose')

//connect to mongoDB
const dbURI = 'mongodb+srv://beth:betkap94@cluster0.amewz.mongodb.net/user-app?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('Connected to the DB'))
  .catch((err) => console.log(err))

const userRouter = require("./routes/users");
const homeRouter = require("./routes/home");
const app = express();

app.use(express.json());
app.use(handleCorsPolicy);

app.use("/users", userRouter);
app.use("/", homeRouter);

app.listen(5000, () => {
  console.log("Server is running on port http://localhost:5000");
});
