package com.stylefeng.guns.modular.system.warpper;

import com.stylefeng.guns.core.base.warpper.BaseControllerWarpper;
import com.stylefeng.guns.core.common.constant.factory.ConstantFactory;
import com.stylefeng.guns.modular.system.model.Course;

import java.util.Map;

public class CourseWarpper extends BaseControllerWarpper {
    public CourseWarpper(Object list) {
        super(list);
    }

    @Override
    public void warpTheMap(Map<String, Object> map) {
        Integer courseId = (Integer) map.get("courseId");
        Course course=ConstantFactory.me().getCourseById(courseId);
        map.put("name", course.getName());
        map.put("price", course.getPrice());
        map.put("courseStatus", course.getStatus());
        map.put("pic", course.getPic());
        map.put("coachName", course.getCoachName());
        map.put("num", course.getNum());
        map.put("maxNum", course.getMaxNum());


    }
}
