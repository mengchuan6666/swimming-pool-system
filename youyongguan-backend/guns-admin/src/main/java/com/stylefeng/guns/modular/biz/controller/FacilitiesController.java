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
import com.stylefeng.guns.modular.system.model.Facilities;
import com.stylefeng.guns.modular.biz.service.IFacilitiesService;

/**
 * 设施表控制器
 *
 * @author fengshuonan
 * @Date 2024-03-31 10:56:25
 */
@Controller
@RequestMapping("/facilities")
public class FacilitiesController extends BaseController {

    private String PREFIX = "/biz/facilities/";

    @Autowired
    private IFacilitiesService facilitiesService;

    /**
     * 跳转到设施表首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "facilities.html";
    }

    /**
     * 跳转到添加设施表
     */
    @RequestMapping("/facilities_add")
    public String facilitiesAdd() {
        return PREFIX + "facilities_add.html";
    }

    /**
     * 跳转到修改设施表
     */
    @RequestMapping("/facilities_update/{facilitiesId}")
    public String facilitiesUpdate(@PathVariable Integer facilitiesId, Model model) {
        Facilities facilities = facilitiesService.selectById(facilitiesId);
        model.addAttribute("item",facilities);
        LogObjectHolder.me().set(facilities);
        return PREFIX + "facilities_edit.html";
    }

    /**
     * 获取设施表列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition) {
        return facilitiesService.selectList(null);
    }

    /**
     * 新增设施表
     */
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(Facilities facilities) {
        facilitiesService.insert(facilities);
        return SUCCESS_TIP;
    }

    /**
     * 删除设施表
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam Integer facilitiesId) {
        facilitiesService.deleteById(facilitiesId);
        return SUCCESS_TIP;
    }

    /**
     * 修改设施表
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(Facilities facilities) {
        facilitiesService.updateById(facilities);
        return SUCCESS_TIP;
    }

    /**
     * 设施表详情
     */
    @RequestMapping(value = "/detail/{facilitiesId}")
    @ResponseBody
    public Object detail(@PathVariable("facilitiesId") Integer facilitiesId) {
        return facilitiesService.selectById(facilitiesId);
    }
}
