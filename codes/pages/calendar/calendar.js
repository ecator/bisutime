var Calendar=require("../../lib/calendar");
var app=getApp();

var weekth=["一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十","二十一","四十二","二十三","二十四","二十五","二十六","二十七","二十八","二十九","三十","三十一","三十二","三十四","三十五","三十六","三十七","三十八","三十九","四十","四十一","四十二","四十三","四十四","四十五",];
//注册页面
Page({
	data:{
		header:"",
		calendars:[]
	},
	onLoad:function(){
		wx.showLoading({
			title:"校历查询中",
			mask:true
		});
		var setData=this.setData.bind(this);
		getCalendar(function(res){
			console.log("当前校历：",res);
			wx.setNavigationBarTitle({
				title:res.title,
				mask:true
			});
			var calendars=[];
			var start=new Date;
			var end=new Date;
			var index=new Date;
			var today=new Date;
			var firstDay=new Date;
			start.setFullYear(res.start.year);
			start.setDate(1);
			start.setMonth(res.start.month);
			start.setHours(0);
			start.setMinutes(0);
			start.setSeconds(0);
			start.setMilliseconds(0);
			end.setFullYear(res.end.year);
			end.setDate(1);
			end.setMonth(res.end.month+1);
			end.setDate(0);
			end.setHours(0);
			end.setMinutes(0);
			end.setSeconds(0);
			end.setMilliseconds(0);
			firstDay.setFullYear(res.start.year);
			firstDay.setDate(1);
			firstDay.setMonth(res.start.month);
			firstDay.setDate(res.start.date);
			firstDay.setHours(0);
			firstDay.setMinutes(0);
			firstDay.setSeconds(0);
			firstDay.setMilliseconds(0);
			index.setFullYear(start.getFullYear());
			index.setDate(start.getDate());
			index.setMonth(start.getMonth());
			index.setHours(0);
			index.setMinutes(0);
			index.setSeconds(0);
			index.setMilliseconds(0);
			console.log("校历开始时间:",start);
			console.log("校历结束时间:",end);
			console.log("校历索引时间:",index);
			var lastMonth=index.getMonth();
			//初始化第一个日历
			calendars.push(new Calendar(index.getFullYear()+"年"+String(index.getMonth()+1)+"月"));
			var daysMap=[
					{type:"",body:""},
					{type:"",body:""},
					{type:"",body:""},
					{type:"",body:""},
					{type:"",body:""},
					{type:"",body:""},
					{type:"",body:""}
			];
			//生成校历
			var weekIndex=0;
			for(var count=(index.getDay()==0?7:index.getDay())-1;index.getTime()<=end.getTime();count++){
				if(lastMonth!=index.getMonth()){
					//新增一个日历
					calendars.push(new Calendar(index.getFullYear()+"年"+String(index.getMonth()+1)+"月"));
					count=(index.getDay()==0?7:index.getDay())-1;
				}
				daysMap[count%7].body=index.getDate();
				//遍历holidays
				var holidayStart=new Date;
				var holidayEnd=new Date;
				for(var i=0;i<res.holidays.length;i++){
					holidayStart.setFullYear(res.holidays[i].start.year);
					holidayStart.setDate(1);
					holidayStart.setMonth(res.holidays[i].start.month);
					holidayStart.setDate(res.holidays[i].start.date);
					holidayStart.setMinutes(0);
					holidayStart.setHours(0);
					holidayStart.setSeconds(0);
					holidayStart.setMilliseconds(0);
					holidayEnd.setFullYear(res.holidays[i].end.year);
					holidayEnd.setDate(1);
					holidayEnd.setMonth(res.holidays[i].end.month);
					holidayEnd.setDate(res.holidays[i].end.date);
					holidayEnd.setMinutes(0);
					holidayEnd.setHours(0);
					holidayEnd.setSeconds(0);
					holidayEnd.setMilliseconds(0);
					// console.log("假期开始：",holidayStart);
					// console.log("假期结束：",holidayEnd);
					if(index.getTime()>=holidayStart.getTime() && index.getTime()<=holidayEnd.getTime()){
						daysMap[count%7].type+="holiday ";
					}
				}
				//遍历studies
				var studyStart=new Date;
				var studyEnd=new Date;
				for(var i=0;i<res.studies.length;i++){
					studyStart.setFullYear(res.studies[i].start.year);
					studyStart.setDate(1);
					studyStart.setMonth(res.studies[i].start.month);
					studyStart.setDate(res.studies[i].start.date);
					studyStart.setMinutes(0);
					studyStart.setHours(0);
					studyStart.setSeconds(0);
					studyStart.setMilliseconds(0);
					studyEnd.setFullYear(res.studies[i].end.year);
					studyEnd.setDate(1);
					studyEnd.setMonth(res.studies[i].end.month);
					studyEnd.setDate(res.studies[i].end.date);
					studyEnd.setMinutes(0);
					studyEnd.setHours(0);
					studyEnd.setSeconds(0);
					studyEnd.setMilliseconds(0);
					// console.log("调休开始：",holidayStart);
					// console.log("调休结束：",holidayEnd);
					if(index.getTime()>=studyStart.getTime() && index.getTime()<=studyEnd.getTime()){
						daysMap[count%7].type+="study ";
					}
				}
				//遍历tests
				var testStart=new Date;
				var testEnd=new Date;
				for(var i=0;i<res.tests.length;i++){
					testStart.setFullYear(res.tests[i].start.year);
					testStart.setDate(1);
					testStart.setMonth(res.tests[i].start.month);
					testStart.setDate(res.tests[i].start.date);
					testStart.setMinutes(0);
					testStart.setHours(0);
					testStart.setSeconds(0);
					testStart.setMilliseconds(0);
					testEnd.setFullYear(res.tests[i].end.year);
					testEnd.setDate(1);
					testEnd.setMonth(res.tests[i].end.month);
					testEnd.setDate(res.tests[i].end.date);
					testEnd.setMinutes(0);
					testEnd.setHours(0);
					testEnd.setSeconds(0);
					testEnd.setMilliseconds(0);
					// console.log("考试开始：",holidayStart);
					// console.log("考试结束：",holidayEnd);
					if(index.getTime()>=testStart.getTime() && index.getTime()<=testEnd.getTime()){
						daysMap[count%7].type+="test ";
					}
				}
				//遍历smalls 特殊节日
				var smallDate=new Date;
				for(var i=0;i<res.smalls.length;i++){
					smallDate.setFullYear(res.smalls[i].date.year);
					smallDate.setDate(1);
					smallDate.setMonth(res.smalls[i].date.month);
					smallDate.setDate(res.smalls[i].date.date);
					if(smallDate.getFullYear==index.getFullYear && smallDate.getMonth()==index.getMonth() && smallDate.getDate()==index.getDate()){
						daysMap[count%7].type+="small ";
						daysMap[count%7].body=res.smalls[i].title;
					}
				}
				//标注今天
				if(today.getFullYear()==index.getFullYear() && today.getMonth()==index.getMonth() && today.getDate()==index.getDate()){
					daysMap[count%7].type+="today";
				}
				lastMonth=index.getMonth();
				index.setDate(index.getDate()+1);
				if((count+1)%7==0 || lastMonth!=index.getMonth()){
					//新增加一行
					// console.log(daysMap);
					//是否已经是开学第一周
					if(firstDay.getTime()<index.getTime()){
						calendars[calendars.length-1].addRow(weekth[weekIndex],daysMap);
						if((count+1)%7==0){
							//循环一周增加一
							weekIndex++;
						}	
					}else{
						calendars[calendars.length-1].addRow("未开学",daysMap);
					}
					daysMap=[
						{type:"",body:""},
						{type:"",body:""},
						{type:"",body:""},
						{type:"",body:""},
						{type:"",body:""},
						{type:"",body:""},
						{type:"",body:""}
					];
				}
			}
			setData({
				calendars:calendars
			});
			wx.hideLoading();
		});
	},
	onShareAppMessage:function(){
		return {
			title:"二外校历",
			path:"/pages/calendar/calendar"
		};
	}
});

//获取校历配置文件
function getCalendar(callback){
	var calendar={};
	wx.request({
		url:app.data.server+"calendar.json",
		success:function(res){
			// console.log(res);
            if (res.statusCode==200) {
                //微信貌似会自动转换json对象
                calendar=typeof(res.data)=='object'?res.data:JSON.parse(res.data);
                //写入缓存
                wx.setStorageSync('calendar',calendar);
            }else{
                //返回缓存
                calendar=wx.getStorageSync('calendar');

            }
        },
        fail:function(){
            calendar=wx.getStorageSync('calendar');
        },
        complete:function(){
            callback(calendar);
        }
	});
}