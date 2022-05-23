//分页数据
const pageData={
    currentPage:1,//当前页
   //每页显示的条数
    total:0,//总条数
    pages:0//总页数
}
$("#pageSize").click(async function () {
    const pageSize=$("#pageSize option:selected").val();
    pageData.pageSize=pageSize;
    console.log(pageData.pageSize);
   await getUsers();
   await showUsers();
})


//翻页

$("#firstPage").click(function () {
    pageData.currentPage=1;
    showUsers();
})

$("#prePage").click(function () {
        while(pageData.currentPage>0){--pageData.currentPage};
    showUsers();
})

$("#nextPage").click(function () {
    ++pageData.currentPage;
    showUsers();
})
$("#lastPage").click(function () {
    pageData.currentPage=pageData.pages;
    showUsers();
})


//show=get+render
//查开始
showUsers();
console.log("js/users");

async function showUsers() {
    const usersData = await getUsers();
    renderUsers(usersData);
}

function getUsers() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/users/get',
            type: 'get',
            data:{
                currentPage:pageData.currentPage,
                pageSize:pageData.pageSize
            },
            success({code,data}) {
                console.log("page",data)
                if (code == 200) {
                    pageData.total=data.total;
                    pageData.pages=data.pages;
                    if(data.result!==[]){
                        resolve(data.result);
                    }

                }
            }
        })
    })
}

async function renderUsers(data) {
    console.log("data", data);

        const html = await data.map(item => (
            `  
        <tr>
        <td>${item.name}</td>
        <td>${item.nickname}</td>
        <td><img src="${item.thumb.replace("temp","images")}" alt="" width="30px"></td>
        <td>${item.group}</td>
        <td>${item.email}</td>
        <td>${item.tel}</td>
        <td>${item.status}</td>
        <td>
        <button type="button"  data-toggle="modal" data-target="#updateModal" id="update" data-id="${item._id}" >编辑</button>
        </td>
        <td class="delete">
        <button type="button"  id="deleteBtn" data-id="${item._id}" >删除</button>
        </td>
       </tr>`)).join('');
        $("#usersTb").html(html);



    $("#fillPageSize").html(pageData.total);

    //图片上传
    $("#updateModal .uploadImage").change(function (e) {
        // console.log('image upload');
        const files = e.target.files;
        // console.log(files[0]);
        const fd = new FormData();
        fd.append("file",files[0]);
        $.ajax({
            url:'/images/uploadImage',
            type:'post',
            data:fd,
            contentType:false,
            processData:false,
            cache:false,
            success(res){
                console.log("图片上传成功",res);
                $("#updateModal .showImage").attr("src",res.data);
            }
        })
    })

    $("#updateModal .addImage").click(function () {
        const imgSrc=$("#updateModal .showImage").attr("src");
        $.ajax({
            url:'/images/add',
            type:'POST',
            data:{imgSrc},
            success:(res)=>{
                alert("修改图片成功！");
                console.log("图片添加至服务器成功",res);
            }
        })
    })
    $("#addModal .uploadImage").change(function (e) {
        // console.log('image upload');
        const files = e.target.files;
        // console.log(files[0]);
        const fd = new FormData();
        fd.append("file",files[0]);
        $.ajax({
            url:'/images/uploadImage',
            type:'post',
            data:fd,
            contentType:false,
            processData:false,
            cache:false,
            success(res){
                console.log("图片上传成功",res);
                $("#addModal .showImage").attr("src",res.data);
            }
        })
    })

    $("#addModal .addImage").click(function () {
        const imgSrc=$("#addModal .showImage").attr("src");
        $.ajax({
            url:'/images/add',
            type:'POST',
            data:{imgSrc},
            success:(res)=>{
                alert("修改图片成功！");
                console.log("图片添加至服务器成功",res);
            }
        })
    })
    //修改
    $("#usersTb").on("click","#update",async function () {
        const id = $(this).data('id');

        $.ajax({
            url:'/users/getId',
            type:'GET',
            data:{_id:id},
            success({code,data}){
                if(code==200){
                    const [{_id,name,pwd,nickname,thumb,group,email,tel,status}] = data;
                    $("#update-id").val(_id);
                    $("#update-name").val(name);
                    $("#update-pwd").val(pwd);
                    $("#update-nickname").val(nickname);
                    $("#updateModal .showImage").attr("src",thumb.replace("temp","images"));
                    $("#update-group").val(group);
                    $("#update-email").val(email);
                    $("#update-tel").val(tel);
                    $("#update-status").val(status);
                }
            }
        })
    })

    $("#updateBtn").click(function () {

        const _id = $('#update-id').val();
        const name=$("#update-name").val();
        const pwd= $("#update-pwd").val();
        const nickname=$("#update-nickname").val();
        const thumb= $('#updateModal .showImage').attr("src");
        const email = $('#update-email').val();
        const group = $('#update-group').val();
        const tel=  $("#update-tel").val();
        const status =  $('#update-status').val();


        $.ajax({
            url: '/users/update',
            type: 'post',
            data: {_id, name,pwd,nickname,thumb,email, group,tel, status},
            success(res) {
                console.log("修改结果", res);
                if (res.code == 200) {
                    alert("修改数据完成");
                    showUsers();
                    $(location).attr('href', 'http://localhost:8000/user.html');
                }
            }
        })
    })

}
//修改结束
//查结束

//增加

$("#addBtn").click(function () {
    const _id = $('#add-id').val();
    const name=$("#add-name").val();
    const pwd= $("#add-pwd").val();
    const nickname=$("#add-nickname").val();
    const thumb= $('#addModal .showImage').attr("src");
    const email = $('#add-email').val();
    const group = $('#add-group').val();
    const tel=  $("#add-tel").val();
    const status =  $('#add-status').val();

    $.ajax({
        url: "/users/add",
        type: "post",
        data: {_id, name, pwd,nickname,thumb,email, group,tel, status},
        success(res) {
            console.log("用户添加结果", res);
        }
    })
})
//删除
$("#usersTb").on("click", "#deleteBtn", async function () {
    const id = $(this).data('id');
    $.ajax({
        url: '/users/remove',
        type: "post",
        data: {_id: id},
        success({code}) {
            if (code == 200) {
                alert("数据删除成功");
                showUsers();
            }
        }
    })
})




