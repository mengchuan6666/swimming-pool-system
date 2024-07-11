/**
 * 商品详情管理管理初始化
 */
var ProductDetai = {
    id: "ProductDetaiTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
ProductDetai.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: 'id', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '预定日期', field: 'orderDate', visible: true, align: 'center', valign: 'middle'},
            {title: '预定时间', field: 'orderTime', visible: true, align: 'center', valign: 'middle'},
            {title: '用户Id', field: 'userId', visible: true, align: 'center', valign: 'middle'},
            {title: '用户名', field: 'userName', visible: true, align: 'center', valign: 'middle'},
            {title: '审批状态', field: 'status', visible: true, align: 'center', valign: 'middle'},
            {title: '数量', field: 'num', visible: true, align: 'center', valign: 'middle'},
            {title: '总价', field: 'total', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
ProductDetai.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        ProductDetai.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加商品详情管理
 */
ProductDetai.openAddProductDetai = function () {
    var index = layer.open({
        type: 2,
        title: '添加商品详情管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/productDetai/productDetai_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看商品详情管理详情
 */
ProductDetai.openProductDetaiDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '商品详情管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/productDetai/productDetai_update/' + ProductDetai.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除商品详情管理
 */
ProductDetai.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/productDetai/delete", function (data) {
            Feng.success("删除成功!");
            ProductDetai.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("productDetaiId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询商品详情管理列表
 */
ProductDetai.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    ProductDetai.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = ProductDetai.initColumn();
    var table = new BSTable(ProductDetai.id, "/productDetai/list", defaultColunms);
    table.setPaginationType("client");
    ProductDetai.table = table.init();
});
