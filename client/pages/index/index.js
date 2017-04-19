var app=getApp();
var BISUTIME=require("../../lib/bisutime");
var makeDate=require("../../lib/makedate");
var Config=require("../../lib/config");
//声明全局bisutime对象
var bisutime={};
//声明全局本页面对象
var currentpage={};
//全局语言索引，默认中文展示
var langIndex=Config.get('langIndex')?Config.get('langIndex'):0;
//全局locale
var locale=Config.get("locale");
//全局notification
var notification=Config.get('notification');
//注册页面
Page({
    data:{
        locale:[]
    },
    onShow:function(){
        if (!locale) {
            return;
        }
        wx.setNavigationBarTitle({
            title:locale[langIndex].title
        });
    },
    onLoad:function(){
        //暴露出本页面对象
        currentpage=this;
        //加载提示
        if (locale) {
            wx.showLoading({
                title:locale[langIndex].loading,
                mask:true
            });
        }
        //绑定setData
        var setData=this.setData.bind(this);
        //获取locale配置
        Config.getRemoteConfig("locale",function(res){
            //更新全局locale配置
            locale=res;
            console.log('当前locale：',locale);
            //获取日历
            Config.getRemoteConfig("calendar",function(calendar){
                 //声明起始日期
                var start=makeDate(calendar.start.year,calendar.start.month,calendar.start.date);
                console.log("本学期开始时间：%s",start);
                bisutime=new BISUTIME(start);
                setData({
                    locale:locale,
                    langIndex:langIndex,
                    currents:getCurrents()
                });
                wx.setNavigationBarTitle({
                    title:locale[langIndex].title
                });
                //设置定时刷新时间显示
                setInterval(function(){
                    setData({
                        langIndex:langIndex,
                        currents:getCurrents()
                    });
                },5000);
                //关闭加载框
                wx.hideLoading();
                // 监听加速度变化
                wx.startAccelerometer();
                var lastOrientation;
                var threshold=1.8;
                var loading=false;
                wx.onAccelerometerChange(function(res) {
                    if (!lastOrientation) {
                        lastOrientation=res;
                    }
                    if(loading==false && (Math.abs(res.x-lastOrientation.x)>threshold || Math.abs(res.y-lastOrientation.y)>threshold || Math.abs(res.z-lastOrientation.z)>threshold)){
                        loading=true;
                        //摇晃手机超过阀值
                        wx.showLoading({
                            title:locale[langIndex].loading,
                            mask:true
                        });
                        Config.getRemoteConfig("img",function(img){
                            currentpage.setData({
                                img:img
                            });
                            wx.hideLoading();
                            loading=false;
                        })
                    }
                    lastOrientation=res;
                })
            });
        });
        //获取公告
        Config.getRemoteConfig("notification",function(res){
            notification=res;
            console.log("当前公告：",notification);
            //设置公告
            setData({
                notification:notification
            });
        });
        //获取图片
        Config.getRemoteConfig("img",function(img){
            console.log("当前图片組：",img);
            setData({
                img:img
            });
        });
    },
    onShareAppMessage:function(){
        return {
            title:locale[langIndex].title,
            path:"/pages/index/index"
        }
    },
    //切换语言
    changeLang:function(e){
        // console.log(e);
        langIndex=e.detail.current;
        Config.set("langIndex",langIndex);
        wx.setNavigationBarTitle({
            title:locale[langIndex].title
        });
        this.setData({
            langIndex:langIndex,
            currents:getCurrents()
        });
    },
    // 预览图片
    preview:function(e){
        // console.log(e);
        wx.previewImage({
            current:e.currentTarget.dataset.src,
            urls:currentpage.data.img.map(function(img){
                return img.src;
            })
        });
    }
});

//根据全局语言索引获取对应的current内容
function getCurrent(){
    var res=[];
    var now=new Date;
    var lan=locale[langIndex].language;
    //星期几 映射表
    var dayNames={
        zh:['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
        en:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        jp:['月曜日','火曜日','水曜日','木曜日','金曜日','土曜日','日曜日'],
        ru:["Понедельник","вторник","среда","четверг","пятница","суббота","воскресенье"]
    };
    //序数词映射表
    var ordinal=["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth","eleventh","twelfth","thirteenth","fourteenth","fifteenth","sixteenth","seventeenth","eighteenth","nineteenth","twentieth","twenty-first","twenty-second","twenty-third","twenty-forth","twenty-fifth","twenty-sixth","twenty-seventh","twenty-eighth","twenty-ninth","thirtieth","thirty-first"];
    var dayIndex=bisutime.getDay()-1;
    var current=bisutime.getCurrent();
    var weekth=bisutime.getWeekth();
    var before=parseInt(current);
    var next=parseInt(current)+1;
    if(lan=='en'){
        //英语序数需要特殊处理
        var before=ordinal[parseInt(current)-1];
        var next=ordinal[parseInt(current)];
        current=ordinal[current-1];
        weekth=ordinal[weekth-1];
    }
    var next_time=formatHM(bisutime.getNext());
    //构建tokens
    var tokens={
        day:dayNames[locale[langIndex].language][dayIndex],
        weekth:weekth,
        next_time:next_time,
        before:before,
        next:next,
        current:current
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
        return res.join("\n");
    }
    if (bisutime.getCurrent()<=0) {
        //还未上课
        res.push(parseFormat({flag:"morning",tokens}));
        return res.join("\n");
    }else if (bisutime.getCurrent()>0 && bisutime.getCurrent()<=12 && parseInt(bisutime.getCurrent())==bisutime.getCurrent()) {
        //上课中
        res.push(parseFormat({flag:"lesson",tokens}));
        return res.join("\n");
    }else if(bisutime.getCurrent()>12){
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
    }else if(bisutime.getCurrent()==5.5){
        //午饭
        res.push(parseFormat({flag:"noon",tokens}));
        return res.join("\n");
    }else if(bisutime.getCurrent()==10.5){
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
//更具语言格式化时间 xx小时xx分钟 或者 xx分钟，需要提供一个HM{hours:xx,mins:xx}对象
function formatHM(hm){
    var lan=locale[langIndex].language;
    var hours={
        "zh":"小时",
        "en":" hours",
        "jp":"時間",
        "ru":"ч."
    };
    var mins={
        "zh":"分钟",
        "en":" minutes",
        "jp":"分",
        "ru":" мин."
    };
    if(hm.hours){
        //小时不为零
        if(hm.mins){
            //小时不为零，分钟不为零
            if(lan=='en'){
                //英语单复数
                if (hm.hours==1) {
                    hours[lan]=" hour";
                }
                if (hm.mins==1) {
                    mins[lan]=" minute";
                }
                //英语需要用and连接
                return hm.hours+hours[lan]+" and "+hm.mins+mins[lan];
            }else if (lan=="ru") {
                //俄语有空格
                return hm.hours+hours[lan]+" "+hm.mins+mins[lan];
            }else{
                return hm.hours+hours[lan]+hm.mins+mins[lan];
            }
        }else{
            // 小时不为零，但是分钟为零
            if (lan=="en") {
                //英语单复数
                if (hm.hours==1) {
                    hours[lan]=" hour";
                }
                return hm.hours+hours[lan];
            }else{
                return hm.hours+hours[lan];
            }
        }
    }else{
        //小时为零，分钟不为零
        if (lan=="en" && hm.mins==1) {
            //英语单复数
            mins[lan]=" minute";
        }
        return hm.mins+mins[lan];
    }
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
        var res=locale[langIndex][flag];
        for(var token in tokens){
            var regexp=new RegExp("{{"+token+"}}","g");
            res=res.replace(regexp,tokens[token]);
        }
        return res;
    }else{
        //不需要处理token
        return locale[langIndex][flag];
    }
}
// 获取全部语言的时间显示
function getCurrents(){
    // 保存临时全局语言索引
    var tmp=langIndex;
    var res=[];
    for(var i=0;i<locale.length;i++){
        langIndex=i;
        res.push(getCurrent());
    }
    langIndex=tmp;
    return res;
}