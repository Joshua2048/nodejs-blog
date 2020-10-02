const mysql = require('mysql');

const  {MYSQL_CONF } = require('../conf/db');

var connection = mysql.createConnection(MYSQL_CONF);
   
  //开始连接
connection.connect();
   
  //统一执行 sql 语句
function exec(sql){
    const promise  = new Promise((resolve,reject)=>{
        connection.query(sql, (error, results, fields)=>{
            if (error) {
                reject(error);
                console.log('error', error);
            };
                resolve(results);
            });
            
        })
        return promise;
}

module.exports = {
    exec
}
  
