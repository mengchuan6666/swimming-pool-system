package com.stylefeng.guns.modular.biz.api;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.stylefeng.guns.modular.biz.api.model.UserVO;
import com.stylefeng.guns.modular.biz.api.result.ApiResult;
import com.stylefeng.guns.modular.biz.service.IYoukeService;
import com.stylefeng.guns.modular.system.model.User;
import com.stylefeng.guns.modular.system.model.Vip;
import com.stylefeng.guns.modular.system.service.IVipService;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.collections.map.HashedMap;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("")
public class MainController extends BaseApiController{
    @Autowired
    private IVipService vipService;
    @ApiOperation("获取登录用户信息")
    @GetMapping("/auth/user")
    public ApiResult<Object> userInfo(HttpServletRequest request) {

        return success(vipService.selectById(request.getHeader("Authorization")));
    }

    /**
     * 点击登录执行的动作
     */
    @RequestMapping(value = "/regiter", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult register(@RequestBody UserVO userVO) {

        if(!userVO.password.equals(userVO.passtwo)){
            return fail("两次密码输入不一致");
        }
        Vip vip=vipService.selectOne(new EntityWrapper<Vip>().eq("username",userVO.username));
        if(vip!=null){
            return fail("用户名已存在，请更换用户名后再尝试");
        }
        vip=new Vip();
        vip.setUsername(userVO.username);
        vip.setPassword(userVO.password);
        vip.setNickname(userVO.nickname);
        vip.setPhone(userVO.phone);
        vip.setCreatetime(new Date());
        vipService.insert(vip);
        return success("注册成功");
    }
}
