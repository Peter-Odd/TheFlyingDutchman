-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Feb 18, 2015 at 11:09 AM
-- Server version: 5.5.38
-- PHP Version: 5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `tfd_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
`user_id` int(11) NOT NULL,
  `credentials` tinyint(4) DEFAULT NULL,
  `password` char(32) DEFAULT NULL,
  `username` char(255) DEFAULT NULL,
  `first_name` char(255) DEFAULT NULL,
  `last_name` char(255) DEFAULT NULL,
  `email` char(255) DEFAULT NULL,
  `phone` char(32) DEFAULT NULL,
  `credit` int(4) DEFAULT NULL,
  `debt` int(4) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `credentials`, `password`, `username`, `first_name`, `last_name`, `email`, `phone`, `credit`, `debt`) VALUES
(2, 0, 'b690bc2447d40ea8a6f78345eb979a28', 'jorass', 'Jory', 'Assies', 'jory.assies@it.uu.se', '0704811411', 0, 0),
(28, 3, 'b612f428e4a53386fdb98f6c2164c16c', 'sulstr', 'Sulayman', 'Street', 'sulayman.street@it.uu.se', '0701517627', 0, 0),
(27, 3, 'c0d9251f9af5e7410c6a3932f696c449', 'orapan', 'Orabela', 'Panders', 'orabela.panders@it.uu.se', '0701503294', 0, 0),
(26, 3, '4ec434994decffa3005b477cc7f992e6', 'kenolg', 'Kenan', 'Olguin', 'kenan.olguin@it.uu.se', '0706569560', 0, 0),
(25, 0, '971299fa95fe467db26e8bf01864d48d', 'saskru', 'Saša', 'Krüger', 'sasa.kruger@it.uu.se', '0705349276', 0, 0),
(24, 0, '2a3db2cc165057da53ef13a348e9787f', 'ervtod', 'Ervin', 'Todd', 'ervin.todd@it.uu.se', '0702339018', 0, 0),
(23, 3, '743444f0ff666f1f90580e7bc3af5099', 'aqulyn', 'Aquilina', 'Lyndon', 'aquilina.lyndon@it.uu.se', '0702611287', 0, 0),
(22, 3, 'fc4fd22287923f3b47b91fc5f0a85af5', 'lasnic', 'Lasse', 'Nicholson', 'lasse.nicholson@it.uu.se', '0703238992', 0, 0),
(21, 3, '849d51ea793c93194952478aa85694af', 'maihon', 'Maiken', 'Honda', 'maiken.honda@it.uu.se', '0709533955', 0, 0),
(20, 0, '739d0d428ff99dc043e8955b5a4885bc', 'hirchr', 'Hiram', 'Christopherson', 'hiram.christopherson@it.uu.se', '0709599269', 0, 0),
(19, 3, '7e3f6af9d6c2385a79b49b03e87234e5', 'larsch', 'Lara', 'Schenck', 'lara.schenck@it.uu.se', '0702721289', 0, 0),
(18, 3, '1db930e727e73c027fc58b5554935be8', 'janhei', 'Jancsi', 'Heiman', 'jancsi.heiman@it.uu.se', '0707977965', 0, 0),
(17, 0, 'f3e3fbabe1b745defda645e5d85a6ac7', 'svetor', 'Svetlana', 'Torres', 'svetlana.torres@it.uu.se', '0707459505', 0, 0),
(16, 3, '75f589d96b212b65298b31717a2641c9', 'pomgra', 'Pompeius', 'Graner', 'pompeius.graner@it.uu.se', '0701584121', 0, 0),
(29, 3, '9e44cc19b9f726583ccc93fa7908f7fd', 'valpag', 'Valeria', 'Pagani', 'valeria.pagani@it.uu.se', '0703156441', 0, 0),
(30, 3, '0f1903b5119eadb705ddba7f2750792f', 'domolh', 'Domen', 'Olhouser', 'domen.olhouser@it.uu.se', '0702459084', 0, 0),
(31, 3, '3fb65e8d64eb23e63c71a86ea97951e0', 'gollan', 'Golnar', 'Langley', 'golnar.langley@it.uu.se', '0702677189', 0, 0),
(32, 3, '3c244190040aedd134913562509a5ea0', 'hyrlap', 'Hyram', 'Lapointe', 'hyram.lapointe@it.uu.se', '0702177650', 0, 0),
(33, 3, '84db5f68a5f2ad3f25bb4445148f434c', 'katfab', 'Katrien', 'Fabre', 'katrien.fabre@it.uu.se', '0705701344', 0, 0),
(34, 3, 'edc2623f10cd4d069e710653f3fc630c', 'sulpen', 'Sulis?aw', 'Pender', 'sulis?aw.pender@it.uu.se', '0709481365', 0, 0),
(35, 3, '9b0c08c58fdeb1b25525ac0cb8187eda', 'dansch', 'Danna', 'Schermer', 'danna.schermer@it.uu.se', '0709593528', 0, 0),
(36, 3, '1fcb15df01a8ca6a442058aca336b324', 'jovsit', 'Jove', 'Sitz', 'jove.sitz@it.uu.se', '0704408722', 0, 0),
(37, 3, '27e4426409fa9a5b2917721e3aa636f2', 'elepic', 'Elektra', 'Pickle', 'elektra.pickle@it.uu.se', '0708681770', 0, 0),
(38, 3, 'c8a458e5af7d03a2477b9d886ac98a77', 'muhtof', 'Muhammed', 'Toft', 'muhammed.toft@it.uu.se', '0708579214', 0, 0),
(39, 3, '94996b177550f4db4fe24ea556cbe75c', 'zulgor', 'Zuleika', 'Gorecki', 'zuleika.gorecki@it.uu.se', '0705595808', 0, 0),
(40, 3, '304d1e4306a536c84be6a37fb1b9465e', 'fercrn', 'Ferdinánd', 'Crncevic', 'ferdinand.crncevic@it.uu.se', '0706855231', 0, 0),
(41, 3, '08ca6afe619c702c9d41f9e14e3ac0a2', 'krysan', 'Krystyna', 'Santiago', 'krystyna.santiago@it.uu.se', '0702883447', 0, 0),
(42, 3, '49c0ac6a74af820de877ceb7e9a7161c', 'felbar', 'Felix', 'Bartoš', 'felix.bartos@it.uu.se', '0706883728', 0, 0),
(43, 3, 'b2a0690e7d39f3bc66874c9ad173e0b6', 'aamsta', 'Aamu', 'Stankic', 'aamu.stankic@it.uu.se', '0706415355', 0, 0),
(44, 3, '16676db4c6703f129736d71ce6ee6fef', 'ceznew', 'Cezar', 'Newman', 'cezar.newman@it.uu.se', '0709803331', 0, 0),
(45, 3, 'cf1472476c7334d03e3575319a05171b', 'anddar', 'Andrea', 'Darzi', 'andrea.darzi@it.uu.se', '0703160890', 0, 0),
(46, 3, '018463e83b1b7b0e4487bf59bc3bbbdf', 'jershi', 'Jerry', 'Shizuka', 'jerry.shizuka@it.uu.se', '0707330744', 0, 0),
(47, 3, '23408e7480c9946f0b892fd6eb9996fd', 'molbab', 'Molle', 'Babi?', 'molle.babic@it.uu.se', '0705286920', 0, 0),
(48, 3, '58f2545fa1f5b2a3b34930d577b4a1f9', 'prabar', 'Prabhakar', 'Bartos', 'prabhakar.bartos@it.uu.se', '0707541871', 0, 0),
(49, 3, '40a02527dd429cca287df0db12369121', 'pauaaf', 'Paula', 'Aafjes', 'paula.aafjes@it.uu.se', '0707049184', 0, 0),
(50, 3, '3f75e394566d65454db1c2c27202fc87', 'jacabb', 'Jacob', 'Abbatelli', 'jacob.abbatelli@it.uu.se', '0703682524', 0, 0),
(51, 3, 'c39b27bdc3ff3d42fc2779a6c4021719', 'ankov', 'Ângela', 'Ková?', 'angela.kovar@it.uu.se', '0704955626', 0, 0),
(52, 3, 'd7ee44c338a75d434530cc1270402866', 'eusgor', 'Eustachius', 'Gorski', 'eustachius.gorski@it.uu.se', '0703593186', 0, 0),
(53, 3, '85fbeb059144561ee0d81dc9c56cee93', 'marpug', 'Mariana', 'Pugliese', 'mariana.pugliese@it.uu.se', '0702368378', 0, 0),
(54, 3, '64d321b8cdf1fd72f6ec24ede9fe6ba0', 'symzim', 'Symeonu', 'Zimmermann', 'symeonu.zimmermann@it.uu.se', '0702987211', 0, 0),
(55, 3, 'ff16d73a2ac035286a195dad2160f97b', 'didwat', 'Dido', 'Waters', 'dido.waters@it.uu.se', '0707318901', 0, 0),
(56, 3, 'acf2362736d77f22796322665cda3087', 'bratam', 'Branko', 'Tamás', 'branko.tamas@it.uu.se', '0702314515', 0, 0),
(57, 3, '4c2baf7b0768cc8056697caaf849bb2f', 'kaywan', 'Kaye', 'Wang', 'kaye.wang@it.uu.se', '0702186364', 0, 0),
(58, 3, '6ed82b07f586ae44301ac29e68f36205', 'einyam', 'Einarr', 'Yamauchi', 'einarr.yamauchi@it.uu.se', '0705917290', 0, 0),
(59, 3, 'd7c597334ed3e7a7c91a6b53679dce54', 'teojen', 'Teodora', 'Jensen', 'teodora.jensen@it.uu.se', '0705022382', 0, 0),
(65, 3, '9e3da848ba28b28314decfc8a237c882', 'tohei', 'Tófa', 'Heinrich', 'tofa.heinrich@it.uu.se', '0709855151', 0, 0),
(64, 3, '4df75219ca8b924daa4be5a2523c46e5', 'steber', 'Stefan', 'Bernard', 'stefan.bernard@it.uu.se', '0704806403', 0, 0),
(62, 3, '3a647a3b3279c7e78443be09749a38d6', 'rewes', 'Régulo', 'Westerberg', 'regulo.westerberg@it.uu.se', '0709441106', 0, 0),
(63, 3, 'da9738013fd96a552236e2386fc2977c', 'karbly', 'Karme', 'Blythe', 'karme.blythe@it.uu.se', '0706285869', 0, 0),
(66, 3, '6705dac81f21912bbcc1ae3b8d95c3bd', 'liatra', 'Liam', 'Traverso', 'liam.traverso@it.uu.se', '0706523253', 0, 0),
(67, 3, '394e615db7a9dc7adb20629f47f180ad', 'olubra', 'Oluwakanyinsola', 'Braun', 'oluwakanyinsola.braun@it.uu.se', '0704262319', 0, 0),
(68, 3, 'd7b8f69457042b200e175928223c5849', 'shapet', 'Sharma', 'Pet?fi', 'sharma.petofi@it.uu.se', '0709830179', 0, 0),
(69, 3, '53396fdba19b184bbed3d2b777613d3e', 'oludra', 'Oluwatoyin', 'Drake', 'oluwatoyin.drake@it.uu.se', '0703238556', 0, 0),
(70, 3, 'bccbb6c05483bb2dea21794064996cc8', 'marsti', 'Marin', 'Stieber', 'marin.stieber@it.uu.se', '0704789755', 0, 0),
(71, 3, '6100621e7f88e68aab1e055900802af4', 'felfra', 'Felicia', 'Franklin', 'felicia.franklin@it.uu.se', '0706496700', 0, 0),
(72, 3, '4d23b838b2b375f48dc12e53a08012f3', 'olislu', 'Oliver', 'Slusarski', 'oliver.slusarski@it.uu.se', '0701977400', 0, 0),
(73, 3, '8545505522afe03641a6aef77f7a517a', 'jeaats', 'Jeanne', 'Atses', 'jeanne.atses@it.uu.se', '0704183346', 0, 0),
(74, 3, 'e021a63d81c45c1aa7bcc5b46f04da89', 'aubbla', 'Aubrey', 'Blackwood', 'aubrey.blackwood@it.uu.se', '0703497989', 0, 0),
(75, 3, '46498c0233091c446a9e20000634c46f', 'yevowe', 'Yevpraksiya', 'Owens', 'yevpraksiya.owens@it.uu.se', '0705499181', 0, 0),
(76, 3, 'c4f800d9565826475c9f81a16acc3397', 'benfau', 'Bento', 'Faucher', 'bento.faucher@it.uu.se', '0705508772', 0, 0),
(77, 3, 'ffc2364a0f7bedd01fd49f0eda069906', 'schjou', 'Schwanhild', 'Joubert', 'schwanhild.joubert@it.uu.se', '0705794586', 0, 0),
(78, 3, '237a09cf1964424441b0a07635029f10', 'livzha', 'Livianus', 'Zhao', 'livianus.zhao@it.uu.se', '0701524432', 0, 0),
(79, 3, '64b5a690561214c1ca40f8b906a47365', 'eulcou', 'Eulàlia', 'Coughlan', 'eulalia.coughlan@it.uu.se', '0702647034', 0, 0),
(80, 3, '6cbd7446fdb1803d62dd8d56277a736c', 'edraug', 'Edric', 'Augustin', 'edric.augustin@it.uu.se', '0707685685', 0, 0),
(81, 3, '694ba22ce8113e54e857a9712c753b6f', 'sivan', 'S?d?ka', 'Van', 'sidika.van@it.uu.se', '0704331612', 0, 0),
(82, 3, '88ab1f4dac9422a7ee3cb34eca3793b7', 'nikpro', 'Nika', 'Proulx', 'nika.proulx@it.uu.se', '0706412621', 0, 0),
(83, 3, '83ceffee5f8939502d411b895d37d6d9', 'giamik', 'Giacinta', 'Mikkelsen', 'giacinta.mikkelsen@it.uu.se', '0703913087', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=84;