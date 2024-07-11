/**
 * 初始化充值管理详情对话框
 */
var ChargeInfoDlg = {
    chargeInfoData : {}
};

/**
 * 清除数据
 */
ChargeInfoDlg.clearData = function() {
    this.chargeInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
ChargeInfoDlg.set = function(key, val) {
    this.chargeInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
ChargeInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
ChargeInfoDlg.close = function() {
    parent.layer.close(window.parent.Charge.layerIndex);
}

/**
 * 收集数据
 */
ChargeInfoDlg.collectData = function() {
    this
    .set('id')
    .set('userId')
    .set('amount')
    .set('status')
    .set('startTime')
    .set('endTime');
}

/**
 * 提交添加
 */
ChargeInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/charge/add", function(data){
        Feng.success("添加成功!");
        window.parent.Charge.table.refresh();
        ChargeInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.chargeInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
ChargeInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/charge/update", function(data){
        Feng.success("修改成功!");
        window.parent.Charge.table.refresh();
        ChargeInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.chargeInfoData);
    ajax.start();
}

$(function() {

});
