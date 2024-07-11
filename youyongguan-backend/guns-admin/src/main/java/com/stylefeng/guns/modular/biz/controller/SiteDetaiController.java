package com.stylefeng.guns.modular.biz.controller;

import com.stylefeng.guns.core.base.controller.BaseController;
import com.stylefeng.guns.core.common.exception.BizExceptionEnum;
import com.stylefeng.guns.core.exception.GunsException;
import com.stylefeng.guns.core.util.ConstantUtil;
import com.stylefeng.guns.core.util.JwtTokenUtil;
import com.stylefeng.guns.modular.biz.service.ISiteService;
import com.stylefeng.guns.modular.system.model.Vip;
import com.stylefeng.guns.modular.system.service.IVipService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import com.stylefeng.guns.core.log.LogObjectHolder;
import org.springframework.web.bind.annotation.RequestParam;
import com.stylefeng.guns.modular.system.model.SiteDetai;
import com.stylefeng.guns.modular.biz.service.ISiteDetaiService;

import javax.servlet.http.HttpServletRequest;

/**
 * 场地详情管理控制器
 *
 * @author fengshuonan
 * @Date 2024-03-31 10:36:25
 */
@Controller
@RequestMapping("/siteDetai")
public class SiteDetaiController extends BaseController {

    private String PREFIX = "/biz/siteDetai/";

    @Autowired
    private ISiteDetaiService siteDetaiService;
    @Autowired
    private ISiteService siteService;
    @Autowired
    private IVipService vipService;

    /**
     * 跳转到场地详情管理首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "siteDetai.html";
    }

    /**
     * 跳转到添加场地详情管理
     */
    @RequestMapping("/siteDetai_add")
    public String siteDetaiAdd() {
        return PREFIX + "siteDetai_add.html";
    }

    /**
     * 跳转到修改场地详情管理
     */
    @RequestMapping("/siteDetai_update/{siteDetaiId}")
    public String siteDetaiUpdate(HttpServletRequest request, @PathVariable Integer siteDetaiId, Model model) {
        SiteDetai siteDetai = siteDetaiService.selectById(siteDetaiId);
        model.addAttribute("item",siteDetai);
        LogObjectHolder.me().set(siteDetai);
        return PREFIX + "siteDetai_edit.html";
    }

    /**
     * 获取场地详情管理列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition) {
        return siteDetaiService.list(null);
    }

    /**
     * 新增场地详情管理
     */
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(SiteDetai siteDetai) {
        siteDetaiService.insert(siteDetai);
        return SUCCESS_TIP;
    }

    /**
     * 删除场地详情管理
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam Integer siteDetaiId) {
        siteDetaiService.deleteById(siteDetaiId);
        return SUCCESS_TIP;
    }

    /**
     * 修改场地详情管理
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(SiteDetai siteDetai) {
        if(siteDetaiService.selectById(siteDetai).getStatus().equals(ConstantUtil.JudgeStatus.PASS.getName())){
            throw new GunsException(BizExceptionEnum.REPEAT_JUDGE);
        }
        siteDetaiService.updateById(siteDetai);
        if(siteDetai.getStatus().equals(ConstantUtil.JudgeStatus.PASS.getName())){
            Vip vip= vipService.selectById(siteDetai.getUserId());
            vip.setMoney(vip.getMoney().subtract(siteService.selectById(siteDetai.getSiteId()).getPrice()));
            vipService.updateById(vip);
        }
        return SUCCESS_TIP;
    }

    /**
     * 场地详情管理详情
     */
    @RequestMapping(value = "/detail/{siteDetaiId}")
    @ResponseBody
    public Object detail(@PathVariable("siteDetaiId") Integer siteDetaiId) {
        return siteDetaiService.selectById(siteDetaiId);
    }
}
