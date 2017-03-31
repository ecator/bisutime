//获取当前页面实例，请勿在Page()之前调用
function getCurrentPage() {
	var currentPages=getCurrentPages();
    var currentPage=currentPages[currentPages.length-1];
    return currentPage;
}
module.exports=getCurrentPage;