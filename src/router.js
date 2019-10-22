const http = require("http");
const fs = require("fs");
const pg = require("pg");
const getData = require("./queries/getData.js");
const queryString = require("querystring");
const postData = require("./queries/postData.js");

const router = (request, response) => {
  const endpoint = request.url.split("/")[1];
  console.log(endpoint);
  if (endpoint === "") {
    fs.readFile(__dirname + "/../public/index.html", function(error, file) {
      if (error) {
        response.writeHead(500, "Content-Type:text/html");
        response.end(
          "<h1>Sorry, there was a problem loading the homepage</h1>"
        );
        console.log(error);
      } else {
        response.writeHead(200, {
          "Content-Type": "text/html"
        });
        response.end(file);
      }
    });
  } else if (endpoint === "users") {
    getData((err, res) => {
      if (err) {
        response.writeHead(500, "Content-Type:text/html");
        response.end("<h1>Sorry, there was a problem getting the users<h1>");
        console.log(err);
      } else {
        let output = JSON.stringify(res);
        console.log(output);

        response.writeHead(200, { "content-type": "application/json" });
        response.end(output);
      }
    });
  } else if (endpoint === "create-car_request") {
    let data = "";
    request.on("data", function(chunk) {
      data += chunk;
    });
    request.on("end", () => {
      const car_id = queryString.parse(data).car_id;
      const user_id = queryString.parse(data).plauser_idtenum;
      const date_begin = queryString.parse(data).date_begin;
      const date_return = queryString.parse(data).date_return;

      postData(car_id, user_id, date_begin, date_return, (err, res) => {
        if (err) {
          response.writeHead(500, "Content-Type: text/html");
          response.end("<h1>Sorry, there was a problem adding that user</h1>");
          console.log(err);
        } else {
          response.writeHead(200, { "Content-Type": "text/html" });
          fs.readFile(__dirname + "/../public/index.html", (error, file) => {
            if (error) {
              console.log(error);
              return;
            } else {
              response.end(file);
            }
          });
        }
      });
    });
  } else {
    const fileName = request.url;
    const fileType = request.url.split(".")[1];
    fs.readFile(__dirname + "/../public" + fileName, function(error, file) {
      if (error) {
        response.writeHead(500, "Content-Type:text/html");
        response.end("<h1>Sorry, there was a problem loading this page</h1>");
        console.log(error);
      } else {
        response.writeHead(200, {
          "Content-Type": "text/" + fileType
        });
        response.end(file);
      }
    });
  }
};

module.exports = router;
