package com.stylefeng.guns.modular.biz.api;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.stylefeng.guns.core.util.ConstantUtil;
import com.stylefeng.guns.core.util.JwtTokenUtil;
import com.stylefeng.guns.modular.biz.service.IProductDetaiService;
import com.stylefeng.guns.modular.biz.service.IProductService;
import com.stylefeng.guns.modular.biz.service.ISiteService;
import com.stylefeng.guns.modular.system.model.*;
import com.stylefeng.guns.modular.system.service.IVipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductApiController extends BaseApiController{


    @Autowired
    private IProductService productService;

    @Autowired
    private IProductDetaiService productDetaiService;

    @Autowired
    private IVipService vipService;
    /**
     * 获取通知列表
     */
    @RequestMapping(value = "/page")
    @ResponseBody
    public Object list(int page,int limit,String name) {
        List<Product> list = this.productService.selectList(new EntityWrapper<Product>().like("name",name));

        return success(page(list,page,limit));
    }

    @RequestMapping(value = "/{id}")
    @ResponseBody
    public Object GetById(@PathVariable Integer id) {
        return success(this.productService.selectById(id));
    }

    @RequestMapping(value = "/orderProduct")
    @ResponseBody
    public Object orderProduct(@RequestBody ProductDetai detai, HttpServletRequest request) {

        Integer userId=JwtTokenUtil.getUserId(request);
        if(detai.getTotal().compareTo(vipService.selectById(userId).getMoney())>0){
            return fail("用户账户余额不足，购买失败！请充值后再进行购买");
        }

        Date d=new Date();
        detai.setUserId(userId);
        detai.setStatus(ConstantUtil.JudgeStatus.START.getName());
        detai.setOrderDate(d);
        detai.setOrderTime(d);
        detai.setUserName(vipService.selectById(detai.getUserId()).getUsername());

        Product product=productService.selectById(detai.getProductId());
        if(product.getNum()==null){
            product.setNum(detai.getNum());
        }else{
            product.setNum(product.getNum()+detai.getNum());
        }
        productService.updateById(product);

        productDetaiService.insert(detai);
        return success("购买成功");
    }
}
