let TDL = {};
TDL = {
  David: ["a", "b", "c"],
  Tom: [],
  Bob: [`apple`, `pear`, `wombat`]
};

findCaller = key => {
  return key in TDL;
};

addCaller = key => {
  TDL[key] = [];
};

let msgList;
const name = "David";
if (!findCaller(name)) addCaller(name);

msgList = TDL[name];
console.log(name, msgList);
