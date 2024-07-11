package com.stylefeng.guns.modular.biz.controller;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.stylefeng.guns.core.base.controller.BaseController;
import com.stylefeng.guns.modular.biz.service.IFacilitiesService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import com.stylefeng.guns.core.log.LogObjectHolder;
import org.springframework.web.bind.annotation.RequestParam;
import com.stylefeng.guns.modular.system.model.Fault;
import com.stylefeng.guns.modular.biz.service.IFaultService;

/**
 * 故障管理控制器
 *
 * @author fengshuonan
 * @Date 2024-03-31 10:34:39
 */
@Controller
@RequestMapping("/fault")
public class FaultController extends BaseController {

    private String PREFIX = "/biz/fault/";

    @Autowired
    private IFaultService faultService;

    @Autowired
    private IFacilitiesService facilitiesService;

    /**
     * 跳转到故障管理首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "fault.html";
    }

    /**
     * 跳转到添加故障管理
     */
    @RequestMapping("/fault_add")
    public String faultAdd(Model model) {

        model.addAttribute("list",facilitiesService.selectList(new EntityWrapper<>()));
        return PREFIX + "fault_add.html";
    }

    /**
     * 跳转到修改故障管理
     */
    @RequestMapping("/fault_update/{faultId}")
    public String faultUpdate(@PathVariable Integer faultId, Model model) {
        Fault fault = faultService.selectById(faultId);
        model.addAttribute("item",fault);
        model.addAttribute("list",facilitiesService.selectList(new EntityWrapper<>()));
        LogObjectHolder.me().set(fault);
        return PREFIX + "fault_edit.html";
    }

    /**
     * 获取故障管理列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition) {
        return faultService.selectList(null);
    }

    /**
     * 新增故障管理
     */
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(Fault fault) {
        faultService.insert(fault);
        return SUCCESS_TIP;
    }

    /**
     * 删除故障管理
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam Integer faultId) {
        faultService.deleteById(faultId);
        return SUCCESS_TIP;
    }

    /**
     * 修改故障管理
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(Fault fault) {
        faultService.updateById(fault);
        return SUCCESS_TIP;
    }

    /**
     * 故障管理详情
     */
    @RequestMapping(value = "/detail/{faultId}")
    @ResponseBody
    public Object detail(@PathVariable("faultId") Integer faultId) {
        return faultService.selectById(faultId);
    }
}
