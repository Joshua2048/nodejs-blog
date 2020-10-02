const { exec } = require('../db/mysql');

// 获取列表
const getList = (author,keyword) =>{
    let sql = `select * from  blogs where 1=1 `;
    if(author){
        sql += `and author='${author}' `;
    }
    if(keyword){
        sql += `and title like '%${keyword}%' `;
    }
    sql += `order by createdtime desc;`;
    return exec(sql);
}

// 获取详情
const getDetail = (id) =>{
    let sql = `select * from blogs where id='${id}'`;
    return exec(sql).then(res=>{
        return res[0]
    })
}

// 创建博客
const newBlog = (blogData={}) => {
    const title = blogData.title;
    const content = blogData.content;
    const createdtime = Date.now();
    const author = blogData.author;

    const sql = `insert into blogs (title,content,createdtime,author) values 
    ('${title}','${content}','${createdtime}','${author}')`;

    return exec(sql).then(res=>{
        return {
            id: res.insertId
        }
    })
}

// 更新博客
const updateBlog = (id,blogData) => {
    const title = blogData.title;
    const content = blogData.content;
    const sql = `update blogs set title='${title}',content='${content}' where id=${id}`;
    return exec(sql).then(res=>{
        if(res.affectedRows > 0){
            return true;
        }
        return false;
    })
}

// 删除博客
const delBlog = (id,author) => {
    const sql = `delete from blogs where id=${id} and author='${author}'`;
    return exec(sql).then(res=>{
        if(res.affectedRows > 0){
            return true;
        }
        return false;
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}