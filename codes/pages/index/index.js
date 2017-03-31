var app=getApp();
var BISUTIME=require("../../lib/bisutime");
var getCurrentPage=require("../../lib/getcurrentpage");
//声明全局bisutime对象
var bisutime={};
//全局语言索引，默认中文展示
var langIndex=wx.getStorageSync('langIndex')?wx.getStorageSync('langIndex'):0;
//全局图片索引
var imgIndex=0;
//全局图片数组
var imgs=[
    {
        src:"../../img/loading.gif",
        origin:app.data.server+"logo/loading.gif",
        type:"loading"
    }
];
//全局语言属性数组
var langs=[
    {
        id:"zh",
        type:"default",
        name:"中文",
        title:"二外时间",
        loading:"玩命加载中"
    },
    {
        id:"en",
        type:"default",
        name:"English",
        title:"BISU TIME",
        loading:"wait wait wait"
    },
    {
        id:"jp",
        type:"default",
        name:"日本語",
        title:"二外タイム",
        loading:"お帰り"
    },
    {
        id:"ru",
        type:"default",
        name:"Русский",
        title:"Университетское время",
        loading:"погрузки"
    }
];
//远程配置
var config={};
//全局触摸点堆栈，用于记录滑动信息
var touchStack=[];
//注册页面
Page({
    data:{
        btns:[],
        image:imgs[0]
    },
    onLoad:function(){
        //加载提示
        wx.showLoading({
            title:langs[langIndex].loading,
            mask:true
        });
        //绑定setData
        var setData=this.setData.bind(this);
        //获取配置
        getConfig(function(res){
            //更新全局远程配置
            config=res;
            console.log('当前配置：',config);
            //设置公告
            setData({
                notification:config.notification
            });
            //重新构造全局imgs对象{src:xx,origin:xx,photographer:xx,type:photo/loading}
            imgs=config.imgs.map(function(item){
                item.origin=item.src;
                item.type="loading";
                item.src="../../img/loading.gif";
                return item;
            });
            //声明起始日期
            var start=new Date;
            start.setHours(0);
            start.setMinutes(0);
            start.setSeconds(0);
            start.setFullYear(config.start.year);
            start.setDate(config.start.date);
            start.setMonth(config.start.month);
            console.log("本学期开始时间：%s",start);
            bisutime=new BISUTIME(start);
            //根据当前语言索引刷新界面
            refreshUI();
            //设置定时刷新时间显示
            setInterval(function(){
                setData({
                    content:getDisplay()
                });
            },1000);
            //关闭加载框
            wx.hideLoading();
        });
    },
    onShareAppMessage:function(){
        return {
            title:langs[langIndex].title,
            path:"/pages/index/index"
        }
    },
    //切换语言
    changeLang:function(e){
        // console.log(e);
        var checkedlan=e.currentTarget.id;
        //找出选中语言的index
        for(var i=0;i<langs.length;i++){
            if(checkedlan==langs[i].id){
                break;
            }
        }
        //设置当前语言索引
        langIndex=i;
        //刷新视图
        refreshUI();

    },
    //随机切换图片
    changeImg:function(){
        transitImg(getImg());
    },
    //滑动图片更换图片
    slideImg:function(e){
        // console.log(e);
        switch(e.type){
            case "touchmove":
                touchStack.push(e.changedTouches[0]);
                break;
            case "touchend":
                //通过判断最后两个点的x坐标来确定左右滑动操作
                if(touchStack.length>1){
                    if(touchStack[touchStack.length-1].clientX-touchStack[touchStack.length-2].clientX>0){
                        //从左往右滑动
                        // console.log("从左往右滑动");
                        imgIndex-=1;
                        if(imgIndex<0){
                            imgIndex=imgs.length-1;
                        }
                        //顺时针过渡图片
                        transitImg(getImg(imgIndex),true);
                    }else{
                        //从右往左滑动
                        // console.log("从右往左滑动");
                        imgIndex+=1;
                        if(imgIndex>=imgs.length){
                            imgIndex=0;
                        }
                        //逆时针过渡动画
                        transitImg(getImg(imgIndex));
                    }
                }
                //清空触摸堆栈
                touchStack.splice(0,touchStack.length);
                break;
        }
    }
});

//根据当前语言索引，设置对应语言type为primary,并刷新视图
function refreshUI(){
    var currentPage=getCurrentPage();
    for(var i=0;i<langs.length;i++ ){
        if(i==langIndex){
            langs[i].type="primary";
        }else{
            langs[i].type="default";
        }
    }
    //保存语言索引到缓存
    wx.setStorageSync('langIndex', langIndex);
    //刷新界面语言
    currentPage.setData({
        btns:langs,
        content:getDisplay(),
    });
    //过度刷新图片
    transitImg(getImg());
    //刷新导航条标题
    wx.setNavigationBarTitle({
        title:langs[langIndex].title
    });
}

//根据语言显示content展示内容
function getDisplay(){
    var res=[];
    var now=new Date;
    var lan=langs[langIndex].id;
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
    var time=bisutime.getTime();
    var weekth=bisutime.getWeekth();
    var before=parseInt(time);
    var next=parseInt(time)+1;
    if(lan=='en'){
        //英语序数需要特殊处理
        var before=ordinal[parseInt(time)-1];
        var next=ordinal[parseInt(time)];
        time=ordinal[time-1];
        weekth=ordinal[weekth-1];
    }
    var next_time=formatHM(bisutime.getNext());
    //构建tokens
    var tokens={
        day:dayNames[langs[langIndex].id][dayIndex],
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
        return res.join("\n");
    }
    if (bisutime.getTime()<=0) {
        //还未上课
        res.push(parseFormat({flag:"morning",tokens}));
        return res.join("\n");
    }else if (bisutime.getTime()>0 && bisutime.getTime()<=12 && parseInt(bisutime.getTime())==bisutime.getTime()) {
        //上课中
        res.push(parseFormat({flag:"lesson",tokens}));
        return res.join("\n");
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

/*从全局config对象中随机返回一个图片对象
*{src:xx,origin:xx,photographer:xx,type:photo/loading}
*如果自定了specify参数则返回指定索引的图片对象，并设置全局索引
*/
function getImg(specify){
    //防止和上一张图片重复
    var tmpIndex=0;
    do{
        tmpIndex=parseInt(Math.random()*imgs.length);
    }while(imgs.length>0 && imgIndex==tmpIndex);
    imgIndex=typeof(specify)!="undefined"?specify:tmpIndex;
    if(imgs[imgIndex].type=='loading'){
        //还未获取远程图片，需要获取
        var index=imgIndex;
        wx.downloadFile({
            url:imgs[index].origin,
            success:function(res){
                imgs[index].src=res.tempFilePath;
                imgs[index].type="photo";
                if (index==imgIndex) {
                    /*如果正在显示当前图片则更新视图
                    **等待2秒过渡
                    */
                    setTimeout(function(){
                        var currentPage=getCurrentPage();
                        currentPage.setData({
                        image:imgs[index]
                    });
                    },2000);
                }
                // console.log("成功下载图片：",imgs[index]);
            }
        });
    }
    return imgs[imgIndex];
}
//更具语言格式化时间 xx小时xx分钟 或者 xx分钟，需要提供一个HM{hours:xx,mins:xx}对象
function formatHM(hm){
    var lan=langs[langIndex].id;
    var hours={
        "zh":"小时",
        "en":" hours",
        "jp":"時",
        "ru":"ч."
    };
    var mins={
        "zh":"分钟",
        "en":" mins",
        "jp":"分間",
        "ru":" мин."
    };
    if(hm.hours){
        if(hm.mins){
            if(lan=='en' || lan=='ru'){
                //英语和俄语有空格
                return hm.hours+hours[lan]+" "+hm.mins+mins[lan];
            }else{
                return hm.hours+hours[lan]+hm.mins+mins[lan];
            }
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
                config=typeof(res.data)=='object'?res.data:JSON.parse(res.data);
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
    var lan=langs[langIndex].id;
    if(data.hasOwnProperty('tokens')){
        //需要处理token
        var tokens=data.tokens;
        var flag=data.flag;
        var res=config.format[flag][lan];
        for(var token in tokens){
            var regexp=new RegExp("{{"+token+"}}","g");
            res=res.replace(regexp,tokens[token]);
        }
        return res;
    }else{
        //不需要处理token
        return config.format[flag][lan];
    }
}

//过度显示图片,则随机过渡一张图片，需要传入一个img对象
function transitImg(img,reverse){
    var currentpage=getCurrentPage();
    var animation=wx.createAnimation({
            duration:1000
        });
    var deg=reverse?90:-90;
    animation.rotateY(deg).opacity(0).step()
        currentpage.setData({
            galleryAnima:animation.export()
        });
    setTimeout(function(){
        animation.rotateY(0).opacity(1).step()
        currentpage.setData({
            image:img,
            galleryAnima:animation.export()
        });
    },1000);
}