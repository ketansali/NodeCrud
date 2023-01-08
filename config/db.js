const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.databaseUri)
  .then(() => {
    console.log(`Database connected`);
  })
  .catch((error) => {
    console.log(error);
  });
