require("dotenv").load();
const fetch = require("node-fetch");
//const URL = "https://api.github.com/users/github";
const URL = "http://adb5156d.ngrok.io/sms";

let BODY = {
  From: "+16025151234",
  data: "LIST",
  Body: "add test",
  a: 1
};

//getData(URL);
postData(URL, BODY);

function postData(url = ``, data = {}) {
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(BODY)
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
}

function getData(url = ``) {
  // tests the GET to see we're running
  fetch(url)
    .then(res => res.text())
    .then(body => console.log(body));
}

// // res.status >= 200 && res.status < 300
// function checkStatus(res) {
//   if (res.ok) return res;
//   else throw res.statusText;
// }
