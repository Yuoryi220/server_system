const {newsModel} = require("../models/newsModel");


async function get(req, res, next) {
    const data = req.query;
    console.log("req.query",req.query);
    data.type = data.value ? data.type  : '';
    let result = await newsModel.find({[data.type]:{$regex:data.value,$options:'$i'}}).limit(data.pageSize).skip(data.pageSize * (data.currentPage - 1)>0?data.pageSize * (data.currentPage - 1):0);
    const total = await newsModel.countDocuments({[data.type]:{$regex:data.value,$options:'$i'}});
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
        const result = await newsModel.find(data);
        if (result.length > 0) {
            res.send({
                code: 200,
                msg: "新闻获取id成功",
                data: result
            })
        } else {
            res.send({
                code: 100,
                msg: "新闻获取id失败",
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

async function add(req, res, next) {
    const data = req.body;
    const result = await newsModel.create(data);
    try {
        res.send({
            code: 200,
            msg: "录入新闻成功"
        })
    } catch (error) {
        res.send({
            code: 100,
            msg: "录入新闻失败"
        })
    }

}

async function remove(req, res, next) {
    const data = req.body;
    const result = await newsModel.deleteOne(data);
    try {
        res.send({
            code: 200,
            msg: "删除新闻成功"
        })
    } catch (error) {
        res.send({
            code: 100,
            msg: "删除新闻失败"
        })
    }

}

async function update(req, res, next) {
    try {
        const data = req.body;
        console.log("hi",data)
        const result = await newsModel.updateOne({_id: data._id}, data);

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

module.exports = { get, add, remove, update, getId}


