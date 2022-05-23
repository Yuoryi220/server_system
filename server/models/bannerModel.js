//建模 ---开始（配置数据结构）
//导入mongoose
const { Schema, model } = require('mongoose');
//配置,利用schema
const bannerSchema = new Schema({
    title: String,
    image:String,
    url:String,
    group:Number,
    status:String
}, { versionKey: false });
//建立模型（给车起名）
const bannerModel = model('bannerModel', bannerSchema, 'banner');
//建模 ---结束

module.exports = {bannerModel}