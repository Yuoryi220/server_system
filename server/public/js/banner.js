
//show=get+render
//查开始
showBanner();
console.log("js/banner");

async function showBanner() {
    const bannerData = await getBanner();
    renderBanner(bannerData);
}

function getBanner() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/banner/get',
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

async function renderBanner(data) {
    console.log("data", data);
    const html = await data.map(item => (
        `  
        <tr>
         <td>${item._id} </td>
        <td>${item.title}</td>
        <td><img src="${item.image.replace("temp","images")}" alt="" width="30px"></td>
        <td>${item.url}</td>
        <td>${item.group}</td>
        <td>${item.status}</td>
        <td>
        <button type="button"  data-toggle="modal" data-target="#updateModal" id="update" data-id="${item._id}" >编辑</button>
        </td>
        <td class="delete">
        <button type="button"  id="deleteBtn" data-id="${item._id}" >删除</button>
        </td>
       </tr>`)).join('');
    $("#bannerTb").html(html);
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
    $("#bannerTb").on("click","#update",async function () {
        const id = $(this).data('id');

        $.ajax({
            url:'/banner/getId',
            type:'GET',
            data:{_id:id},
            success({code,data}){
                if(code==200){
                    const [{_id,title,url,image,group,status}] = data;
                    $("#update-id").val(_id);
                    $("#update-title").val(title);
                    $("#updateModal .showImage").attr("src",image.replace("temp","images"));
                    $("#update-url").val(url);
                    $("#update-group").val(group);
                    $("#update-status").val(status);
                }
            }
        })
    })

    $("#updateBtn").click(function () {

        const _id = $('#update-id').val();
        const title = $('#update-title').val();
        const image = $('#updateModal .showImage').attr("src");
        const url = $('#update-url').val();
        const group = $('#update-group').val();
        const status =  $('#update-status').val();


        $.ajax({
            url: '/banner/update',
            type: 'post',
            data: {_id, title,url, image,group, status},
            success(res) {
                console.log("修改结果", res);
                if (res.code == 200) {
                    alert("修改数据完成");
                    showBanner();
                    $(location).attr('href', 'http://localhost:8000/banner.html');
                }
            }
        })
    })

}
//修改结束
//查结束

//增加

$("#addBtn").click(function () {
    const title = $("#banner-title").val();
    const image = $('#addModal .showImage').attr("src");
    const url = $("#banner-url").val();
    const group = parseInt($("#banner-group").val());
    const status = $("#banner-status").val();

    $.ajax({
        url: "/banner/add",
        type: "post",
        data: {title, image, url, group, status},
        success(res) {
            console.log("幻灯片添加结果", res);
        }
    })
})
//删除
$("#bannerTb").on("click", "#deleteBtn", async function () {
    const id = $(this).data('id');
    $.ajax({
        url: '/banner/remove',
        type: "post",
        data: {_id: id},
        success({code}) {
            if (code == 200) {
                alert("数据删除成功");
                showBanner();
            }
        }
    })
})




