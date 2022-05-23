const express = require('express');
const router = express.Router();
const {get,update} = require("../controllers/siteconfigController");
/* GET users listing. */


router.get('/get', get);

router.post('/update',update);

console.log("routes/siteconfig.js");

module.exports = router;