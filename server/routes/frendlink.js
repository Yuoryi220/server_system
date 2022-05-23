var express = require('express');
var router = express.Router();
const {get,add,remove,update,getId} = require("../controllers/frendlinkController");
/* GET users listing. */


router.get('/get', get);
router.post('/add', add);
router.post('/remove', remove);
router.post('/update',update);
router.get('/getId',getId);

console.log("routes/frendlink.js");

module.exports = router;