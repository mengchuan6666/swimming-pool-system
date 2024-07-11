package com.stylefeng.guns.modular.biz.api;

import com.stylefeng.guns.modular.biz.api.result.ApiResult;
import com.stylefeng.guns.modular.biz.api.result.CaptchaResult;
import com.wf.captcha.SpecCaptcha;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/capture")
public class CaptureController extends BaseApiController{

    @ApiOperation("图形验证码")
    @GetMapping("")
    public ApiResult<CaptchaResult> captcha() {
        SpecCaptcha specCaptcha = new SpecCaptcha(130, 48, 5);
        return success(new CaptchaResult(specCaptcha.toBase64(), specCaptcha.text().toLowerCase()));
    }
}
