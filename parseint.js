function parseMessage(input) {
  console.log("parse got:", input);
  const newInput = input.trim().toUpperCase();
  const arrReturn = ["", ""];

  if (newInput.startsWith("ADD")) {
    arrReturn[0] = "ADD";
    arrReturn[1] = input.slice(3).trim();
  } else if (newInput.startsWith("DEL")) {
    arrReturn[0] = "DEL";
    arrReturn[1] = input.slice(3).trim();
  } else if (newInput.startsWith("LIST")) {
    arrReturn[0] = "LIST";
    arrReturn[1] = "";
  } else if (newInput.startsWith("RES")) {
    arrReturn[0] = "RES";
    arrReturn[1] = "My resume: https://webpropopuli.com/resume_David_Marlowe.pdf";
  } else {
    arrReturn[0] = "";
    arrReturn[1] =
      "Welcome to David's Resume/ToDo Bot. You can type\nADD {your message}\nDEL {msg #}\nLIST - to see all items, or \nRES for a link to my resume";
  }

  console.log("parse return:", arrReturn);
  return arrReturn;
}

module.exports = parseMessage;
