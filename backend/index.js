require("dotenv").config();
require("./models/db");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { authorization, adminAuthorization } = require("./middleware/auth");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const adminRouter = require("./routes/admin.routes");

// route middleware
app.use("/users", userRouter);
app.use("/products",authorization, productRouter);
app.use("/admin",adminAuthorization, adminRouter);

app.get("/", (req, res) => {
  // res.cookie("token", "rahul");
  res.end("welcome");
});

app.listen(port, () => console.log(`Server listening on ${port}`));
