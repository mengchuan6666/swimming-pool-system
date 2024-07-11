package com.stylefeng.guns.modular.biz.api;


import com.stylefeng.guns.core.base.warpper.BaseControllerWarpper;
import com.stylefeng.guns.modular.biz.api.model.Constants;
import com.stylefeng.guns.modular.biz.api.model.PageResult;
import com.stylefeng.guns.modular.biz.api.result.ApiResult;
import com.stylefeng.guns.modular.system.model.Notice;
import com.stylefeng.guns.modular.system.model.User;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Controller基类
 */
public class BaseApiController {

    /**
     * 获取当前登录的user
     *
     * @return User
     */
    public User getLoginUser() {
        return null;
    }

    /**
     * 获取当前登录的userId
     *
     * @return userId
     */
    public Integer getLoginUserId() {
       return null;
    }

    protected Object warpObject(BaseControllerWarpper warpper) {
        return warpper.warp();
    }
    public List<?> page(List<?> list,int page,int limit){
        return list.stream().skip((page-1)*limit).limit(limit).
                collect(Collectors.toList());
    }
    /**
     * 返回成功
     *
     * @param message 状态信息
     * @return ApiResult
     */
    public ApiResult<?> success(String message) {
        return success().setMessage(message);
    }

    /**
     * 返回分页查询数据
     *
     * @param
     * @return ApiResult
     */
    public <T> ApiResult<PageResult<T>> success() {
//        return success(iPage.getRecords(), iPage.getTotal());
        return new ApiResult<>(Constants.RESULT_OK_CODE);
    }

    /**
     * 返回成功
     *
     * @param data 返回数据
     * @return ApiResult
     */
    public <T> ApiResult<T> success(T data) {
        return new ApiResult<>(Constants.RESULT_OK_CODE, Constants.RESULT_OK_MSG, data);
    }

    /**
     * 返回成功
     *
     * @param message 状态信息
     * @return ApiResult
     */
    public <T> ApiResult<T> success(String message, T data) {
        return success(data).setMessage(message);
    }

    /**
     * 返回分页查询数据
     *
     * @param list  当前页数据
     * @param count 总数量
     * @return ApiResult
     */
    public <T> ApiResult<PageResult<T>> success(List<T> list, Long count) {
        return success(new PageResult<>(list, count));
    }


    /**
     * 返回失败
     *
     * @return ApiResult
     */
    public ApiResult<?> fail() {
        return new ApiResult<>(Constants.RESULT_ERROR_CODE, Constants.RESULT_ERROR_MSG);
    }

    /**
     * 返回失败
     *
     * @param message 状态信息
     * @return ApiResult
     */
    public ApiResult<?> fail(String message) {
        return fail().setMessage(message);
    }

    /**
     * 返回失败
     *
     * @param data 返回数据
     * @return ApiResult
     */
    public <T> ApiResult<T> fail(T data) {
        return fail(Constants.RESULT_ERROR_MSG, data);
    }

    /**
     * 返回失败
     *
     * @param message 状态信息
     * @param data    返回数据
     * @return ApiResult
     */
    public <T> ApiResult<T> fail(String message, T data) {
        return new ApiResult<>(Constants.RESULT_ERROR_CODE, message, data);
    }

    /**
     * 请求参数的空字符串转为null
     */
//    @InitBinder
//    public void initBinder(WebDataBinder binder) {
//        binder.registerCustomEditor(String.class, new StringTrimmerEditor(true));
//    }

}
