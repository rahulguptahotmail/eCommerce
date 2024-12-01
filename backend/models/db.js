const mongoose = require("mongoose");

const uri = process.env.MONGODB_URL;

const connecting = async () => {
  await mongoose
    .connect(uri)
    .then(() => console.log("Connected"))
    .catch((err) => console.log(err.message));
};

connecting();
