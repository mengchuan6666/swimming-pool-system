/**
 * 充值管理管理初始化
 */
var Charge = {
    id: "ChargeTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Charge.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: 'id', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '会员名', field: 'userName', visible: true, align: 'center', valign: 'middle'},
            {title: '充值金额', field: 'amount', visible: true, align: 'center', valign: 'middle'},
            {title: '充值状态', field: 'status', visible: true, align: 'center', valign: 'middle'},
            {title: '充值时间', field: 'startTime', visible: true, align: 'center', valign: 'middle'},
            {title: '结束时间', field: 'endTime', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
Charge.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Charge.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加充值管理
 */
Charge.openAddCharge = function () {
    var index = layer.open({
        type: 2,
        title: '添加充值管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/charge/charge_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看充值管理详情
 */
Charge.openChargeDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '充值管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/charge/charge_update/' + Charge.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除充值管理
 */
Charge.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/charge/delete", function (data) {
            Feng.success("删除成功!");
            Charge.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("chargeId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询充值管理列表
 */
Charge.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Charge.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Charge.initColumn();
    var table = new BSTable(Charge.id, "/charge/list", defaultColunms);
    table.setPaginationType("client");
    Charge.table = table.init();
});
