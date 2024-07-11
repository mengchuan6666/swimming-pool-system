/**
 * 课程详情管理管理初始化
 */
var CourseDetai = {
    id: "CourseDetaiTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
CourseDetai.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: 'id', field: 'id', visible: true, align: 'center', valign: 'middle'},
            {title: '用户名', field: 'userName', visible: true, align: 'center', valign: 'middle'},
        {title: '课程名', field: 'courseName', visible: true, align: 'center', valign: 'middle'},
        {title: '教练', field: 'coachName', visible: true, align: 'center', valign: 'middle'},
        {title: '报名人数', field: 'num', visible: true, align: 'center', valign: 'middle'},
        {title: '最大报名数', field: 'maxNum', visible: true, align: 'center', valign: 'middle'},
        {title: '审批状态', field: 'status', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
CourseDetai.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        CourseDetai.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加课程详情管理
 */
CourseDetai.openAddCourseDetai = function () {
    var index = layer.open({
        type: 2,
        title: '添加课程详情管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/courseDetai/courseDetai_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看课程详情管理详情
 */
CourseDetai.openCourseDetaiDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '课程详情管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/courseDetai/courseDetai_update/' + CourseDetai.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除课程详情管理
 */
CourseDetai.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/courseDetai/delete", function (data) {
            Feng.success("删除成功!");
            CourseDetai.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("courseDetaiId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询课程详情管理列表
 */
CourseDetai.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    CourseDetai.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = CourseDetai.initColumn();
    var table = new BSTable(CourseDetai.id, "/courseDetai/list", defaultColunms);
    table.setPaginationType("client");
    CourseDetai.table = table.init();
});
