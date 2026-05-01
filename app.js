require("dotenv/config");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { dbConnect } = require("./src/config/db.config");
const { applyAuthenticate } = require("./src/middlewares/auth.middleware");

// [ database connection ]
dbConnect();

// [ default ]
app.get("/", (req, res) => {
  res.send("hello");
});

// [ middlewares ]
app.use(cors());
app.use(morgan("tiny"));
app.use(fileUpload());
app.use(express.json());
app.use(applyAuthenticate);

app.use("/api", require("./src/routes/index.routes"));

// [ server ]
app.listen(process.env.PORT, () => {
  console.log(`app listening on ${process.env.PORT}`);
});
