package com.stylefeng.guns.modular.biz.controller;

import com.stylefeng.guns.core.base.controller.BaseController;
import com.stylefeng.guns.core.common.exception.BizExceptionEnum;
import com.stylefeng.guns.core.exception.GunsException;
import com.stylefeng.guns.core.util.ConstantUtil;
import com.stylefeng.guns.core.util.JwtTokenUtil;
import com.stylefeng.guns.modular.biz.service.ICourseService;
import com.stylefeng.guns.modular.system.model.Course;
import com.stylefeng.guns.modular.system.model.Vip;
import com.stylefeng.guns.modular.system.service.IVipService;
import com.stylefeng.guns.modular.system.warpper.CourseWarpper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import com.stylefeng.guns.core.log.LogObjectHolder;
import org.springframework.web.bind.annotation.RequestParam;
import com.stylefeng.guns.modular.system.model.CourseDetai;
import com.stylefeng.guns.modular.biz.service.ICourseDetaiService;

import javax.servlet.http.HttpServletRequest;

/**
 * 课程详情管理控制器
 *
 * @author fengshuonan
 * @Date 2024-03-31 10:34:29
 */
@Controller
@RequestMapping("/courseDetai")
public class CourseDetaiController extends BaseController {

    private String PREFIX = "/biz/courseDetai/";

    @Autowired
    private ICourseDetaiService courseDetaiService;
    @Autowired
    private ICourseService courseService;
    @Autowired
    private IVipService vipService;


    /**
     * 跳转到课程详情管理首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "courseDetai.html";
    }

    /**
     * 跳转到添加课程详情管理
     */
    @RequestMapping("/courseDetai_add")
    public String courseDetaiAdd() {
        return PREFIX + "courseDetai_add.html";
    }

    /**
     * 跳转到修改课程详情管理
     */
    @RequestMapping("/courseDetai_update/{courseDetaiId}")
    public String courseDetaiUpdate(@PathVariable Integer courseDetaiId, Model model) {
        CourseDetai courseDetai = courseDetaiService.selectById(courseDetaiId);
        model.addAttribute("item",courseDetai);
        Course course=courseService.selectById(courseDetai.getCourseId());
        model.addAttribute("course",course);

        LogObjectHolder.me().set(courseDetai);
        return PREFIX + "courseDetai_edit.html";
    }

    /**
     * 获取课程详情管理列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition) {
        return courseDetaiService.list(condition);
    }

    /**
     * 新增课程详情管理
     */
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(CourseDetai courseDetai) {
        courseDetaiService.insert(courseDetai);
        return SUCCESS_TIP;
    }

    /**
     * 删除课程详情管理
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam Integer courseDetaiId) {
        courseDetaiService.deleteById(courseDetaiId);
        return SUCCESS_TIP;
    }

    /**
     * 修改课程详情管理
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update( CourseDetai courseDetai) {
        if(courseDetaiService.selectById(courseDetai).getStatus().equals(ConstantUtil.JudgeStatus.PASS.getName())){
            throw new GunsException(BizExceptionEnum.REPEAT_JUDGE);
        }

        courseDetaiService.updateById(courseDetai);
        if(courseDetai.getStatus().equals(ConstantUtil.JudgeStatus.PASS.getName())){
           Vip vip= vipService.selectById(courseDetai.getUserId());
           vip.setMoney(vip.getMoney().subtract(courseService.selectById(courseDetai.getCourseId()).getPrice()));
           vipService.updateById(vip);
        }
        return SUCCESS_TIP;
    }

    /**
     * 课程详情管理详情
     */
    @RequestMapping(value = "/detail/{courseDetaiId}")
    @ResponseBody
    public Object detail(@PathVariable("courseDetaiId") Integer courseDetaiId) {
        return courseDetaiService.selectById(courseDetaiId);
    }
}
