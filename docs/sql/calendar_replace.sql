-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017-06-18 05:08:29
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
-- 表的结构 `calendar_replace`
--

CREATE TABLE `calendar_replace` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(10) COLLATE utf8_general_mysql500_ci NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- 转存表中的数据 `calendar_replace`
--

INSERT INTO `calendar_replace` (`id`, `title`, `date`) VALUES
(2, '元宵节', '2017-02-11'),
(3, '情人劫', '2017-02-14'),
(4, '妇女节', '2017-03-08'),
(5, '植树节', '2017-03-12'),
(6, '愚人节', '2017-04-01'),
(7, '清明节', '2017-04-04'),
(8, '劳动节', '2017-05-01'),
(9, '青年节', '2017-05-04'),
(10, '护士节', '2017-05-12'),
(11, '母亲节', '2017-05-14'),
(12, '端午节', '2017-05-30'),
(13, '儿童节', '2017-06-01'),
(14, '父亲节', '2017-06-18'),
(15, '建党节', '2017-07-01'),
(16, '建军节', '2017-08-01'),
(17, '七夕节', '2017-08-28'),
(18, '期中', '2017-04-17'),
(19, '毕业考试', '2017-05-09'),
(20, '运动会', '2017-05-18'),
(21, '期末', '2017-06-26'),
(22, '暑假', '2017-07-03'),
(23, '开学啦', '2017-02-20'),
(24, '英语专四&地球日', '2017-04-22'),
(25, '世界读书日', '2017-04-23'),
(28, '环境日', '2017-06-05'),
(29, '奥林匹克日', '2017-06-23'),
(30, '抗战胜利日', '2017-09-03'),
(31, '中元节', '2017-09-05'),
(32, '教师节', '2017-09-10'),
(33, '中秋节', '2017-10-04'),
(34, '国庆节', '2017-10-01'),
(35, '重阳节', '2017-10-28'),
(36, '寒衣节', '2017-11-18'),
(37, '剁手日', '2017-11-11'),
(38, '可以开空调啦', '2017-05-08'),
(39, '日院演剧大会', '2017-05-23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `calendar_replace`
--
ALTER TABLE `calendar_replace`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `calendar_replace`
--
ALTER TABLE `calendar_replace`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
