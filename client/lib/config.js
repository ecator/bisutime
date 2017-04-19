"use strict";
//获取远程配置并储存到Storage[name]中，结果传递到callback中
function getRemoteConfig(name,callback){
    var app=getApp();
    var config={};
    var nameMap={
        "calendar":"api/weapp/getcalendar",
        "notification":"api/weapp/getnotification",
        "locale":"api/weapp/getlocale",
        "img":"api/weapp/getimgs"
    };
    wx.request({
        url:app.data.server+nameMap[name],
        success:function(res){
            // console.log(res);
            if (res.statusCode==200) {
                //微信貌似会自动转换json对象
                config=typeof(res.data)=='object'?res.data:JSON.parse(res.data);
                //写入缓存
                set(name,config);
            }else{
                //返回缓存
                config=get(name);

            }
        },
        fail:function(){
            config=get(name);
        },
        complete:function(){
            callback(config);
        }
    });
}
// 从Storageh获取配置
function get(key){
    return wx.getStorageSync(key);
}
// 设置一个值到Storage中
function set(key,val){
    return wx.setStorageSync(key,val);
}
module.exports.getRemoteConfig=getRemoteConfig;
module.exports.get=get;
module.exports.set=set;