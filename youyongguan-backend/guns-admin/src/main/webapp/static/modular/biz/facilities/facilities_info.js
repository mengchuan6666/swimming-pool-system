/**
 * 初始化设施表详情对话框
 */
var FacilitiesInfoDlg = {
    facilitiesInfoData : {}
};

/**
 * 清除数据
 */
FacilitiesInfoDlg.clearData = function() {
    this.facilitiesInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
FacilitiesInfoDlg.set = function(key, val) {
    this.facilitiesInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
FacilitiesInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
FacilitiesInfoDlg.close = function() {
    parent.layer.close(window.parent.Facilities.layerIndex);
}

/**
 * 收集数据
 */
FacilitiesInfoDlg.collectData = function() {
    this
    .set('id')
    .set('name')
    .set('desc')
    .set('pic');
}

/**
 * 提交添加
 */
FacilitiesInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/facilities/add", function(data){
        Feng.success("添加成功!");
        window.parent.Facilities.table.refresh();
        FacilitiesInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.facilitiesInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
FacilitiesInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/facilities/update", function(data){
        Feng.success("修改成功!");
        window.parent.Facilities.table.refresh();
        FacilitiesInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.facilitiesInfoData);
    ajax.start();
}

$(function() {
    // 初始化头像上传
    var avatarUp = new $WebUpload("pic");
    avatarUp.setUploadBarId("progressBar");
    avatarUp.init();
});
