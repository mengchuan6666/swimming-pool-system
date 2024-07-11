package com.stylefeng.guns.modular.biz.api;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.stylefeng.guns.core.util.ConstantUtil;
import com.stylefeng.guns.core.util.JwtTokenUtil;
import com.stylefeng.guns.modular.biz.service.ICourseDetaiService;
import com.stylefeng.guns.modular.biz.service.ICourseService;
import com.stylefeng.guns.modular.biz.service.ISiteService;
import com.stylefeng.guns.modular.system.model.*;
import com.stylefeng.guns.modular.system.service.IVipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static org.aspectj.bridge.MessageUtil.error;

@RestController
@RequestMapping("/api/course")
public class CourseApiController extends BaseApiController{


    @Autowired
    private ICourseService courseService;
    @Autowired
    private ICourseDetaiService courseDetaiService;
    @Autowired
    private IVipService vipService;

    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(HttpServletRequest request) {
        List<Map<String, Object>> list = this.courseDetaiService.list(null);
        List<Map<String, Object>> result=new ArrayList<>();
        for (Map<String, Object> map:list) {
            if((int)map.get("userId")==JwtTokenUtil.getUserId(request)){
                result.add(map);
            }
        }
        return success(result);
    }

    /**
     * 获取通知列表
     */
    @RequestMapping(value = "/page")
    @ResponseBody
    public Object list(int page,int limit,String name) {
        List<Course> list = this.courseService.selectList(new EntityWrapper<Course>().like("name",name));

        return success(page(list,page,limit));
    }

    @RequestMapping(value = "/{id}")
    @ResponseBody
    public Object GetById(@PathVariable Integer id) {
        return success(this.courseService.selectById(id));
    }

    @RequestMapping(value = "/orderCourse")
    @ResponseBody
    public Object orderSite(@RequestBody CourseDetai detai, HttpServletRequest request) {

        Vip vip=vipService.selectById(JwtTokenUtil.getUserId(request));
        if(vip.getMoney().compareTo(courseService.selectById(detai.getCourseId()).getPrice())<0){
            return fail("余额不足，请充值待管理员审批后再报名");
        }
        detai.setUserId(JwtTokenUtil.getUserId(request));
        detai.setStatus(ConstantUtil.JudgeStatus.START.getName());
        detai.setRegDateTime(new Date());
        detai.setUserName(vipService.selectById(detai.getUserId()).getUsername());

        if(courseDetaiService.selectOne(new EntityWrapper<CourseDetai>().eq("course_id",detai.getCourseId()).eq("user_id",detai.getUserId()))!=null){
            return fail("您已报名，请勿重复报名");
        }

        courseDetaiService.insert(detai);
        Course course=courseService.selectById(detai.getCourseId());
        if(course.getNum()==null){
            course.setNum(1);
        }else{
            course.setNum(course.getNum()+1);
        }
        courseService.updateById(course);
        return success("报名成功");
    }
}
