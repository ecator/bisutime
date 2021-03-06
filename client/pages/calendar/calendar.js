var Calendar=require("../../lib/calendar");
var makeDate=require("../../lib/makedate");
var Config=require("../../lib/config");
var app=getApp();

var weekth=["一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十","二十一","四十二","二十三","二十四","二十五","二十六","二十七","二十八","二十九","三十","三十一","三十二","三十四","三十五","三十六","三十七","三十八","三十九","四十","四十一","四十二","四十三","四十四","四十五",];
var naviTitle=Config.get("calendar").title || "二外校历";
//注册页面
Page({
	data:{
		header:"",
		footer:"校历仅供参考，请以学校最新的通知为准",
		calendars:[]
	},
	taptest:function(){
		this.setData({
			targetMonth:"current_month"
		});
	},
	onShow:function(){
		wx.setNavigationBarTitle({
			title:naviTitle
		});
	},
	onLoad:function(){
		wx.showLoading({
			title:"校历快出来",
			mask:true
		});
		var setData=this.setData.bind(this);
		Config.getRemoteConfig("calendar",function(res){
			console.log("当前校历：",res);
			naviTitle=res.title;
			var calendars=[];
			var start=makeDate(res.start.year,res.start.month,1);
			var end=makeDate(res.end.year,res.end.month+1,0);
			var index=makeDate(start.getFullYear(),start.getMonth(),start.getDate());
			var today=new Date;
			var firstDay=makeDate(res.start.year,res.start.month,res.start.date);
			console.log("校历开始时间:",start);
			console.log("校历结束时间:",end);
			console.log("校历索引时间:",index);
			var lastMonth=index.getMonth();
			//初始化第一个日历
			calendars.push(new Calendar(index.getFullYear()+"年"+String(index.getMonth()+1)+"月"));
			//判断是否是本月，可在初始化时滚动这个月到可视区域
			if(today.getFullYear()==index.getFullYear() && today.getMonth()==index.getMonth()){
				calendars[calendars.length-1].currentMonth=true;
			}
			var daysMap=getDaysMap();
			//生成校历
			var holidayStart={};
			var holidayEnd={};
			var studyStart={};
			var studyEnd={};
			var testStart={};
			var testEnd={};
			var replaceDate={};
			var weekIndex=0;
			for(var count=(index.getDay()==0?7:index.getDay())-1;index.getTime()<=end.getTime();count++){
				if(lastMonth!=index.getMonth()){
					//新增一个日历
					calendars.push(new Calendar(index.getFullYear()+"年"+String(index.getMonth()+1)+"月"));
					count=(index.getDay()==0?7:index.getDay())-1;
					//判断是否是本月，可在初始化时滚动这个月到可视区域
					if(today.getFullYear()==index.getFullYear() && today.getMonth()==index.getMonth()){
						calendars[calendars.length-1].currentMonth=true;
					}
				}
				daysMap[count%7].body=index.getDate();
				//遍历holidays
				for(var i=0;i<res.holidays.length;i++){
					holidayStart=makeDate(res.holidays[i].start.year,res.holidays[i].start.month,res.holidays[i].start.date);
					holidayEnd=makeDate(res.holidays[i].end.year,res.holidays[i].end.month,res.holidays[i].end.date);
					// console.log("假期开始：",holidayStart);
					// console.log("假期结束：",holidayEnd);
					if(index.getTime()>=holidayStart.getTime() && index.getTime()<=holidayEnd.getTime()){
						daysMap[count%7].type+="holiday ";
					}
				}
				//遍历studies
				for(var i=0;i<res.studies.length;i++){
					studyStart=makeDate(res.studies[i].start.year,res.studies[i].start.month,res.studies[i].start.date);
					studyEnd=makeDate(res.studies[i].end.year,res.studies[i].end.month,res.studies[i].end.date);
					// console.log("调休开始：",holidayStart);
					// console.log("调休结束：",holidayEnd);
					if(index.getTime()>=studyStart.getTime() && index.getTime()<=studyEnd.getTime()){
						daysMap[count%7].type+="study ";
					}
				}
				//遍历tests
				for(var i=0;i<res.tests.length;i++){
					testStart=makeDate(res.tests[i].start.year,res.tests[i].start.month,res.tests[i].start.date);
					testEnd=makeDate(res.tests[i].end.year,res.tests[i].end.month,res.tests[i].end.date);
					// console.log("考试开始：",holidayStart);
					// console.log("考试结束：",holidayEnd);
					if(index.getTime()>=testStart.getTime() && index.getTime()<=testEnd.getTime()){
						daysMap[count%7].type+="test ";
					}
				}
				//遍历replacements 特殊节日
				for(var i=0;i<res.replacements.length;i++){
					replaceDate=makeDate(res.replacements[i].date.year,res.replacements[i].date.month,res.replacements[i].date.date);
					if(replaceDate.getFullYear()==index.getFullYear() && replaceDate.getMonth()==index.getMonth() && replaceDate.getDate()==index.getDate()){
						daysMap[count%7].type+="small ";
						daysMap[count%7].body=res.replacements[i].title;
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
					//重新定义row数组
					daysMap=getDaysMap();
				}
			}
			//渲染校历
			setData({
				calendars:calendars
			});
			wx.hideLoading();
			//延迟执行跳转到当前月份和设置导航条标题行为
			setTimeout(function(){
				setData({
					targetMonth:"current_month"
				});
				wx.setNavigationBarTitle({
					title:naviTitle
				});
			},10);
		});
	},
	onShareAppMessage:function(){
		return {
			title:naviTitle,
			path:"/pages/calendar/calendar"
		};
	}
});
//返回一个daysMap初始化数组
function getDaysMap(){
	return [
		{type:"",body:""},
		{type:"",body:""},
		{type:"",body:""},
		{type:"",body:""},
		{type:"",body:""},
		{type:"",body:""},
		{type:"",body:""}
	];
}