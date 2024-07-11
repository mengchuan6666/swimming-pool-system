package com.stylefeng.guns.modular.system.model;

import com.baomidou.mybatisplus.enums.IdType;
import java.math.BigDecimal;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 课程表
 * </p>
 *
 * @author youyongguan
 * @since 2024-03-31
 */
@TableName("biz_course")
public class Course extends Model<Course> {

    private static final long serialVersionUID = 1L;

    /**
     * Id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    /**
     * 课程名称
     */
    private String name;
    /**
     * 课程价格
     */
    private BigDecimal price;
    /**
     * 审批状态
     */
    private String status;
    /**
     * 课程图片
     */
    private String pic;
    /**
     * 教练Id
     */
    @TableField("coach_id")
    private Integer coachId;
    /**
     * 教练姓名
     */
    @TableField("coach_name")
    private String coachName;
    /**
     * 教练简介
     */
    @TableField("coach_desc")
    private String coachDesc;
    /**
     * 报名人数
     */
    private Integer num;
    /**
     * 上限人数
     */
    @TableField("max_num")
    private Integer maxNum;


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

    public Integer getCoachId() {
        return coachId;
    }

    public void setCoachId(Integer coachId) {
        this.coachId = coachId;
    }

    public String getCoachName() {
        return coachName;
    }

    public void setCoachName(String coachName) {
        this.coachName = coachName;
    }

    public String getCoachDesc() {
        return coachDesc;
    }

    public void setCoachDesc(String coachDesc) {
        this.coachDesc = coachDesc;
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    public Integer getMaxNum() {
        return maxNum;
    }

    public void setMaxNum(Integer maxNum) {
        this.maxNum = maxNum;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

    @Override
    public String toString() {
        return "Course{" +
        "id=" + id +
        ", name=" + name +
        ", price=" + price +
        ", status=" + status +
        ", pic=" + pic +
        ", coachId=" + coachId +
        ", coachName=" + coachName +
        ", coachDesc=" + coachDesc +
        ", num=" + num +
        ", maxNum=" + maxNum +
        "}";
    }
}
