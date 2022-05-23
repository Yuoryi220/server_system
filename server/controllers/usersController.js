const {usersModel} = require("../models/userModel");
const jwt=require("jsonwebtoken");//验签码

async function login(req, res, next) {
    let code, msg,token;

    const result = await usersModel.find(req.body);
    console.log("result[0]",result[0]);
    msg = result.length == 0 ? "用户名密码错误" : "登录成功";
    code = result.length == 0 ? 100 : 200;
    if(code==200){
        token=jwt.sign(
            {user:result[0]},
            'user',
            {expiresIn: 3000}
        )
    }
    res.send({code, msg,token:'Bearer '+token});
}

async function getUsers(req, res, next) {
    const data = req.query;
    console.log(req.query);
    let result = await usersModel.find().limit(data.pageSize).skip(data.pageSize * (data.currentPage - 1)>0?data.pageSize * (data.currentPage - 1):0);
    const total = await usersModel.countDocuments();
    const pages = Math.ceil(total / data.pageSize);
    try {
        res.send({
            code: 200,
            msg: "获取成功",
            data: {result, total, pages}
        })
    } catch (error) {
        res.send({
            code: 100,
            msg: "data.currentPage-1为负数"
        })

    }

}

async function getId(req, res, next) {
    try {
        const data = req.query;
        const result = await usersModel.find(data);
        if (result.length > 0) {
            res.send({
                code: 200,
                msg: "用户获取id成功",
                data: result
            })
        } else {
            res.send({
                code: 100,
                msg: "用户获取id失败",
                data: []
            })
        }

    } catch (error) {
        res.send({
            code: 101,
            msg: "数据库失败",
            data: []
        })
    }
}

async function addUsers(req, res, next) {
    const data = req.body;
    const result = await usersModel.create(data);
    try {
        res.send({
            code: 200,
            msg: "录入用户成功"
        })
    } catch (error) {
        res.send({
            code: 100,
            msg: "录入用户失败"
        })
    }

}

async function deleteUsers(req, res, next) {
    const data = req.body;
    const result = await usersModel.deleteOne(data);
    try {
        res.send({
            code: 200,
            msg: "删除用户成功"
        })
    } catch (error) {
        res.send({
            code: 100,
            msg: "删除用户失败"
        })
    }

}

async function updateUsers(req, res, next) {
    try {
        const data = req.body;
        const result = await usersModel.updateOne({_id: data._id}, data);
        console.log("后台修改的结果", result);
        if (result.modifiedCount > 0) {
            res.send({
                code: 200,
                msg: "数据更新成功"
            })
        } else {
            res.send({
                code: 100,
                msg: "数据更新失败"
            })
        }
    } catch (error) {
        res.send({
            code: 101,
            msg: "数据库失败"
        })
    }
}

async function getUserAuth(req,res){
    //获取header头部验签码肿的信息
const token=req.get('Authorization').split(' ')[1];
const passToken=jwt.verify(token,'user');//解验签码

    res.send({
        code:200,
        msg:"getUserAuth",
        data:passToken.user
    })
}

module.exports = {login, getUsers, addUsers, deleteUsers, updateUsers, getId,getUserAuth}


