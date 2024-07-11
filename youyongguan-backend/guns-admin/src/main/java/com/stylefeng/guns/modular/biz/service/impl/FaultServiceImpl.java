package com.stylefeng.guns.modular.biz.service.impl;

import com.stylefeng.guns.modular.system.model.Fault;
import com.stylefeng.guns.modular.system.dao.FaultMapper;
import com.stylefeng.guns.modular.biz.service.IFaultService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 故障表 服务实现类
 * </p>
 *
 * @author youyongguan
 * @since 2024-03-31
 */
@Service
public class FaultServiceImpl extends ServiceImpl<FaultMapper, Fault> implements IFaultService {

}
