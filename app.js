require("dotenv/config");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const session = require("express-session");
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
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);
app.use(applyAuthenticate);
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

app.use("/api", require("./src/routes/index.routes"));

// [ server ]
app.listen(process.env.PORT, () => {
  console.log(`app listening on ${process.env.PORT}`);
});
