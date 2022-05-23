
//show=get+render
//查开始
showCates();
console.log("js/cates");

async function showCates() {
    const catesData = await getCates();
    renderCates(catesData);
}

function getCates() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/cates/get',
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

async function renderCates(data) {
    console.log("data", data);
    const html = await data.map(item => (
        `  
        <tr>
         <td>${item._id} </td>
        <td>${item.title}</td>
        <td>${item.sortInfo}</td>
        <td>
        <button type="button"  data-toggle="modal" data-target="#updateModal" id="update" data-id="${item._id}" >编辑</button>
        </td>
        <td class="delete">
        <button type="button"  id="deleteBtn" data-id="${item._id}" >删除</button>
        </td>
       </tr>`)).join('');
    $("#catesTb").html(html);


    //修改
    $("#catesTb").on("click","#update",async function () {
        const id = $(this).data('id');

        $.ajax({
            url:'/cates/getId',
            type:'GET',
            data:{_id:id},
            success({code,data}){
                if(code==200){
                    const [{_id,title,sortInfo}] = data;
                    $("#update-id").val(_id);
                    $("#update-title").val(title);
                    $("#update-sortInfo").val(sortInfo);

                }
            }
        })
    })

    $("#updateBtn").click(function () {

        const _id= $("#update-id").val();
        const title=$("#update-title").val();
        const sortInfo=$("#update-sortInfo").val();

        $.ajax({
            url: '/cates/update',
            type: 'post',
            data: {_id,title,sortInfo},
            success(res) {
                console.log("修改结果", res);
                if (res.code == 200) {
                    alert("修改数据完成");
                    showCates();
                    $(location).attr('href', 'http://localhost:8000/cates.html');
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
    const sortInfo=$("#add-sortInfo").val();

    $.ajax({
        url: "/cates/add",
        type: "post",
        data: {title,sortInfo},
        success(res) {
            console.log("栏目添加结果", res);
        }
    })
})
//删除
$("#catesTb").on("click", "#deleteBtn", async function () {
    const id = $(this).data('id');
    $.ajax({
        url: '/cates/remove',
        type: "post",
        data: {_id: id},
        success({code}) {
            if (code == 200) {
                alert("数据删除成功");
                showCates();
            }
        }
    })
})




