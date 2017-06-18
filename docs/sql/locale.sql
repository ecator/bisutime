-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017-06-18 05:08:56
-- 服务器版本： 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bisutime`
--

-- --------------------------------------------------------

--
-- 表的结构 `locale`
--

CREATE TABLE `locale` (
  `language` varchar(10) COLLATE utf8_general_mysql500_ci NOT NULL COMMENT '语言代码',
  `name` varchar(64) COLLATE utf8_general_mysql500_ci NOT NULL COMMENT '语言完整名称',
  `title` varchar(64) COLLATE utf8_general_mysql500_ci NOT NULL COMMENT '界面显示标题',
  `loading` varchar(64) COLLATE utf8_general_mysql500_ci NOT NULL COMMENT '界面加载标题',
  `day` varchar(512) COLLATE utf8_general_mysql500_ci NOT NULL COMMENT '星期',
  `holiday` varchar(512) COLLATE utf8_general_mysql500_ci NOT NULL COMMENT '放假',
  `weekth` varchar(512) COLLATE utf8_general_mysql500_ci NOT NULL COMMENT '周次',
  `sunday` varchar(512) COLLATE utf8_general_mysql500_ci NOT NULL COMMENT '周日',
  `saturday` varchar(512) COLLATE utf8_general_mysql500_ci NOT NULL COMMENT '周六',
  `morning` varchar(512) COLLATE utf8_general_mysql500_ci NOT NULL COMMENT '早上还未开始上课',
  `lesson` varchar(512) COLLATE utf8_general_mysql500_ci NOT NULL COMMENT '上课中',
  `evening` varchar(512) COLLATE utf8_general_mysql500_ci NOT NULL COMMENT '放学',
  `friday` varchar(512) COLLATE utf8_general_mysql500_ci NOT NULL COMMENT '周五放学',
  `notfriday` varchar(512) COLLATE utf8_general_mysql500_ci NOT NULL COMMENT '周一到周四',
  `noon` varchar(512) COLLATE utf8_general_mysql500_ci NOT NULL COMMENT '中午',
  `dinner` varchar(512) COLLATE utf8_general_mysql500_ci NOT NULL COMMENT '晚饭',
  `break` varchar(512) COLLATE utf8_general_mysql500_ci NOT NULL COMMENT '课件休息'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- 转存表中的数据 `locale`
--

INSERT INTO `locale` (`language`, `name`, `title`, `loading`, `day`, `holiday`, `weekth`, `sunday`, `saturday`, `morning`, `lesson`, `evening`, `friday`, `notfriday`, `noon`, `dinner`, `break`) VALUES
('en', 'English', 'BISU TIME', 'wait wait wait', 'Today is {{day}}', 'You ara on the vacation', 'The {{weekth}} week of school', 'Tomorrow you will go to school', 'You only have one day to go out', 'It\'s early to go to school\r\nThe first lesson will begin after {{next_time}}', 'Now it\'s the {{current}} lesson\r\nThis class will be over after {{next_time}}', 'School is over,please have a rest', 'Tomorrow is Saturday\r\nHave a good day', 'The first lesson of tomorrow will begin after {{next_time}}\r\nDon\'t stay up late', 'It\'s lunch time\r\nThe first lesson of afternoon will begin after {{next_time}}\r\nIt\'s high time to have lunch', 'It\'s dinner time\r\nThe first lesson of evening will begin after {{next_time}}\r\nIt\'s high time to have dinner', 'It\'s the break time between \r\nthe {{before}} lesson and the {{next}} lesson\r\nThe next lesson will begin after {{next_time}}\r\nPlease take a break'),
('jp', '日本語', '二外タイム', 'お帰り', '今日は{{day}}', '今は休暇期間だよ', '今学期の{{weekth}}周目', '明日は授業ですから\r\n今日はゆっくり休んでね', 'まだ一日間だ\r\n学校なんで行かなくていいから\r\n遊ぼう', 'おはようございます\r\n授業はまだ始まってないよ\r\nまだ{{next_time}}あるから\r\nもう少し寝坊していい', 'いまは{{current}}限目\r\n休憩はまだ{{next_time}}あるから\r\nもうちょっと我慢してね', 'お疲れ様でした\r\nいまは放課後\r\n何か面白いことをやってみようか', '明日はいよいよ土曜日だから\r\nどこかへ遊びにいこう', '明日の授業はまだ{{next_time}}ある\r\n今晩は停電の日だ\r\nご注意ください', '昼ごはんだよ\r\n午後の授業はまだ{{next_time}}ある\r\n早く昼ごはんを食べよう', '晩ごはんだよ\r\n夜の授業はまだ{{next_time}}ある\r\n早く晩ごはんを食べよう', 'いまは{{before}}限目と{{next}}限目の間の休憩時間\r\n次の授業はまだ{{next_time}}あるが\r\n時間が短いから\r\n勉強しよう'),
('ru', 'Русский', 'Университетское время', 'погрузки', 'Сегодня {{day}}', 'Но у тебя каникулы сейчас уже!', '{{weekth}} неделя семестра', 'Завтра есть пары, да ещё и электричество отключат сегодня ночью.', 'Остался только 1 выходной, давай!', 'Занятие не начались ещё \r\nОсталось {{next_time}} до первой пары', 'Сейчас {{current}} занятие\r\nОсталось {{next_time}} до перерыва ', 'Занятия закончились, пора отдыхать ', 'Завтра суббота, сегодня вечером не отключат электричество, ура!', 'До завтрашнего урока ещё {{next_time}}\r\nСегодня отключат электричество, не бодрствуй!', 'Сейчас у нас обед\r\nДо следующей пары осталось {{next_time}}\r\nПойди пообедать!', 'У нас ужин сейчас\r\nДо вечерних занятий осталось {{next_time}}\r\nПойди поужинать!', 'Сейчас {{before}} перерыв\r\nПерерыв остался {{next_time}}\r\nХоть отдохни!'),
('zh', '中文', '二外时间', '玩命加载中', '今天{{day}}', '不过已经放假了哟', '开学第{{weekth}}周', '明天就上课了，而且今天晚上还要断电', '还有一天上课，抓紧时间浪吧', '还么有上课\r\n离早上第一节课还有{{next_time}}', '现在正在上第{{current}}小节课\r\n离下课还有{{next_time}}', '现在已经放学了，赶快休息吧', '明天就是周六了，今天晚上不断电啦', '还有{{next_time}}开始第二天的课程\r\n今天要断电，不要熬夜哟', '现在是午饭时间\r\n离下午上课还有{{next_time}}\r\n抓紧时间去吃午饭吧', '现在是晚饭时间\r\n离晚上上课还有{{next_time}}\r\n赶快去吃晚饭吧', '现在是第{{before}}小节和第{{next}}小节课间休息时间\r\n离上课还有{{next_time}}\r\n稍微休息一下吧');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `locale`
--
ALTER TABLE `locale`
  ADD PRIMARY KEY (`language`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
