const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true, //To use the new Server Discover and Monitoring engine
  })
  .then(() => {
    console.log("DBconnection succcessful");
  });

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`The port is listening...at ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION Shuting down");
  server.close(() => {///shutdown the server first and then the processes
    process.exit(1);
  });
});

