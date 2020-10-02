const env = process.env.NODE_ENV;//环境变量

//配置
let MYSQL_CONF;

if(env === 'development'){
    MYSQL_CONF = {
        'host' : 'localhost',
        'user' : 'root',
        'password' : '123456789',
        'database' : 'my_blog'
    };
}
if(env ==='production'){
    MYSQL_CONF = {
        'host' : 'localhost',
        'user' : 'root',
        'password' : '123456789',
        'database' : 'my_blog'
    };
};

module.exports = {
    MYSQL_CONF
}