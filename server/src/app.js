require("dotenv").config();

const http = require("http");
const cors = require("cors");

const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const express = require("express");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

const authMiddleware = require("./middleware/auth.middleware");
const authRouter = require("./routes/auth.route");
const foodsRouter = require("./routes/foods.route");
const userRouter = require("./routes/users.route");
const adminRouter = require("./routes/admin.route");

// Express init
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.all("/", (req, res) => {
  res.send("pong");
});

app.use(authMiddleware);
app.use("/v1", authRouter);
app.use("/v1/foods", foodsRouter);
app.use("/v1", userRouter);
app.use("/v1", adminRouter);

/**
 * Last error handler
 */
app.use(async (err, req, res, next) => {
  if (err) {
    res.status(500).json({
      message: err.message,
      code: 500,
    });
    return;
  }

  res.status(404).json({
    ermessager: "Not found",
    code: 404,
  });
});

server.listen(port, async () => {
  console.log(`listening on http://localhost:${port}`);
});
