require("dotenv").config();
require("./config/db");
const express = require("express");
const routes = require("./routes/index");

const cors = require("cors");
const PORT = process.env.PORT;

const app = express();
app.use("/uploads", express.static("uploads"));
app.use(express.json());

// cors
app.use(cors());

//routes
app.use("/api", routes);
app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
