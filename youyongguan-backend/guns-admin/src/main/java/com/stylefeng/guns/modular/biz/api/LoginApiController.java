package com.stylefeng.guns.modular.biz.api;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.stylefeng.guns.core.log.LogManager;
import com.stylefeng.guns.core.log.factory.LogTaskFactory;
import com.stylefeng.guns.core.shiro.ShiroKit;
import com.stylefeng.guns.core.shiro.ShiroUser;
import com.stylefeng.guns.modular.biz.api.model.UserVO;
import com.stylefeng.guns.modular.biz.api.result.ApiResult;
import com.stylefeng.guns.modular.biz.service.IYoukeService;
import com.stylefeng.guns.modular.system.model.Vip;
import com.stylefeng.guns.modular.system.model.Youke;
import com.stylefeng.guns.modular.system.service.IVipService;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.collections.map.HashedMap;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static com.stylefeng.guns.core.support.HttpKit.getIp;

@Controller
@RequestMapping("/loginApi")
public class LoginApiController extends BaseApiController {


    @Autowired
    private IVipService vipService;

    /**
     * 点击登录执行的动作
     */
    @RequestMapping(value = "", method = RequestMethod.POST)
    @ResponseBody
    public ApiResult loginVali(@RequestBody UserVO userVO) {

        String username = userVO.username;
        String password =userVO.password;
        String remember = userVO.remeber==true?"on":"off";
       // UsernamePasswordToken token = new UsernamePasswordToken(username, password.toCharArray());

        Wrapper<Vip> wrapper=new EntityWrapper<Vip>().eq("username",username).eq("password",password);
        Vip vip=vipService.selectOne(wrapper);
        if(vip==null){
            return fail("账号或密码输入有误");
        }


        Map<String,Object> map=new HashedMap();
        map.put("user",vip);
        map.put("access_token", vip.getId());
//        map.put("roles",new HashedMap(){{
//                    put("roleId","2");
//                    put("roleCode","tourist");
//                    put("roleName","游客用户");
//        }});


        return success(map);
    }



}
