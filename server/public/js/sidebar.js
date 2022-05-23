// 左侧菜单点击展开收起
$('dt').click(function () {
    $(this).nextAll().slideToggle();
})
$('dd').click(function () {
    $('dd').removeClass('active');
    $(this).addClass('active');
})

refresh();

function refresh() {
    $('.section-content').hide();
    const nodeId = location.hash.slice(2);
    if (nodeId) {
        $(`#${nodeId}`).show();
    }
}


$('dd a').click(function () {
    $('.section-content').hide();
    const nodeId = $(this).attr('href').slice(2);
    $(`#${nodeId}`).show();
})


$('#usersTb').on('click', 'a', function () {
    if ($(this).text() === '修改') {
        $('.section-content').hide();
        const nodeId = $(this).attr('href').slice(2);
        $(`#${nodeId}`).show();
    }
})

$('#siteconfigTb').on('click', 'a', function () {
    if ($(this).text() === '修改') {
        $('.section-content').hide();
        const nodeId = $(this).attr('href').slice(2);
        $(`#${nodeId}`).show();
    }
})

$('#bannerTb').on('click', 'a', function () {
    if ($(this).text() === '修改') {
        $('.section-content').hide();
        const nodeId = $(this).attr('href').slice(2);
        $(`#${nodeId}`).show();
    }
})

$('#pagesTb').on('click', 'a', function () {
    if ($(this).text() === '修改') {
        $('.section-content').hide();
        const nodeId = $(this).attr('href').slice(2);
        $(`#${nodeId}`).show();
    }
})
$('#catesTb').on('click', 'a', function () {
    if ($(this).text() === '修改') {
        $('.section-content').hide();
        const nodeId = $(this).attr('href').slice(2);
        $(`#${nodeId}`).show();
    }
})
$('#frendlinkTb').on('click', 'a', function () {
    if ($(this).text() === '修改') {
        $('.section-content').hide();
        const nodeId = $(this).attr('href').slice(2);
        $(`#${nodeId}`).show();
    }
})