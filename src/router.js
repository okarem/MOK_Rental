const http = require("http");
const fs = require("fs");
const pg = require("pg");
const getData = require("./queries/getData.js");
const getQueryData = require("./queries/getQueryData.js");
const queryString = require("querystring");
const postData = require("./queries/postData.js");
const handlers = require("./handlers.js");
const url = require("url");

const router = (request, response) => {
  // const endpoint = request.url.split("/")[1];
  const endpoint = url.parse(request.url).pathname;
  console.log(endpoint);
  if (endpoint === "/") {
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
  } else if (endpoint === "/getQueryData") {
    handlers.getQueryDataHandler(request, response);
  } else if (endpoint === "/rentCar") {
    fs.readFile(__dirname + "/../public/rentCar.html", function(error, file) {
      if (error) {
        response.writeHead(500, "Content-Type:text/html");
        response.end("<h1>Sorry, there was a problem loading the rentcar</h1>");
        console.log(error);
      } else {
        response.writeHead(200, {
          "Content-Type": "text/html"
        });
        response.end(file);
      }
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
