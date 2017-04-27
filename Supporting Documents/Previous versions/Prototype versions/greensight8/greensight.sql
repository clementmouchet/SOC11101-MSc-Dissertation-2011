-- phpMyAdmin SQL Dump
-- version 3.4.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 12, 2011 at 09:52 AM
-- Server version: 5.5.15
-- PHP Version: 5.3.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `greensight`
--

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE IF NOT EXISTS `members` (
  `jdate` varchar(10) NOT NULL,
  `name` varchar(30) NOT NULL COMMENT '	',
  `contact` varchar(30) NOT NULL,
  `address1` varchar(20) DEFAULT NULL COMMENT '	',
  `address2` varchar(20) DEFAULT NULL COMMENT '	',
  `town` varchar(20) DEFAULT NULL,
  `postcode` varchar(12) DEFAULT NULL COMMENT '	',
  `phone` varchar(12) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `admin` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`jdate`, `name`, `contact`, `address1`, `address2`, `town`, `postcode`, `phone`, `email`, `password`, `admin`) VALUES
('2011-10-10', 'Greensight', 'ClÃ©ment MOUCHET', '4 Porteous Pend', '25 Grassmarket', 'Edinburgh', 'EH12HP', '01312259872', 'MowgliBook@gmail.com', 'carotte', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
