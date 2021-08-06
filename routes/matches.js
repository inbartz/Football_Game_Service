var express = require("express");
const DButils = require("./utils/DButils");
var router = express.Router();

router.get('/', async (req, res, next)=> {
    await DButils.create_table();
    res.send('Hello World2');
})

module.exports = router;