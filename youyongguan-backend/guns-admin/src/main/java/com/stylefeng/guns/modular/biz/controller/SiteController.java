package com.stylefeng.guns.modular.biz.controller;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.stylefeng.guns.core.base.controller.BaseController;
import com.stylefeng.guns.modular.biz.service.IFacilitiesService;
import com.stylefeng.guns.modular.biz.service.IFaultService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import com.stylefeng.guns.core.log.LogObjectHolder;
import org.springframework.web.bind.annotation.RequestParam;
import com.stylefeng.guns.modular.system.model.Site;
import com.stylefeng.guns.modular.biz.service.ISiteService;

/**
 * 场地管理控制器
 *
 * @author fengshuonan
 * @Date 2024-03-31 10:36:11
 */
@Controller
@RequestMapping("/site")
public class SiteController extends BaseController {

    private String PREFIX = "/biz/site/";

    @Autowired
    private ISiteService siteService;

    @Autowired
    private IFacilitiesService facilitiesService;

    /**
     * 跳转到场地管理首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "site.html";
    }

    /**
     * 跳转到添加场地管理
     */
    @RequestMapping("/site_add")
    public String siteAdd(Model model) {
        model.addAttribute("list",facilitiesService.selectList(new EntityWrapper<>()));
        return PREFIX + "site_add.html";
    }

    /**
     * 跳转到修改场地管理
     */
    @RequestMapping("/site_update/{siteId}")
    public String siteUpdate(@PathVariable Integer siteId, Model model) {
        Site site = siteService.selectById(siteId);
        model.addAttribute("item",site);
        model.addAttribute("list",facilitiesService.selectList(new EntityWrapper<>()));
        LogObjectHolder.me().set(site);
        return PREFIX + "site_edit.html";
    }

    /**
     * 获取场地管理列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition) {
        return siteService.selectList(null);
    }

    /**
     * 新增场地管理
     */
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(Site site) {
        siteService.insert(site);
        return SUCCESS_TIP;
    }

    /**
     * 删除场地管理
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam Integer siteId) {
        siteService.deleteById(siteId);
        return SUCCESS_TIP;
    }

    /**
     * 修改场地管理
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(Site site) {
        siteService.updateById(site);
        return SUCCESS_TIP;
    }

    /**
     * 场地管理详情
     */
    @RequestMapping(value = "/detail/{siteId}")
    @ResponseBody
    public Object detail(@PathVariable("siteId") Integer siteId) {
        return siteService.selectById(siteId);
    }
}
