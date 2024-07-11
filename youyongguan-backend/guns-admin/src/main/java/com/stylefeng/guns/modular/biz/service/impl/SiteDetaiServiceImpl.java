package com.stylefeng.guns.modular.biz.service.impl;

import com.stylefeng.guns.modular.system.model.SiteDetai;
import com.stylefeng.guns.modular.system.dao.SiteDetaiMapper;
import com.stylefeng.guns.modular.biz.service.ISiteDetaiService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 场地详情表 服务实现类
 * </p>
 *
 * @author youyongguan
 * @since 2024-03-31
 */
@Service
public class SiteDetaiServiceImpl extends ServiceImpl<SiteDetaiMapper, SiteDetai> implements ISiteDetaiService {

    @Resource
    SiteDetaiMapper mapper;
    @Override
    public List<Map<String, Object>> list(String conditiion) {
        return mapper.list(conditiion);
    }

    @Override
    public List<SiteDetai> listSiteDetailToday(Integer id) {
        return mapper.listSiteDetailToday(id);
    }
}
