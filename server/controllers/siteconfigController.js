const {moveFiles,deleteFiles}=require('../../utils/handleFiles');
const path=require('path');
const {siteconfigModel} = require("../models/siteconfigModel");

console.log("siteconfigController");

async function get(req, res, next) {
    let code, msg;
    const result = await siteconfigModel.find();
    msg = result.length == 0 ? "获取网站配置列表失败" : "获取网站配置列表成功";
    code = result.length == 0 ? 100 : 200;
    res.send({code, msg,result});
}



async function update(req, res, next) {
    try{
        const data=req.body;
        const result=await siteconfigModel.updateOne({_id:data._id},data);
        console.log("后台修改的结果",result);
        if(result.modifiedCount>0){
            res.send({
                code:200,
                msg:"数据更新成功"
            })
        }else{
            res.send({
                code:100,
                msg:"数据更新失败"
            })
        }
    }catch(error){
        res.send({
            code:101,
            msg:"数据库失败"
        })
    }
}

module.exports = {get,update}


