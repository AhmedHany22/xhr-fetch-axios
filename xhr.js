const getBtn = document.getElementById("get-btn");
const postBtn = document.getElementById("post-btn");

const sendHttpRequest = (method, url, data) => {
  // Use promise to work with returned data from outside
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest(); // A global constructor func built in JS, named XML for hestoric reasons, but it can also work with JSON

    xhr.open(method, url); // It prepares a HTTP request to be sent, it takes 2 argus, The http method, & the URL to send to.

    if (data) xhr.setRequestHeader("Content-Type", "application/json"); // Signal that we're sending JSON data

    // #region __________ parse JSON into JS - 1 __________
    // Setup a listener to fire a code when we get a response
    // xhr.onLoad = () => {
    //   const data = JSON.parse(xhr.response); // to access the data
    //   console.log(data);
    // };
    // #endregion

    // __________ parse JSON into JS - 2 __________
    xhr.responseType = "json"; // Change JSON into JS

    // Setup a listener to fire a code when we get a response
    xhr.onLoad = () => {
      if (xhr.status >= 400) reject(xhr.response);
      else resolve(xhr.response);
    }; // Access & Pass the data to the ".then"

    xhr.onerror = () => reject("Some thing is wrong"); // This'll trigger only if we faild to send request

    // It sends the prepared request to the server
    xhr.send(JSON.stringify(data));
  });
  return promise;
};

const getData = () => {
  sendHttpRequest("GET", "https://reqres.in/api/users").then((responseData) => {
    console.log(responseData);
  });
};

const sendData = () => {
  sendHttpRequest("POST", "https://reqres.in/api/register", {
    email: "sydney@fife",
  })
    .then((responseData) => console.log(responseData))
    .catch((err) => console.log(err)); // This'll trigger only if we recived an error response
};

getBtn.addEventListener("click", getData);
postBtn.addEventListener("click", sendData);
