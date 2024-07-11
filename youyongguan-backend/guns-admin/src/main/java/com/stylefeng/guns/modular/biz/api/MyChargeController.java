package com.stylefeng.guns.modular.biz.api;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.stylefeng.guns.core.util.ConstantUtil;
import com.stylefeng.guns.core.util.JwtTokenUtil;
import com.stylefeng.guns.modular.biz.service.IChargeService;
import com.stylefeng.guns.modular.system.model.Charge;
import com.stylefeng.guns.modular.system.model.CourseDetai;
import com.stylefeng.guns.modular.system.model.Vip;
import com.stylefeng.guns.modular.system.service.INoticeService;
import com.stylefeng.guns.modular.system.service.IVipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mycharge")
public class MyChargeController extends BaseApiController{

    @Autowired
    private IChargeService chargeService;

    @Autowired
    private IVipService vipService;

    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(HttpServletRequest request) {
        List<Charge> list = this.chargeService.selectList(new EntityWrapper<Charge>().eq("user_id",JwtTokenUtil.getUserId(request)));

        return success(list);
    }

    @RequestMapping(value = "/charge")
    @ResponseBody
    public Object charge(@RequestBody Charge charge,HttpServletRequest request) {
        Vip vip=vipService.selectById(JwtTokenUtil.getUserId(request));
        charge.setUserId(vip.getId());
        charge.setStatus(ConstantUtil.ChargeStatus.START.getName());
        charge.setStartTime(new Date());
        charge.setUserName(vip.getUsername());
        chargeService.insert(charge);


        return success();
    }
}
