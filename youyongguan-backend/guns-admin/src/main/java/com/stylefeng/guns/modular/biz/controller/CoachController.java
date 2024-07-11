package com.stylefeng.guns.modular.biz.controller;

import com.stylefeng.guns.core.base.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import com.stylefeng.guns.core.log.LogObjectHolder;
import org.springframework.web.bind.annotation.RequestParam;
import com.stylefeng.guns.modular.system.model.Coach;
import com.stylefeng.guns.modular.biz.service.ICoachService;

import java.util.Date;

/**
 * 教练管理控制器
 *
 * @author fengshuonan
 * @Date 2024-03-31 10:34:09
 */
@Controller
@RequestMapping("/coach")
public class CoachController extends BaseController {

    private String PREFIX = "/biz/coach/";

    @Autowired
    private ICoachService coachService;

    /**
     * 跳转到教练管理首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "coach.html";
    }

    /**
     * 跳转到添加教练管理
     */
    @RequestMapping("/coach_add")
    public String coachAdd() {
        return PREFIX + "coach_add.html";
    }

    /**
     * 跳转到修改教练管理
     */
    @RequestMapping("/coach_update/{coachId}")
    public String coachUpdate(@PathVariable Integer coachId, Model model) {
        Coach coach = coachService.selectById(coachId);
        model.addAttribute("item",coach);
        LogObjectHolder.me().set(coach);
        return PREFIX + "coach_edit.html";
    }

    /**
     * 获取教练管理列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition) {
        return coachService.selectList(null);
    }

    /**
     * 新增教练管理
     */
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(Coach coach) {
        coach.setCreateTime(new Date());
        coachService.insert(coach);
        return SUCCESS_TIP;
    }

    /**
     * 删除教练管理
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam Integer coachId) {
        coachService.deleteById(coachId);
        return SUCCESS_TIP;
    }

    /**
     * 修改教练管理
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(Coach coach) {
        coachService.updateById(coach);
        return SUCCESS_TIP;
    }

    /**
     * 教练管理详情
     */
    @RequestMapping(value = "/detail/{coachId}")
    @ResponseBody
    public Object detail(@PathVariable("coachId") Integer coachId) {
        return coachService.selectById(coachId);
    }
}
