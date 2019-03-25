require("dotenv").load();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const DB = require("./dbfuncs");

app.use(bodyParser.urlencoded({ extended: false }));

//# Blow off GET requests
app.get("/sms", function(req, res) {
  res.send(
    "Hi. I'm an SMS server responding to POST requests only. Thanks for stopping by but these aren't the droids you're looking for."
  );
});

/* if you just want to write TwiML
app.post("/message", function(request, response) {
  response.send("<Response><Message>Hello</Message></Response>");
});*/

//# The moneyshot...
app.post("/sms", (req, res) => {
  const parseMessage = require("./parsemsg.js");
  const textIn = req.body.Body;
  //console.log("POST sms got: ", req.body);

  const callerNum = req.body.From;
  console.log("Message from ", callerNum);

  //# Parse the incoming message looking for commands
  let textOut = "";
  let [mode, msg] = parseMessage(textIn);

  switch (mode) {
    case "ADD":
      console.log(`ADDing item <${msg}>`);
      DB.addOne(msg, callerNum);
      textOut = "Item added";
      break;
    case "DEL":
      console.log(`DEL item <${msg}>`);
      DB.delOne(msg, callerNum);
      textOut = "Item deleted";
      break;
    case "LIST":
      console.log(`LISTing all items`);
      msg = DB.getAll(callerNum);
      if (msg === "") textOut = "{empty list}";
      else textOut = msg;
      break;
    case "RES":
      console.log(`RESUME request`);
      textOut = msg;
      break;

    // unused at the moment.
    // case "ERR":
    //   console.log(`PARSE error: ${msg}`);
    //   textOut = msg;
    //   break;

    case null:
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
