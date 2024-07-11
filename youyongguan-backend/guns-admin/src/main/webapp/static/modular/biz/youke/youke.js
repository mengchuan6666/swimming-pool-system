/**
 * 游客管理管理初始化
 */
var Youke = {
    id: "YoukeTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Youke.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: 'Id', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '用户名', field: 'username', visible: true, align: 'center', valign: 'middle'},
            {title: '密码', field: 'password', visible: true, align: 'center', valign: 'middle'},
            {title: '账号', field: 'nickname', visible: true, align: 'center', valign: 'middle'},
            {title: '手机号', field: 'phone', visible: true, align: 'center', valign: 'middle'},
            {title: '邮件', field: 'email', visible: true, align: 'center', valign: 'middle'},
            {title: '', field: 'createtime', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
Youke.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Youke.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加游客管理
 */
Youke.openAddYouke = function () {
    var index = layer.open({
        type: 2,
        title: '添加游客管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/youke/youke_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看游客管理详情
 */
Youke.openYoukeDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '游客管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/youke/youke_update/' + Youke.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除游客管理
 */
Youke.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/youke/delete", function (data) {
            Feng.success("删除成功!");
            Youke.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("youkeId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询游客管理列表
 */
Youke.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Youke.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Youke.initColumn();
    var table = new BSTable(Youke.id, "/youke/list", defaultColunms);
    table.setPaginationType("client");
    Youke.table = table.init();
});
