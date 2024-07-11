/**
 * 会员管理管理初始化
 */
var Vip = {
    id: "VipTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Vip.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: 'Id', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '用户名', field: 'username', visible: true, align: 'center', valign: 'middle'},
            {title: '密码', field: 'password', visible: true, align: 'center', valign: 'middle'},
            {title: '账号', field: 'nickname', visible: true, align: 'center', valign: 'middle'},
            {title: '手机号', field: 'phone', visible: true, align: 'center', valign: 'middle'},
            {title: '邮件', field: 'email', visible: true, align: 'center', valign: 'middle'},
            {title: '创建时间', field: 'createtime', visible: true, align: 'center', valign: 'middle'},
            {title: '余额', field: 'money', visible: true, align: 'center', valign: 'middle'},
            {title: '头像', field: 'pic', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
Vip.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Vip.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加会员管理
 */
Vip.openAddVip = function () {
    var index = layer.open({
        type: 2,
        title: '添加会员管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/vip/vip_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看会员管理详情
 */
Vip.openVipDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '会员管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/vip/vip_update/' + Vip.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除会员管理
 */
Vip.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/vip/delete", function (data) {
            Feng.success("删除成功!");
            Vip.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("vipId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询会员管理列表
 */
Vip.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Vip.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Vip.initColumn();
    var table = new BSTable(Vip.id, "/vip/list", defaultColunms);
    table.setPaginationType("client");
    Vip.table = table.init();
});
