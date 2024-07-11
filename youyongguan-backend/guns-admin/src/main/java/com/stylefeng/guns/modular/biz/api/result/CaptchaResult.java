package com.stylefeng.guns.modular.biz.api.result;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

/**
 * 验证码返回结果
 */

@ApiModel(description = "验证码返回结果")
public class CaptchaResult implements Serializable {
    private static final long serialVersionUID = 1L;

    @ApiModelProperty("图形验证码base64数据")
    private String base64;

    @ApiModelProperty("验证码文本")
    private String text;

    public CaptchaResult() {
    }

    public CaptchaResult(String base64, String text) {
        this.base64 = base64;
        this.text = text;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getBase64() {
        return base64;
    }

    public void setBase64(String base64) {
        this.base64 = base64;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
