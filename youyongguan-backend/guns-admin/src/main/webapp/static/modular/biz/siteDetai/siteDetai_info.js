/**
 * 初始化场地详情管理详情对话框
 */
var SiteDetaiInfoDlg = {
    siteDetaiInfoData : {}
};

/**
 * 清除数据
 */
SiteDetaiInfoDlg.clearData = function() {
    this.siteDetaiInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
SiteDetaiInfoDlg.set = function(key, val) {
    this.siteDetaiInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
SiteDetaiInfoDlg.get = function(key) {
    console.log(key)
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
SiteDetaiInfoDlg.close = function() {
    parent.layer.close(window.parent.SiteDetai.layerIndex);
}

/**
 * 收集数据
 */
SiteDetaiInfoDlg.collectData = function() {
    this
    .set('id')
    .set('orderDate')
    .set('orderTime')
    .set('userId')
    .set('userName')
    .set('status')
     .set('siteId')
     .set('num');
}

/**
 * 提交添加
 */
SiteDetaiInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/siteDetai/add", function(data){
        Feng.success("添加成功!");
        window.parent.SiteDetai.table.refresh();
        SiteDetaiInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.siteDetaiInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
SiteDetaiInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/siteDetai/update", function(data){
        Feng.success("修改成功!");
        window.parent.SiteDetai.table.refresh();
        SiteDetaiInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.siteDetaiInfoData);
    ajax.start();
}

$(function() {

});
