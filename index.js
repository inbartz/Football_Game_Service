//Libraries
require("dotenv").config();
var express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("client-sessions");

//Routing
const matchesRouting = require("./routes/matches");

//App settings and config
const app = express();
const port = process.env.PORT || 5000;

// Config CORS policy
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan(":method :url :status  :response-time ms"));

// Session cookies
app.use(
  session({
    cookieName: "session", // the cookie key name
    secret: process.env.COOKIE_SECRET, // the encryption key
    duration: 45 * 60 * 1000, // expired after 45 minutes
    activeDuration: 45 * 60 * 1000, // if expiresIn < activeDuration,
    //the session will be extended by activeDuration milliseconds
    cookie: {
      httpOnly: false,
    },
  })
);

// Use routes
app.use("/matches", matchesRouting);

// Errore if page not found
app.use((req, res) => {
  res.sendStatus(404);
});

// Application errors
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).send({ message: err.message, success: false });
});

// Start the app process
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

process.on("SIGINT", function () {
  if (app) {
    app.close(() => console.log("server closed"));
  }
  process.exit();
});
