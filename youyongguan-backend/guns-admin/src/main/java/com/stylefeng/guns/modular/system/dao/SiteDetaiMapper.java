package com.stylefeng.guns.modular.system.dao;

import com.stylefeng.guns.modular.system.model.SiteDetai;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 场地详情表 Mapper 接口
 * </p>
 *
 * @author youyongguan
 * @since 2024-03-31
 */
public interface SiteDetaiMapper extends BaseMapper<SiteDetai> {
    List<Map<String, Object>> list(@Param("condition") String conditiion);
    List<SiteDetai> listSiteDetailToday(@Param("id") Integer id);
}

