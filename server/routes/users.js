
var express = require('express');
var router = express.Router();
const {getId,login,getUsers,addUsers,deleteUsers,updateUsers,getUserAuth} = require("../controllers/usersController");
/* GET users listing. */

router.post('/login', login);
router.get('/get', getUsers);
router.post('/add', addUsers);
router.post('/remove', deleteUsers);
router.post('/update',updateUsers);
router.get('/getId',getId);
router.get('/getUserAuth',getUserAuth);

console.log("routes/users.js");

module.exports = router;
