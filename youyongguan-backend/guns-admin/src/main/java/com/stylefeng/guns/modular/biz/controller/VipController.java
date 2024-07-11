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
import com.stylefeng.guns.modular.system.model.Vip;
import com.stylefeng.guns.modular.system.service.IVipService;

/**
 * 会员管理控制器
 *
 * @author fengshuonan
 * @Date 2024-03-31 10:40:09
 */
@Controller
@RequestMapping("/vip")
public class VipController extends BaseController {

    private String PREFIX = "/system/vip/";

    @Autowired
    private IVipService vipService;

    /**
     * 跳转到会员管理首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "vip.html";
    }

    /**
     * 跳转到添加会员管理
     */
    @RequestMapping("/vip_add")
    public String vipAdd() {
        return PREFIX + "vip_add.html";
    }

    /**
     * 跳转到修改会员管理
     */
    @RequestMapping("/vip_update/{vipId}")
    public String vipUpdate(@PathVariable Integer vipId, Model model) {
        Vip vip = vipService.selectById(vipId);
        model.addAttribute("item",vip);
        LogObjectHolder.me().set(vip);
        return PREFIX + "vip_edit.html";
    }

    /**
     * 获取会员管理列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition) {
        return vipService.selectList(null);
    }

    /**
     * 新增会员管理
     */
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(Vip vip) {
        vipService.insert(vip);
        return SUCCESS_TIP;
    }

    /**
     * 删除会员管理
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam Integer vipId) {
        vipService.deleteById(vipId);
        return SUCCESS_TIP;
    }

    /**
     * 修改会员管理
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(Vip vip) {
        vipService.updateById(vip);
        return SUCCESS_TIP;
    }

    /**
     * 会员管理详情
     */
    @RequestMapping(value = "/detail/{vipId}")
    @ResponseBody
    public Object detail(@PathVariable("vipId") Integer vipId) {
        return vipService.selectById(vipId);
    }
}
