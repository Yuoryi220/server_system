const {bannerModel} = require("../models/bannerModel");




async function get(req, res, next) {
    let code, msg;
    const result = await bannerModel.find();
    msg = result.length == 0 ? "获取幻灯片列表失败" : "获取幻灯片列表成功";
    code = result.length == 0 ? 100 : 200;
    res.send({code, msg,result});
}

async function add(req, res, next) {
    try{
        const data  = req.body;
      const result=  await bannerModel.create(data);
        res.send({
            code:200,
            msg:'幻灯片新增成功',
            result
        })
    }catch(error){
        console.log(error);
        res.send({
            code:100,
            msg:'幻灯片新增失败，请重新操作'
        })
    }
}

async function remove(req, res, next) {
    try {
        const data = req.body;
        const result = await bannerModel.deleteOne(data);
        if(result.deletedCount > 0){
            res.send({
                code:200,
                msg:"幻灯片删除成功"
            })
        }else{
            res.send({
                code:100,
                msg:"幻灯片删除失败"
            })
        }
    } catch (error) {
        res.send({
            code:101,
            msg:"数据库操作失败"
        })
    }
}
async function getBannerById(req,res){
    try {
        const data = req.query;
        //console.log('data:',data);
        const result = await bannerModel.find(data);
        //console.log('result:',result);
        if(result.length > 0){
            res.send({
                code:200,
                msg:"幻灯片获取id成功",
                data: result
            })
        }else{
            res.send({
                code:100,
                msg:"幻灯片获取id失败",
                data:[]
            })
        }

    } catch (error) {
        res.send({
            code:101,
            msg:"数据库失败",
            data:[]
        })
    }
}


async function update(req, res, next) {
    try{
        const data=req.body;
        const result=await bannerModel.updateOne({_id:data._id},data);
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

module.exports = {get, add, remove, update,getBannerById}


