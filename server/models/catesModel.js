//建模 ---开始（配置数据结构）
//导入mongoose
const { Schema, model } = require('mongoose');
//配置,利用schema
const catesSchema = new Schema({
    title: String,
    sortInfo:Number
}, { versionKey: false });
//建立模型（给车起名）
const catesModel = model('catesModel', catesSchema, 'cates');
//建模 ---结束

module.exports = {catesModel}