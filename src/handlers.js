
const getQueryData = require("./queries/getQueryData.js");
const url = require('url');
const qsModule = require('querystring');



const getQueryDataHandler = (req,response)=>{
    const qs= url.parse(req.url, true).query.qs;
    getQueryData(qs,(err,data)=>{
        

        if (err) {
            response.writeHead(500, "Content-Type:text/html");
            response.end("<h1>Sorry, there was a problem getting the query result<h1>");
            console.log(err);
          } else {
        let output = JSON.stringify(data);
        console.log(output);

        response.writeHead(200, { "content-type": "application/json" });
        response.end(output);





        }
    });

}

module.exports = {getQueryDataHandler};