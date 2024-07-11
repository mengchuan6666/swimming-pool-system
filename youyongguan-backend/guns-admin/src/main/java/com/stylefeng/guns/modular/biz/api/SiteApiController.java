package com.stylefeng.guns.modular.biz.api;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.stylefeng.guns.core.util.ConstantUtil;
import com.stylefeng.guns.core.util.DateTimeUtil;
import com.stylefeng.guns.core.util.JwtTokenUtil;
import com.stylefeng.guns.modular.biz.service.ISiteDetaiService;
import com.stylefeng.guns.modular.biz.service.ISiteService;
import com.stylefeng.guns.modular.system.model.Notice;
import com.stylefeng.guns.modular.system.model.Site;
import com.stylefeng.guns.modular.system.model.SiteDetai;
import com.stylefeng.guns.modular.system.model.Vip;
import com.stylefeng.guns.modular.system.model.vo.SiteVO;
import com.stylefeng.guns.modular.system.service.INoticeService;
import com.stylefeng.guns.modular.system.service.IVipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/site")
public class SiteApiController extends BaseApiController{


    @Autowired
    private ISiteService siteService;
    @Autowired
    private ISiteDetaiService siteDetaiService;
    @Autowired
    private IVipService vipService;

    /**
     * 获取通知列表
     */
    @RequestMapping(value = "/page")
    @ResponseBody
    public Object list(int page,int limit,String name) {
        List<Site> list = this.siteService.selectList(new EntityWrapper<Site>().like("name",name));

        return success(page(list,page,limit));
    }

    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(HttpServletRequest request) {
        List<Map<String, Object>> list = this.siteDetaiService.list(null);
        List<Map<String, Object>> result=new ArrayList<>();
        for (Map<String, Object> map:list) {
            if((int)map.get("userId")==JwtTokenUtil.getUserId(request)){
                result.add(map);
            }
        }
        return success(result);
    }

    @RequestMapping(value = "/{id}")
    @ResponseBody
    public Object GetById(@PathVariable Integer id) {
        Site site = this.siteService.selectById(id);
        List<SiteDetai> list=this.siteDetaiService.listSiteDetailToday(id);
        site.setNum(list.size());
        return success(site);
    }

    @RequestMapping(value = "/orderSite")
    @ResponseBody
    public Object add(@RequestBody SiteDetai detai, HttpServletRequest request) {
        Vip vip=vipService.selectById(JwtTokenUtil.getUserId(request));
        if(vip.getMoney().compareTo(siteService.selectById(detai.getSiteId()).getPrice())<0){
            return fail("余额不足，请充值待管理员审批后再预约");
        }
        detai.setUserId(JwtTokenUtil.getUserId(request));
        detai.setStatus(ConstantUtil.JudgeStatus.START.getName());
        detai.setUserName(vipService.selectById(detai.getUserId()).getUsername());
        return success(siteDetaiService.insert(detai));
    }
}
