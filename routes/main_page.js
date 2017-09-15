/**
 * Created by yuliang on 2017/9/14.
 */
var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');

const sequelize = new Sequelize('go', 'root', '123456', {
    host: '10.103.191.100',
    dialect: 'mysql',

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

// List.sync({force: false}).then(function () {
//     // 已创建数据表
//     return List.create({
//         name: '1',
//         mId: '2',
//         imgList: '3',
//     });
// });


// List.destroy({where: {id: '1'}}).then(function (msg) {
//     console.log(msg);
// });

router.get('/list', async function (req, res, next) {
    // List.findAll().then(list => {
    //     res.send({
    //         code: 200,
    //         data: list
    //     })
    // });
    console.log(req.query.limit);
    console.log(req.query.offset);
    var aaaa = await List.findAndCountAll({
        'limit': parseInt(req.query.limit),
        'offset': parseInt(req.query.offset)
    }).then(list => {
        res.send({
            code: 200,
            data: list
        })
    });
    console.log(aaaa);
});

router.delete('/detail/:id', function (req, res, next) {
    // console.log('res', req.params.id);
    List.destroy({where: {id: req.params.id}}).then(function (msg) {
        console.log('delete msg:::', msg);
        res.send({
            code: 200,
            message: '删除成功',
            detail: msg
        })
    });
});

router.get('/detail/:id', function (req, res, next) {
    List.findById(req.params.id).then(project => {
        res.send({
            code: 200,
            data: project
        })
    })

});

router.put('/detail/:id', function (req, res, next) {
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
});

router.post('/detail/', function (req, res, next) {
    console.log(req.body);
    List.create(req.body).then(
        aa => {
            res.send({
                code: 200,
                message: '新增成功',
                data: aa
            })
        })

});

module.exports = router;
