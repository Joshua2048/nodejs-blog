const { rejects } = require('assert');
const querystring = require('querystring');

const handleBlogServer = require("./src/router/blog");
const handleUserServer = require("./src/router/user");

// 处理postData
const handlePostData = (req) =>{
    const promise = new Promise((resolve,reject)=>{

        if(req.method !== 'POST'){
            resolve({});
            return ;
        }

        if(req.headers['content-type'] !=='application/json'){
            reslove({});
            return ;
        }

        let postData = '';
        req.on('data',chunk=>{
            postData += chunk.toString();
        })

        req.on('end',()=>{
            if(!postData){
                reslove({});
                return ;
            }
            resolve(JSON.parse(postData));
        })
    })
    return promise;
}

const handleServer = (req, res)=>{
    res.setHeader('Content-type','application/json');
    req.path = req.url.split('?')[0];
    req.query = querystring.parse(req.url.split('?')[1]);
    
    // 处理postData 数据
    handlePostData(req).then(postData=>{
        req.body = postData;
        // blog业务
        const blogData = handleBlogServer(req,res);
        if(blogData){
            blogData.then(blogData=>{
              res.end(JSON.stringify(blogData));
            })
            return ;
        }
        
        // user 业务
        const userData = handleUserServer(req,res);
        if(userData){
            userData.then(userData=>{
                 res.end(JSON.stringify(userData));
            })
            return ;
        }
    })
}

module.exports = handleServer;