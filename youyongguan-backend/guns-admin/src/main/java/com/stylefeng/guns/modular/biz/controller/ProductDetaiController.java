package com.stylefeng.guns.modular.biz.controller;

import com.stylefeng.guns.core.base.controller.BaseController;
import com.stylefeng.guns.core.util.ConstantUtil;
import com.stylefeng.guns.core.util.JwtTokenUtil;
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
import com.stylefeng.guns.modular.system.model.ProductDetai;
import com.stylefeng.guns.modular.biz.service.IProductDetaiService;

import javax.servlet.http.HttpServletRequest;

/**
 * 商品详情管理控制器
 *
 * @author fengshuonan
 * @Date 2024-03-31 10:35:00
 */
@Controller
@RequestMapping("/productDetai")
public class ProductDetaiController extends BaseController {

    private String PREFIX = "/biz/productDetai/";

    @Autowired
    private IProductDetaiService productDetaiService;
    @Autowired
    private IVipService vipService;

    /**
     * 跳转到商品详情管理首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "productDetai.html";
    }

    /**
     * 跳转到添加商品详情管理
     */
    @RequestMapping("/productDetai_add")
    public String productDetaiAdd() {
        return PREFIX + "productDetai_add.html";
    }

    /**
     * 跳转到修改商品详情管理
     */
    @RequestMapping("/productDetai_update/{productDetaiId}")
    public String productDetaiUpdate(@PathVariable Integer productDetaiId, Model model) {
        ProductDetai productDetai = productDetaiService.selectById(productDetaiId);
        model.addAttribute("item",productDetai);
        LogObjectHolder.me().set(productDetai);
        return PREFIX + "productDetai_edit.html";
    }

    /**
     * 获取商品详情管理列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(String condition) {
        return productDetaiService.selectList(null);
    }

    /**
     * 新增商品详情管理
     */
    @RequestMapping(value = "/add")
    @ResponseBody
    public Object add(ProductDetai productDetai) {
        productDetaiService.insert(productDetai);
        return SUCCESS_TIP;
    }

    /**
     * 删除商品详情管理
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam Integer productDetaiId) {
        productDetaiService.deleteById(productDetaiId);
        return SUCCESS_TIP;
    }

    /**
     * 修改商品详情管理
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(ProductDetai productDetai) {
        productDetaiService.updateById(productDetai);
        if(productDetai.getStatus().equals(ConstantUtil.ChargeStatus.PASS.getName())){
            Vip vip=vipService.selectById(productDetai.getUserId());
            vip.setMoney(vip.getMoney().subtract(productDetai.getTotal()));
            vipService.updateById(vip);
        }
        return SUCCESS_TIP;
    }

    /**
     * 商品详情管理详情
     */
    @RequestMapping(value = "/detail/{productDetaiId}")
    @ResponseBody
    public Object detail(@PathVariable("productDetaiId") Integer productDetaiId) {
        return productDetaiService.selectById(productDetaiId);
    }
}
