package com.stylefeng.guns.modular.biz.service;

import com.stylefeng.guns.modular.system.model.SiteDetai;
import com.baomidou.mybatisplus.service.IService;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 场地详情表 服务类
 * </p>
 *
 * @author youyongguan
 * @since 2024-03-31
 */
public interface ISiteDetaiService extends IService<SiteDetai> {
    List<Map<String, Object>> list(@Param("condition") String conditiion);
    List<SiteDetai> listSiteDetailToday(@Param("id") Integer id);

}
