/**
 * 场地管理管理初始化
 */
var Site = {
    id: "SiteTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Site.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: 'Id', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '场地名称', field: 'name', visible: true, align: 'center', valign: 'middle'},
            {title: '场地价格', field: 'price', visible: true, align: 'center', valign: 'middle'},
            {title: '场地状态', field: 'status', visible: true, align: 'center', valign: 'middle'},
            {title: '场地图片', field: 'pic', visible: true, align: 'center', valign: 'middle'},
            {title: '场地描述', field: 'desc', visible: true, align: 'center', valign: 'middle'},
            {title: '场地设备信息', field: 'deviceInfo', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
Site.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Site.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加场地管理
 */
Site.openAddSite = function () {
    var index = layer.open({
        type: 2,
        title: '添加场地管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/site/site_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看场地管理详情
 */
Site.openSiteDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '场地管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/site/site_update/' + Site.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除场地管理
 */
Site.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/site/delete", function (data) {
            Feng.success("删除成功!");
            Site.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("siteId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询场地管理列表
 */
Site.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Site.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Site.initColumn();
    var table = new BSTable(Site.id, "/site/list", defaultColunms);
    table.setPaginationType("client");
    Site.table = table.init();
});
