package com.stylefeng.guns.modular.biz.service;

import com.stylefeng.guns.modular.system.model.CourseDetai;
import com.baomidou.mybatisplus.service.IService;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 课程详情表 服务类
 * </p>
 *
 * @author youyongguan
 * @since 2024-03-31
 */
public interface ICourseDetaiService extends IService<CourseDetai> {
    List<Map<String, Object>> list(@Param("condition") String conditiion);
}
