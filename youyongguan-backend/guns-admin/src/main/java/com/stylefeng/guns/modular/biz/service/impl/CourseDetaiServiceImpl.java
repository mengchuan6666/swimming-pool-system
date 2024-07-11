package com.stylefeng.guns.modular.biz.service.impl;

import com.stylefeng.guns.modular.system.model.CourseDetai;
import com.stylefeng.guns.modular.system.dao.CourseDetaiMapper;
import com.stylefeng.guns.modular.biz.service.ICourseDetaiService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 课程详情表 服务实现类
 * </p>
 *
 * @author youyongguan
 * @since 2024-03-31
 */
@Service
public class CourseDetaiServiceImpl extends ServiceImpl<CourseDetaiMapper, CourseDetai> implements ICourseDetaiService {

    @Resource
    CourseDetaiMapper courseDetaiMapper;
    @Override
    public List<Map<String, Object>> list(String conditiion) {
        return courseDetaiMapper.list(conditiion);
    }
}
