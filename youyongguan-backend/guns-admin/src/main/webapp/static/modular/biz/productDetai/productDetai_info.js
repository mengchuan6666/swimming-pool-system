/**
 * 初始化商品详情管理详情对话框
 */
var ProductDetaiInfoDlg = {
    productDetaiInfoData : {}
};

/**
 * 清除数据
 */
ProductDetaiInfoDlg.clearData = function() {
    this.productDetaiInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
ProductDetaiInfoDlg.set = function(key, val) {
    this.productDetaiInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
ProductDetaiInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
ProductDetaiInfoDlg.close = function() {
    parent.layer.close(window.parent.ProductDetai.layerIndex);
}

/**
 * 收集数据
 */
ProductDetaiInfoDlg.collectData = function() {
    this
    .set('id')
    .set('orderDate')
    .set('orderTime')
    .set('userId')
    .set('userName')
    .set('status')
    .set('num')

        .set('total');
}

/**
 * 提交添加
 */
ProductDetaiInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/productDetai/add", function(data){
        Feng.success("添加成功!");
        window.parent.ProductDetai.table.refresh();
        ProductDetaiInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.productDetaiInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
ProductDetaiInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/productDetai/update", function(data){
        Feng.success("修改成功!");
        window.parent.ProductDetai.table.refresh();
        ProductDetaiInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.productDetaiInfoData);
    ajax.start();
}

$(function() {

});
