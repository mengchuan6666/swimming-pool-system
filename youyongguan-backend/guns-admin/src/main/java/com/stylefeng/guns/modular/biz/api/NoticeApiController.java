package com.stylefeng.guns.modular.biz.api;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.stylefeng.guns.modular.system.model.Notice;
import com.stylefeng.guns.modular.system.service.INoticeService;
import com.stylefeng.guns.modular.system.warpper.NoticeWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/notice")
public class NoticeApiController extends BaseApiController{


    @Autowired
    private INoticeService noticeService;
    /**
     * 获取通知列表
     */
    @RequestMapping(value = "/page")
    @ResponseBody
    public Object list(int page,int limit) {
        List<Notice> list = this.noticeService.selectList(new EntityWrapper<Notice>());

        return success(page(list,page,limit));
    }
}
