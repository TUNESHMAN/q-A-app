// Import the pre-baked middleware
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

require("dotenv").config();

// Instantiate the server by invoking express
const server = express();

// View engine setup
server.set("view engine", "hbs");

// Body-parser middleware
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
// We use the middleware
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger);

// Bring in the static folder
server.use("/public", express.static(path.join(__dirname, "/public")));

// Flesh out a dummy API
server.get("/", (req, res) => {
  res.render("form");
});

// Post
server.post("/send", (req, res) => {
  console.log(req.body);
  const output = `<p>You have a new question</p>
  <h3>Question details</h3>
  <ul><li>Topic: ${req.body.email}</li>
  <li>Content: ${req.body.email}</li></ul>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "babatundea15@gmail.com", 
      pass: "mechanical2", 
    },
  });

  // send mail with defined transport object
  let mailOptions = {
    from: "babatundea15@gmail.com", // sender address
    to: "tuneshman92@gmail.com, tuneshdev@gmail.com, babatundea15@gmail.com", // list of receivers
    subject: "Hello ✔, New Question Request", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error occurs", err);
    } else {
      console.log("Email sent");
    }
  });
});


// If the endpoint is invalid
server.get("*", (req, res) => {
  res.send(`message: This is an invalid path`);
});

// Create a custom logger middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString}] ${req.method} ${req.url} from ${req.get(
      "Origin"
    )}`
  );
  next();
}

// Export the server to be seen by other files
module.exports = server;
