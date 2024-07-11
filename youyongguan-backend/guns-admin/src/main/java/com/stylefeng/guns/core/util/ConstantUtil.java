package com.stylefeng.guns.core.util;

public class ConstantUtil {
    public enum JudgeStatus{
        START("待审批"),PASS("通过"),REJECT("拒绝");
        private String Name;
        JudgeStatus( String name) {
            Name = name;
        }
        public String getName() {
            return Name;
        }
    }
    public enum ChargeStatus{
        START("充值中"),PASS("通过"),REJECT("拒绝");
        private String Name;
        ChargeStatus( String name) {
            Name = name;
        }
        public String getName() {
            return Name;
        }
    }
}
