package com.stylefeng.guns.modular.system.model;

import com.baomidou.mybatisplus.enums.IdType;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 故障表
 * </p>
 *
 * @author youyongguan
 * @since 2024-03-31
 */
@TableName("biz_fault")
public class Fault extends Model<Fault> {

    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    /**
     * 故障名
     */
    private String name;
    /**
     * 故障详情
     */
    private String desc;
    /**
     * 故障设备
     */
    @TableField("device_name")
    private String deviceName;
    /**
     * 设备id
     */
    @TableField("device_id")
    private Integer deviceId;
    /**
     * 图片url
     */
    private String pic;
    /**
     * 上报状态
     */
    private String status;


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

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public Integer getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(Integer deviceId) {
        this.deviceId = deviceId;
    }

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

    @Override
    public String toString() {
        return "Fault{" +
        "id=" + id +
        ", name=" + name +
        ", desc=" + desc +
        ", deviceName=" + deviceName +
        ", deviceId=" + deviceId +
        ", pic=" + pic +
        ", status=" + status +
        "}";
    }
}
