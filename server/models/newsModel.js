//建模 ---开始（配置数据结构）
//导入mongoose
const { Schema, model } = require('mongoose');
//配置,利用schema
const newsSchema = new Schema({
    title: String,
    des: String,
    thumb:String,
    content:String,
    cateId:String,
    status:String
}, { versionKey: false });
//建立模型（给车起名）
const newsModel = model('newsModel', newsSchema, 'news');
//建模 ---结束

module.exports = {newsModel}