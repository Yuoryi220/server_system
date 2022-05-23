const searchData = {
    type:"",
    value:""
}


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
    await getnews();
    await showNews();
})


//翻页

$("#firstPage").click(function () {
    pageData.currentPage=1;
    showNews();
})

$("#prePage").click(function () {
    while(pageData.currentPage>0){--pageData.currentPage};
    showNews();
})

$("#nextPage").click(function () {
    ++pageData.currentPage;
    showNews();
})
$("#lastPage").click(function () {
    pageData.currentPage=pageData.pages;
    showNews();
})


//show=get+render
//查开始
showNews();
console.log("js/news");

async function showNews() {
    const newsData = await getnews();
    renderNews(newsData);
}

function getnews() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/news/get',
            type: 'get',
            data:{
                ...searchData,
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

async function renderNews(data) {
    console.log("data", data);

    const html = await data.map(item => (
        `  
        <tr>
        <td>${item._id} </td>
<td>${item.title}</td>
<td>${item.des}</td>
<td><img src="${item.thumb.replace("temp","images")}" alt="" width="30px"></td>
<td>${item.content}</td>
<td>${item.cateId}</td>
<td>${item.status}</td>
        <td>
        <button type="button"  data-toggle="modal" data-target="#updateModal" id="update" data-id="${item._id}" >编辑</button>
        </td>
        <td class="delete">
        <button type="button"  id="deleteBtn" data-id="${item._id}" >删除</button>
        </td>
       </tr>`)).join('');
    $("#newsTb").html(html);

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
    $("#newsTb").on("click","#update",async function () {
        const id = $(this).data('id');

        $.ajax({
            url:'/news/getId',
            type:'GET',
            data:{_id:id},
            success({code,data}){

                if(code==200){
                    const [{_id,title,des,thumb,cateId,content,status}] = data;
                    $("#update-id").val(_id);
                    $("#update-title").val(title);
                    $("#update-des").val(des);
                    $("#update-cateId").val(cateId);
                    $("#updateModal .showImage").attr("src",thumb.replace("temp","images"));
                    $("#update-content").val(content);
                    $("#update-status").val(status);
                }
            }
        })
    })

    $("#updateBtn").click(function () {

        const _id = $('#update-id').val();
        const title=$("#update-title").val();
        const des= $("#update-des").val();
        const cateId=$("#update-cateId").val();
        const thumb= $('#updateModal .showImage').attr("src");
        const content = $('#update-content').val();
        const status =  $('#update-status').val();


        $.ajax({
            url: '/news/update',
            type: 'post',
            data: {_id,title,des,thumb,cateId,content,status},
            success(res) {
                console.log("修改结果", res);
                if (res.code == 200) {
                    alert("修改数据完成");
                    showNews();
                    $(location).attr('href', 'http://localhost:8000/news.html');
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
    const title=$("#add-title").val();
    const des= $("#add-des").val();
    const cateId=$("#add-cateId").val();
    const thumb= $('#addModal .showImage').attr("src");
    const content = $('#add-content').val();
    const status =  $('#add-status').val();

    $.ajax({
        url: "/news/add",
        type: "post",
        data: {_id,title,des,thumb,cateId,content,status},
        success(res) {
            console.log("添加结果", res);
        }
    })
})
//删除
$("#newsTb").on("click", "#deleteBtn", async function () {
    const id = $(this).data('id');
    $.ajax({
        url: '/news/remove',
        type: "post",
        data: {_id: id},
        success({code}) {
            if (code == 200) {
                alert("数据删除成功");
                showNews();
            }
        }
    })
})

//搜索
$("#searchValue").blur(async function () {
    searchData.type = $("#searchType").val();
    searchData.value = $("#searchValue").val();
   await showNews();
})



