-- phpMyAdmin SQL Dump
-- version 3.4.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 16, 2011 at 03:24 PM
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
-- Table structure for table `audits`
--

CREATE TABLE IF NOT EXISTS `audits` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `oBasket` longtext NOT NULL,
  `description` varchar(100) NOT NULL DEFAULT '',
  `user` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=21 ;

--
-- Dumping data for table `audits`
--

INSERT INTO `audits` (`id`, `oBasket`, `description`, `user`) VALUES
(12, '{"aDeviceProfile":[{"description":"Apple 13-inch MacBook Pro, 2.53GHz ","values":{"type":"Notebook/Tablet","quantity":"1","amount":17.8589,"unit":"kg","perUnit":"year","UID":"C544D18394B4"}}],"timestamp":"2011-10-16T08:23:52.088Z"}', 'this is a fairly long description', 'MowgliBook@gmail.com'),
(14, '{"aDeviceProfile":[{"description":"Printer Laser","values":{"type":"Computing equipment","quantity":"20","amount":81.09,"unit":"kg","perUnit":"year","UID":"CB60E1E7528D"}}],"timestamp":"2011-10-16T09:00:08.447Z"}', 'Printers', 'MowgliBook@gmail.com'),
(15, '{"aDeviceProfile":[{"description":"Printer Laser","values":{"type":"Computing equipment","quantity":"20","amount":81.09,"unit":"kg","perUnit":"year","UID":"CB60E1E7528D"}},{"description":"Apple Mac Pro, One 2.66GHz Quad-Core Xeon processor (maximum memory, 4 drives) ","values":{"type":"Workstation","quantity":"1","amount":69.80787,"unit":"kg","perUnit":"year","UID":"35E00C5B11D2"}}],"timestamp":"2011-10-16T10:29:39.961Z"}', 'mac pro + printer', 'MowgliBook@gmail.com'),
(20, '{"aDeviceProfile":[{"description":"Printer Laser","values":{"type":"Computing equipment","quantity":"20","amount":81.09,"unit":"kg","perUnit":"year","UID":"CB60E1E7528D"}},{"description":"Apple Mac Pro, One 2.66GHz Quad-Core Xeon processor (maximum memory, 4 drives) ","values":{"type":"Workstation","quantity":10,"amount":69.80787,"unit":"kg","perUnit":"year","UID":"35E00C5B11D2"}},{"description":"Modem/router ","values":{"type":"Computing equipment","quantity":"1","amount":22.2575832,"unit":"kg","perUnit":"year","UID":"8FB97C6371E2"}},{"description":"AVERATEC All-In-One series D1130EA1E-1","values":{"type":"Desktop","quantity":"5","amount":63.3299,"unit":"kg","perUnit":"year","UID":"41BEEB0FE7F9"}},{"description":"Monitor LCD","values":{"type":"Computing equipment","quantity":"15","amount":34.5984,"unit":"kg","perUnit":"year","UID":"461E4D669E5F"}},{"description":"Monitor Plasma","values":{"type":"Computing equipment","quantity":"2","amount":365.9862,"unit":"kg","perUnit":"year","UID":"0DC384B85AA8"}},{"description":"Scanner ","values":{"type":"Computing equipment","quantity":"5","amount":1.1049864,"unit":"kg","perUnit":"year","UID":"8F5AE4678D91"}},{"description":"Printer Inkjet","values":{"type":"Computing equipment","quantity":"2","amount":14.16372,"unit":"kg","perUnit":"year","UID":"15AA2E36CEB5"}},{"description":"Printer Laser","values":{"type":"Computing equipment","quantity":"2","amount":81.09,"unit":"kg","perUnit":"year","UID":"CB60E1E7528D"}},{"description":"Apple iMac - 24inch, 2.93GHz ","values":{"type":"Integrated Computers","quantity":"1","amount":84.2202,"unit":"kg","perUnit":"year","UID":"1EE32AC966DA"}},{"description":"Dell  ","values":{"type":"Integrated Computers","quantity":"1","amount":79.6731,"unit":"kg","perUnit":"year","UID":"A52798D151AD"}},{"description":"Dell Desktop OptiPlex 360","values":{"type":"Desktop","quantity":"5","amount":92.8531,"unit":"kg","perUnit":"year","UID":"44A73463BC86"}}],"timestamp":"2011-10-16T12:39:41.803Z"}', 'Multimedia SME ', 'MowgliBook@gmail.com');

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
