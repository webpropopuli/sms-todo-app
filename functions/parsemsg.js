function parseMessage(input) {
  //console.log("parseMessage() got:", input);
  const newInput = input.trim().toUpperCase();
  const arrReturn = [null, null];

  // tbd  prep for letting commands be changed by user  later
  const cmdList = [
    {
      cmd: "ADD",
      name: "ADD",
      data: x => x.slice(3).trim()
    },
    {
      cmd: "DEL",
      name: "DEL",
      data: x => x.slice(3).trim()
    },
    {
      cmd: "LIST",
      name: "LIST",
      data: null
    },
    {
      cmd: "RES",
      name: "RES",
      data: "My resume: https://webpropopuli.com/resume_David_Marlowe.pdf"
    }
  ];

  let i = null;
  for (let x = 0; x < cmdList.length; x++) {
    let i = cmdList[x];
    if (newInput.startsWith(i.cmd)) {
      //console.log("CMD DATA: ", i);
      arrReturn[0] = i.name;
      arrReturn[1] = typeof i.data === "function" ? i.data(newInput) : typeof i.data === "string" ? i.data : "";
      break;
    }
  }

  if (arrReturn[0] === null) {
    console.log("Sending instructions");
    arrReturn[1] =
      "Welcome to David's Resume/ToDo Bot. You can type\nADD {your message}\nDEL {msg #}\nLIST - to see all, or \nRES for my resume";
  }

  console.log("parseMessage() return:", arrReturn);
  return arrReturn;
}

module.exports = parseMessage;
