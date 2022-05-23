//建模 ---开始（配置数据结构）
//导入mongoose
const { Schema, model } = require('mongoose');
//配置,利用schema
const frendlinkSchema = new Schema({
    name: String,
    thumb:String,
    link:String,
    status:String
}, { versionKey: false });
//建立模型（给车起名）
const frendlinkModel = model('frendlinkModel', frendlinkSchema, 'frendlink');
//建模 ---结束

module.exports = {frendlinkModel}