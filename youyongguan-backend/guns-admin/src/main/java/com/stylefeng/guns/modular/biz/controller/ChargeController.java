package com.stylefeng.guns.modular.biz.controller;

import com.stylefeng.guns.core.base.controller.BaseController;
import com.stylefeng.guns.core.common.exception.BizExceptionEnum;
import com.stylefeng.guns.core.exception.GunsException;
import com.stylefeng.guns.core.util.ConstantUtil;
import com.stylefeng.guns.core.util.JwtTokenUtil;
import com.stylefeng.guns.modular.system.model.Vip;
import com.stylefeng.guns.modular.system.service.IVipService;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import com.stylefeng.guns.core.log.LogObjectHolder;
import com.stylefeng.guns.modular.system.model.Charge;
import com.stylefeng.guns.modular.biz.service.IChargeService;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 充值管理控制器
 *
 * @author fengshuonan
 * @Date 2024-03-31 10:33:49
 */
@Controller
@RequestMapping("/charge")
public class ChargeController extends BaseController {

    private String PREFIX = "/biz/charge/";

    @Autowired
    private IChargeService chargeService;
    @Autowired
    private IVipService vipService;

    @InitBinder
    protected void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }
    /**
     * 跳转到充值管理首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "charge.html";
    }

    /**
     * 跳转到添加充值管理
     */
    @RequestMapping("/charge_add")
    public String chargeAdd() {
        return PREFIX + "charge_add.html";
    }

    /**
     * 跳转到修改充值管理
     */
    @RequestMapping("/charge_update/{chargeId}")
    public String chargeUpdate(@PathVariable Integer chargeId, Model model) {
        Charge charge = chargeService.selectById(chargeId);
        model.addAttribute("item",charge);
        LogObjectHolder.me().set(charge);
        return PREFIX + "charge_edit.html";
    }

    /**
     * 获取充值管理列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition) {
        return chargeService.selectList(null);
    }

    /**
     * 新增充值管理
     */
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(Charge charge) {
        chargeService.insert(charge);
        return SUCCESS_TIP;
    }

    /**
     * 删除充值管理
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam Integer chargeId) {
        chargeService.deleteById(chargeId);
        return SUCCESS_TIP;
    }

    /**
     * 修改充值管理
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(Charge charge) {
        if(chargeService.selectById(charge).getStatus().equals(ConstantUtil.JudgeStatus.PASS.getName())){
            throw new GunsException(BizExceptionEnum.REPEAT_JUDGE);
        }

        charge.setEndTime(new Date());
        chargeService.updateById(charge);
        if(charge.getStatus().equals(ConstantUtil.ChargeStatus.PASS.getName())){
            Vip vip=vipService.selectById(charge.getUserId());
            vip.setMoney(vip.getMoney().add(charge.getAmount()));
            vipService.updateById(vip);
        }
        return SUCCESS_TIP;
    }

    /**
     * 充值管理详情
     */
    @RequestMapping(value = "/detail/{chargeId}")
    @ResponseBody
    public Object detail(@PathVariable("chargeId") Integer chargeId) {
        return chargeService.selectById(chargeId);
    }
}
