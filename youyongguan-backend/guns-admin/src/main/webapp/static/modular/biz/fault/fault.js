/**
 * 故障管理管理初始化
 */
var Fault = {
    id: "FaultTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Fault.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: 'id', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '故障名', field: 'name', visible: true, align: 'center', valign: 'middle'},
            {title: '故障详情', field: 'desc', visible: true, align: 'center', valign: 'middle'},
            {title: '故障设备', field: 'deviceName', visible: true, align: 'center', valign: 'middle'},
            {title: '图片url', field: 'pic', visible: true, align: 'center', valign: 'middle'},
            {title: '上报状态', field: 'status', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
Fault.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Fault.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加故障管理
 */
Fault.openAddFault = function () {
    var index = layer.open({
        type: 2,
        title: '添加故障管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/fault/fault_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看故障管理详情
 */
Fault.openFaultDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '故障管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/fault/fault_update/' + Fault.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除故障管理
 */
Fault.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/fault/delete", function (data) {
            Feng.success("删除成功!");
            Fault.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("faultId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询故障管理列表
 */
Fault.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Fault.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Fault.initColumn();
    var table = new BSTable(Fault.id, "/fault/list", defaultColunms);
    table.setPaginationType("client");
    Fault.table = table.init();
});
