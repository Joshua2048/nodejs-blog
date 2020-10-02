const {login} = require("../controller/login");
const { successModel , errorModel} = require("../model/resModel");

const handleUserServer = (req, res) => {

    // 登录用户
    if(req.method === 'POST' && req.url === '/api/user/login'){
        const { username,password } = req.body;
        const result = login(username,password);
        if(result){
          return result.then(res=>{
                if(res.username){
                    return new successModel('登录成功');
                }else{
                    return new errorModel('登录失败');
                }
            })
        }
    }
}
module.exports = handleUserServer;