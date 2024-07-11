/**
 * 设施表管理初始化
 */
var Facilities = {
    id: "FacilitiesTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Facilities.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: 'id', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '设施名称', field: 'name', visible: true, align: 'center', valign: 'middle'},
            {title: '设施描述', field: 'desc', visible: true, align: 'center', valign: 'middle'},
            {title: '设施图片', field: 'pic', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
Facilities.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Facilities.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加设施表
 */
Facilities.openAddFacilities = function () {
    var index = layer.open({
        type: 2,
        title: '添加设施表',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/facilities/facilities_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看设施表详情
 */
Facilities.openFacilitiesDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '设施表详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/facilities/facilities_update/' + Facilities.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除设施表
 */
Facilities.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/facilities/delete", function (data) {
            Feng.success("删除成功!");
            Facilities.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("facilitiesId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询设施表列表
 */
Facilities.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Facilities.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Facilities.initColumn();
    var table = new BSTable(Facilities.id, "/facilities/list", defaultColunms);
    table.setPaginationType("client");
    Facilities.table = table.init();
});
