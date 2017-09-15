/**
 * Created by yuliang on 2017/9/14.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    // res.send('respond with a resource');
    res.sendFile(path.join(__dirname, '../views/study.html'));
    // res.redirect('https://router.vuejs.org/zh-cn/essentials/named-views.html');
});

module.exports = router;
