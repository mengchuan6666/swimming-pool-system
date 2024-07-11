package com.stylefeng.guns.modular.biz.api;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.stylefeng.guns.core.log.LogObjectHolder;
import com.stylefeng.guns.modular.biz.api.result.ApiResult;
import com.stylefeng.guns.modular.biz.api.result.CaptchaResult;
import com.stylefeng.guns.modular.biz.service.IChargeService;
import com.stylefeng.guns.modular.biz.service.ISiteDetaiService;
import com.stylefeng.guns.modular.biz.service.ISiteService;
import com.stylefeng.guns.modular.system.model.*;
import com.stylefeng.guns.modular.system.service.IVipService;
import com.wf.captcha.SpecCaptcha;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/statistics")
public class StatisticsController extends BaseApiController{
    private String PREFIX = "/biz/statistics/";

    @Autowired
    ISiteService siteService;
    @Autowired
    ISiteDetaiService siteDetaiService;
    @Autowired
    IVipService vipService;
    @Autowired
    IChargeService chargeService;


    @RequestMapping("")
    public String index() {
        return PREFIX + "statistics.html";
    }

    @RequestMapping("/num")
    @ResponseBody
    public Map<String, List<Object>> getNum() {
        Map<String, List<Object>> map=new HashedMap();
        List<Object> x=new ArrayList<>();
        List<Object> y=new ArrayList<>();

        for (Site site:siteService.selectList(new EntityWrapper<>())) {
            x.add(site.getName());
            y.add(siteDetaiService.selectCount(new EntityWrapper<SiteDetai>().eq("site_id",site.getId())));
        }

        map.put("x",x);
        map.put("y",y);
        return map;
    }



    @RequestMapping("/income")
    @ResponseBody
    public Map<String, List<Object>> getRecharge() {
        Map<String, List<Object>> map=new HashedMap();
        List<Object> x=new ArrayList<>();
        List<Object> y=new ArrayList<>();

        for (Site site:siteService.selectList(new EntityWrapper<>())) {
            x.add(site.getName());
            y.add(siteDetaiService.selectCount(new EntityWrapper<SiteDetai>().eq("site_id",site.getId())));
        }

        map.put("x",x);
        map.put("y",y);
        return map;
    }

    @RequestMapping("/recharge")
    @ResponseBody
    public Map<String, List<Object>> getIncome() {
        Map<String, List<Object>> map=new HashedMap();
        List<Object> x=new ArrayList<>();
        List<Object> y=new ArrayList<>();

        for (Vip vip:vipService.selectList(new EntityWrapper<>())) {
            x.add(vip.getNickname());
            List<Charge> list=chargeService.selectList(new EntityWrapper<Charge>().eq("user_id",vip.getId()));
            BigDecimal sum=new BigDecimal(0);
            for (Charge charge:list) {
                sum= sum.add(charge.getAmount());
            }
            y.add(sum);
        }

        map.put("x",x);
        map.put("y",y);
        return map;
    }
}
