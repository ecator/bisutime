-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017-06-18 05:08:49
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
-- 表的结构 `gallery`
--

CREATE TABLE `gallery` (
  `filename` varchar(128) COLLATE utf8_general_mysql500_ci NOT NULL,
  `photographer` varchar(1024) COLLATE utf8_general_mysql500_ci NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `update_time` datetime NOT NULL,
  `create_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci;

--
-- 转存表中的数据 `gallery`
--

INSERT INTO `gallery` (`filename`, `photographer`, `status`, `update_time`, `create_time`) VALUES
('590b43abacee0.jpg', '达叔', 1, '2017-05-04 23:07:23', '2017-05-04 23:07:23'),
('590b442ec67ec.jpg', '东东', 1, '2017-05-04 23:09:34', '2017-05-04 23:09:34'),
('590b443ea0ea8.jpg', '东东', 1, '2017-05-04 23:09:50', '2017-05-04 23:09:50'),
('590b445061924.jpg', '吴岩', 1, '2017-05-04 23:10:08', '2017-05-04 23:10:08'),
('590b44593d9a0.jpg', '吴岩', 1, '2017-05-04 23:10:17', '2017-05-04 23:10:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD UNIQUE KEY `filename_2` (`filename`),
  ADD KEY `filename` (`filename`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
