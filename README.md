# bisutime
二外时间微信小程序，人性化告诉你现在第几节课，还有多久下课。

# codes
小程序具体代码，直接上传到微信服务器用。

# docs
文档和资源目录，小程序通过访问`https://ecator.github.io/bisutime/`来请求相关资源

# config.json
小程序配置文件，具体字段如下：

## name：测试字段
## format：时间返回格式
### 字段解释
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
### format中的token（占位符）
- `{{day}}`：星期几
- `{{weekth}}`：开学第几周
- `{{next_time}}`：下个节点开始时间
- `{{before}}`：前一节课
- `{{next}}`：后一节课
- `{{time}}`：当前课
### 语言缩写解释
- zh：中文
- en：英语
- jp：日语
- kr：韩语
## imgs：图片映射数组
- src：图片绝对地址
- photographer：作者
