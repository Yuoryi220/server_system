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
    await getFrendlink();
    await showFrendlink();
})


//翻页

$("#firstPage").click(function () {
    pageData.currentPage=1;
    showFrendlink();
})

$("#prePage").click(function () {
    while(pageData.currentPage>0){--pageData.currentPage};
    showFrendlink();
})

$("#nextPage").click(function () {
    ++pageData.currentPage;
    showFrendlink();
})
$("#lastPage").click(function () {
    pageData.currentPage=pageData.pages;
    showFrendlink();
})


//show=get+render
//查开始
showFrendlink();
console.log("js/frendlink");

async function showFrendlink() {
    const frendlinkData = await getFrendlink();
    renderFrendlink(frendlinkData);
}

function getFrendlink() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/frendlink/get',
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
                    resolve(data.result);
                }
            }
        })
    })
}

async function renderFrendlink(data) {
    console.log("data", data);
    const html = await data.map(item => (
        `  
        <tr>
         <td>${item._id} </td>
        <td>${item.name}</td>
        <td><img src="${item.thumb.replace("temp","images")}" alt="" width="30px"></td>
        <td>${item.link}</td>
        <td>${item.status}</td>
        <td>
        <button type="button"  data-toggle="modal" data-target="#updateModal" id="update" data-id="${item._id}" >编辑</button>
        </td>
        <td class="delete">
        <button type="button"  id="deleteBtn" data-id="${item._id}" >删除</button>
        </td>
       </tr>`)).join('');
    $("#frendlinkTb").html(html);

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
    $("#frendlinkTb").on("click","#update",async function () {
        const id = $(this).data('id');

        $.ajax({
            url:'/frendlink/getId',
            type:'GET',
            data:{_id:id},
            success({code,data}){
                if(code==200){
                    const [{_id,name,thumb,link,status}] = data;
                    $("#update-id").val(_id);
                    $("#update-name").val(name);
                    $("#updateModal .showImage").attr("src",thumb.replace("temp","images"));
                    $("#update-link").val(link);
                    $("#update-status").val(status);
                }
            }
        })
    })

    $("#updateBtn").click(function () {

        const _id = $('#update-id').val();
        const name=$("#update-name").val();
        const thumb= $('#updateModal .showImage').attr("src");
       const link= $("#update-link").val();
        const status =  $('#update-status').val();


        $.ajax({
            url: '/frendlink/update',
            type: 'post',
            data: {_id, name,thumb,link, status},
            success(res) {
                console.log("修改结果", res);
                if (res.code == 200) {
                    alert("修改数据完成");
                    showFrendlink();
                    $(location).attr('href', 'http://localhost:8000/frendlink.html');
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
    const thumb= $('#addModal .showImage').attr("src");
    const link=$("#add-link").val();
    const status =  $('#add-status').val();

    $.ajax({
        url: "/frendlink/add",
        type: "post",
        data: {_id, name,thumb, link, status},
        success(res) {
            console.log("用户添加结果", res);
        }
    })
})
//删除
$("#frendlinkTb").on("click", "#deleteBtn", async function () {
    const id = $(this).data('id');
    $.ajax({
        url: '/frendlink/remove',
        type: "post",
        data: {_id: id},
        success({code}) {
            if (code == 200) {
                alert("数据删除成功");
                showFrendlink();
            }
        }
    })
})




