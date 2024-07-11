package com.stylefeng.guns.core.util;

import java.util.Date;

public class DateTimeUtil {
    public static String getCurrentDate(){
        return new Date().toLocaleString().split(" ")[0];
    }
    public static String getCurrentTime(){
        return new Date().toLocaleString().split(" ")[1];
    }

    public static String getDate(Date date){
        return date.toLocaleString().split(" ")[0];
    }
    public static String getTime(Date date){
        return date.toLocaleString().split(" ")[1];
    }
}
