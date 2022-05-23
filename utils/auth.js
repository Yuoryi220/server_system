const expressJWT=require('express-jwt');
//解验签码
const jwtAuth=expressJWT({
    secret:'user',//密钥
    algorithms:['HS256'],//固定的JWT算法
    //设置为false，表示如果不带token的请求，就不进行验证
    //设置为true，表示请求带不带token都要验证，如果不带token则直接表示验证失败
    credentialsRequired:false
}).unless({
    path:'/users/login'
});
module.exports=jwtAuth;
