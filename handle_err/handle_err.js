/**
 * Created by yuliang on 2017/9/19.
 */
var handle_err = function (err, req, res, next) {
    // 打印错误
    console.error('logErrors::::', err.stack);

    // req.xhr判断请求来自ajax还是普通请求；
    console.log('req.xhr::::', req.xhr);
    if (req.xhr) {
        res.status(err.status || 400).send({error: err.message || '请求错误'});
    }

    res.status(err.status || 500).send({error: err.message || '系统错误'});
}
module.exports = handle_err;

//
// // 打印错误
// function logErrors(err, req, res, next) {
//     console.error('logErrors::::', err.stack);
//     next(err);
// }
// // 客户款错误处理
// function clientErrorHandler(err, req, res, next) {
//     // req.xhr判断请求来自ajax还是普通请求；
//     console.log('req.xhr::::', req.xhr);
//     if (req.xhr) {
//         res.status(err.status || 400).send({error: err.message || '请求错误'});
//     } else {
//         next(err);
//     }
// }
// // 全局报错日志
// function errorHandler(err, req, res, next) {
//     res.status(err.status || 500).send({error: err.message || '系统错误'});
// }