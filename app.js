const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
app.use(express.json());
app.use(express.static("./public"));

const PORT = 3000;

//ルーティング
app.use("/api/v1/tasks", taskRoute);

//データベース接続
const start = async () => {
  try {
    await connectDB(process.env.MONGO_HEROKU_URL || process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      sslValidate: false,
    });
    app.listen(process.env.PORT || PORT, console.log("サーバーが起動しました"));
  } catch (err) {
    console.log(err);
  }
};

start();
