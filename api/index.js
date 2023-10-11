// external import
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const cors = require('cors');

// import routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");

const app = express();

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/upload");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage });

// file route
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

// routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

// port and database connection
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server in running successfully`);
  mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true },
    () => {
      console.log('Database Connected Successfully...');
    }
  )
});