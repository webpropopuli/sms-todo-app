/* as server is running constantly, we will connect/disc from DB with each call
 */

let TDL = {}; //# masterToDoList object

loadDB = () => {
  //TBD: on startup, load DB
};
refreshDB = () => {
  //TBD: write changes to actual database
};

findCaller = callerNum => {
  return callerNum in TDL;
};

addCaller = callerNum => {
  TDL[callerNum] = [];
};

getCallerMsgs = callerNum => {
  if (!findCaller(callerNum)) addCaller(callerNum);

  return { msgList: TDL[callerNum] };
};

function getAll(caller) {
  // find all and format
  let data = "";
  const { msgList } = getCallerMsgs(caller);
  for (let x = 0; x < msgList.length; x++) {
    data += `${parseInt(x + 1)}>${msgList[x]}\n`;
  }

  return data;
}

function addOne(input, caller) {
  //# add to first free slot
  const { msgList } = getCallerMsgs(caller);
  msgList.push(input);
  refreshDB();
  return;
}

function delOne(input, caller) {
  //tbd make sure input is a number
  const { msgList } = getCallerMsgs(caller);
  msgList.splice(input - 1, 1);
  refreshDB();
  return;
}

module.exports = { getAll, delOne, addOne };
