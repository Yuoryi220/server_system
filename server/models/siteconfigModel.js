//建模 ---开始（配置数据结构）
//导入mongoose
const { Schema, model } = require('mongoose');
//配置,利用schema
const siteconfigSchema = new Schema({
    qq: String,
    email: String,
    tel:String,
    weixin:String,
    sitename:String,
    logo:String,
}, { versionKey: false });
//建立模型（给车起名）
const siteconfigModel = model('siteconfigModel', siteconfigSchema, 'siteconfig');
//建模 ---结束

module.exports = {siteconfigModel}