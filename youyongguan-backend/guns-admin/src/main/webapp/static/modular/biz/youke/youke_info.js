/**
 * 初始化游客管理详情对话框
 */
var YoukeInfoDlg = {
    youkeInfoData : {}
};

/**
 * 清除数据
 */
YoukeInfoDlg.clearData = function() {
    this.youkeInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
YoukeInfoDlg.set = function(key, val) {
    this.youkeInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
YoukeInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
YoukeInfoDlg.close = function() {
    parent.layer.close(window.parent.Youke.layerIndex);
}

/**
 * 收集数据
 */
YoukeInfoDlg.collectData = function() {
    this
    .set('id')
    .set('username')
    .set('password')
    .set('nickname')
    .set('phone')
    .set('email')
    .set('createtime');
}

/**
 * 提交添加
 */
YoukeInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/youke/add", function(data){
        Feng.success("添加成功!");
        window.parent.Youke.table.refresh();
        YoukeInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.youkeInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
YoukeInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/youke/update", function(data){
        Feng.success("修改成功!");
        window.parent.Youke.table.refresh();
        YoukeInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.youkeInfoData);
    ajax.start();
}

$(function() {

});
