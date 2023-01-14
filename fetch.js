const getBtn = document.getElementById("get-btn");
const postBtn = document.getElementById("post-btn");

const sendHttpRequest = (method, url, data) => {
  return fetch(url, {
    method: method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status >= 400) {
      return response.json().then((errResp) => {
        const err = new Error("Somthing is wrong");
        err.data = errResp;
        throw err;
      });
    }
    return response.json();
  });
};

const getData = () => {
  sendHttpRequest("GET", "https://reqres.in/api/users").then((responseData) =>
    console.log(responseData)
  );
};

const sendData = () => {
  sendHttpRequest("POST", "https://reqres.in/api/register", {
    email: "eve.holt@reqres.in",
    password: "pistol",
  })
    .then((responseData) => {
      console.log(responseData);
    })
    .catch((err) => {
      console.log(err, err.data);
    });
};

getBtn.addEventListener("click", getData);
postBtn.addEventListener("click", sendData);
