//建模 ---开始（配置数据结构）
//导入mongoose
const { Schema, model } = require('mongoose');

//配置,利用schema
const usersSchema = new Schema({
    name: String,
    pwd: String,
    nickname:String,
    thumb:String,
    group:String,
    email:String,
    tel:String,
    status:String
}, { versionKey: false });
//建立模型（给车起名）
const usersModel = model('usersModel', usersSchema, 'user');
//建模 ---结束

module.exports = {usersModel}