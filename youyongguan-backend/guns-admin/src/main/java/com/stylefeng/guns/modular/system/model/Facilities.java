package com.stylefeng.guns.modular.system.model;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import java.io.Serializable;

/**
 * <p>
 * 设施表
 * </p>
 *
 * @author youyongguan
 * @since 2024-03-31
 */
@TableName("biz_facilities")
public class Facilities extends Model<Facilities> {

    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    private Integer id;
    /**
     * 设施名称
     */
    private String name;
    /**
     * 设施描述
     */
    private String desc;
    /**
     * 设施图片
     */
    private String pic;


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

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic;
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

    @Override
    public String toString() {
        return "Facilities{" +
        "id=" + id +
        ", name=" + name +
        ", desc=" + desc +
        ", pic=" + pic +
        "}";
    }
}
