require("dotenv").load();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const DB = require("./dbfuncs");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/sms", function(req, res) {
  console.log("GET /sms- sending instructions");

  let textOut =
    "Hi. I'm an SMS server responding to POST requests only. Thanks for stopping by but these aren't the droids you're looking for.";

  res.send(`${textOut}`);
});

/* if you just want to write TwiML
app.post("/message", function(request, response) {
  response.send("<Response><Message>Hello</Message></Response>");
});*/

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
