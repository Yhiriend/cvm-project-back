-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-12-2023 a las 02:00:45
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cvm-database`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bills`
--

CREATE TABLE `bills` (
  `id` int(10) NOT NULL,
  `reference_code` text NOT NULL,
  `cart_id` int(10) DEFAULT NULL,
  `purchase_date` varchar(250) DEFAULT NULL,
  `valid_purchase` tinyint(1) NOT NULL DEFAULT 0,
  `payment_method` varchar(50) DEFAULT NULL,
  `payment_type` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `bills`
--

INSERT INTO `bills` (`id`, `reference_code`, `cart_id`, `purchase_date`, `valid_purchase`, `payment_method`, `payment_type`) VALUES
(26, '20231210T003324695ZU33C24', 24, '2023-12-10', 0, 'DIGITAL', 'COMPRA'),
(27, '20231210T003359698ZU33C25', 25, '2023-12-10', 0, 'FÍSICO', 'COMPRA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart`
--

CREATE TABLE `cart` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `total` double DEFAULT NULL,
  `paid` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `total`, `paid`) VALUES
(21, 30, 0, 0),
(22, 31, 0, 0),
(23, 32, 0, 0),
(24, 33, 1528082, 1),
(25, 33, 801405, 1),
(26, 33, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart_elements`
--

CREATE TABLE `cart_elements` (
  `id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL,
  `cart_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cart_elements`
--

INSERT INTO `cart_elements` (`id`, `product_id`, `cart_id`) VALUES
(157, 331, 24),
(158, 489, 24),
(160, 567, 25);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(10) NOT NULL,
  `brand` text DEFAULT NULL,
  `tech` text DEFAULT NULL,
  `price` mediumint(9) DEFAULT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `voltage` text DEFAULT NULL,
  `type` text DEFAULT NULL,
  `state` text DEFAULT NULL,
  `register_date` varchar(255) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `description` text NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `brand`, `tech`, `price`, `reference`, `voltage`, `type`, `state`, `register_date`, `image`, `description`, `available`) VALUES
(301, 'SAMSUNG', 'CONVENCIONAL', 754114, 'JSY67SKM3SD', '220', 'CASETTE', '3', '2022-03-17', 'SAMSUNG.png', 'pueden formarse tempanos de hielo con facilidad', 1),
(302, 'TOSHIBA', 'CONVENCIONAL', 666507, 'FZC88AMC7ON', '220', 'CASETTE', '3', '2022-04-20', 'TOSHIBA.png', 'pueden formarse tempanos de hielo con facilidad', 1),
(303, 'SANYO', 'CONVENCIONAL', 867370, 'JLQ24RWS9IT', '220', 'DE VENTANA', '4', '2021-11-17', 'SANYO.png', 'el rendimiento esta reducido en un 7%', 1),
(304, 'BGH', 'INVERTER', 853341, 'CCX51WMX7YN', '220', 'DE VENTANA', '4', '2020-04-01', 'BGH.png', 'el rendimiento esta reducido en un 7%', 1),
(305, 'HITACHI', 'INVERTER', 2421203, 'RBH74NVQ7NQ', '220', 'PISO TECHO', '5', '2020-01-17', 'HITACHI.png', 'producto completamente nuevo', 1),
(306, 'PANASONIC', 'INVERTER', 3284260, 'MOO41GYM3IQ', '220', 'PISO TECHO', '5', '2020-05-15', 'PANASONIC.png', 'producto completamente nuevo', 1),
(307, 'YORK', 'CONVENCIONAL', 750015, 'MBT09KGJ1UH', '220', 'SPLIT', '3', '2020-07-31', 'YORK.png', 'el ventilador suele ralentizarse cuando se recalienta el motor', 1),
(308, 'CARRIER', 'CONVENCIONAL', 789144, 'XRO29RMM4KQ', '220', 'SPLIT', '3', '2020-06-08', 'CARRIER.png', 'el ventilador suele ralentizarse cuando se recalienta el motor', 1),
(309, 'SURREY', 'CONVENCIONAL', 1256949, 'ELM17SUZ2CC', '220', 'MINISPLIT', '4', '2023-03-14', 'SURREY.png', 'de segunda, pero en optimas condiciones', 1),
(310, 'LG', 'INVERTER', 1309566, 'XLR20EQU6GZ', '220', 'MINISPLIT', '4', '2023-09-10', 'LG.png', 'el rendimiento esta reducido en un 6%', 1),
(311, 'SAMSUNG', 'INVERTER', 3310694, 'CNQ77LOC4NM', '110', 'INDUSTRIAL', '5', '2022-01-21', 'SAMSUNG.png', 'producto completamente nuevo', 1),
(312, 'TOSHIBA', 'INVERTER', 4505464, 'LJJ11GEL2AW', '110', 'INDUSTRIAL', '5', '2021-01-18', 'TOSHIBA.png', 'producto completamente nuevo', 1),
(313, 'SANYO', 'CONVENCIONAL', 750071, 'KJK67UDF0XO', '110', 'CENTRAL', '3', '2022-08-21', 'SANYO.png', 'el motor exterior puede reducir su potencia con las altas temperaturas', 1),
(314, 'BGH', 'CONVENCIONAL', 712751, 'TJI42XYA2BB', '110', 'CENTRAL', '3', '2021-11-28', 'BGH.png', 'el suministro por los conductos puede verse mermado por el calor', 1),
(315, 'HITACHI', 'CONVENCIONAL', 1364965, 'PWY43DPR6UC', '110', 'CASETTE', '4', '2022-06-26', 'HITACHI.png', 'el rendimiento esta reducido en un 8%', 1),
(316, 'PANASONIC', 'INVERTER', 1010938, 'EWE44JXI7WQ', '110', 'CASETTE', '4', '2021-01-19', 'PANASONIC.png', 'de segunda, pero en optimas condiciones', 1),
(317, 'YORK', 'INVERTER', 4701309, 'CUD52FMX8GO', '110', 'DE VENTANA', '5', '2022-11-09', 'YORK.png', 'producto completamente nuevo', 1),
(318, 'CARRIER', 'INVERTER', 3007874, 'MBO45BHV7CK', '110', 'DE VENTANA', '5', '2021-08-28', 'CARRIER.png', 'producto completamente nuevo', 1),
(319, 'SURREY', 'CONVENCIONAL', 762957, 'VVR71XJZ9KM', '110', 'PISO TECHO', '3', '2021-12-30', 'SURREY.png', 'pueden enfriar demasiado a temperaturas anormales', 1),
(320, 'LG', 'CONVENCIONAL', 753764, 'TPP22BXI3DC', '110', 'PISO TECHO', '3', '2021-08-30', 'LG.png', 'puede gotear cuando tiene más de 7 horas de actividad', 1),
(321, 'SAMSUNG', 'CONVENCIONAL', 1445414, 'QVO47WMC7OK', '220', 'SPLIT', '4', '2022-06-21', 'SAMSUNG.png', 'de segunda, pero en optimas condiciones', 1),
(322, 'TOSHIBA', 'INVERTER', 1378679, 'ZTN86KFB6VH', '220', 'SPLIT', '4', '2020-07-19', 'TOSHIBA.png', 'el rendimiento esta reducido en un 9%', 1),
(323, 'SANYO', 'INVERTER', 2783290, 'OQE96EGA1BJ', '220', 'MINISPLIT', '5', '2022-11-12', 'SANYO.png', 'producto completamente nuevo', 1),
(324, 'BGH', 'INVERTER', 3367318, 'GIV56GRN1YZ', '220', 'MINISPLIT', '5', '2021-02-07', 'BGH.png', 'producto completamente nuevo', 1),
(325, 'HITACHI', 'CONVENCIONAL', 533276, 'QDH18RJL4SD', '220', 'INDUSTRIAL', '3', '2022-09-16', 'HITACHI.png', 'el equipo tiene la carcasa un poco desgastada', 1),
(326, 'PANASONIC', 'CONVENCIONAL', 717508, 'VHT49GWI5FC', '220', 'INDUSTRIAL', '3', '2022-04-06', 'PANASONIC.png', 'el equipo emite ruidos después de 10 horas de encendido', 1),
(327, 'YORK', 'CONVENCIONAL', 810360, 'NYF79MOG2CR', '220', 'CENTRAL', '4', '2021-05-07', 'YORK.png', 'el rendimiento esta reducido en un 11%', 1),
(328, 'CARRIER', 'INVERTER', 1498756, 'QUR41WPO6YQ', '220', 'CENTRAL', '4', '2022-09-06', 'CARRIER.png', 'de segunda, pero en optimas condiciones', 1),
(329, 'SURREY', 'INVERTER', 4133548, 'TNW33XJS4QW', '220', 'CASETTE', '5', '2020-07-19', 'SURREY.png', 'producto completamente nuevo', 1),
(330, 'LG', 'INVERTER', 4811911, 'GQS34BKR0ED', '220', 'CASETTE', '5', '2020-01-18', 'LG.png', 'producto completamente nuevo', 1),
(331, 'SAMSUNG', 'CONVENCIONAL', 698254, 'LLY51MRM6SL', '110', 'DE VENTANA', '3', '2023-11-30', 'SAMSUNG.png', 'la generacion de calor puede provocar ruidos en el motor', 1),
(332, 'TOSHIBA', 'CONVENCIONAL', 781469, 'KOK08DYD3KC', '110', 'DE VENTANA', '3', '2022-02-28', 'TOSHIBA.png', 'la generacion de calor puede provocar ruidos en el motor', 1),
(333, 'SANYO', 'CONVENCIONAL', 1293527, 'MGJ98PXP8OZ', '110', 'PISO TECHO', '4', '2023-03-03', 'SANYO.png', 'puede emitir mucho calor con la exposicion al sol', 1),
(334, 'BGH', 'INVERTER', 1334926, 'TQJ26GOM6NS', '110', 'PISO TECHO', '4', '2021-10-28', 'BGH.png', 'puede emitir mucho calor con la exposicion al sol', 1),
(335, 'HITACHI', 'INVERTER', 5054323, 'UBU82QZJ4BR', '110', 'SPLIT', '5', '2020-09-05', 'HITACHI.png', 'producto completamente nuevo', 1),
(336, 'PANASONIC', 'INVERTER', 3304639, 'NAX56ELN5LK', '110', 'SPLIT', '5', '2021-12-09', 'PANASONIC.png', 'producto completamente nuevo', 1),
(337, 'YORK', 'CONVENCIONAL', 790919, 'GRB32GCB1PW', '110', 'MINISPLIT', '3', '2020-07-08', 'YORK.png', 'la unidad exterior se recalienta a la exposicion constante al sol', 1),
(338, 'CARRIER', 'CONVENCIONAL', 763016, 'QZL27XNO0VR', '110', 'MINISPLIT', '3', '2022-12-22', 'CARRIER.png', 'la unidad interior no presenta fallos', 1),
(339, 'SURREY', 'CONVENCIONAL', 963213, 'NPV07DNV3TJ', '110', 'INDUSTRIAL', '4', '2020-09-16', 'SURREY.png', 'de segunda, pero en optimas condiciones', 1),
(340, 'LG', 'INVERTER', 1389108, 'CYX43QBQ1YZ', '110', 'INDUSTRIAL', '4', '2021-04-08', 'LG.png', 'de segunda, pero en optimas condiciones', 1),
(341, 'SAMSUNG', 'INVERTER', 5068808, 'CMU01JDP6JJ', '220', 'CENTRAL', '5', '2020-11-27', 'SAMSUNG.png', 'producto completamente nuevo', 1),
(342, 'TOSHIBA', 'INVERTER', 2906575, 'XLM78HON4GU', '220', 'CENTRAL', '5', '2020-05-28', 'TOSHIBA.png', 'producto completamente nuevo', 1),
(343, 'SANYO', 'CONVENCIONAL', 754208, 'MKL87BKI9YA', '220', 'CASETTE', '3', '2021-06-18', 'SANYO.png', 'el rendimiento de enfriamiento a largo plazo esta reducido', 1),
(344, 'BGH', 'CONVENCIONAL', 768126, 'YXJ69TXY2XF', '220', 'CASETTE', '3', '2023-01-21', 'BGH.png', 'pueden formarse tempanos de hielo con facilidad', 1),
(345, 'HITACHI', 'CONVENCIONAL', 823713, 'GUG66WRZ1VG', '220', 'DE VENTANA', '4', '2023-08-11', 'HITACHI.png', 'el rendimiento esta reducido en un 7%', 1),
(346, 'PANASONIC', 'INVERTER', 1464020, 'YSB36JYX1BD', '220', 'DE VENTANA', '4', '2023-06-22', 'PANASONIC.png', 'el rendimiento esta reducido en un 7%', 1),
(347, 'YORK', 'INVERTER', 2508819, 'TQP06YKS5GE', '220', 'PISO TECHO', '5', '2021-05-24', 'YORK.png', 'producto completamente nuevo', 1),
(348, 'CARRIER', 'INVERTER', 4722605, 'XIH49BPN2JU', '220', 'PISO TECHO', '5', '2023-10-12', 'CARRIER.png', 'producto completamente nuevo', 1),
(349, 'SURREY', 'CONVENCIONAL', 608745, 'AXM92CCG1TF', '220', 'SPLIT', '3', '2020-07-08', 'SURREY.png', 'el ventilador suele ralentizarse cuando se recalienta el motor', 1),
(350, 'LG', 'CONVENCIONAL', 748489, 'WIF18MSS7MF', '220', 'SPLIT', '3', '2020-12-05', 'LG.png', 'el equipo tiene reducida la capacidad de enfriamiento', 1),
(351, 'SAMSUNG', 'CONVENCIONAL', 1020369, 'VOG03XEX2VF', '110', 'MINISPLIT', '4', '2023-04-25', 'SAMSUNG.png', 'el rendimiento esta reducido en un 6%', 1),
(352, 'TOSHIBA', 'INVERTER', 810011, 'PYC03HBA5JO', '110', 'MINISPLIT', '4', '2022-05-18', 'TOSHIBA.png', 'el rendimiento esta reducido en un 6%', 1),
(353, 'SANYO', 'INVERTER', 2300749, 'OSU89SYL6TF', '110', 'INDUSTRIAL', '5', '2022-12-01', 'SANYO.png', 'producto completamente nuevo', 1),
(354, 'BGH', 'INVERTER', 3960204, 'MYZ20JNN1SQ', '110', 'INDUSTRIAL', '5', '2020-02-22', 'BGH.png', 'producto completamente nuevo', 1),
(355, 'HITACHI', 'CONVENCIONAL', 717232, 'LDL55SHG5WE', '110', 'CENTRAL', '3', '2023-07-01', 'HITACHI.png', 'el motor exterior puede reducir su potencia con las altas temperaturas', 1),
(356, 'PANASONIC', 'CONVENCIONAL', 693227, 'LWG14OXZ5BR', '110', 'CENTRAL', '3', '2022-08-29', 'PANASONIC.png', 'el suministro por los conductos puede verse mermado por el calor', 1),
(357, 'YORK', 'CONVENCIONAL', 849599, 'DSX31ZPC1UM', '110', 'CASETTE', '4', '2021-08-16', 'YORK.png', 'el rendimiento esta reducido en un 8%', 1),
(358, 'CARRIER', 'INVERTER', 1294573, 'BGL73ANV1NB', '110', 'CASETTE', '4', '2020-02-15', 'CARRIER.png', 'el rendimiento esta reducido en un 8%', 1),
(359, 'SURREY', 'INVERTER', 2388616, 'EXF31MXS2VX', '110', 'DE VENTANA', '5', '2020-05-08', 'SURREY.png', 'producto completamente nuevo', 1),
(360, 'LG', 'INVERTER', 4834916, 'SRM93LBQ1XR', '110', 'DE VENTANA', '5', '2023-03-25', 'LG.png', 'producto completamente nuevo', 1),
(361, 'SAMSUNG', 'CONVENCIONAL', 707899, 'HEE63CYR2XY', '220', 'PISO TECHO', '3', '2020-04-13', 'SAMSUNG.png', 'puede gotear cuando tiene más de 7 horas de actividad', 1),
(362, 'TOSHIBA', 'CONVENCIONAL', 717426, 'IDL44IBG1KF', '220', 'PISO TECHO', '3', '2023-02-08', 'TOSHIBA.png', 'puede gotear cuando tiene más de 7 horas de actividad', 1),
(363, 'SANYO', 'CONVENCIONAL', 1059124, 'OJW61JHG8XF', '220', 'SPLIT', '4', '2022-01-17', 'SANYO.png', 'de segunda, pero en optimas condiciones', 1),
(364, 'BGH', 'INVERTER', 860224, 'QPK76XLL2CA', '220', 'SPLIT', '4', '2020-06-27', 'BGH.png', 'de segunda, pero en optimas condiciones', 1),
(365, 'HITACHI', 'INVERTER', 3489939, 'VFD62PXE5DQ', '220', 'MINISPLIT', '5', '2021-08-03', 'HITACHI.png', 'producto completamente nuevo', 1),
(366, 'PANASONIC', 'INVERTER', 5171534, 'OVV85XBG2XV', '220', 'MINISPLIT', '5', '2020-08-24', 'PANASONIC.png', 'producto completamente nuevo', 1),
(367, 'YORK', 'CONVENCIONAL', 728936, 'DYV14MUJ5GD', '220', 'INDUSTRIAL', '3', '2020-05-12', 'YORK.png', 'el equipo tiene la carcasa un poco desgastada', 1),
(368, 'CARRIER', 'CONVENCIONAL', 760274, 'PCD94AXS2NN', '220', 'INDUSTRIAL', '3', '2023-08-23', 'CARRIER.png', 'el equipo emite ruidos después de 10 horas de encendido', 1),
(369, 'SURREY', 'CONVENCIONAL', 1113423, 'CRW69VGB5IS', '220', 'CENTRAL', '4', '2021-02-20', 'SURREY.png', 'de segunda, pero en optimas condiciones', 1),
(370, 'LG', 'INVERTER', 991308, 'EJI74QEL5TD', '220', 'CENTRAL', '4', '2023-01-21', 'LG.png', 'el rendimiento esta reducido en un 11%', 1),
(371, 'SAMSUNG', 'INVERTER', 4582505, 'EVE52WIF6JS', '110', 'CASETTE', '5', '2022-05-24', 'SAMSUNG.png', 'producto completamente nuevo', 1),
(372, 'TOSHIBA', 'INVERTER', 2981242, 'FED15UPU3QD', '110', 'CASETTE', '5', '2023-07-15', 'TOSHIBA.png', 'producto completamente nuevo', 1),
(373, 'SANYO', 'CONVENCIONAL', 776286, 'LMO64KIM7DU', '110', 'DE VENTANA', '3', '2022-02-15', 'SANYO.png', 'la generacion de calor puede provocar ruidos en el motor', 1),
(374, 'BGH', 'CONVENCIONAL', 736963, 'LHI78QLN5WJ', '110', 'DE VENTANA', '3', '2023-05-09', 'BGH.png', 'la generacion de calor esta reducida en un 14%', 1),
(375, 'HITACHI', 'CONVENCIONAL', 805358, 'RMQ68WFS4YH', '110', 'PISO TECHO', '4', '2021-08-07', 'HITACHI.png', 'puede emitir mucho calor con la exposicion al sol', 1),
(376, 'PANASONIC', 'INVERTER', 898398, 'KGW37QDN8TG', '110', 'PISO TECHO', '4', '2022-02-16', 'PANASONIC.png', 'de segunda, pero en optimas condiciones', 1),
(377, 'YORK', 'INVERTER', 2418773, 'NKF47VNW0KH', '110', 'SPLIT', '5', '2020-03-12', 'YORK.png', 'producto completamente nuevo', 1),
(378, 'CARRIER', 'INVERTER', 2338484, 'UAZ35WHM7TF', '110', 'SPLIT', '5', '2023-11-19', 'CARRIER.png', 'producto completamente nuevo', 1),
(379, 'SURREY', 'CONVENCIONAL', 626211, 'VZR50CZL0PN', '110', 'MINISPLIT', '3', '2022-02-25', 'SURREY.png', 'la unidad interior no presenta fallos', 1),
(380, 'LG', 'CONVENCIONAL', 773231, 'NDK12IJB4KV', '110', 'MINISPLIT', '3', '2020-05-25', 'LG.png', 'la unidad interior no presenta fallos', 1),
(381, 'SAMSUNG', 'CONVENCIONAL', 887632, 'GNF14HRR4SM', '220', 'INDUSTRIAL', '4', '2021-05-03', 'SAMSUNG.png', 'el rendimiento esta reducido en un 5%', 1),
(382, 'TOSHIBA', 'INVERTER', 990102, 'AUN12TDM4WZ', '220', 'INDUSTRIAL', '4', '2023-03-29', 'TOSHIBA.png', 'de segunda, pero en optimas condiciones', 1),
(383, 'SANYO', 'INVERTER', 2838090, 'YYP45MJF3LV', '220', 'CENTRAL', '5', '2022-07-18', 'SANYO.png', 'producto completamente nuevo', 1),
(384, 'BGH', 'INVERTER', 4732040, 'JWD37BUQ4IN', '220', 'CENTRAL', '5', '2021-01-16', 'BGH.png', 'producto completamente nuevo', 1),
(385, 'HITACHI', 'CONVENCIONAL', 753074, 'KID63KJE3EP', '220', 'CASETTE', '3', '2022-07-11', 'HITACHI.png', 'el rendimiento de enfriamiento a largo plazo esta reducido', 1),
(386, 'PANASONIC', 'CONVENCIONAL', 602185, 'EQM38OKK2CR', '220', 'CASETTE', '3', '2020-03-15', 'PANASONIC.png', 'pueden formarse tempanos de hielo con facilidad', 1),
(387, 'YORK', 'CONVENCIONAL', 1006668, 'FHE45WQY6GQ', '220', 'DE VENTANA', '4', '2022-11-12', 'YORK.png', 'el rendimiento esta reducido en un 7%', 1),
(388, 'CARRIER', 'INVERTER', 826483, 'SVE43POJ1VH', '220', 'DE VENTANA', '4', '2023-03-30', 'CARRIER.png', 'el rendimiento esta reducido en un 7%', 1),
(389, 'SURREY', 'INVERTER', 3236635, 'VSI85VGA8KE', '220', 'PISO TECHO', '5', '2023-05-31', 'SURREY.png', 'producto completamente nuevo', 1),
(390, 'LG', 'INVERTER', 4979305, 'TTW29QZB3DH', '220', 'PISO TECHO', '5', '2020-07-18', 'LG.png', 'producto completamente nuevo', 1),
(391, 'SAMSUNG', 'CONVENCIONAL', 555745, 'EGI85EGP5MB', '110', 'SPLIT', '3', '2020-04-28', 'SAMSUNG.png', 'el ventilador suele ralentizarse cuando se recalienta el motor', 1),
(392, 'TOSHIBA', 'CONVENCIONAL', 423419, 'QED70EGJ3EV', '110', 'SPLIT', '3', '2020-03-29', 'TOSHIBA.png', 'el ventilador suele ralentizarse cuando se recalienta el motor', 1),
(393, 'SANYO', 'CONVENCIONAL', 1359558, 'FQW64ASR8CK', '110', 'MINISPLIT', '4', '2021-10-12', 'SANYO.png', 'de segunda, pero en optimas condiciones', 1),
(394, 'BGH', 'INVERTER', 1351157, 'MLJ08GRG6EF', '110', 'MINISPLIT', '4', '2023-10-07', 'BGH.png', 'de segunda, pero en optimas condiciones', 1),
(395, 'HITACHI', 'INVERTER', 4431854, 'TJU17NMW5HV', '110', 'INDUSTRIAL', '5', '2023-10-18', 'HITACHI.png', 'producto completamente nuevo', 1),
(396, 'PANASONIC', 'INVERTER', 3669043, 'KDT04WSU7LU', '110', 'INDUSTRIAL', '5', '2023-11-25', 'PANASONIC.png', 'producto completamente nuevo', 1),
(397, 'YORK', 'CONVENCIONAL', 736237, 'OEG53SYC1GX', '110', 'CENTRAL', '3', '2020-06-17', 'YORK.png', 'el suministro por los conductos puede verse mermado por el calor', 1),
(398, 'CARRIER', 'CONVENCIONAL', 467755, 'AYX68LHE2MX', '110', 'CENTRAL', '3', '2020-12-30', 'CARRIER.png', 'el suministro por los conductos puede verse mermado por el calor', 1),
(399, 'SURREY', 'CONVENCIONAL', 1477620, 'JLG83XIU0YV', '110', 'CASETTE', '4', '2020-11-08', 'SURREY.png', 'de segunda, pero en optimas condiciones', 1),
(400, 'LG', 'INVERTER', 1077120, 'DMK45JYJ0CW', '110', 'CASETTE', '4', '2021-07-22', 'LG.png', 'de segunda, pero en optimas condiciones', 1),
(401, 'SAMSUNG', 'INVERTER', 4915714, 'WVU33WCK6GA', '220', 'DE VENTANA', '5', '2023-01-10', 'SAMSUNG.png', 'producto completamente nuevo', 1),
(402, 'TOSHIBA', 'INVERTER', 3487558, 'UTT63IRX1IQ', '220', 'DE VENTANA', '5', '2021-11-17', 'TOSHIBA.png', 'producto completamente nuevo', 1),
(403, 'SANYO', 'CONVENCIONAL', 595585, 'UKW55CMD6IO', '220', 'PISO TECHO', '3', '2020-05-21', 'SANYO.png', 'puede gotear cuando tiene más de 7 horas de actividad', 1),
(404, 'BGH', 'CONVENCIONAL', 777577, 'ZOR17ADR3ML', '220', 'PISO TECHO', '3', '2021-05-15', 'BGH.png', 'pueden enfriar demasiado a temperaturas anormales', 1),
(405, 'HITACHI', 'CONVENCIONAL', 1051557, 'PYM28HQD6LJ', '220', 'SPLIT', '4', '2022-03-02', 'HITACHI.png', 'de segunda, pero en optimas condiciones', 1),
(406, 'PANASONIC', 'INVERTER', 858329, 'EFZ07KCL5QZ', '220', 'SPLIT', '4', '2023-11-22', 'PANASONIC.png', 'el rendimiento esta reducido en un 9%', 1),
(407, 'YORK', 'INVERTER', 4080933, 'CKI35YLB5DH', '220', 'MINISPLIT', '5', '2023-05-03', 'YORK.png', 'producto completamente nuevo', 1),
(408, 'CARRIER', 'INVERTER', 3480954, 'XTJ25NMK2RX', '220', 'MINISPLIT', '5', '2022-08-18', 'CARRIER.png', 'producto completamente nuevo', 1),
(409, 'SURREY', 'CONVENCIONAL', 762865, 'ETL38JID5SB', '220', 'INDUSTRIAL', '3', '2021-05-11', 'SURREY.png', 'el equipo emite ruidos después de 10 horas de encendido', 1),
(410, 'LG', 'CONVENCIONAL', 751552, 'PER83QKC4SV', '220', 'INDUSTRIAL', '3', '2021-03-22', 'LG.png', 'el equipo emite ruidos después de 10 horas de encendido', 1),
(411, 'SAMSUNG', 'CONVENCIONAL', 1325301, 'RKL41JGT3LD', '110', 'CENTRAL', '4', '2020-08-04', 'SAMSUNG.png', 'el rendimiento esta reducido en un 11%', 1),
(412, 'TOSHIBA', 'INVERTER', 937851, 'KOD54HTG1BI', '110', 'CENTRAL', '4', '2021-01-10', 'TOSHIBA.png', 'el rendimiento esta reducido en un 11%', 1),
(413, 'SANYO', 'INVERTER', 4435131, 'PVJ28YTP7MY', '110', 'CASETTE', '5', '2021-05-26', 'SANYO.png', 'producto completamente nuevo', 1),
(414, 'BGH', 'INVERTER', 4864400, 'MMK39CSR4MV', '110', 'CASETTE', '5', '2022-10-09', 'BGH.png', 'producto completamente nuevo', 1),
(415, 'HITACHI', 'CONVENCIONAL', 750582, 'VYQ88AMI7EK', '110', 'DE VENTANA', '3', '2022-04-28', 'HITACHI.png', 'la generacion de calor esta reducida en un 14%', 1),
(416, 'PANASONIC', 'CONVENCIONAL', 724895, 'HDN69NDY8TF', '110', 'DE VENTANA', '3', '2023-11-06', 'PANASONIC.png', 'la generacion de calor puede provocar ruidos en el motor', 1),
(417, 'YORK', 'CONVENCIONAL', 1114165, 'CNM53INK6GP', '110', 'PISO TECHO', '4', '2021-12-07', 'YORK.png', 'puede emitir mucho calor con la exposicion al sol', 1),
(418, 'CARRIER', 'INVERTER', 1169744, 'FOV46APY7ST', '110', 'PISO TECHO', '4', '2022-12-02', 'CARRIER.png', 'puede emitir mucho calor con la exposicion al sol', 1),
(419, 'SURREY', 'INVERTER', 3266484, 'DLL05SXR6TQ', '110', 'SPLIT', '5', '2023-09-25', 'SURREY.png', 'producto completamente nuevo', 1),
(420, 'LG', 'INVERTER', 4912488, 'DWS33JJK8RN', '110', 'SPLIT', '5', '2023-10-11', 'LG.png', 'producto completamente nuevo', 1),
(421, 'SAMSUNG', 'CONVENCIONAL', 751989, 'MBQ46BLB8LH', '220', 'MINISPLIT', '3', '2022-12-05', 'SAMSUNG.png', 'la unidad interior no presenta fallos', 1),
(422, 'TOSHIBA', 'CONVENCIONAL', 766941, 'DQB52RRO2JH', '220', 'MINISPLIT', '3', '2021-02-11', 'TOSHIBA.png', 'la unidad interior no presenta fallos', 1),
(423, 'SANYO', 'CONVENCIONAL', 842242, 'BRM62TYF3TE', '220', 'INDUSTRIAL', '4', '2023-03-12', 'SANYO.png', 'de segunda, pero en optimas condiciones', 1),
(424, 'BGH', 'INVERTER', 868702, 'YSK25NRS3XO', '220', 'INDUSTRIAL', '4', '2021-01-01', 'BGH.png', 'el rendimiento esta reducido en un 5%', 1),
(425, 'HITACHI', 'INVERTER', 2038463, 'TDO46NVM1IN', '220', 'CENTRAL', '5', '2020-10-12', 'HITACHI.png', 'producto completamente nuevo', 1),
(426, 'PANASONIC', 'INVERTER', 5113749, 'FPG94PPW4OT', '220', 'CENTRAL', '5', '2023-09-10', 'PANASONIC.png', 'producto completamente nuevo', 1),
(427, 'YORK', 'CONVENCIONAL', 772139, 'WIY32TDK9UP', '220', 'CASETTE', '3', '2022-02-07', 'YORK.png', 'el rendimiento de enfriamiento a largo plazo esta reducido', 1),
(428, 'CARRIER', 'CONVENCIONAL', 753420, 'HFM12GGX5IM', '220', 'CASETTE', '3', '2020-02-07', 'CARRIER.png', 'el rendimiento de enfriamiento a largo plazo esta reducido', 1),
(429, 'SURREY', 'CONVENCIONAL', 960927, 'IDG63XUD7OP', '220', 'DE VENTANA', '4', '2022-06-21', 'SURREY.png', 'el rendimiento esta reducido en un 7%', 1),
(430, 'LG', 'INVERTER', 891619, 'CPW34EEN7MC', '220', 'DE VENTANA', '4', '2020-10-04', 'LG.png', 'de segunda, pero en optimas condiciones', 1),
(431, 'SAMSUNG', 'INVERTER', 4217209, 'STS58RNY7KH', '110', 'PISO TECHO', '5', '2022-03-22', 'SAMSUNG.png', 'producto completamente nuevo', 1),
(432, 'TOSHIBA', 'INVERTER', 4166127, 'PQY45VTP2YU', '110', 'PISO TECHO', '5', '2020-06-12', 'TOSHIBA.png', 'producto completamente nuevo', 1),
(433, 'SANYO', 'CONVENCIONAL', 757607, 'LHF72XRB6UD', '110', 'SPLIT', '3', '2023-10-06', 'SANYO.png', 'el ventilador suele ralentizarse cuando se recalienta el motor', 1),
(434, 'BGH', 'CONVENCIONAL', 752517, 'HYK68DGA1SC', '110', 'SPLIT', '3', '2023-06-14', 'BGH.png', 'el equipo tiene reducida la capacidad de enfriamiento', 1),
(435, 'HITACHI', 'CONVENCIONAL', 873306, 'IQN65PFT7CL', '110', 'MINISPLIT', '4', '2022-11-09', 'HITACHI.png', 'el rendimiento esta reducido en un 6%', 1),
(436, 'PANASONIC', 'INVERTER', 817530, 'QRW00GKO2ME', '110', 'MINISPLIT', '4', '2020-08-10', 'PANASONIC.png', 'el rendimiento esta reducido en un 6%', 1),
(437, 'YORK', 'INVERTER', 4685402, 'IHQ25GQE2LR', '110', 'INDUSTRIAL', '5', '2022-08-05', 'YORK.png', 'producto completamente nuevo', 1),
(438, 'CARRIER', 'INVERTER', 4708336, 'SXL97MGW5FE', '110', 'INDUSTRIAL', '5', '2020-09-10', 'CARRIER.png', 'producto completamente nuevo', 1),
(439, 'SURREY', 'CONVENCIONAL', 775671, 'YQI13LVC2HB', '110', 'CENTRAL', '3', '2021-04-26', 'SURREY.png', 'el suministro por los conductos puede verse mermado por el calor', 1),
(440, 'LG', 'CONVENCIONAL', 744315, 'MOV89KGG7JG', '110', 'CENTRAL', '3', '2020-06-17', 'LG.png', 'el suministro por los conductos puede verse mermado por el calor', 1),
(441, 'SAMSUNG', 'CONVENCIONAL', 844151, 'VEW77MJE1NC', '220', 'CASETTE', '4', '2023-10-08', 'SAMSUNG.png', 'de segunda, pero en optimas condiciones', 1),
(442, 'TOSHIBA', 'INVERTER', 850499, 'ZMK79BFW2QY', '220', 'CASETTE', '4', '2020-01-16', 'TOSHIBA.png', 'el rendimiento esta reducido en un 8%', 1),
(443, 'SANYO', 'INVERTER', 4110413, 'PEY73PNY3YX', '220', 'DE VENTANA', '5', '2022-06-10', 'SANYO.png', 'producto completamente nuevo', 1),
(444, 'BGH', 'INVERTER', 3228345, 'SIS67KDW4GW', '220', 'DE VENTANA', '5', '2022-02-05', 'BGH.png', 'producto completamente nuevo', 1),
(445, 'HITACHI', 'CONVENCIONAL', 782550, 'FSH88QLW6ER', '220', 'PISO TECHO', '3', '2020-08-26', 'HITACHI.png', 'puede gotear cuando tiene más de 7 horas de actividad', 1),
(446, 'PANASONIC', 'CONVENCIONAL', 758700, 'ZLH94CJN2HK', '220', 'PISO TECHO', '3', '2020-12-25', 'PANASONIC.png', 'puede gotear cuando tiene más de 7 horas de actividad', 1),
(447, 'YORK', 'CONVENCIONAL', 907207, 'FDX57TPW2NJ', '220', 'SPLIT', '4', '2020-02-07', 'YORK.png', 'el rendimiento esta reducido en un 9%', 1),
(448, 'CARRIER', 'INVERTER', 1256577, 'ABG48JXK1CP', '220', 'SPLIT', '4', '2023-08-07', 'CARRIER.png', 'de segunda, pero en optimas condiciones', 1),
(449, 'SURREY', 'INVERTER', 3122833, 'VXT35SNP3IU', '220', 'MINISPLIT', '5', '2023-04-26', 'SURREY.png', 'producto completamente nuevo', 1),
(450, 'LG', 'INVERTER', 4890268, 'SAF43YHU4OB', '220', 'MINISPLIT', '5', '2020-07-29', 'LG.png', 'producto completamente nuevo', 1),
(451, 'SAMSUNG', 'CONVENCIONAL', 526428, 'QJG63MTL4TE', '110', 'INDUSTRIAL', '3', '2020-05-15', 'SAMSUNG.png', 'el equipo tiene la carcasa un poco desgastada', 1),
(452, 'TOSHIBA', 'CONVENCIONAL', 778088, 'WOL22BIK5KH', '110', 'INDUSTRIAL', '3', '2023-04-27', 'TOSHIBA.png', 'el equipo tiene la carcasa un poco desgastada', 1),
(453, 'SANYO', 'CONVENCIONAL', 852079, 'NFE48VIK1GL', '110', 'CENTRAL', '4', '2020-04-02', 'SANYO.png', 'el rendimiento esta reducido en un 11%', 1),
(454, 'BGH', 'INVERTER', 874096, 'UGX85KMU4GZ', '110', 'CENTRAL', '4', '2022-01-27', 'BGH.png', 'de segunda, pero en optimas condiciones', 1),
(455, 'HITACHI', 'INVERTER', 4838056, 'XHE81ECR2YM', '110', 'CASETTE', '5', '2021-12-07', 'HITACHI.png', 'producto completamente nuevo', 1),
(456, 'PANASONIC', 'INVERTER', 5019846, 'BYK57AYB6KR', '110', 'CASETTE', '5', '2022-01-02', 'PANASONIC.png', 'producto completamente nuevo', 1),
(457, 'YORK', 'CONVENCIONAL', 754030, 'PCE15VGI6HS', '110', 'DE VENTANA', '3', '2021-12-15', 'YORK.png', 'la generacion de calor puede provocar ruidos en el motor', 1),
(458, 'CARRIER', 'CONVENCIONAL', 750764, 'VJI41SRH6DB', '110', 'DE VENTANA', '3', '2022-05-16', 'CARRIER.png', 'la generacion de calor esta reducida en un 14%', 1),
(459, 'SURREY', 'CONVENCIONAL', 988016, 'XOJ10FBH4BG', '110', 'PISO TECHO', '4', '2021-12-11', 'SURREY.png', 'de segunda, pero en optimas condiciones', 1),
(460, 'LG', 'INVERTER', 844426, 'WKR14JSA0NT', '110', 'PISO TECHO', '4', '2020-11-21', 'LG.png', 'de segunda, pero en optimas condiciones', 1),
(461, 'SAMSUNG', 'INVERTER', 2337452, 'VTR52RJL6CW', '220', 'SPLIT', '5', '2020-05-01', 'SAMSUNG.png', 'producto completamente nuevo', 1),
(462, 'TOSHIBA', 'INVERTER', 2052375, 'LAR66UHL3ON', '220', 'SPLIT', '5', '2023-08-21', 'TOSHIBA.png', 'producto completamente nuevo', 1),
(463, 'SANYO', 'CONVENCIONAL', 745839, 'ABT77QPF1FG', '220', 'MINISPLIT', '3', '2022-01-03', 'SANYO.png', 'la unidad interior no presenta fallos', 1),
(464, 'BGH', 'CONVENCIONAL', 744518, 'GOG47MFD7JZ', '220', 'MINISPLIT', '3', '2023-05-23', 'BGH.png', 'la unidad interior no presenta fallos', 1),
(465, 'HITACHI', 'CONVENCIONAL', 931844, 'XJV15BMN5BX', '220', 'INDUSTRIAL', '4', '2020-05-12', 'HITACHI.png', 'de segunda, pero en optimas condiciones', 1),
(466, 'PANASONIC', 'INVERTER', 885443, 'NUG94IQQ1BS', '220', 'INDUSTRIAL', '4', '2022-04-24', 'PANASONIC.png', 'el rendimiento esta reducido en un 5%', 1),
(467, 'YORK', 'INVERTER', 3396423, 'WSE92VMR5NT', '220', 'CENTRAL', '5', '2021-12-30', 'YORK.png', 'producto completamente nuevo', 1),
(468, 'CARRIER', 'INVERTER', 2430445, 'URR19SFC0YW', '220', 'CENTRAL', '5', '2021-03-17', 'CARRIER.png', 'producto completamente nuevo', 1),
(469, 'SURREY', 'CONVENCIONAL', 619444, 'KVQ87KYS6AT', '220', 'CASETTE', '3', '2021-11-15', 'SURREY.png', 'el rendimiento de enfriamiento a largo plazo esta reducido', 1),
(470, 'LG', 'CONVENCIONAL', 691899, 'BMM31DCB3YC', '220', 'CASETTE', '3', '2021-08-02', 'LG.png', 'pueden formarse tempanos de hielo con facilidad', 1),
(471, 'SAMSUNG', 'CONVENCIONAL', 1284746, 'YKV28MLT3MQ', '110', 'DE VENTANA', '4', '2021-12-09', 'SAMSUNG.png', 'el rendimiento esta reducido en un 7%', 1),
(472, 'TOSHIBA', 'INVERTER', 910214, 'HDU38HQW4QM', '110', 'DE VENTANA', '4', '2021-09-06', 'TOSHIBA.png', 'el rendimiento esta reducido en un 7%', 1),
(473, 'SANYO', 'INVERTER', 2479916, 'JYI72NSC2UR', '110', 'PISO TECHO', '5', '2023-06-11', 'SANYO.png', 'producto completamente nuevo', 1),
(474, 'BGH', 'INVERTER', 4892740, 'PCM13NUO8TI', '110', 'PISO TECHO', '5', '2022-04-02', 'BGH.png', 'producto completamente nuevo', 1),
(475, 'HITACHI', 'CONVENCIONAL', 750563, 'NMY28JPF1XG', '110', 'SPLIT', '3', '2022-02-08', 'HITACHI.png', 'el ventilador suele ralentizarse cuando se recalienta el motor', 1),
(476, 'PANASONIC', 'CONVENCIONAL', 755305, 'WWW78RUJ8AO', '110', 'SPLIT', '3', '2022-06-10', 'PANASONIC.png', 'el ventilador suele ralentizarse cuando se recalienta el motor', 1),
(477, 'YORK', 'CONVENCIONAL', 1098101, 'UHK45EHB2QF', '110', 'MINISPLIT', '4', '2021-06-23', 'YORK.png', 'el rendimiento esta reducido en un 6%', 1),
(478, 'CARRIER', 'INVERTER', 1363632, 'YIR83OOK1JS', '110', 'MINISPLIT', '4', '2022-03-22', 'CARRIER.png', 'el rendimiento esta reducido en un 6%', 1),
(479, 'SURREY', 'INVERTER', 4061377, 'OUP05RIW9FZ', '110', 'INDUSTRIAL', '5', '2020-11-25', 'SURREY.png', 'producto completamente nuevo', 1),
(480, 'LG', 'INVERTER', 5092418, 'EKI14WPQ0QE', '110', 'INDUSTRIAL', '5', '2021-06-15', 'LG.png', 'producto completamente nuevo', 1),
(481, 'SAMSUNG', 'CONVENCIONAL', 433814, 'HEO11ELR1XN', '220', 'CENTRAL', '3', '2023-08-12', 'SAMSUNG.png', 'el suministro por los conductos puede verse mermado por el calor', 1),
(482, 'TOSHIBA', 'CONVENCIONAL', 769724, 'LHJ40SHL6DH', '220', 'CENTRAL', '3', '2020-05-01', 'TOSHIBA.png', 'el motor exterior puede reducir su potencia con las altas temperaturas', 1),
(483, 'SANYO', 'CONVENCIONAL', 863953, 'NYU82KPY3QN', '220', 'CASETTE', '4', '2020-09-23', 'SANYO.png', 'el rendimiento esta reducido en un 8%', 1),
(484, 'BGH', 'INVERTER', 1382626, 'QOD71OHP5FP', '220', 'CASETTE', '4', '2020-11-29', 'BGH.png', 'de segunda, pero en optimas condiciones', 1),
(485, 'HITACHI', 'INVERTER', 4914667, 'MHL37QIH6XH', '220', 'DE VENTANA', '5', '2020-07-24', 'HITACHI.png', 'producto completamente nuevo', 1),
(486, 'PANASONIC', 'INVERTER', 4630042, 'CKL97JJJ9VU', '220', 'DE VENTANA', '5', '2021-11-15', 'PANASONIC.png', 'producto completamente nuevo', 1),
(487, 'YORK', 'CONVENCIONAL', 748567, 'MTO24FOH9LE', '220', 'PISO TECHO', '3', '2021-03-22', 'YORK.png', 'pueden enfriar demasiado a temperaturas anormales', 1),
(488, 'CARRIER', 'CONVENCIONAL', 770141, 'GZG61OAO0LI', '220', 'PISO TECHO', '3', '2023-04-21', 'CARRIER.png', 'pueden enfriar demasiado a temperaturas anormales', 1),
(489, 'SURREY', 'CONVENCIONAL', 829828, 'UKT34LJN5JY', '220', 'SPLIT', '4', '2023-11-25', 'SURREY.png', 'el rendimiento esta reducido en un 9%', 1),
(490, 'LG', 'INVERTER', 1387584, 'IXO63FPP6QT', '220', 'SPLIT', '4', '2022-08-20', 'LG.png', 'de segunda, pero en optimas condiciones', 1),
(491, 'SAMSUNG', 'INVERTER', 4217102, 'UPH20JTA8TW', '110', 'MINISPLIT', '5', '2021-12-30', 'SAMSUNG.png', 'producto completamente nuevo', 1),
(492, 'TOSHIBA', 'INVERTER', 2513665, 'RRD74DVG2JY', '110', 'MINISPLIT', '5', '2022-05-03', 'TOSHIBA.png', 'producto completamente nuevo', 1),
(493, 'SANYO', 'CONVENCIONAL', 697315, 'LHE44UTF7MF', '110', 'INDUSTRIAL', '3', '2021-07-03', 'SANYO.png', 'el equipo tiene la carcasa un poco desgastada', 1),
(494, 'BGH', 'CONVENCIONAL', 636850, 'ESK15PZS5UN', '110', 'INDUSTRIAL', '3', '2021-03-01', 'BGH.png', 'el equipo tiene la carcasa un poco desgastada', 1),
(495, 'HITACHI', 'CONVENCIONAL', 1054390, 'VRV74QCX3FR', '110', 'CENTRAL', '4', '2020-05-12', 'HITACHI.png', 'de segunda, pero en optimas condiciones', 1),
(496, 'PANASONIC', 'INVERTER', 896086, 'KMQ40WKU6FD', '110', 'CENTRAL', '4', '2022-08-16', 'PANASONIC.png', 'el rendimiento esta reducido en un 11%', 1),
(497, 'YORK', 'INVERTER', 3462940, 'ACM69LAO1MA', '110', 'CASETTE', '5', '2021-08-20', 'YORK.png', 'producto completamente nuevo', 1),
(498, 'CARRIER', 'INVERTER', 2599838, 'XVU16WUN4TS', '110', 'CASETTE', '5', '2021-02-13', 'CARRIER.png', 'producto completamente nuevo', 1),
(499, 'SURREY', 'CONVENCIONAL', 779163, 'WTQ74PCW3VP', '110', 'DE VENTANA', '3', '2023-03-27', 'SURREY.png', 'la generacion de calor puede provocar ruidos en el motor', 1),
(500, 'LG', 'CONVENCIONAL', 742917, 'CST75IUW5YL', '110', 'DE VENTANA', '3', '2020-05-02', 'LG.png', 'la generacion de calor puede provocar ruidos en el motor', 1),
(501, 'SAMSUNG', 'CONVENCIONAL', 900609, 'CHG69EDH7JL', '220', 'PISO TECHO', '4', '2022-11-11', 'SAMSUNG.png', 'puede emitir mucho calor con la exposicion al sol', 1),
(502, 'TOSHIBA', 'INVERTER', 889232, 'DFQ86OGD1JP', '220', 'PISO TECHO', '4', '2022-12-18', 'TOSHIBA.png', 'de segunda, pero en optimas condiciones', 1),
(503, 'SANYO', 'INVERTER', 4161058, 'IVY97LVH2QV', '220', 'SPLIT', '5', '2020-08-04', 'SANYO.png', 'producto completamente nuevo', 1),
(504, 'BGH', 'INVERTER', 3943658, 'WHG36WNC0SS', '220', 'SPLIT', '5', '2020-05-18', 'BGH.png', 'producto completamente nuevo', 1),
(505, 'HITACHI', 'CONVENCIONAL', 762084, 'IOP07LJN8FC', '220', 'MINISPLIT', '3', '2020-10-26', 'HITACHI.png', 'la unidad exterior se recalienta a la exposicion constante al sol', 1),
(506, 'PANASONIC', 'CONVENCIONAL', 751173, 'ISB26JKL6NF', '220', 'MINISPLIT', '3', '2022-11-02', 'PANASONIC.png', 'la unidad exterior se recalienta a la exposicion constante al sol', 1),
(507, 'YORK', 'CONVENCIONAL', 838342, 'INM25SOX4PS', '220', 'INDUSTRIAL', '4', '2022-06-09', 'YORK.png', 'el rendimiento esta reducido en un 5%', 1),
(508, 'CARRIER', 'INVERTER', 965338, 'YJQ53NPE8SX', '220', 'INDUSTRIAL', '4', '2021-12-12', 'CARRIER.png', 'de segunda, pero en optimas condiciones', 1),
(509, 'SURREY', 'INVERTER', 5092227, 'AHD78MRV3UF', '220', 'CENTRAL', '5', '2023-09-19', 'SURREY.png', 'producto completamente nuevo', 1),
(510, 'LG', 'INVERTER', 2949588, 'JGU66YSN1PJ', '220', 'CENTRAL', '5', '2021-04-02', 'LG.png', 'producto completamente nuevo', 1),
(511, 'SAMSUNG', 'CONVENCIONAL', 789321, 'SHC52BMF8OQ', '110', 'CASETTE', '3', '2023-01-24', 'SAMSUNG.png', 'el rendimiento de enfriamiento a largo plazo esta reducido', 1),
(512, 'TOSHIBA', 'CONVENCIONAL', 704969, 'BGX66MIZ2YG', '110', 'CASETTE', '3', '2023-01-15', 'TOSHIBA.png', 'el rendimiento de enfriamiento a largo plazo esta reducido', 1),
(513, 'SANYO', 'CONVENCIONAL', 1378338, 'GSM51JSD4NI', '110', 'DE VENTANA', '4', '2022-04-27', 'SANYO.png', 'de segunda, pero en optimas condiciones', 1),
(514, 'BGH', 'INVERTER', 1164990, 'YUC58BYN4NR', '110', 'DE VENTANA', '4', '2021-06-26', 'BGH.png', 'el rendimiento esta reducido en un 7%', 1),
(515, 'HITACHI', 'INVERTER', 2760159, 'DEC54TXG6PG', '110', 'PISO TECHO', '5', '2020-05-07', 'HITACHI.png', 'producto completamente nuevo', 1),
(516, 'PANASONIC', 'INVERTER', 4946021, 'FYM27VLL8FH', '110', 'PISO TECHO', '5', '2022-03-20', 'PANASONIC.png', 'producto completamente nuevo', 1),
(517, 'YORK', 'CONVENCIONAL', 693754, 'OEE09EJS5RY', '110', 'SPLIT', '3', '2022-06-26', 'YORK.png', 'el ventilador suele ralentizarse cuando se recalienta el motor', 1),
(518, 'CARRIER', 'CONVENCIONAL', 754242, 'JYO34IQG4YF', '110', 'SPLIT', '3', '2022-02-27', 'CARRIER.png', 'el equipo tiene reducida la capacidad de enfriamiento', 1),
(519, 'SURREY', 'CONVENCIONAL', 1329819, 'HHX22UUI3LU', '110', 'MINISPLIT', '4', '2023-10-15', 'SURREY.png', 'de segunda, pero en optimas condiciones', 1),
(520, 'LG', 'INVERTER', 880937, 'HWN16LNA4BR', '110', 'MINISPLIT', '4', '2022-02-28', 'LG.png', 'el rendimiento esta reducido en un 6%', 1),
(521, 'SAMSUNG', 'INVERTER', 3983220, 'PVR29VEJ4VK', '220', 'INDUSTRIAL', '5', '2021-06-04', 'SAMSUNG.png', 'producto completamente nuevo', 1),
(522, 'TOSHIBA', 'INVERTER', 2830913, 'EWU71HON7BE', '220', 'INDUSTRIAL', '5', '2021-03-26', 'TOSHIBA.png', 'producto completamente nuevo', 1),
(523, 'SANYO', 'CONVENCIONAL', 758952, 'VIF23CED0KM', '220', 'CENTRAL', '3', '2020-12-26', 'SANYO.png', 'el motor exterior puede reducir su potencia con las altas temperaturas', 1),
(524, 'BGH', 'CONVENCIONAL', 754364, 'KIO38BVW1SL', '220', 'CENTRAL', '3', '2023-02-06', 'BGH.png', 'el suministro por los conductos puede verse mermado por el calor', 1),
(525, 'HITACHI', 'CONVENCIONAL', 1186349, 'KDX81AIW7RV', '220', 'CASETTE', '4', '2021-11-13', 'HITACHI.png', 'el rendimiento esta reducido en un 8%', 1),
(526, 'PANASONIC', 'INVERTER', 1316100, 'EEN36ERE2FY', '220', 'CASETTE', '4', '2022-01-13', 'PANASONIC.png', 'el rendimiento esta reducido en un 8%', 1),
(527, 'YORK', 'INVERTER', 2430743, 'RNF82IDK7DQ', '220', 'DE VENTANA', '5', '2023-10-06', 'YORK.png', 'producto completamente nuevo', 1),
(528, 'CARRIER', 'INVERTER', 2527573, 'HLW55LFW9OZ', '220', 'DE VENTANA', '5', '2020-10-31', 'CARRIER.png', 'producto completamente nuevo', 1),
(529, 'SURREY', 'CONVENCIONAL', 670374, 'QNW45PNX1EP', '220', 'PISO TECHO', '3', '2020-08-06', 'SURREY.png', 'pueden enfriar demasiado a temperaturas anormales', 1),
(530, 'LG', 'CONVENCIONAL', 703145, 'VTP71JQW5RR', '220', 'PISO TECHO', '3', '2020-11-25', 'LG.png', 'puede gotear cuando tiene más de 7 horas de actividad', 1),
(531, 'SAMSUNG', 'CONVENCIONAL', 1038180, 'IDM91AKJ6CR', '110', 'SPLIT', '4', '2023-01-08', 'SAMSUNG.png', 'de segunda, pero en optimas condiciones', 1),
(532, 'TOSHIBA', 'INVERTER', 1324673, 'TMG91LMQ3GQ', '110', 'SPLIT', '4', '2021-07-25', 'TOSHIBA.png', 'el rendimiento esta reducido en un 9%', 1),
(533, 'SANYO', 'INVERTER', 3493455, 'JSZ27MKQ3OG', '110', 'MINISPLIT', '5', '2021-04-15', 'SANYO.png', 'producto completamente nuevo', 1),
(534, 'BGH', 'INVERTER', 4724052, 'DPK92ZRX5PG', '110', 'MINISPLIT', '5', '2023-06-21', 'BGH.png', 'producto completamente nuevo', 1),
(535, 'HITACHI', 'CONVENCIONAL', 669196, 'VOF24KAP2KM', '110', 'INDUSTRIAL', '3', '2022-01-31', 'HITACHI.png', 'el equipo emite ruidos después de 10 horas de encendido', 1),
(536, 'PANASONIC', 'CONVENCIONAL', 774032, 'JHT27NRC3ID', '110', 'INDUSTRIAL', '3', '2022-08-15', 'PANASONIC.png', 'el equipo tiene la carcasa un poco desgastada', 1),
(537, 'YORK', 'CONVENCIONAL', 1447125, 'LNR83VPZ1EY', '110', 'CENTRAL', '4', '2021-04-28', 'YORK.png', 'de segunda, pero en optimas condiciones', 1),
(538, 'CARRIER', 'INVERTER', 1444360, 'OEN26WYS1KB', '110', 'CENTRAL', '4', '2022-06-14', 'CARRIER.png', 'de segunda, pero en optimas condiciones', 1),
(539, 'SURREY', 'INVERTER', 2552521, 'HEI56NLQ6SA', '110', 'CASETTE', '5', '2020-12-15', 'SURREY.png', 'producto completamente nuevo', 1),
(540, 'LG', 'INVERTER', 4013165, 'JCT58QOX1LR', '110', 'CASETTE', '5', '2020-12-23', 'LG.png', 'producto completamente nuevo', 1),
(541, 'SAMSUNG', 'CONVENCIONAL', 458507, 'LBB10BQU2DN', '220', 'DE VENTANA', '3', '2020-02-09', 'SAMSUNG.png', 'la generacion de calor esta reducida en un 14%', 1),
(542, 'TOSHIBA', 'CONVENCIONAL', 698049, 'UEE35DNF4NR', '220', 'DE VENTANA', '3', '2020-06-21', 'TOSHIBA.png', 'la generacion de calor puede provocar ruidos en el motor', 1),
(543, 'SANYO', 'CONVENCIONAL', 1061941, 'BHE41AXH2KR', '220', 'PISO TECHO', '4', '2020-05-10', 'SANYO.png', 'puede emitir mucho calor con la exposicion al sol', 1),
(544, 'BGH', 'INVERTER', 1374044, 'QAA44OKG1AC', '220', 'PISO TECHO', '4', '2023-01-16', 'BGH.png', 'puede emitir mucho calor con la exposicion al sol', 1),
(545, 'HITACHI', 'INVERTER', 3797242, 'ZTK27YXJ5BW', '220', 'SPLIT', '5', '2020-04-16', 'HITACHI.png', 'producto completamente nuevo', 1),
(546, 'PANASONIC', 'INVERTER', 4620405, 'YWD88XPQ5IP', '220', 'SPLIT', '5', '2021-10-24', 'PANASONIC.png', 'producto completamente nuevo', 1),
(547, 'YORK', 'CONVENCIONAL', 400000, 'MGB88HLM1XN', '220', 'MINISPLIT', '3', '2022-11-13', 'YORK.png', 'la unidad exterior se recalienta a la exposicion constante al sol', 1),
(548, 'CARRIER', 'CONVENCIONAL', 753468, 'CDI09YWG2DW', '220', 'MINISPLIT', '3', '2020-11-20', 'CARRIER.png', 'la unidad exterior se recalienta a la exposicion constante al sol', 1),
(549, 'SURREY', 'CONVENCIONAL', 878289, 'YUF32ITB0YF', '220', 'INDUSTRIAL', '4', '2022-12-17', 'SURREY.png', 'el rendimiento esta reducido en un 5%', 1),
(550, 'LG', 'INVERTER', 1178503, 'OIX11TGN2AF', '220', 'INDUSTRIAL', '4', '2021-01-16', 'LG.png', 'de segunda, pero en optimas condiciones', 1),
(551, 'SAMSUNG', 'INVERTER', 5044501, 'CWO53BUQ5RB', '110', 'CENTRAL', '5', '2023-03-17', 'SAMSUNG.png', 'producto completamente nuevo', 1),
(552, 'TOSHIBA', 'INVERTER', 2585607, 'OAT86SWG3KJ', '110', 'CENTRAL', '5', '2020-09-27', 'TOSHIBA.png', 'producto completamente nuevo', 1),
(553, 'SANYO', 'CONVENCIONAL', 727940, 'TTH55MCG0WV', '110', 'CASETTE', '3', '2022-03-12', 'SANYO.png', 'el rendimiento de enfriamiento a largo plazo esta reducido', 1),
(554, 'BGH', 'CONVENCIONAL', 599814, 'CMX22MQI8TU', '110', 'CASETTE', '3', '2020-08-26', 'BGH.png', 'pueden formarse tempanos de hielo con facilidad', 1),
(555, 'HITACHI', 'CONVENCIONAL', 1098700, 'SBV74GOS6YH', '110', 'DE VENTANA', '4', '2023-02-24', 'HITACHI.png', 'de segunda, pero en optimas condiciones', 1),
(556, 'PANASONIC', 'INVERTER', 958890, 'QGK44HFG2FK', '110', 'DE VENTANA', '4', '2023-02-02', 'PANASONIC.png', 'el rendimiento esta reducido en un 7%', 1),
(557, 'YORK', 'INVERTER', 2787181, 'UWZ77GSR0BM', '110', 'PISO TECHO', '5', '2022-02-18', 'YORK.png', 'producto completamente nuevo', 1),
(558, 'CARRIER', 'INVERTER', 4502822, 'XNA69JDO3FJ', '110', 'PISO TECHO', '5', '2022-07-07', 'CARRIER.png', 'producto completamente nuevo', 1),
(559, 'SURREY', 'CONVENCIONAL', 501805, 'REZ14CXE9IJ', '110', 'SPLIT', '3', '2020-09-30', 'SURREY.png', 'el ventilador suele ralentizarse cuando se recalienta el motor', 1),
(560, 'LG', 'CONVENCIONAL', 748857, 'SDE66VIB2UF', '110', 'SPLIT', '3', '2023-06-06', 'LG.png', 'el ventilador suele ralentizarse cuando se recalienta el motor', 1),
(561, 'SAMSUNG', 'CONVENCIONAL', 897706, 'VTH45YRS8JJ', '220', 'MINISPLIT', '4', '2022-08-31', 'SAMSUNG.png', 'el rendimiento esta reducido en un 6%', 1),
(562, 'TOSHIBA', 'INVERTER', 832566, 'YIH44PKA3YV', '220', 'MINISPLIT', '4', '2022-10-02', 'TOSHIBA.png', 'el rendimiento esta reducido en un 6%', 1),
(563, 'SANYO', 'INVERTER', 4148790, 'JQV79CXQ3KQ', '220', 'INDUSTRIAL', '5', '2023-06-09', 'SANYO.png', 'producto completamente nuevo', 1),
(564, 'BGH', 'INVERTER', 2074639, 'XNI65QSV0BL', '220', 'INDUSTRIAL', '5', '2020-10-28', 'BGH.png', 'producto completamente nuevo', 1),
(565, 'HITACHI', 'CONVENCIONAL', 729069, 'OXP26IMX7NL', '220', 'CENTRAL', '3', '2023-04-08', 'HITACHI.png', 'el motor exterior puede reducir su potencia con las altas temperaturas', 1),
(566, 'PANASONIC', 'CONVENCIONAL', 753610, 'TJG61ROC3WE', '220', 'CENTRAL', '3', '2021-02-03', 'PANASONIC.png', 'el suministro por los conductos puede verse mermado por el calor', 1),
(567, 'YORK', 'CONVENCIONAL', 801405, 'VZV27STO6LD', '220', 'CASETTE', '4', '2023-11-06', 'YORK.png', 'el rendimiento esta reducido en un 8%', 1),
(568, 'CARRIER', 'INVERTER', 1254868, 'VRS32RID2LJ', '220', 'CASETTE', '4', '2021-08-01', 'CARRIER.png', 'de segunda, pero en optimas condiciones', 1),
(569, 'SURREY', 'INVERTER', 4425083, 'WWE36ZKU3GR', '220', 'DE VENTANA', '5', '2022-03-05', 'SURREY.png', 'producto completamente nuevo', 1),
(570, 'LG', 'INVERTER', 4915152, 'FPU86VBG1GI', '220', 'DE VENTANA', '5', '2020-04-24', 'LG.png', 'producto completamente nuevo', 1),
(571, 'SAMSUNG', 'CONVENCIONAL', 785887, 'SQD77CMC1ZQ', '110', 'PISO TECHO', '3', '2020-02-16', 'SAMSUNG.png', 'puede gotear cuando tiene más de 7 horas de actividad', 1),
(572, 'TOSHIBA', 'CONVENCIONAL', 741266, 'TDC67KMT1HN', '110', 'PISO TECHO', '3', '2020-05-06', 'TOSHIBA.png', 'puede gotear cuando tiene más de 7 horas de actividad', 1),
(573, 'SANYO', 'CONVENCIONAL', 1465283, 'LVL60HYT5PN', '110', 'SPLIT', '4', '2023-05-13', 'SANYO.png', 'de segunda, pero en optimas condiciones', 1),
(574, 'BGH', 'INVERTER', 828841, 'RNP14WQF5EL', '110', 'SPLIT', '4', '2022-08-03', 'BGH.png', 'el rendimiento esta reducido en un 9%', 1),
(575, 'HITACHI', 'INVERTER', 4222185, 'SDP82HDT6HD', '110', 'MINISPLIT', '5', '2021-07-26', 'HITACHI.png', 'producto completamente nuevo', 1),
(576, 'PANASONIC', 'INVERTER', 2130615, 'YAG65JIR2HX', '110', 'MINISPLIT', '5', '2021-10-10', 'PANASONIC.png', 'producto completamente nuevo', 1),
(577, 'YORK', 'CONVENCIONAL', 748666, 'KNP35CIN6UY', '110', 'INDUSTRIAL', '3', '2020-12-03', 'YORK.png', 'el equipo tiene la carcasa un poco desgastada', 1),
(578, 'CARRIER', 'CONVENCIONAL', 716604, 'JGE38KXD1DB', '110', 'INDUSTRIAL', '3', '2022-04-19', 'CARRIER.png', 'el equipo emite ruidos después de 10 horas de encendido', 1),
(579, 'SURREY', 'CONVENCIONAL', 819956, 'SNO47TMM2FX', '110', 'CENTRAL', '4', '2021-05-03', 'SURREY.png', 'de segunda, pero en optimas condiciones', 1),
(580, 'LG', 'INVERTER', 1348968, 'SME86RHE7UM', '110', 'CENTRAL', '4', '2023-06-04', 'LG.png', 'de segunda, pero en optimas condiciones', 1),
(581, 'SAMSUNG', 'INVERTER', 3790214, 'QJC34MSB5MA', '220', 'CASETTE', '5', '2023-07-08', 'SAMSUNG.png', 'producto completamente nuevo', 1),
(582, 'TOSHIBA', 'INVERTER', 2265892, 'KRY24IFI8GP', '220', 'CASETTE', '5', '2023-04-02', 'TOSHIBA.png', 'producto completamente nuevo', 1),
(583, 'SANYO', 'CONVENCIONAL', 742455, 'ILM83TSC1UX', '220', 'DE VENTANA', '3', '2022-06-15', 'SANYO.png', 'la generacion de calor esta reducida en un 14%', 1),
(584, 'BGH', 'CONVENCIONAL', 739811, 'IMV78PTF4RV', '220', 'DE VENTANA', '3', '2023-06-30', 'BGH.png', 'la generacion de calor esta reducida en un 14%', 1),
(585, 'HITACHI', 'CONVENCIONAL', 1329114, 'ZKL08ODB5WE', '220', 'PISO TECHO', '4', '2021-04-29', 'HITACHI.png', 'puede emitir mucho calor con la exposicion al sol', 1),
(586, 'PANASONIC', 'INVERTER', 1470307, 'XSD20HFE5BO', '220', 'PISO TECHO', '4', '2020-12-08', 'PANASONIC.png', 'de segunda, pero en optimas condiciones', 1),
(587, 'YORK', 'INVERTER', 4870105, 'ZBB68GII8XN', '220', 'SPLIT', '5', '2023-10-14', 'YORK.png', 'producto completamente nuevo', 1),
(588, 'CARRIER', 'INVERTER', 3500211, 'QKA69YLX0YI', '220', 'SPLIT', '5', '2022-07-27', 'CARRIER.png', 'producto completamente nuevo', 1),
(589, 'SURREY', 'CONVENCIONAL', 751271, 'DWM75GMV8GJ', '220', 'MINISPLIT', '3', '2023-07-02', 'SURREY.png', 'la unidad interior no presenta fallos', 1),
(590, 'LG', 'CONVENCIONAL', 464138, 'EBS91YXK1RH', '220', 'MINISPLIT', '3', '2022-10-03', 'LG.png', 'la unidad interior no presenta fallos', 1),
(591, 'SAMSUNG', 'CONVENCIONAL', 886963, 'PGI43XFI5SB', '110', 'INDUSTRIAL', '4', '2023-03-07', 'SAMSUNG.png', 'el rendimiento esta reducido en un 5%', 1),
(592, 'TOSHIBA', 'INVERTER', 816980, 'KVR26KNZ6ZR', '110', 'INDUSTRIAL', '4', '2021-01-18', 'TOSHIBA.png', 'de segunda, pero en optimas condiciones', 1),
(593, 'SANYO', 'INVERTER', 4272127, 'WQN23JJN9TR', '110', 'CENTRAL', '5', '2022-07-26', 'SANYO.png', 'producto completamente nuevo', 1),
(594, 'BGH', 'INVERTER', 3559184, 'VTU94TRB2SY', '110', 'CENTRAL', '5', '2020-06-28', 'BGH.png', 'producto completamente nuevo', 1),
(595, 'HITACHI', 'CONVENCIONAL', 753376, 'EOL76DKI7YV', '110', 'CASETTE', '3', '2022-02-23', 'HITACHI.png', 'el rendimiento de enfriamiento a largo plazo esta reducido', 1),
(596, 'PANASONIC', 'CONVENCIONAL', 637597, 'TNT17ZRC0LR', '110', 'CASETTE', '3', '2023-10-24', 'PANASONIC.png', 'el rendimiento de enfriamiento a largo plazo esta reducido', 1),
(597, 'YORK', 'CONVENCIONAL', 987194, 'THK38QIH8FY', '110', 'DE VENTANA', '4', '2020-12-04', 'YORK.png', 'el rendimiento esta reducido en un 7%', 1),
(598, 'CARRIER', 'INVERTER', 890118, 'LHE64SRP1LQ', '110', 'DE VENTANA', '4', '2023-02-07', 'CARRIER.png', 'de segunda, pero en optimas condiciones', 1),
(599, 'SURREY', 'INVERTER', 3704580, 'OXT31MMM1WG', '110', 'PISO TECHO', '5', '2020-12-31', 'SURREY.png', 'producto completamente nuevo', 1),
(600, 'LG', 'INVERTER', 2997274, 'FVR67HVL9AN', '110', 'PISO TECHO', '5', '2023-03-25', 'LG.png', 'producto completamente nuevo', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `request_manager`
--

CREATE TABLE `request_manager` (
  `id` int(10) NOT NULL,
  `review_request_id` int(10) DEFAULT NULL,
  `service_request_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `review_requests`
--

CREATE TABLE `review_requests` (
  `id` int(10) NOT NULL,
  `product_brand` varchar(250) NOT NULL,
  `product_cooling_capacity` int(10) DEFAULT NULL,
  `product_type` varchar(250) DEFAULT NULL,
  `product_tech` varchar(250) DEFAULT NULL,
  `product_voltage` int(10) NOT NULL,
  `product_purchase_date` varchar(250) NOT NULL,
  `product_desired_price` double NOT NULL,
  `product_aditional_info` text DEFAULT NULL,
  `customer_name` varchar(250) NOT NULL,
  `customer_surname` varchar(250) NOT NULL,
  `customer_address` text NOT NULL,
  `customer_phone` varchar(250) NOT NULL,
  `request_date` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `services`
--

CREATE TABLE `services` (
  `id` int(10) NOT NULL,
  `request_id` int(10) DEFAULT NULL,
  `booking_date` varchar(250) NOT NULL,
  `paid` tinyint(1) NOT NULL DEFAULT 0,
  `technician_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `service_requests`
--

CREATE TABLE `service_requests` (
  `id` int(11) NOT NULL,
  `reference_code` varchar(300) NOT NULL,
  `service_type` varchar(250) NOT NULL,
  `request_date` varchar(250) NOT NULL,
  `customer_name` varchar(250) DEFAULT NULL,
  `customer_surname` varchar(250) DEFAULT NULL,
  `customer_phone` varchar(50) DEFAULT NULL,
  `customer_address` text DEFAULT NULL,
  `product_brand` varchar(250) NOT NULL,
  `product_tech` varchar(250) NOT NULL,
  `product_type` varchar(250) NOT NULL,
  `product_voltage` int(10) NOT NULL,
  `product_aditional_info` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `service_requests`
--

INSERT INTO `service_requests` (`id`, `reference_code`, `service_type`, `request_date`, `customer_name`, `customer_surname`, `customer_phone`, `customer_address`, `product_brand`, `product_tech`, `product_type`, `product_voltage`, `product_aditional_info`) VALUES
(9, '20231210T003529251ZU0C0', 'MANTENIMIENTO-CORRECTIVO', '2023-12-09', 'ELIAS', 'DIAZ', '3214545', 'CALLE 12', 'SAMSUNG', 'INVERTER', 'SPLIT', 220, 'tiene una pequeña falla toda rara');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shipping`
--

CREATE TABLE `shipping` (
  `id` int(10) NOT NULL,
  `address` text NOT NULL,
  `phone` varchar(50) NOT NULL,
  `bill_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `shipping`
--

INSERT INTO `shipping` (`id`, `address`, `phone`, `bill_id`) VALUES
(10, 'calle 9', '3213119045', 26);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `technician`
--

CREATE TABLE `technician` (
  `id` int(11) NOT NULL,
  `name` int(11) NOT NULL,
  `surname` int(11) NOT NULL,
  `phone` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `address` text DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) DEFAULT NULL,
  `identification` int(15) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `phone`, `email`, `address`, `password`, `role`, `identification`, `birthdate`, `gender`) VALUES
(30, 'yirien', 'urango', NULL, 'yirien@test.com', NULL, '$2b$10$DNsfYepfcmCv57XuDiPXAev3PbKoGXgb7Uk3YS/vgWN0ZmjBJj87m', 'CUSTOMER', NULL, NULL, NULL),
(31, 'JUAN', 'ARTEAGA', NULL, 'juan@test.com', NULL, '$2b$10$9vmNCRdoTfajX5us.oQcteBkCnzy/vLojsXjq.iXfeZNUVaiEUyAi', 'CUSTOMER', NULL, NULL, NULL),
(32, 'JUAN', 'ARTEAGA', NULL, 'juan2@test.com', NULL, '$2b$10$2/NVg/U9ZpS.11xlJumNeuXi/nFm9JYS7po9f/TrgoXgKb2B1y5i.', 'CUSTOMER', NULL, NULL, NULL),
(33, 'lucero', 'conde', NULL, 'conde@test.com', NULL, '$2b$10$9GhFnZL4i8Tz1aJVi5YKl.2w0nT50xiWlH3rEOoVwT2oQHwGjaB6.', 'CUSTOMER', NULL, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_id` (`cart_id`);

--
-- Indices de la tabla `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `cart_elements`
--
ALTER TABLE `cart_elements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `cart_id` (`cart_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `request_manager`
--
ALTER TABLE `request_manager`
  ADD PRIMARY KEY (`id`),
  ADD KEY `review_request_id` (`review_request_id`),
  ADD KEY `service_request_id` (`service_request_id`);

--
-- Indices de la tabla `review_requests`
--
ALTER TABLE `review_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `request_id` (`request_id`),
  ADD KEY `technician_id` (`technician_id`);

--
-- Indices de la tabla `service_requests`
--
ALTER TABLE `service_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `shipping`
--
ALTER TABLE `shipping`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bill_id` (`bill_id`);

--
-- Indices de la tabla `technician`
--
ALTER TABLE `technician`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cart_elements`
--
ALTER TABLE `cart_elements`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `request_manager`
--
ALTER TABLE `request_manager`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `review_requests`
--
ALTER TABLE `review_requests`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `services`
--
ALTER TABLE `services`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `service_requests`
--
ALTER TABLE `service_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `shipping`
--
ALTER TABLE `shipping`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `technician`
--
ALTER TABLE `technician`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cart_elements`
--
ALTER TABLE `cart_elements`
  ADD CONSTRAINT `cart_elements_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_elements_ibfk_3` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `request_manager`
--
ALTER TABLE `request_manager`
  ADD CONSTRAINT `request_manager_ibfk_1` FOREIGN KEY (`service_request_id`) REFERENCES `service_requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `request_manager_ibfk_2` FOREIGN KEY (`review_request_id`) REFERENCES `review_requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_ibfk_1` FOREIGN KEY (`technician_id`) REFERENCES `technician` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `services_ibfk_2` FOREIGN KEY (`request_id`) REFERENCES `request_manager` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `shipping`
--
ALTER TABLE `shipping`
  ADD CONSTRAINT `shipping_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `bills` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
