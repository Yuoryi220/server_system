const token = localStorage.token;
if (token) {
    //预设ajax参数
    $.ajaxSetup({
        headers: {
            'Authorization': token
        }, error(err) {
            if (err.status == 401) {
                alert("登录已经过期，请重新登录");
                location.href = ("/login.html");
            }

        }
    })
    //本地有token
    $.ajax({
        url: '/users/getUserAuth',
        type: "get",
        success(res) {
            console.log("getUserAuth的前端返回", res);
        }
    })
} else {
    alert("您还没有登录，请先登录");
    location.href = '../login.html';
}