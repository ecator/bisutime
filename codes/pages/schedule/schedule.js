var BISUTIME=require("../../lib/bisutime");
//不需要获取第几周，所以开始时间无所谓
var bisutime=new BISUTIME(new Date);
var app=getApp();
var list=[
	{
		type:"",
		title:"第一小节",
		body:{
			start:"8:00",
			end:"8:45"
		}
	},
	{
		type:"",
		title:"第二小节",
		body:{
			start:"8:50",
			end:"9:35"
		}
	},
	{
		type:"",
		title:"第三小节",
		body:{
			start:"9:50",
			end:"10:35"
		}
	},
	{
		type:"",
		title:"第四小节",
		body:{
			start:"10:40",
			end:"11:25"
		}
	},
	{
		type:"",
		title:"第五小节",
		body:{
			start:"11:30",
			end:"12:15"
		}
	},
	{
		type:"",
		title:"第六小节",
		body:{
			start:"13:20",
			end:"14:05"
		}
	},
	{
		type:"",
		title:"第七小节",
		body:{
			start:"14:10",
			end:"14:55"
		}
	},
	{
		type:"",
		title:"第八小节",
		body:{
			start:"15:10",
			end:"15:55"
		}
	},
	{
		type:"",
		title:"第九小节",
		body:{
			start:"16:00",
			end:"16:45"
		}
	},
	{
		type:"",
		title:"第十小节",
		body:{
			start:"16:50",
			end:"17:35"
		}
	},
	{
		type:"",
		title:"第十一小节",
		body:{
			start:"18:30",
			end:"19:15"
		}
	},
	{
		type:"",
		title:"第十二小节",
		body:{
			start:"19:20",
			end:"20:05"
		}
	}
];
//找出现在正在上那一节课
var now=bisutime.getTime();
for(var i = 0;i<list.length;i++){
	if(i==now-1){
		list[i].type="now";
		break;
	}
}
Page({
	data:{
		list:list,
		header:"二外时刻表"
	},
	onShareAppMessage:function(){
		return {
			title:"二外时刻表",
			path:"/pages/schedule/schedule"
		};
	},
	onLoad:function(){
		var setData=this.setData.bind(this);
		//试试更新当前是第几节课
		setTimeout(function(){
			var now=bisutime.getTime();
			for(var i = 0;i<list.length;i++){
				if(i==now-1){
					list[i].type="now";
				}else{
					list[i].type=""
				}
			}
			setData({
				list:list
			});
		},60000);
	}
});