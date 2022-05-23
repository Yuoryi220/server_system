const {frendlinkModel} = require("../models/frendlinkModel");


async function get(req, res, next) {
    const data = req.query;
    console.log(req.query)
    let result = await frendlinkModel.find().limit(data.pageSize).skip(data.pageSize * (data.currentPage - 1)>0?data.pageSize * (data.currentPage - 1):0);
    const total = await frendlinkModel.countDocuments();
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
        const result = await frendlinkModel.find(data);
        if (result.length > 0) {
            res.send({
                code: 200,
                msg: "友情链接获取id成功",
                data: result
            })
        } else {
            res.send({
                code: 100,
                msg: "友情链接获取id失败",
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
    const result = await frendlinkModel.create(data);
    try {
        res.send({
            code: 200,
            msg: "录入友情链接成功"
        })
    } catch (error) {
        res.send({
            code: 100,
            msg: "录入友情链接失败"
        })
    }

}

async function remove(req, res, next) {
    const data = req.body;
    const result = await frendlinkModel.deleteOne(data);
    try {
        res.send({
            code: 200,
            msg: "删除友情链接成功"
        })
    } catch (error) {
        res.send({
            code: 100,
            msg: "删除友情链接失败"
        })
    }

}

async function update(req, res, next) {
    try {
        const data = req.body;
        const result = await frendlinkModel.updateOne({_id: data._id}, data);
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

module.exports = { get, add, remove, update, getId}


