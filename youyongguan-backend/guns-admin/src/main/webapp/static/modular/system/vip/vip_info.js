/**
 * 初始化会员管理详情对话框
 */
var VipInfoDlg = {
    vipInfoData : {}
};

/**
 * 清除数据
 */
VipInfoDlg.clearData = function() {
    this.vipInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
VipInfoDlg.set = function(key, val) {
    this.vipInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
VipInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
VipInfoDlg.close = function() {
    parent.layer.close(window.parent.Vip.layerIndex);
}

/**
 * 收集数据
 */
VipInfoDlg.collectData = function() {
    this
    .set('id')
    .set('username')
    .set('password')
    .set('nickname')
    .set('phone')
    .set('email')
    .set('createtime')
    .set('type')
    .set('money')
    .set('pic');
}

/**
 * 提交添加
 */
VipInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/vip/add", function(data){
        Feng.success("添加成功!");
        window.parent.Vip.table.refresh();
        VipInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.vipInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
VipInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/vip/update", function(data){
        Feng.success("修改成功!");
        window.parent.Vip.table.refresh();
        VipInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.vipInfoData);
    ajax.start();
}

$(function() {
    // 初始化头像上传
    var avatarUp = new $WebUpload("pic");
    avatarUp.setUploadBarId("progressBar");
    avatarUp.init();
});
