/**
 * 场地详情管理管理初始化
 */
var SiteDetai = {
    id: "SiteDetaiTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
SiteDetai.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: 'id', field: 'id', visible: true, align: 'center', valign: 'middle'},
        {title: '预约场地', field: 'name', visible: true, align: 'center', valign: 'middle'},

        {title: '预定日期', field: 'orderDate', visible: true, align: 'center', valign: 'middle'},
            {title: '预定时间', field: 'orderTime', visible: true, align: 'center', valign: 'middle'},

        {title: '用户名', field: 'userName', visible: true, align: 'center', valign: 'middle'},

        {title: '审批状态', field: 'status', visible: true, align: 'center', valign: 'middle'},
            {title: '预约人数', field: 'num', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
SiteDetai.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        SiteDetai.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加场地详情管理
 */
SiteDetai.openAddSiteDetai = function () {
    var index = layer.open({
        type: 2,
        title: '添加场地详情管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/siteDetai/siteDetai_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看场地详情管理详情
 */
SiteDetai.openSiteDetaiDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '场地详情管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/siteDetai/siteDetai_update/' + SiteDetai.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除场地详情管理
 */
SiteDetai.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/siteDetai/delete", function (data) {
            Feng.success("删除成功!");
            SiteDetai.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("siteDetaiId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询场地详情管理列表
 */
SiteDetai.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    SiteDetai.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = SiteDetai.initColumn();
    var table = new BSTable(SiteDetai.id, "/siteDetai/list", defaultColunms);
    table.setPaginationType("client");
    SiteDetai.table = table.init();
});
