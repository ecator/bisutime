var theWeekth=require('./theweekth');
class BISUTIME{
    constructor(start){
        //start为开学前一天，一般是一个星期天
        this.start=start;
    }
    //获取第几节课
    getTime(){
        /**
         *
         * 第一小节    8:00    -    8:45
         * 第二小节    8:50    -    9:35
         * 第三小节    9:50    -    10:35
         * 第四小节    10:40    -    11:25
         * 第五小节    11:30    -    12:15
         * 第六小节    13:20    -    14:05
         * 第七小节    14:10    -    14:55
         * 第八小节    15:10    -    15:55
         * 第九小节    16:00    -    16:45
         * 第十小节    16:50    -    17:35
         * 第十一小节    18:30    -    19:15
         * 第十二小节    19:20    -    20:05
         * 0 为早上还没上课 13为放学
         * 1.5 为第一小节和第二小节的休息时间
         * 2.5 为第二小节和第三小节的休息时间
         * 以此类推
         */
        //时间比较思想是把时间转换成分钟数
        var now=new Date;
        var compareTime = now.getHours() * 60 + now.getMinutes();
        if (compareTime < 8 * 60) {
            return 0;
        } else if (compareTime >= 8 * 60 && compareTime < 8 * 60 + 45) {
            return 1;
        } else if (compareTime >= 8 * 60 + 45 && compareTime < 8 * 60 + 50) {
            return 1.5;
        } else if (compareTime >= 8 * 60 + 50 &&  compareTime< 9 * 60 + 35) {
            return 2;
        } else if (compareTime >= 9 * 60 + 35 && compareTime < 9 * 60 + 50) {
            return 2.5;
        } else if (compareTime >= 9 * 60 + 50 && compareTime < 10 * 60 + 35) {
            return 3;
        } else if (compareTime >= 10 * 60 + 35 && compareTime < 10 * 60 + 40) {
            return 3.5;
        } else if (compareTime >= 10 * 60 + 40 && compareTime < 11 * 60 + 25) {
            return 4;
        } else if (compareTime >= 11 * 60 + 25 && compareTime < 11 * 60 + 30) {
            return 4.5;
        } else if (compareTime >= 11 * 60 + 30 && compareTime < 12 * 60 + 15) {
            return 5;
        } else if (compareTime >= 12 * 60 + 15 && compareTime < 13 * 60 + 20) {
            return 5.5; //午饭
        } else if (compareTime >= 13 * 60 + 20 && compareTime < 14 * 60 + 5) {
            return 6;
        } else if (compareTime >= 14 * 60 + 5 && compareTime < 14 * 60 + 10) {
            return 6.5;
        } else if (compareTime >= 14 * 60 + 10 && compareTime < 14 * 60 + 55) {
            return 7;
        } else if (compareTime >= 14 * 60 + 55 && compareTime < 15 * 60 + 10) {
            return 7.5;
        } else if (compareTime >= 15 * 60 + 10 && compareTime < 15 * 60 + 55) {
            return 8;
        } else if (compareTime >= 15 * 60 + 55 && compareTime < 16 * 60) {
            return 8.5;
        } else if (compareTime >= 16 * 60 && compareTime < 16 * 60 + 45) {
            return 9;
        } else if (compareTime >= 16 * 60 + 45 && compareTime < 16 * 60 + 50) {
            return 9.5;
        } else if (compareTime >= 16 * 60 + 50 && compareTime < 17 * 60 + 35) {
            return 10;
        } else if (compareTime >= 17 * 60 + 35 && compareTime < 18 * 60 + 30) {
            return 10.5;    // 晚饭
        } else if (compareTime >= 18 * 60 + 30 && compareTime < 19 * 60 + 15) {
            return 11;
        } else if (compareTime >= 19 * 60 + 15 && compareTime < 19 * 60 + 20) {
            return 11.5;
        } else if (compareTime >= 19 * 60 + 20 && compareTime < 20 * 60 + 5) {
            return 12;
        } else {
            return 13;
        }
    }

    //获取开学第几周
    getWeekth(){
        // console.log(new Date,theWeekth());
        // console.log(this.start,theWeekth(this.start));
        return theWeekth()-theWeekth(this.start);
    }
    //获取阿拉伯数字星期几，格式 1-7
    getDay(){
        var now=new Date;
        return now.getDay()==0?7:now.getDay();
    }

    //获取离下一个节点（下课或者上课）还有多久，返回一个对象，hours为小时部分，mins为分钟部分
    getNext(){
        var now=new Date;
        var totalTime=now.getHours()*60+now.getMinutes();
        switch(this.getTime()){
            case 0:
                return this.makeHM(8 * 60 - totalTime);
                break;
            case 1:
                return this.makeHM(8 * 60 + 45 - totalTime);
                break;
            case 1.5:
                return this.makeHM(8 * 60 + 50 - totalTime);
                break;
            case 2:
                return this.makeHM(9 * 60 + 35 - totalTime);
                break;
            case 2.5:
                return this.makeHM(9 * 60 + 50 - totalTime);
                break;
            case 3:
                return this.makeHM(10 * 60 + 35 - totalTime);
                break;
            case 3.5:
                return this.makeHM(10 * 60 + 40 - totalTime);
                break;
            case 4:
                return this.makeHM(11 * 60 + 25 - totalTime);
                break;
            case 4.5:
                return this.makeHM(12 * 60 + 15 - totalTime);
                break;
            case 5:
                return this.makeHM(12 * 60 + 15 - totalTime);
                break;
            case 5.5:
                return this.makeHM(13 * 60 + 20 - totalTime);
                break;
            case 6:
                return this.makeHM(14 * 60 + 5 - totalTime);
                break;
            case 6.5:
                return this.makeHM(14 * 60 + 10 - totalTime);
                break;
            case 7:
                return this.makeHM(14 * 60 + 55 - totalTime);
                break;
            case 7.5:
                return this.makeHM(15 * 60 + 10 - totalTime);
                break;
            case 8:
                return this.makeHM(15 * 60 + 55 - totalTime);
                break;
            case 8.5:
                return this.makeHM(16 * 60 - totalTime);
                break;
            case 9:
                return this.makeHM(16 * 60 + 45 - totalTime);
                break;
            case 9.5:
                return this.makeHM(16 * 60 + 50 - totalTime);
                break;
            case 10:
                return this.makeHM(17 * 60 + 35 - totalTime);
                break;
            case 10.5:
                return this.makeHM(18 * 60 + 30 - totalTime);
                break;
            case 11:
                return this,makeHM(19 * 60 + 15 - totalTime);
                break;
            case 11.5:
                return this.makeHM(19 * 60 + 20 - totalTime);
                break;
            case 12:
                return this.makeHM(20 * 60 + 5 - totalTime);
                break;
            default:
                //放学
                return this.makeHM(24 * 60 - totalTime+8*60);
        }
    }

    //返回一个{hours:xx,mins:xx}结构的对象
    makeHM(mins){
        var hours=parseInt(mins/60);
        var mins=mins%60;
        return {
            hours:hours,
            mins:mins
        };
    }
}

module.exports=BISUTIME;