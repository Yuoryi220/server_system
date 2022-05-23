const express = require('express');
const {moveFiles, deleteFiles} = require("../utils/handleFiles");
const router = express.Router();
const {uploadFiles} = require('../utils/handleFiles');

router.post('/uploadImage', function (req, res, next) {
    const uploadImage = uploadFiles({
        dir: './public/temp'
    });
    uploadImage(req, res, (error) => {
        if (error) {
            console.log("图片上传失败", error);
        } else {
            console.log("图片上传成功");
            console.log(req.files);
            res.send({
                message: '图片上传成功',
                code: 200,
                data: './temp/' + req.files[0].filename
            })
        }
    })
});

router.post('/add',function (req,res) {
    const data=req.body;
    const filename=data.imgSrc.substring(data.imgSrc.lastIndexOf('/')+1);
    moveFiles({
        fromPath:'./public/temp',
        toPath:'./public/images',
        filename
    });
    deleteFiles('./public/temp');
    res.send({
        code:200,
        msg:'保存成功'
    })
})
module.exports = router;