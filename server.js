/* SUPER MINIMAL EXPRESS SERVER */
require("dotenv").load();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const DB = require("./dbfuncs");

app.use(bodyParser.urlencoded({ extended: false }));

// express().get("/", function(req, res) {
//   console.log("GET /");
//   res.send("Hello from my Twilio number");
// });

app.get("/sms", function(req, res) {
  console.log("GET /sms");

  let textOut = "";

  fetch("https://dog-api.kinduff.com/api/facts", {
    headers: { "Content-Type": "application/json" }
  })
    .then(resp => resp.json())
    .then(function(bod) {
      textOut = bod.facts[0];

      console.log(textOut);
    });

  //res.writeHead(200, { "Content-Type": "text/xml" });
  res.send(`${textOut}`);
  //res.end(twiml);
});

/* This is an example if you just want to write TwiML
app.post("/message", function(request, response) {
  response.send("<Response><Message>Hello</Message></Response>");
});
*/

app.post("/sms", (req, res) => {
  const parseMessage = require("./parseint.js");
  const textIn = req.body.Body;
  // console.log("POST sms got: ", textIn);

  //# Parse the incoming message looking for commands
  let textOut = "";
  let [mode, msg] = parseMessage(textIn);

  switch (mode) {
    case "ADD":
      console.log(`ADDing item <${msg}>`);
      DB.addOne(msg);
      textOut = "Item added";
      break;
    case "DEL":
      console.log(`DEL item <${msg}>`);
      DB.delOne(msg);
      textOut = "Item deleted";
      break;
    case "LIST":
      console.log(`LISTing all items`);
      msg = DB.getAll();
      if (msg === "") textOut = "{empty list}";
      else textOut = msg;
      break;
    case "RES":
      console.log(`RESUME request`);
      textOut = msg;
      break;
    case "ERR":
      console.log(`PARSE error: ${msg}`);
      textOut = msg;
      break;

    case "":
      console.log(`SEND instructions`);
      textOut = msg;
      break;
    default:
      assert(0); // should never happen
  }

  //#set up Twilio object
  const MessagingResponse = require("twilio").twiml.MessagingResponse;
  const twiml = new MessagingResponse();
  const tMsg = twiml.message();
  // Send back the message if there is one.
  //if (textOut !== "")
  //! HAPPY PATH only
  {
    tMsg.body(textOut);

    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  }
});

const PORT = process.env.PORT || 5000;
var server = app.listen(PORT, function() {
  console.log(`ToDo bot live at host ${server.address().address} on port ${server.address().port}`);
});
