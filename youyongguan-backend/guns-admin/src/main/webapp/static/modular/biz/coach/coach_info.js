/**
 * 初始化教练管理详情对话框
 */
var CoachInfoDlg = {
    coachInfoData : {}
};

/**
 * 清除数据
 */
CoachInfoDlg.clearData = function() {
    this.coachInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
CoachInfoDlg.set = function(key, val) {
    this.coachInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
CoachInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
CoachInfoDlg.close = function() {
    parent.layer.close(window.parent.Coach.layerIndex);
}

/**
 * 收集数据
 */
CoachInfoDlg.collectData = function() {
    this
    .set('id')
    .set('name')
    .set('desc')
    .set('pic')
    .set('createTime');
}

/**
 * 提交添加
 */
CoachInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/coach/add", function(data){
        Feng.success("添加成功!");
        window.parent.Coach.table.refresh();
        CoachInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.coachInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
CoachInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/coach/update", function(data){
        Feng.success("修改成功!");
        window.parent.Coach.table.refresh();
        CoachInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.coachInfoData);
    ajax.start();
}

$(function() {
    // 初始化头像上传
    var avatarUp = new $WebUpload("pic");
    avatarUp.setUploadBarId("progressBar");
    avatarUp.init();
});
