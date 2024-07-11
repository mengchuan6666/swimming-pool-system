/**
 * 初始化故障管理详情对话框
 */
var FaultInfoDlg = {
    faultInfoData : {}
};

/**
 * 清除数据
 */
FaultInfoDlg.clearData = function() {
    this.faultInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
FaultInfoDlg.set = function(key, val) {
    this.faultInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
FaultInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
FaultInfoDlg.close = function() {
    parent.layer.close(window.parent.Fault.layerIndex);
}

/**
 * 收集数据
 */
FaultInfoDlg.collectData = function() {
    this
    .set('id')
    .set('name')
    .set('desc')
    .set('deviceName')
    .set('deviceId')
    .set('pic')
    .set('status');
}

/**
 * 提交添加
 */
FaultInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/fault/add", function(data){
        Feng.success("添加成功!");
        window.parent.Fault.table.refresh();
        FaultInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.faultInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
FaultInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/fault/update", function(data){
        Feng.success("修改成功!");
        window.parent.Fault.table.refresh();
        FaultInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.faultInfoData);
    ajax.start();
}

$(function() {
    // 初始化头像上传
    var avatarUp = new $WebUpload("pic");
    avatarUp.setUploadBarId("progressBar");
    avatarUp.init();
});
