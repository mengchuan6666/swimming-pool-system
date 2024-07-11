/**
 * 教练管理管理初始化
 */
var Coach = {
    id: "CoachTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Coach.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: 'id', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '教练名称', field: 'name', visible: true, align: 'center', valign: 'middle'},
            {title: '教练简介', field: 'desc', visible: true, align: 'center', valign: 'middle'},
            {title: '教练照片', field: 'pic', visible: true, align: 'center', valign: 'middle'},
            {title: '添加时间', field: 'createTime', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
Coach.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Coach.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加教练管理
 */
Coach.openAddCoach = function () {
    var index = layer.open({
        type: 2,
        title: '添加教练管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/coach/coach_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看教练管理详情
 */
Coach.openCoachDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '教练管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/coach/coach_update/' + Coach.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除教练管理
 */
Coach.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/coach/delete", function (data) {
            Feng.success("删除成功!");
            Coach.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("coachId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询教练管理列表
 */
Coach.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Coach.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Coach.initColumn();
    var table = new BSTable(Coach.id, "/coach/list", defaultColunms);
    table.setPaginationType("client");
    Coach.table = table.init();
});
