const http = require('http');
const handleServer = require("../app");

const server = http.createServer((req,res)=>{
    console.log(req.method,"method");
    handleServer(req,res);
})
server.listen(8000);
console.log("listening on 8000");