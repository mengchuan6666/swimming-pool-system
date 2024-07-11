package com.stylefeng.guns.modular.system.model.vo;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * <p>
 * 场地表
 * </p>
 *
 * @author youyongguan
 * @since 2024-03-31
 */
@TableName("biz_site")
public class SiteVO extends Model<SiteVO> {

    private static final long serialVersionUID = 1L;

    /**
     * Id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    /**
     * 场地名称
     */
    private String name;
    /**
     * 场地价格
     */
    private BigDecimal price;
    /**
     * 审批状态
     */
    private String status;
    /**
     * 场地图片
     */
    private String pic;
    /**
     * 场地描述
     */
    private String desc;
    /**
     * 场地设备信息
     */
    @TableField("device_info")
    private String deviceInfo;

    private Integer num;

    private Date orderDate;

    private String orderTime;

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public String getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(String orderTime) {
        this.orderTime = orderTime;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getDeviceInfo() {
        return deviceInfo;
    }

    public void setDeviceInfo(String deviceInfo) {
        this.deviceInfo = deviceInfo;
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

    @Override
    public String toString() {
        return "Site{" +
        "id=" + id +
        ", name=" + name +
        ", price=" + price +
        ", status=" + status +
        ", pic=" + pic +
        ", desc=" + desc +
        ", deviceInfo=" + deviceInfo +
        "}";
    }
}
