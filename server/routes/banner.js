var express = require('express');
var router = express.Router();
const {get,add,remove,update,getBannerById} = require("../controllers/bannerController");
/* GET users listing. */


router.get('/get', get);
router.post('/add', add);
router.post('/remove', remove);
router.post('/update',update);
router.get('/getId',getBannerById);

console.log("routes/banner.js");

module.exports = router;