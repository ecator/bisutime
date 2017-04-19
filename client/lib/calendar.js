'use strict';

//校历对象
class Calendar{
	constructor(title){
		this.title=title;
		this.rows=[];
		this.currentMonth=false;
	}
	//增加一行数据，开学第几周和一个含有七个{type:'',body:''}成员的数组，依次是周一到周日
	addRow(weekth,daysMap){
		var row={
			weekth:weekth,
			mon:daysMap[0],
			tue:daysMap[1],
			wed:daysMap[2],
			thu:daysMap[3],
			fri:daysMap[4],
			sat:daysMap[5],
			sun:daysMap[6]
		};
		this.rows.push(row);
	}
}
module.exports=Calendar;