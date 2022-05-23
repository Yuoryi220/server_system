
//show=get+render
//查开始
showPages();
console.log("js/pages");

async function showPages() {
    const pagesData = await getPages();
    renderPages(pagesData);
}

function getPages() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/pages/get',
            type: 'get',
            success(res) {
                console.log("res.result", res.result);
                if (res.code == 200) {
                    resolve(res.result);
                }
            }
        })
    })
}

async function renderPages(data) {
    console.log("data", data);
    const html = await data.map(item => (
        `  
        <tr>
        <td>${item.title}</td>
        <td><img src="${item.thumb.replace("temp","images")}" alt="" height="30px"></td>
        <td>${item.url}</td>
        <td>${item.sortInfo}</td>
        <td>${item.status}</td>
        <td>
        <button type="button"  data-toggle="modal" data-target="#updateModal" id="update" data-id="${item._id}" >编辑</button>
        </td>
        <td class="delete">
        <button type="button"  id="deleteBtn" data-id="${item._id}" >删除</button>
        </td>
       </tr>`)).join('');
    $("#pagesTb").html(html);
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
    $("#pagesTb").on("click","#update",async function () {
        const id = $(this).data('id');

        $.ajax({
            url:'/pages/getId',
            type:'GET',
            data:{_id:id},
            success({code,data}){
                if(code==200){
                    const [{_id,title,des,thumb,content,url,sortInfo,status}] = data;
                    $("#update-id").val(_id);
                    $("#update-title").val(title);
                    $("#update-des").val(des);
                    $("#updateModal .showImage").attr("src",thumb.replace("temp","images"));
                    $("#update-content").val(content);
                    $("#update-url").val(url);
                    $("#update-sortInfo").val(sortInfo);
                    $("#update-status").val(status);
                }
            }
        })
    })

    $("#updateBtn").click(function () {

       const _id= $("#update-id").val();
        const title=$("#update-title").val();
        const des=$("#update-des").val();
        const thumb= $('#updateModal .showImage').attr("src");
        const content=$("#update-content").val();
        const url=$("#update-url").val();
        const sortInfo=$("#update-sortInfo").val();
        const status=$("#update-status").val();


        $.ajax({
            url: '/pages/update',
            type: 'post',
            data: {_id, title,des,thumb,content,url, sortInfo, status},
            success(res) {
                console.log("修改结果", res);
                if (res.code == 200) {
                    alert("修改数据完成");
                    showPages();
                    $(location).attr('href', 'http://localhost:8000/pages.html');
                }
            }
        })
    })

}
//修改结束
//查结束

//增加

$("#addBtn").click(function () {

    const title=$("#add-title").val();
    const des=$("#add-des").val();
    const thumb= $('#addModal .showImage').attr("src");
    const content=$("#add-content").val();
    const url=$("#add-url").val();
    const sortInfo=$("#add-sortInfo").val();
    const status=$("#add-status").val();

    $.ajax({
        url: "/pages/add",
        type: "post",
        data: {title,des,thumb,content,url,sortInfo,status},
        success(res) {
            console.log("单页面添加结果", res);
        }
    })
})
//删除
$("#pagesTb").on("click", "#deleteBtn", async function () {
    const id = $(this).data('id');
    $.ajax({
        url: '/pages/remove',
        type: "post",
        data: {_id: id},
        success({code}) {
            if (code == 200) {
                alert("数据删除成功");
                showPages();
            }
        }
    })
})




