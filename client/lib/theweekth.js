//获取全年第几周
function theWeekth(date) {
    var totalDays = 0;
    var now =date || new Date();
    //构造当年一月一日的日期
    var start=new Date();
    start.setFullYear(now.getFullYear());
    start.setMonth(0);
    start.setDate(1);
    var startDay=start.getDay()==0?7:start.getDay();
    var offsetDay=8-startDay;
    // console.log(startDay,offsetDay);
    var years = now.getYear()
    if (years < 1000)
        years += 1900
    var days = new Array(12);
    days[0] = 31;
    days[2] = 31;
    days[3] = 30;
    days[4] = 31;
    days[5] = 30;
    days[6] = 31;
    days[7] = 31;
    days[8] = 30;
    days[9] = 31;
    days[10] = 30;
    days[11] = 31;
     
    //判断是否为闰年，针对2月的天数进行计算
    if (Math.round(now.getYear() / 4) == now.getYear() / 4) {
        days[1] = 29
    } else {
        days[1] = 28
    }
 
    if (now.getMonth() == 0) {
        totalDays =now.getDate();
        // console.log(totalDays);
    } else {
        var curMonth = now.getMonth();
        for (var count = 1; count <= curMonth; count++) {
            totalDays = totalDays + days[count - 1];
        }
        totalDays = totalDays + now.getDate();
    }
    //得到第几周
    totalDays-=offsetDay;
    // console.log(totalDays);
    if(totalDays>0){
        var week = Math.ceil(totalDays / 7)+1;
    }else{
        var week=1
    }
    return week;
}
module.exports=theWeekth;