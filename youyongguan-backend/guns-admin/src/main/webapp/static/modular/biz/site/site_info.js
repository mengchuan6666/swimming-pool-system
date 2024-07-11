/**
 * 初始化场地管理详情对话框
 */
var SiteInfoDlg = {
    siteInfoData : {}
};

/**
 * 清除数据
 */
SiteInfoDlg.clearData = function() {
    this.siteInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
SiteInfoDlg.set = function(key, val) {
    this.siteInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
SiteInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
SiteInfoDlg.close = function() {
    parent.layer.close(window.parent.Site.layerIndex);
}

/**
 * 收集数据
 */
SiteInfoDlg.collectData = function() {
    this
    .set('id')
    .set('name')
    .set('price')
    .set('status')
    .set('pic')
    .set('desc')
    .set('deviceInfo');
}

/**
 * 提交添加
 */
SiteInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/site/add", function(data){
        Feng.success("添加成功!");
        window.parent.Site.table.refresh();
        SiteInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.siteInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
SiteInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/site/update", function(data){
        Feng.success("修改成功!");
        window.parent.Site.table.refresh();
        SiteInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.siteInfoData);
    ajax.start();
}

$(function() {
    // 初始化头像上传
    var avatarUp = new $WebUpload("pic");
    avatarUp.setUploadBarId("progressBar");
    avatarUp.init();
});
