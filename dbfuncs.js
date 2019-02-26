/* as server is running constantly, we will connect/disc from DB with each call
 */

let todoList = []; // for now it's a flat list in memory

function getAll() {
  // find all and format
  let data = "";
  for (let x = 0; x < todoList.length; x++) {
    data += `${parseInt(x + 1)}>${todoList[x]}\n`;
  }

  return data;
}
function addOne(input) {
  // add to first free slot
  todoList.push(input);
  return;
}
function delOne(input) {
  //make sure input is a number
  todoList.splice(input - 1, 1);
  return;
}
module.exports = { getAll, delOne, addOne };
