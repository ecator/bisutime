//根据参数构造一个特定时间对象，注意month的值为0-11
function makeDate(year,month,day,hours,minutes,seconds,milliseconds) {
	//定义默认值
	year=typeof(year)!="undefined"?year:1970;
	month=typeof(month)!="undefined"?month:0;
	day=typeof(day)!="undefined"?day:1;
	hours=typeof(hours)!="undefined"?hours:0;
	minutes=typeof(minutes)!="undefined"?minutes:0;
	seconds=typeof(seconds)!="undefined"?seconds:0;
	milliseconds=typeof(milliseconds)!="undefined"?milliseconds:0;
	var date=new Date;
	date.setFullYear(year);
	//防止天数超出
	date.setDate(1);
	date.setMonth(month);
	date.setDate(day);
	date.setHours(hours);
	date.setMinutes(minutes);
	date.setSeconds(seconds);
	date.setMilliseconds(milliseconds);
	return date;
}
module.exports=makeDate;