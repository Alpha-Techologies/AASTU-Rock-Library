const express = require("express");
const app = express();
const cors = require("cors");
// const url = require("url");
const morgan = require("morgan");
const APIError = require("./utils/apiError");
const globalErrorHandler = require("./Controller/errorController");

//Middlewares
// app.use(
//   cors({
//     origin: "http://localhost:27000/rocks",
//   })
// );
app.use(express.static("../Client/public"));

if(process.env.NODE_ENV ==  "development"){
  app.use(morgan("dev"));
}

app.use(express.json());

app.use((req, res, next) => {
  req.currentTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});
// app.use(express.static("../Client/public")); //  path.join(__dirname, "public")

const userRouter = require("./routes/userRoutes");
const rockRouter = require("./routes/rockRoutes");
const statRouter = require("./routes/statsRouter");

app.use("/users", userRouter);
app.use("/rocks", rockRouter);
app.use("/statistics", statRouter);

app.all("*", (req, res, next) => {
  next(new APIError(`Can't find ${req.originalUrl} in server plus`, 404));
});

app.use(globalErrorHandler);

//Create server
module.exports = app;
