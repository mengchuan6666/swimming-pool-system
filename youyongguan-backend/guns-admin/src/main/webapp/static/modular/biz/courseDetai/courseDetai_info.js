/**
 * 初始化课程详情管理详情对话框
 */
var CourseDetaiInfoDlg = {
    courseDetaiInfoData : {}
};

/**
 * 清除数据
 */
CourseDetaiInfoDlg.clearData = function() {
    this.courseDetaiInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
CourseDetaiInfoDlg.set = function(key, val) {
    this.courseDetaiInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
CourseDetaiInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
CourseDetaiInfoDlg.close = function() {
    parent.layer.close(window.parent.CourseDetai.layerIndex);
}

/**
 * 收集数据
 */
CourseDetaiInfoDlg.collectData = function() {
    this
    .set('id')
    .set('userId')
        .set('courseId')

        .set('userName')
    .set('status');
}

/**
 * 提交添加
 */
CourseDetaiInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/courseDetai/add", function(data){
        Feng.success("添加成功!");
        window.parent.CourseDetai.table.refresh();
        CourseDetaiInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.courseDetaiInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
CourseDetaiInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/courseDetai/update", function(data){
        Feng.success("修改成功!");
        window.parent.CourseDetai.table.refresh();
        CourseDetaiInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.courseDetaiInfoData);
    ajax.start();
}

$(function() {

});
