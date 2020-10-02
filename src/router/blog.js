const { successModel , errorModel} = require("../model/resModel");
const { getList,getDetail,newBlog,updateBlog,delBlog } = require('../controller/blog');

const handleBlogServer = (req, res)=>{
    console.log(req.method,'req');
    // 获取帖子列表 
    if(req.method === 'GET' && req.path === '/api/blog/list'){
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const result = getList(author,keyword);
        return result.then(listData=>{
            return new successModel(listData);
        })
    };

    //获取帖子详情
    if(req.method === 'GET' && req.path === '/api/blog/detail'){
        const id = req.query.id || '';
        const result =  getDetail(id);
        return result.then(data=>{
            return new successModel(data);
        }).catch(()=>{
            return new errorModel();
        })
    };

    //创建帖子
    if(req.method === 'POST' && req.path === '/api/blog/new'){
        const blogData = req.body;
        const author = '张三';
        req.body.author = author;
        const result = newBlog(blogData);
        return  result.then(data=>{
                return new successModel(data);
             })
            
    };
    
    //更新帖子
    if(req.method === 'POST' && req.path == '/api/blog/update'){
        const id = req.query.id || '';
        const blogData = req.body;
        const author = '张三';
        req.body.author = author;
        const result = updateBlog(id,blogData);
        if(result){
          return result.then(val=>{
                if(val){
                    return new successModel();
                }else{
                    return new errorModel();
                }
            })
        }
    }
    //删除一篇博客
    if(req.method === 'DELETE' && req.path === '/api/blog/del'){
        const id = req.query.id || '';
        const author = '张三';
        req.body.author = author;
        const result = delBlog(id,author);
        if(result){
            return result.then(val=>{
                  if(val){
                      return new successModel();
                  }else{
                      return new errorModel();
                  }
              })
          }
    };
}

module.exports = handleBlogServer;