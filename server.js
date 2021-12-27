const express = require("express");
const handleCorsPolicy = require("./utils/cors");
const mongoose = require('mongoose')
const userRouter = require("./routes/users");
const homeRouter = require("./routes/home");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");

//traversy media
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");




require('dotenv').config()

const port = process.env.HOST_PORT || 5000

//connect to mongoDB
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.amewz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err))


const app = express();


//middleware
app.use(bodyParser.json());
app.use(methodOverride("_method"));
// app.use(express.json());
app.use(handleCorsPolicy);

const conn = mongoose.connection;

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

//create storage engine
const storage = new GridFsStorage({
  url: dbURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file });
})


app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/", homeRouter);
app.use("/product", productRouter);