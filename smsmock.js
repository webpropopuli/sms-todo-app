require("dotenv").load();
const axios = require("axios");

const sendSMS = msg => {
  try {
    return axios.post(process.env.SERVER_LOC, {
      input: msg
    });
  } catch (error) {
    console.error(error);
  }
};

const runIt = async () => {
  const data = sendSMS()
    .then(response => {
      if (response.data.message) {
        console.log(`Got ${response.data.message}a`);
      }
    })
    .catch(error => {
      console.log("CATCH", error);
    });
};

runIt();
