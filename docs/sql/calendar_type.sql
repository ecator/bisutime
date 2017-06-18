-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017-06-18 05:08:44
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
-- 表的结构 `calendar_type`
--

CREATE TABLE `calendar_type` (
  `id` int(10) UNSIGNED NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `type` varchar(10) COLLATE utf8_general_mysql500_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- 转存表中的数据 `calendar_type`
--

INSERT INTO `calendar_type` (`id`, `start`, `end`, `type`) VALUES
(4, '2017-04-02', '2017-04-04', 'holiday'),
(5, '2017-05-01', '2017-05-01', 'holiday'),
(6, '2017-05-28', '2017-05-30', 'holiday'),
(7, '2017-10-01', '2017-10-08', 'holiday'),
(8, '2017-05-18', '2017-05-19', 'holiday'),
(9, '2017-07-03', '2017-09-01', 'holiday'),
(10, '2017-04-01', '2017-04-01', 'study'),
(11, '2017-05-27', '2017-05-27', 'study'),
(12, '2017-09-30', '2017-09-30', 'study'),
(13, '2017-05-08', '2017-05-12', 'test'),
(14, '2017-04-17', '2017-04-21', 'test'),
(15, '2017-06-26', '2017-06-30', 'test'),
(16, '2017-04-22', '2017-04-22', 'test'),
(17, '2017-04-29', '2017-05-01', 'holiday');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `calendar_type`
--
ALTER TABLE `calendar_type`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `calendar_type`
--
ALTER TABLE `calendar_type`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
