package com.stylefeng.guns.modular.system.model;

import com.baomidou.mybatisplus.enums.IdType;
import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 场地详情表
 * </p>
 *
 * @author youyongguan
 * @since 2024-03-31
 */
@TableName("biz_site_detai")
public class SiteDetai extends Model<SiteDetai> {

    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    /**
     * 预定日期
     */
    @TableField("order_date")
    private Date orderDate;
    /**
     * 预定时间
     */
    @TableField("order_time")
    private String orderTime;
    /**
     * 用户Id
     */
    @TableField("user_id")
    private Integer userId;
    /**
     * 用户名
     */
    @TableField("user_name")
    private String userName;
    /**
     * 审批状态
     */
    private String status;
    /**
     * 预约人数
     */
    private Integer num;

    @TableField("site_id")
    private Integer siteId;


    public Integer getSiteId() {
        return siteId;
    }

    public void setSiteId(Integer siteId) {
        this.siteId = siteId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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
        return "SiteDetai{" +
        "id=" + id +
        ", orderDate=" + orderDate +
        ", orderTime=" + orderTime +
        ", userId=" + userId +
        ", userName=" + userName +
        ", status=" + status +
        ", num=" + num +
        "}";
    }
}
