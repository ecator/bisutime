# bisutime
二外时间微信小程序，人性化告诉你现在第几节课，还有多久下课。

# client
小程序客户端代码，可以直接上传到微信服务器。

# server
小程序服务端，用于动态请求一些配置，比如校历和多语言配置

> 服务器需要配置ssl

# 服务端api
## getnotification
获取通知

### 返回参数
- header：显示在头部中的信息
- footer：显示在底部信息

## getimg
随机返回和语言数量相同的图片对象数组
### 返回参数
- src：图片绝对地址
- photographer：作者

## getcalendar
返回校历对象

### 返回参数
- title：校历标题
- start：时间对象，表示校历开始时间
- end：时间对象，表示校历结束时间
- holidays：假期数组
	- start：开始时间对象
	- end：结束时间对象
- studies：调休数组
	- start：开始时间对象
	- end：结束时间对象
- tests：考试数组
	- start：开始时间对象
	- end：结束时间对象
- replacements：日期替换数组，采用文字描述的小日期方格数组（一般为节日）
	- date：对应日期的时间对象
	- title：替换显示的标题文字

### 时间对象说明
遵循JavaScript的Date对象原则：
- year：四位数年份
- month(0-11)：月份
- date(1-31)：日期
- day(0-6)：星期几，0表示星期天
- hours(0-23)：小时
- minutes(0-59)：分钟数
- seconds(0-59)：秒数
- milliseconds(0-999)：毫秒数

## getlocale
获取多语言配置

### 返回参数
一个数组，各个成员包含了一种语言的各种属性：
- language：语言代码，可以是如下值：
	- zh：中文
	- en：英语
	- jp：日语
	- kr：韩语
	- ru: 俄语
- name：语言名称
- title：导航条标题
- loading：加载文字
- day：星期几
- holiday：寒暑假情况
- weekth：开学第几周
- sunday：周末
- saturday：周六
- morning：早上还未上课
- lesson：正在上课
- evening：放学
- friday：周五
- notfriday：非周五情况
- noon：午饭时间
- dinner：晚饭时间
- break：课间休息

### token（占位符）
主要用于多语言配置中动态显示一些数据，数据替换在客户端完成。
- `{{day}}`：星期几
- `{{weekth}}`：开学第几周
- `{{next_time}}`：下个节点开始时间
- `{{before}}`：前一节课
- `{{next}}`：后一节课
- `{{current}}`：当前课