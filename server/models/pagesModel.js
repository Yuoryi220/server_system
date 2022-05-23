//建模 ---开始（配置数据结构）
//导入mongoose
const { Schema, model } = require('mongoose');
//配置,利用schema
const pagesSchema = new Schema({
    title: String,
    des: String,
    thumb:String,
    content:String,
    url:String,
    sortInfo:Number,
    status:String
}, { versionKey: false });
//建立模型（给车起名）
const pagesModel = model('pagesModel', pagesSchema, 'pages');
//建模 ---结束

module.exports = {pagesModel}