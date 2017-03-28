var app=getApp();
var BISUTIME=require("../../lib/bisutime");
//以2017-2-17日为起始点初始化bisudtime对象
var start=new Date;
start.setHours(0);
start.setMinutes(0);
start.setSeconds(0);
start.setFullYear(2017);
start.setMonth(2-1);
start.setDate(19);
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
Page({
    data:{
        btnType:langs,
        image:getImg()
    },
    onLoad:function(){
        //设置相应语言标题
        wx.setNavigationBarTitle({
            title: titles[currentLan]
        });
        //显示container内容
        this.setData({
            content:getDisplay(currentLan)
        });
        //设置定时刷新content
        var that=this;
        setInterval(function(){
            that.setData({
                content:getDisplay(currentLan)
            });
        },1000)
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
    var res='';
    var now=new Date;
    switch(lan){
        case 'zh':
            var weekName=['星期一','星期二','星期三','星期四','星期五','星期六','星期日'];
            var weekIndex=bisutime.getDay()-1;
            var time=bisutime.getTime();
            res+="今天"+weekName[weekIndex];
            if(bisutime.getWeekth()>17){
                //放寒暑假
                res+="不过已经放假了哟";
                return res;
            }
            res+="\n开学第"+bisutime.getWeekth()+"周";
            if (weekIndex>=5) {
                //周末
                if(weekIndex==6){
                    //星期天
                    res+="\n明天就上课了，而且今天晚上还要断电";
                }else{
                    //星期六
                    res+="\n还有一天上课，抓紧时间浪吧";
                }
                return res;
            }
            if (time<=0) {
                //还未上课
                res+="\n还么有上课";
                res+="\n离早上第一节课还有"+formatHM(bisutime.getNext(),currentLan);
                return res;
            }else if (time>0 && time<=12 && parseInt(time)==time) {
                //上课中
                res+="\n现在正在上第"+time+"小节课";
                res+="\n离下课还有"+formatHM(bisutime.getNext(),currentLan);
                return res;
            }else if(time>12){
                //放学
                res+="\n现在已经放学了，赶快休息吧";
                if(weekIndex==4){
                    //星期五
                    res+="\n明天就是周六了，今天晚上不断电啦";
                }else{
                    //非周五要断电
                    res+="\n今天要断电，不要熬夜哟";
                }
                return res;
            }else if(time==5.5){
                //午饭
                res+="\n现在是午饭时间";
                res+="\n离下午上课还有"+formatHM(bisutime.getNext(),currentLan);
                res+="\n抓紧时间去吃午饭吧";
                return res;
            }else if(time==10.5){
                //晚饭
                res+="\n现在是晚饭时间";
                res+="\n离晚上上课还有"+formatHM(bisutime.getNext(),currentLan);
                res+="\n赶快去吃晚饭吧"
                return res;
            }else{
                //课间休息时间
                res+="\n现在是第"+parseInt(time)+"小节和第"+(parseInt(time)+1)+"小节课间休息时间";
                res+="\n离下节课还有"+formatHM(bisutime.getNext(),currentLan);
                res+="\n稍微休息一下吧";
                return res;
            }
            break;
        case 'en':
            var weekName=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
            var weekIndex=bisutime.getDay()-1;
            var time=bisutime.getTime();
            //序数词映射表
            var ordinal=["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth","eleventh","twelfth","thirteenth","fourteenth","fifteenth","sixteenth","seventeenth","eighteenth","nineteenth","twentieth","twenty-first","twenty-second","twenty-third","twenty-forth","twenty-fifth","twenty-sixth","twenty-seventh","twenty-eighth","twenty-ninth","thirtieth","thirty-first"];
            res+="Today is "+weekName[weekIndex];
            if(bisutime.getWeekth()>17){
                //放寒暑假
                res+="It's on holiday";
                return res;
            }
            res+="\nThe "+ordinal[bisutime.getWeekth()-1]+" week of school";
            if (weekIndex>=5) {
                //周末
                if(weekIndex==6){
                    //星期天
                    res+="\nTomorrow you will go to school";
                }else{
                    //星期六
                    res+="\nYou only have one day to go out";
                }
                return res;
            }
            if (time<=0) {
                //还未上课
                res+="\nIt's early to go to school";
                res+="\nIt's "+formatHM(bisutime.getNext(),currentLan)+"to go to school";
                return res;
            }else if (time>0 && time<=12 && parseInt(time)==time) {
                //上课中
                res+="\nNow it's the "+oridinal[time-1]+"lesson";
                res+="\nIt'll be "+formatHM(bisutime.getNext(),currentLan)+" until this class is over";
                return res;
            }else if(time>12){
                //放学
                res+="\nSchool is over,please have a rest";
                if(weekIndex==4){
                    //星期五
                    res+="\nTomorrow is Saturday,have a good day";
                }else{
                    //非周五要断电
                    res+="\nDon't stay up late";
                }
                return res;
            }else if(time==5.5){
                //午饭
                res+="\nIt's lunch time";
                res+="\nIt'll be "+formatHM(bisutime.getNext(),currentLan)+' until class begins afternoon';
                res+="\nIt's high time to hava lunch";
                return res;
            }else if(time==10.5){
                //晚饭
                res+="\nIt's dinner time";
                res+="\nIt'll be "+formatHM(bisutime.getNext(),currentLan)+' until class begins evening';
                res+="\nIt's high time to dinner lunch"
                return res;
            }else{
                //课间休息时间
                res+="\nIt's the break time between the "+ordinal[parseInt(time)-1]+"lesson and the "+ordinal[parseInt(time)]+" lesson";
                res+="\nIt'll be "+formatHM(bisutime.getNext(),currentLan)+" until this class is over";
                res+="\nPlease take a break";
                return res;
            }
            break;
        case 'jp':
            var weekName=['月曜日','火曜日','水曜日','木曜日','金曜日','土曜日','日曜日'];
            var weekIndex=bisutime.getDay()-1;
            var time=bisutime.getTime();
            res+="今日は"+weekName[weekIndex];
            if(bisutime.getWeekth()>17){
                //放寒暑假
                res+="今は休暇期間だよ";
                return res;
            }
            res+="\n今学期の"+bisutime.getWeekth()+"周目";
            if (weekIndex>=5) {
                //周末
                if(weekIndex==6){
                    //星期天
                    res+="\n明日は授業ですから\n今日はゆっくり休んでね";
                }else{
                    //星期六
                    res+="\nまだ一日間だ\n学校なんで行かなくていいから\n遊ぼう"
                }
                return res;
            }
            if (time<=0) {
                //还未上课
                res+="\nおはようございます";
                res+="\n授業はまだ始まってないよ";
                res+="\nまだ"+formatHM(bisutime.getNext(),currentLan)+"あるから\nもう少し寝坊していい";
                return res;
            }else if (time>0 && time<=12 && parseInt(time)==time) {
                //上课中
                res+="\nいまは"+time+"限目";
                res+="\n休憩はまだ"+formatHM(bisutime.getNext(),currentLan)+"あるから\nもうちょっと我慢してね";
                return res;
            }else if(time>12){
                //放学
                res+="\nお疲れ様でした";
                res+="\nいまは放課後\n何か面白いことをやってみようか";
                if(weekIndex==4){
                    //星期五
                    res+="\n明日はいよいよ土曜日だから\nどこかへ遊びにいくか";
                }else{
                    //非周五要断电
                    res+="\n今晩は停電の日だ\nご注意ください";
                }
                return res;
            }else if(time==5.5){
                //午饭
                res+="\n昼ごはんだよ";
                res+="\n午後の授業はまだ"+formatHM(bisutime.getNext(),currentLan)+"ある";
                res+="\n早く昼ごはんを食べよう";
                return res;
            }else if(time==10.5){
                //晚饭
                res+="\n晩ごはんだよ";
                res+="\n夜の授業はまだ"+formatHM(bisutime.getNext(),currentLan)+"ある";
                res+="\n早く晩ごはんを食べよう"
                return res;
            }else{
                //课间休息时间
                res+="\nいまは"+parseInt(time)+"限目と"+(parseInt(time)+1)+"限目の間の休憩時間";
                res+="\n次の授業はまだ"+formatHM(bisutime.getNext(),currentLan)+"ある";
                res+="\n時間は短いから\n勉強しよう";
                return res;
            }
            break;
    }
    return 'hell world';
}

//随机返回一个图片对象，{src:xx,photographer:xx}
function getImg(){
    var imgs={
        '../../img/snow-1.jpg':"吴岩",
        '../../img/snow-2.jpg':"吴岩",
        '../../img/snow-3.jpg':"吴岩",
        '../../img/snow-4.jpg':"吴岩",
        '../../img/snow-5.jpg':"吴岩",
        '../../img/snow-6.jpg':"吴岩",
        '../../img/snow-7.jpg':"吴岩",
        '../../img/snow-8.jpg':"吴岩",
        '../../img/snow-9.jpg':"吴岩",
        '../../img/snow-10.jpg':"吴岩",
        '../../img/snow-11.jpg':"吴岩",
        '../../img/snow-12.jpg':"吴岩",
        '../../img/snow-13.jpg':"吴岩"
    };
    var src=Object.keys(imgs);
    var index=parseInt(Math.random()*src.length);
    return {
        src:src[index],
        photographer:imgs[src[index]]
    };
}
//更具语言格式化时间 xx小时xx分钟 或者 xx分钟，需要提供一个HM{hours:xx,mins:xx}对象
function formatHM(hm,lan){
    var hours={
        "zh":"小时",
        "en":"hours",
        "jp":"時"
    };
    var mins={
        "zh":"分钟",
        "en":"mins",
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