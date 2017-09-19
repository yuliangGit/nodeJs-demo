/**
 * Created by yuliang on 2017/9/14.
 */
var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');

const sequelize = new Sequelize('front_demo', 'root', 'Lenovo', {
    host: '172.29.2.167',
    dialect: 'mysql',
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    // SQLite only
    // storage: 'path/to/database.sqlite'
});


// sequelize.authenticate().then(function () {
//     console.log('Connection has been established successfully.');
// });

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


const List = sequelize.define('list', {
    name: {
        type: Sequelize.STRING
    },
    mId: {
        type: Sequelize.STRING
    },
    imgList: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true // Model 对应的表名将与model名相同
});

// list
router.get('/list', async function (req, res, next) {
    try {
        req.query.limit = req.query.limit ? req.query.limit : 10;
        req.query.offset = req.query.offset ? req.query.offset : 0;
        var aaaa = await List.findAndCountAll({
            'limit': parseInt(req.query.limit),
            'offset': parseInt(req.query.offset)
        }).then(list => {
            res.send({
                code: 200,
                data: list
            })
        });
    } catch (err) {
        next(err)
    }

});

// delete
router.delete('/detail/:id', function (req, res, next) {
    // console.log('res', req.params.id);
    try {
        List.destroy({where: {id: req.params.id}}).then(function (msg) {
            console.log('delete msg:::', msg);
            res.send({
                code: 200,
                message: '删除成功',
                detail: msg
            })
        });
    } catch (err) {
        next(err)
    }
});

// get
router.get('/detail/:id', function (req, res, next) {
    try {
        List.findById(req.params.id).then(project => {
            res.send({
                code: 200,
                data: project
            })
        });
    } catch (err) {
        next(err)
    }
});

// edit
router.put('/detail/:id', function (req, res, next) {
    try {
        List.update(req.body,
            {
                where: {
                    id: req.params.id
                }
            }
        ).then(project => {
            res.send({
                code: 200,
                message: '修改成功',
            })
        })
    } catch (err) {
        next(err)
    }
});

// add
router.post('/detail/', function (req, res, next) {
    try {
        List.create(req.body).then(
            aa => {
                res.send({
                    code: 200,
                    message: '新增成功',
                    data: aa
                })
            })
    } catch (err) {
        next(err)
    }
});


// 图片上传模块
var multer = require('multer');
var storage = multer.diskStorage({
    destination: './public/files',
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({storage: storage});
var fs = require('fs');

router.post('/file1/', upload.single('file'), function (req, res, next) {
    try {
        res.send(req.file.path)
    } catch (err) {
        next(err)
    }
});

module.exports = router;
