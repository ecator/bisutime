var app=getApp();
var BISUTIME=require("../../lib/bisutime");
//以2017-2-17日为起始点初始化bisudtime对象
var start=new Date;
start.setHours(0);
start.setMinutes(0);
start.setSeconds(0);
start.setFullYear(2017);
start.setDate(19);
start.setMonth(1);
console.log("本学期开始时间：%s",start);
var bisutime=new BISUTIME(start);
// console.log(bisutime.getWeekth(),bisutime.getTime());
//默认中文展示
var currentLan=wx.getStorageSync('lang')?wx.getStorageSync('lang'):"zh";
//声明不同语言的标题
var titles={
    "zh":"二外时间",
    "en":"BISU TIME",
    "jp":"二外タイム"
};
var langs={
    'zh':"default",
    'en':"default",
    'jp':"default"
};
setLanguage(currentLan);
//远程配置
var config={};
Page({
    data:{
        btnType:langs
    },
    onLoad:function(){
        //绑定setData
        var setData=this.setData.bind(this);
        //设置相应语言标题
        wx.setNavigationBarTitle({
            title: titles[currentLan]
        });
        //获取配置
        getConfig(function(res){
            config=res;
            console.log('当前配置：',config);
            setData({
                content:getDisplay(currentLan),
                image:getImg()
            });
            //设置定时刷新content
            setInterval(function(){
                setData({
                    content:getDisplay(currentLan)
                });
            },1000);
        });
    },
    onShareAppMessage:function(){
        return {
            title:titles[currentLan],
            path:"/pages/index/index"
        }
    },
    //切换语言
    changeLang:function(e){
        // console.log(e);
        var checkedlan=e.currentTarget.id;
        //设置当前语言为选中的语言
        setLanguage(checkedlan);
        //刷新视图
        this.setData({
            btnType:langs,
            content:getDisplay(currentLan),
            image:getImg()
        });
        //刷新导航条标题
        wx.setNavigationBarTitle({
            title:titles[currentLan],
        });
    },
    //随机切换图片
    changeImg:function(){
        this.setData({
            image:getImg()
        });
    }
});

//设置语言数组
function setLanguage(lan){
    for(var key in langs){
        if(key==lan){
            langs[key]="primary";
        }else{
            langs[key]="default";
        }
    }
    //保存语言设置到缓存
    wx.setStorageSync('lang', lan);
    currentLan=lan;
    // console.log("当前语言：%s",currentLan);
}

//根据语言显示content展示内容
function getDisplay(lan){
    var res=[];
    var now=new Date;
    //星期几 映射表
    var dayNames={
        zh:['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
        en:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        jp:['月曜日','火曜日','水曜日','木曜日','金曜日','土曜日','日曜日']
    };
    //序数词映射表
    var ordinal=["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth","eleventh","twelfth","thirteenth","fourteenth","fifteenth","sixteenth","seventeenth","eighteenth","nineteenth","twentieth","twenty-first","twenty-second","twenty-third","twenty-forth","twenty-fifth","twenty-sixth","twenty-seventh","twenty-eighth","twenty-ninth","thirtieth","thirty-first"];
    var dayIndex=bisutime.getDay()-1;
    var time=bisutime.getTime();
    var weekth=bisutime.getWeekth();
    if(currentLan=='en'){
        //英语序数需要特殊处理
        time=ordinal[time-1];
        weekth=ordinal[weekth-1];
        var before=ordinal[parseInt(time)-1];
        var next=ordinal[parseInt(time)];
    }else{
        var before=parseInt(time);
        var next=parseInt(time)+1;
    }
    var next_time=formatHM(bisutime.getNext(),currentLan);
    //构建tokens
    var tokens={
        day:dayNames[currentLan][dayIndex],
        weekth:weekth,
        next_time:next_time,
        before:before,
        next:next,
        time:time
    };
    res.push(parseFormat({flag:"day",tokens}));
    if(bisutime.getWeekth()>17){
        //放寒暑假
        res.push(parseFormat({flag:"holiday",tokens}));
        return res.join("\n");
    }
    //没有放假，上课期间
    res.push(parseFormat({flag:"weekth",tokens}));
    if (dayIndex>=5) {
        //周末
        if(dayIndex==6){
            //星期天
            res.push(parseFormat({flag:"sunday",tokens}));
        }else{
            //星期六
            res.push(parseFormat({flag:"saturday",tokens}));
        }
        return res,join("\n");
    }
    if (bisutime.getTime()<=0) {
        //还未上课
        res.push(parseFormat({flag:"morning",tokens}));
        return res.join("\n");
    }else if (bisutime.getTime()>0 && bisutime.getTime()<=12 && parseInt(bisutime.getTime())==bisutime.getTime()) {
        //上课中
        res.push(parseFormat({flag:"lesson",tokens}));
        return res;
    }else if(bisutime.getTime()>12){
        //放学
        res.push(parseFormat({flag:"evening",tokens}));
        if(dayIndex==4){
            //星期五
            res.push(parseFormat({flag:"friday",tokens}));
        }else{
            //非周五要断电
            res.push(parseFormat({flag:"notfriday",tokens}));
        }
        return res.join("\n");
    }else if(bisutime.getTime()==5.5){
        //午饭
        res.push(parseFormat({flag:"noon",tokens}));
        return res.join("\n");
    }else if(bisutime.getTime()==10.5){
        //晚饭
        res.push(parseFormat({flag:"dinner",tokens}));
        return res.join("\n");
    }else{
        //课间休息时间
        res.push(parseFormat({flag:"break",tokens}));
        return res.join("\n");
    }
    return 'hello bisutime';
}

//从全局config对象中返回一个图片对象，{src:xx,photographer:xx}
function getImg(){
    var imgs=config.imgs;
    var index=parseInt(Math.random()*imgs.length);
    return imgs[index];
}
//更具语言格式化时间 xx小时xx分钟 或者 xx分钟，需要提供一个HM{hours:xx,mins:xx}对象
function formatHM(hm,lan){
    var hours={
        "zh":"小时",
        "en":" hours",
        "jp":"時"
    };
    var mins={
        "zh":"分钟",
        "en":" mins",
        "jp":"分間"
    };
    if(hm.hours){
        if(hm.mins){
            return hm.hours+hours[lan]+hm.mins+mins[lan];
        }else{
            if(lan=='jp'){
                //日语要特殊出里
                return hm.hours+hours[lan]+"間";
            }else{
                return hm.hours+hours[lan];
            }
        }
    }else{
        return hm.mins+mins[lan];
    }
}

//获取远程配置并储存到Storage['config']中，结果传递到callback中
function getConfig(callback){
    var config={};
    wx.request({
        url:app.data.server+'config.json',
        success:function(res){
            // console.log(res);
            if (res.statusCode==200) {
                //微信貌似会自动转换json对象
                config=res.data
                //写入缓存
                wx.setStorageSync('config',config);
            }else{
                //返回缓存
                config=wx.getStorageSync('config');

            }
        },
        fail:function(){
            config=wx.getStorageSync('config');
        },
        complete:function(){
            callback(config);
        }
    });
}

/*根据当前语言环境解析时间格式
*传入一个{flag:xx,tokens:{token1:xx,token2:xx}}对象
*tokens属性非必需
*/
function parseFormat(data){
    if(data.hasOwnProperty('tokens')){
        //需要处理token
        var tokens=data.tokens;
        var flag=data.flag;
        var res=config.format[flag][currentLan];
        for(var token in tokens){
            var regexp=new RegExp("{{"+token+"}}","g");
            res=res.replace(regexp,tokens[token]);
        }
        return res;
    }else{
        //不需要处理token
        return config.format[flag][currentLan];
    }
}