//show=get+render
//查开始
showSiteconfig();
console.log("js/siteconfig");

async function showSiteconfig() {
    const siteconfigData = await getSiteconfig();
    renderSiteconfig(siteconfigData);
}

function getSiteconfig() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/siteconfig/get',
            type: 'get',
            success(res) {
                console.log("res.result[0]", res.result[0]);
                if (res.code == 200) {
                    resolve(res.result[0]);
                }
            }
        })
    })
}

function renderSiteconfig(data) {
    console.log("data", data);
    const logoSrc=data.logo.replace("temp","images");//修改temp路径为images路径！
    const str =
        `<form  id="update">
                    <input type="hidden" value="${data._id}" id="id">
                    <p>
                        QQ:<input type="text" value="${data.qq}" id="qq" className="form-control" placeholder="">
                    </p>
                    <p>
                        邮箱:<input type="text" value="${data.email}" id="email" className="form-control" placeholder="">
                    </p>
                    <p>
                        电话:<input type="text" value="${data.tel}" id="tel" className="form-control" placeholder="">
                    </p>
                    <p>
                        微信:<input type="text" value="${data.weixin}" id="weixin" className="form-control" placeholder="">
                    </p>
                    <p>
                        网站名:<input type="text" value="${data.sitename}" id="sitename" className="form-control" placeholder="">
                    </p>
                    <p>
                        logo:
                        <input type="file" value="${data.logo}" id="uploadImage"  className="form-control" placeholder="">
                           <img src="${logoSrc}" alt="" style="height:100px;" id="showImage">
                           <button type="button" id="addImage">确认图片</button>
                    </p>
                    <p>
                        <button type="button" class="btn btn-primary" id="updateBtn">修改</button>
                    </p>
                </form>`;
    $("#siteconfigTb").html(str);

//图片上传
    $("#uploadImage").change(function (e) {
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
                $("#showImage").attr("src",res.data);
            }
        })
    })

    $("#addImage").click(function () {
        const imgSrc=$("#showImage").attr("src");
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
    $("#updateBtn").click(function () {

        const _id=$('#id').val();
        const qq=$('#qq').val();
        const email=$('#email').val();
        const tel=$('#tel').val();
        const weixin=$('#weixin').val();
        const logo=$("#showImage").attr("src");
        console.log("logo",logo)
        const sitename=$('#sitename').val();


        $.ajax({
            url:'/siteconfig/update',
            type:'post',
            data:{_id,qq,email,tel,weixin,logo,sitename},
            success(res){
                console.log("修改结果",res);
                if(res.code==200){
                    alert("修改数据完成");
                    showSiteconfig();
                    $(location).attr('href','http://localhost:8000/siteconfig.html');
                }
            }
        })
    })
}

//查结束






