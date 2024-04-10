-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-04-2024 a las 18:34:18
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `nivel45`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anticipo`
--

CREATE TABLE `anticipo` (
  `idAnticipo` int(11) NOT NULL,
  `idObra` int(11) NOT NULL,
  `valor` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `anticipo`
--

INSERT INTO `anticipo` (`idAnticipo`, `idObra`, `valor`) VALUES
(1, 1, 500),
(2, 2, 18.7),
(3, 5, 600),
(4, 7, 110),
(5, 9, 800),
(6, 10, 1500),
(7, 9, 500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallefactura`
--

CREATE TABLE `detallefactura` (
  `idDetalle` int(11) NOT NULL,
  `idFactura` varchar(20) NOT NULL,
  `numero` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `precioTotal` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detallefactura`
--

INSERT INTO `detallefactura` (`idDetalle`, `idFactura`, `numero`, `cantidad`, `descripcion`, `precioTotal`) VALUES
(1, '000-000-000000001', 1, 1, 'Disco Flap Elite 4 1/2 x 7/8\"', 1),
(2, '000-000-000000001', 2, 1, 'Tiza Industrial por unidad', 0.25),
(3, '000-000-000000002', 1, 1, 'Arreglo de elevacion de puerta de vidrio templado y chapa', 20),
(4, '000-000-000000003', 1, 1, 'Pasamanos en gradas internas del edificio', 1200),
(5, '000-000-000000004', 1, 1, 'Pago por arreglos en farmacia popular', 50),
(6, '000-000-000000005', 1, 50, 'Tornillos de acero inoxidable gruesos', 5),
(7, '000-000-000000006', 1, 1, 'Pago cuenta por cobrar Juan Carlos Leon', 5),
(8, '000-000-000000007', 1, 1, 'Disco de lija (Polifan) de 4 1/2 x 7/8\"', 4.76),
(9, '000-000-000000008', 1, 1, 'Disco de corte para acero Inox Pferd 4 1/2 x 0.040 x 7/8\"', 1.56),
(10, '000-000-000000009', 1, 1, 'Arreglos varios', 11),
(11, '000-000-000000010', 1, 1, 'Cambio de vidrio laminado para cabina de baño', 110),
(13, '000-000-000000011', 1, 1, 'Puerta de garaje con planchas de tol, ventanas de aluminio y protecciones', 1100),
(14, '000-000-000000012', 1, 1, 'Arreglos varios', 11),
(15, '000-000-000000013', 1, 1, 'Aluminio cortado', 5),
(16, '000-000-000000014', 1, 1, 'Cambio de chapa vieja por una viro', 35);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `deudas`
--

CREATE TABLE `deudas` (
  `idDeuda` int(11) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `propietario` varchar(100) NOT NULL,
  `valor` float NOT NULL,
  `fechaInicio` date NOT NULL,
  `prestamo` tinyint(1) NOT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'Deuda'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `deudas`
--

INSERT INTO `deudas` (`idDeuda`, `descripcion`, `propietario`, `valor`, `fechaInicio`, `prestamo`, `estado`) VALUES
(1, 'Sueldo Atrasado Jesus', 'Jesus Zambrano', 460, '2024-03-14', 0, 'Pagado'),
(2, 'Prestamo para SRI', 'Kevin Zambrano', 22.3, '2024-03-14', 1, 'Deuda'),
(3, 'Prestamo para materiales', 'Kevin Zambrano', 130, '2024-03-16', 1, 'Pagado'),
(4, 'Suelo Atrasado', 'Kevin', 90, '2024-03-16', 0, 'Deuda'),
(5, 'Deuda con la vecina de la papeleria', 'Vecina Bety', 139.4, '2024-03-19', 1, 'Deuda'),
(6, 'Deuda con galo', 'Galo Espinoza', 240, '2024-03-01', 1, 'Pagado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `idEmpleado` int(11) NOT NULL,
  `cedula` varchar(13) NOT NULL,
  `fecha_entrada` date NOT NULL,
  `fecha_salida` date NOT NULL,
  `estado` varchar(20) NOT NULL,
  `sueldo` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`idEmpleado`, `cedula`, `fecha_entrada`, `fecha_salida`, `estado`, `sueldo`) VALUES
(1, '1206342873', '2024-01-01', '0000-00-00', 'Activo', 100),
(2, '0102134632', '2024-03-11', '0000-00-00', 'Activo', 120),
(3, '0105108930', '2024-03-11', '0000-00-00', 'Activo', 120);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `idFactura` varchar(20) NOT NULL,
  `cedula` varchar(13) NOT NULL,
  `fecha` date NOT NULL,
  `subtotal` float NOT NULL,
  `iva` float NOT NULL,
  `descuento` float DEFAULT NULL,
  `total` float NOT NULL,
  `estado` varchar(20) NOT NULL,
  `idObra` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`idFactura`, `cedula`, `fecha`, `subtotal`, `iva`, `descuento`, `total`, `estado`, `idObra`) VALUES
('000-000-000000001', '9999999999', '2024-03-08', 1.25, 0, 0, 1.25, 'Valida', 0),
('000-000-000000002', '9999999999', '2024-03-09', 20, 0, 0, 20, 'Valida', 0),
('000-000-000000003', '0102219789', '2024-03-09', 1200, 0, 0, 1200, 'Valida', 5),
('000-000-000000004', '9999999999', '2024-03-08', 50, 0, 0, 50, 'Valida', 0),
('000-000-000000005', '9999999999', '2024-03-11', 5, 0, 0, 5, 'Valida', 0),
('000-000-000000006', '9999999999', '2024-03-11', 5, 0, 0, 5, 'Valida', 0),
('000-000-000000007', '0102134632', '2024-03-12', 4.76, 0, 0, 4.76, 'Valida', 0),
('000-000-000000008', '9999999999', '2024-03-13', 1.56, 0, 0, 1.56, 'Valida', 0),
('000-000-000000009', '9999999999', '2024-03-14', 11, 0, 0, 11, 'Valida', 0),
('000-000-000000010', '0102658747001', '2024-03-14', 110, 0, 0, 110, 'Valida', 7),
('000-000-000000011', '0104477054', '2024-03-16', 1100, 0, 0, 1100, 'Valida', 1),
('000-000-000000012', '9999999999', '2024-03-14', 11, 0, 0, 11, 'Valida', 0),
('000-000-000000013', '9999999999', '2024-03-19', 5, 0, 0, 5, 'Valida', 0),
('000-000-000000014', '9999999999', '2024-03-21', 35, 0, 0, 35, 'Valida', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturacompra`
--

CREATE TABLE `facturacompra` (
  `idFacturaCompra` varchar(50) NOT NULL,
  `idProveedor` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `valor` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `facturacompra`
--

INSERT INTO `facturacompra` (`idFacturaCompra`, `idProveedor`, `fecha`, `valor`) VALUES
('001-004-000202204', 3, '2024-03-08', 7.83),
('001-004-000202205', 3, '2024-03-08', 4.1),
('001-100-000-144441', 4, '2024-03-11', 107.55),
('001-100-000003298', 5, '2024-03-06', 2.55),
('001-100-000003422', 5, '2024-03-09', 52.25),
('001-100-000044271', 2, '2024-03-06', 46.21),
('001-100-000044427', 2, '2024-03-08', 98.68),
('001-100-000044450', 2, '2024-03-08', 22.9),
('001-100-000044451', 2, '2024-03-08', 6.65),
('001-100-000044522', 2, '2024-03-11', 13.32),
('001-100-000044695', 2, '2024-03-14', 16.15),
('001-100-000044845', 2, '2024-03-18', 42.5),
('001-100-000044945', 2, '2024-03-19', 218.4),
('001-100-000044957', 2, '2024-03-19', 43.97),
('001-100-000045040', 2, '2024-03-20', 84.36),
('001-100-000045190', 2, '2024-03-22', 124.6),
('001-100-000045191', 2, '2024-03-22', 21.65),
('001-100-000045192', 2, '2024-03-22', 67.61),
('001-100-00144600', 4, '2024-03-13', 26.5),
('001-101-000060045', 7, '2024-03-14', 10),
('002-100-000036284', 6, '2024-03-12', 34.25),
('002-100-000036348', 6, '2024-03-13', 4.4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gastos`
--

CREATE TABLE `gastos` (
  `idGasto` int(11) NOT NULL,
  `valor` float NOT NULL,
  `idFacturaCompra` varchar(50) DEFAULT NULL,
  `idObra` int(11) DEFAULT NULL,
  `idEmpleado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gastos`
--

INSERT INTO `gastos` (`idGasto`, `valor`, `idFacturaCompra`, `idObra`, `idEmpleado`) VALUES
(1, 46.21, '001-100-000044271', 1, NULL),
(2, 98.68, '001-100-000044427', 1, NULL),
(3, 6, NULL, 2, 0),
(4, 6, NULL, 2, 0),
(5, 10, NULL, 2, 0),
(6, 7.83, '001-004-000202204', 3, NULL),
(7, 6.65, '001-100-000044451', 1, NULL),
(8, 22.9, '001-100-000044450', 0, NULL),
(9, 28.51, NULL, 4, 0),
(10, 16.15, NULL, 2, 0),
(11, 4.1, '001-004-000202205', 3, NULL),
(12, 60, NULL, 0, 0),
(13, 5, NULL, 0, 0),
(14, 160, NULL, 0, 0),
(15, 333.2, NULL, 0, 0),
(16, 13.32, '001-100-000044522', 1, NULL),
(17, 107.55, '001-100-000-144441', 1, NULL),
(18, 35.6, NULL, 1, 0),
(19, 300, NULL, 2, 0),
(20, 2.55, '001-100-000003298', 6, NULL),
(21, 12.5, NULL, 0, 2),
(22, 3, NULL, 0, 2),
(23, 7, NULL, 0, 2),
(24, 10, NULL, 0, 3),
(25, 52.25, '001-100-000003422', 1, NULL),
(26, 4.65, NULL, 0, 0),
(27, 60, NULL, 2, 0),
(28, 1, NULL, 2, 0),
(29, 1, NULL, 0, 2),
(30, 24, NULL, 1, 0),
(31, 24, NULL, 1, 0),
(32, 2, NULL, 0, 3),
(33, 27.9, NULL, 0, 2),
(34, 2.75, NULL, 0, 2),
(35, 26.5, '001-100-00144600', 1, NULL),
(36, 16.15, '001-100-000044695', 1, NULL),
(37, 10, '001-101-000060045', 1, NULL),
(38, 34.25, '002-100-000036284', 7, NULL),
(39, 4.4, '002-100-000036348', 7, NULL),
(40, 1, NULL, 0, 0),
(41, 60.3, NULL, 2, 0),
(42, 23.5, NULL, 1, 0),
(43, 22, NULL, 1, 0),
(44, 50, NULL, 1, 0),
(45, 70, NULL, NULL, NULL),
(46, 10, NULL, 0, 2),
(47, 3, NULL, 0, 2),
(48, 14, NULL, 0, 2),
(49, 20, NULL, 2, 0),
(50, 50, NULL, NULL, NULL),
(51, 50, NULL, NULL, NULL),
(52, 20, NULL, 0, 3),
(53, 13.88, NULL, 0, 2),
(54, 13.88, NULL, 2, 0),
(55, 33, NULL, 2, 0),
(56, 7, NULL, 8, 0),
(57, 42.5, '001-100-000044845', 1, NULL),
(58, 10, NULL, 0, 2),
(59, 10, NULL, 0, 1),
(60, 300.4, NULL, 2, 0),
(61, 15.3, NULL, 0, 2),
(62, 20, NULL, 0, 3),
(63, 218.4, '001-100-000044945', 9, NULL),
(64, 43.97, '001-100-000044957', 9, NULL),
(65, 507, NULL, 2, 0),
(67, 84.36, '001-100-000045040', 9, NULL),
(68, 20, NULL, 0, 2),
(69, 10, NULL, 2, 0),
(70, 10, NULL, 0, 1),
(71, 10, NULL, 0, 2),
(72, 67.61, '001-100-000045192', 10, NULL),
(73, 21.65, '001-100-000045191', 9, NULL),
(74, 124.6, '001-100-000045190', 9, NULL),
(75, 18, NULL, 2, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientosdeuda`
--

CREATE TABLE `movimientosdeuda` (
  `idMovimiento` int(11) NOT NULL,
  `fechaPago` date NOT NULL,
  `valor` float NOT NULL,
  `idDeuda` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `movimientosdeuda`
--

INSERT INTO `movimientosdeuda` (`idMovimiento`, `fechaPago`, `valor`, `idDeuda`) VALUES
(1, '2024-03-16', 50, 1),
(2, '2024-03-16', 70, 3),
(3, '2024-03-17', 60, 6),
(5, '2024-03-18', 150, 1),
(6, '2024-03-22', 10, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obras`
--

CREATE TABLE `obras` (
  `idObra` int(11) NOT NULL,
  `cedula` varchar(13) NOT NULL,
  `numero` int(11) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `total` float NOT NULL,
  `fechaInicio` date NOT NULL,
  `estado` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `obras`
--

INSERT INTO `obras` (`idObra`, `cedula`, `numero`, `descripcion`, `total`, `fechaInicio`, `estado`) VALUES
(1, '0104477054', 1, 'Ventanas de aluminio portecciones y puerta de garaje', 1100, '2024-03-06', 'Completado'),
(2, '0105108930', 1, 'Registro de gastos e ingresos del taller', 0, '2024-03-06', 'En Proceso'),
(3, '0105108930', 2, 'Compras de mercancia para nivel 45', 0, '2024-03-08', 'En Proceso'),
(4, '0100958289', 1, 'Colocacion de pie de amigos en techo armado', 100, '2024-03-07', 'En Proceso'),
(5, '0102219789', 1, 'Pasamanos de las gradas', 1200, '2024-01-11', 'Completado'),
(6, '0104477054', 2, 'Obra fachada de aluminio en modelo europeo de yunguilla', 38000, '2024-03-11', 'En Proceso'),
(7, '0102658747001', 1, 'Cambio de vidrio laminado de cabina de baño', 110, '2024-03-11', 'Completado'),
(8, '0105884134', 1, 'Obra de puerta de garaje', 112, '2024-03-18', 'En Proceso'),
(9, '1900078211', 1, 'Fabricar e instalar tres puertas de hierro, 2 corredizas y una peatonal segun diseño', 1580, '2024-03-18', 'En Proceso'),
(10, '0104477054', 3, 'Obra del Vergel', 3630, '2024-03-18', 'En Proceso');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `cedula` varchar(13) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`cedula`, `nombres`, `apellidos`, `telefono`, `correo`, `direccion`) VALUES
('0100958289', 'Luis Aurelio', 'Roldan Ziguencia', '0958851171', '', 'Convencion del 45 1-87'),
('0102134632', 'Martin Javier', 'Zambrano Carrion', '072838699', 'martinzambrano@hotmail.com', 'Mariscal lamar 21-80'),
('0102219789', 'Luis Patricio', 'Moscoso Vanegas', '0988110993', 'patriciomoscoso@hotmail.com', 'San José'),
('0102658747001', 'Maria Eugenia', 'Aguirre Ochoa', '0995167427', 'maruaguirreo1976@gmail.com', 'Miguel Cordero 6-140 y Av Solano'),
('0104477054', 'Carlos', 'Duran', '0992827480', '', 'Baños'),
('0105108922', 'Karen Viviana', 'Zambrano Valverde', '0985116173', 'kaviana72@hotmail.com', 'Mariscal lamar 21-80'),
('0105108930', 'Kevin Javier', 'Zambrano Valverde', '0963394920', 'kevinvz110@gmail.com', 'Mariscal Lamar 21-80'),
('0105632061', 'Jorge Ramiro', 'Cajamarca', '0991447525', 'psaharaisabel@hotmail.com', 'El batán y el oro'),
('0105884134', 'Hilda Victoria', 'Valverde Jimenez', '0996138316', 'vico20vj@gmail.com', 'Morse y la Floresta'),
('0190490866001', 'Import Novum ', '', '', '', 'Cristobal colon y 9 de octubre'),
('1206342873', 'Jesus Mateo', 'Zambrano Macias', '0978834806', '', 'Mariscal Lamar 21-110 y Luis Pauta'),
('1900078211', 'Arnoldo', 'Celi', '0988980120', '', 'Av Paseo de los cañaris'),
('9999999999', 'Consumidor ', 'Final', '-', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `precio` float NOT NULL,
  `existencias` int(11) NOT NULL,
  `idProveedor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `nombre`, `precio`, `existencias`, `idProveedor`) VALUES
(1, 'Disco de corte para acero Inox Pferd 4 1/2 x 0.040 x 7/8\"', 1.56, 2, 1),
(2, 'Disco de lija (Polifan) de 4 1/2 x 7/8\"', 4.76, 12, 1),
(3, 'Disco de desbaste Norton 4 1/2 x 1/4 x 7/8\"', 2.3, 1, 1),
(4, 'Disco de corte Pferd 4 1/2 x 1/8 x 7/8\"', 2, 1, 1),
(5, 'Disco de lija (Polifan) Northwest de alta calidad 4 1/2 x 7/8\"', 5.5, 1, 1),
(6, 'Filtro para pintura pinfre', 0.3, 3, 1),
(7, 'Esponja de pulir acero inoxidable gris (Suave)', 1.12, 2, 1),
(8, 'Esponja de pulir acero inoxidable roja (Media)', 1.12, 4, 1),
(9, 'Esponja de pulir acero inoxidable cafe (Fuerte)', 2.77, 2, 1),
(10, 'Disco de corte Dewalt 9 x 1/8 x 7/8\"', 4.2, 3, 1),
(11, 'Libra de suelda AGA C-13', 2.9, 2, 1),
(12, 'Disco Flap Elite 4 1/2 x 7/8\"', 1, 5, 3),
(13, 'Tiza Industrial por unidad', 0.25, 24, 3),
(14, 'Spry Abro Pn11 Negro Brillante', 2.56, 2, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `idProveedor` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `celular` varchar(10) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`idProveedor`, `nombre`, `telefono`, `celular`, `direccion`) VALUES
(1, 'No', '0', '0', 'no tiene'),
(2, 'Megacero', '072820119', '0999512440', 'Rafael Maria Arizaga 13-66'),
(3, 'Ferretería Vasquez Brito', '072837304', '', 'Mariscal Lamar 15-66 y Miguel Velez'),
(4, 'Servihierro', '072386629', '0990072583', 'Av. Ricardo Duran SN y luis Godin'),
(5, 'Disa', '072848001', '', 'Tomas de heres S/N y luis cordero'),
(6, 'Providrio', '', '', 'Guapondelig 13-99'),
(7, 'Ferreteria Latina', '072843045', '', 'Mariscal Lamar 16-33 y Miguel Velez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `idRegistro` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `saldo` float NOT NULL,
  `idSaldo` int(11) DEFAULT NULL,
  `idAnticipo` int(11) DEFAULT NULL,
  `idGasto` int(11) DEFAULT NULL,
  `idRol` int(11) DEFAULT NULL,
  `idDeuda` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`idRegistro`, `fecha`, `descripcion`, `saldo`, `idSaldo`, `idAnticipo`, `idGasto`, `idRol`, `idDeuda`) VALUES
(1, '2024-03-06', 'Primer Anticipo', 500, NULL, 1, NULL, NULL, NULL),
(2, '2024-03-06', 'Factura megacero Barra cuadrada 9mm y angulos 3/4 x 1/8', 453.79, NULL, NULL, 1, NULL, NULL),
(3, '2024-03-08', 'Factura Megacero tubo cuadrado 1 1/2 x 1.5 y barra cuadrada 9mm', 355.11, NULL, NULL, 2, NULL, NULL),
(4, '2024-03-08', 'Venta de chatarra', 373.81, NULL, 2, NULL, NULL, NULL),
(5, '2024-03-06', 'Comida', 367.81, NULL, NULL, 3, NULL, NULL),
(6, '2024-03-07', 'Comida', 361.81, NULL, NULL, 4, NULL, NULL),
(7, '2024-03-06', 'Gasolina', 351.81, NULL, NULL, 5, NULL, NULL),
(8, '2024-03-08', 'Compras de productos para el local', 343.98, NULL, NULL, 6, NULL, NULL),
(9, '2024-03-08', 'Bisagra torneada 15x92', 337.33, NULL, NULL, 7, NULL, NULL),
(10, '2024-03-08', 'Factura mixta entre Arq obra, obra don Luis y taller', 314.43, NULL, NULL, 8, NULL, NULL),
(11, '2024-03-08', 'Compra de megacero angulos 3/4 x 1/8 y perfil U 80x40x2 ', 285.92, NULL, NULL, 9, NULL, NULL),
(12, '2024-03-08', 'Compra anticorrosivo negro mate Unidas para Taller', 269.77, NULL, NULL, 10, NULL, NULL),
(13, '2024-03-08', 'Compra de spry para local', 265.67, NULL, NULL, 11, NULL, NULL),
(14, '2024-01-11', 'Primer Anticipo', 865.67, NULL, 3, NULL, NULL, NULL),
(15, '2024-03-09', 'Pago Semanal', 665.67, NULL, NULL, NULL, 1, NULL),
(16, '2024-03-08', 'Pago de deuda a un amigo', 605.67, NULL, NULL, 12, NULL, NULL),
(17, '2024-03-08', 'Prestamo a Julio Cesar', 600.67, NULL, NULL, 13, NULL, NULL),
(18, '2024-03-09', 'Pago del credito camioneta', 440.67, NULL, NULL, 14, NULL, NULL),
(19, '2024-03-08', 'Factura de venta', 441.92, 1, NULL, NULL, NULL, NULL),
(20, '2024-03-09', 'Factura de venta', 461.92, 2, NULL, NULL, NULL, NULL),
(21, '2024-03-09', 'Factura de venta', 1061.92, 3, NULL, NULL, NULL, NULL),
(22, '2024-03-08', 'Factura de venta', 1111.92, 4, NULL, NULL, NULL, NULL),
(23, '2024-03-11', 'Pago de renta ', 778.72, NULL, NULL, 15, NULL, NULL),
(24, '2024-03-11', 'Bisagras para puerta Tamboreada', 765.4, NULL, NULL, 16, NULL, NULL),
(25, '2024-03-11', 'Factura de venta', 770.4, 5, NULL, NULL, NULL, NULL),
(26, '2024-03-11', 'Factura plancha tol negro', 662.85, NULL, NULL, 17, NULL, NULL),
(27, '2024-03-11', 'TUBO RECTANGULAR 100-50 X 2.0 NOVA', 627.25, NULL, NULL, 18, NULL, NULL),
(28, '2024-03-06', 'Arriendo', 327.25, NULL, NULL, 19, NULL, NULL),
(29, '2024-03-11', 'Pago sabado', 307.25, NULL, NULL, NULL, 2, NULL),
(30, '2024-03-11', 'Anticipo Lunes', 287.25, NULL, NULL, NULL, 3, NULL),
(31, '2024-03-06', 'Factura accesorios dissa para aluminio', 284.7, NULL, NULL, 20, NULL, NULL),
(32, '2024-03-11', 'Anticipo comida', 272.2, NULL, NULL, 21, NULL, NULL),
(33, '2024-03-11', 'Gasolina', 269.2, NULL, NULL, 22, NULL, NULL),
(34, '2024-03-11', 'Cobijas', 262.2, NULL, NULL, 23, NULL, NULL),
(35, '2024-03-11', 'Anticipo Lunes Kevin', 252.2, NULL, NULL, 24, NULL, NULL),
(36, '2024-03-11', 'Factura de venta', 257.2, 6, NULL, NULL, NULL, NULL),
(37, '2024-03-09', 'Factura disa para ventanas', 204.95, NULL, NULL, 25, NULL, NULL),
(38, '2024-03-06', 'Silicon y cinta por garantia de puerta', 200.3, NULL, NULL, 26, NULL, NULL),
(39, '2024-03-12', 'Factura de venta', 205.06, 7, NULL, NULL, NULL, NULL),
(40, '2024-03-12', 'Pago obligaciones pendientes SRI', 145.06, NULL, NULL, 27, NULL, NULL),
(41, '2024-03-12', 'Recarga para jesus del taller', 144.06, NULL, NULL, 28, NULL, NULL),
(42, '2024-03-12', 'Un dolar para no se que', 143.06, NULL, NULL, 29, NULL, NULL),
(43, '2024-03-12', 'Dobleces de plancha de tol', 119.06, NULL, NULL, 30, NULL, NULL),
(44, '2024-03-13', 'Factura de venta', 120.62, 8, NULL, NULL, NULL, NULL),
(45, '2024-03-12', 'Dobleces de planchas tol para puertas', 96.62, NULL, NULL, 31, NULL, NULL),
(46, '2024-03-13', 'Anticipo para comida', 94.62, NULL, NULL, 32, NULL, NULL),
(47, '2024-03-13', 'Anticipo Martin pan arroz y chorizo', 66.72, NULL, NULL, 33, NULL, NULL),
(48, '2024-03-14', 'Anticipo para Carmita del jueves', 63.97, NULL, NULL, 34, NULL, NULL),
(49, '2024-03-13', 'Factura de plancha de tol extra por error del jesus mas dobleces', 37.47, NULL, NULL, 35, NULL, NULL),
(50, '2024-03-14', 'Galon de anticorrosivo negro mate', 21.32, NULL, NULL, 36, NULL, NULL),
(51, '2024-03-14', 'Disolvente', 11.32, NULL, NULL, 37, NULL, NULL),
(52, '2024-03-12', 'Vidrio laminado 6mm y perforaciones', -22.93, NULL, NULL, 38, NULL, NULL),
(53, '2024-03-13', 'Policarbonatos para vidrio 6mm', -27.33, NULL, NULL, 39, NULL, NULL),
(54, '2024-03-14', 'tranvia', -28.33, NULL, NULL, 40, NULL, NULL),
(55, '2024-03-14', 'Pago del SRI', -88.63, NULL, NULL, 41, NULL, NULL),
(56, '2024-03-14', 'Factura de venta', -77.63, 9, NULL, NULL, NULL, NULL),
(57, '2024-03-14', 'Factura de venta', -77.63, 10, NULL, NULL, NULL, NULL),
(58, '2024-03-13', 'Anticipo total', 32.37, NULL, 4, NULL, NULL, NULL),
(59, '2024-03-14', 'Prestamo para SRI', 54.67, NULL, NULL, NULL, NULL, 2),
(61, '2024-03-14', 'Vidrios', 31.17, NULL, NULL, 42, NULL, NULL),
(62, '2024-03-14', 'Pintura y filtros', 9.17, NULL, NULL, 43, NULL, NULL),
(63, '2024-03-15', 'gastos extra', -40.83, NULL, NULL, 44, NULL, NULL),
(64, '2024-03-16', 'Factura de venta', 559.17, 12, NULL, NULL, NULL, NULL),
(65, '2024-03-16', 'Prestamo para materiales', 689.17, NULL, NULL, NULL, NULL, 3),
(66, '2024-03-16', 'Pago Semanal', 609.17, NULL, NULL, NULL, 4, NULL),
(67, '2024-03-16', 'Pago Semanal', 543.32, NULL, NULL, NULL, 5, NULL),
(68, '2024-03-14', 'Para Carmita', 533.32, NULL, NULL, 46, NULL, NULL),
(69, '2024-03-12', 'Gas', 530.32, NULL, NULL, 47, NULL, NULL),
(70, '2024-03-13', 'Verduras', 516.32, NULL, NULL, 48, NULL, NULL),
(71, '2024-03-16', 'Gasolina', 496.32, NULL, NULL, 49, NULL, NULL),
(72, '2024-03-16', 'Abono de Deuda', 446.32, NULL, NULL, NULL, NULL, 1),
(73, '2024-03-16', 'Abono de Deuda', 376.32, NULL, NULL, NULL, NULL, 3),
(74, '2024-03-18', 'Pago Semanal', 356.32, NULL, NULL, NULL, 6, NULL),
(75, '2024-03-01', 'Deuda con la vecina de la papeleria', 490.72, NULL, NULL, NULL, NULL, 5),
(76, '2024-03-19', 'Deuda Aumentada', 495.72, NULL, NULL, NULL, NULL, 5),
(77, '2024-03-01', 'Deuda con galo', 735.72, NULL, NULL, NULL, NULL, 6),
(78, '2024-03-17', 'Abono de Deuda', 675.72, NULL, NULL, NULL, NULL, 6),
(79, '2024-03-14', 'Factura de venta', 686.72, 13, NULL, NULL, NULL, NULL),
(80, '2024-03-11', 'Anticipo Lentes', 666.72, NULL, NULL, 52, NULL, NULL),
(81, '2024-03-17', 'Anticipo Plan Celular Martin', 652.84, NULL, NULL, 53, NULL, NULL),
(82, '2024-03-17', 'Pago plan celular Martin', 638.96, NULL, NULL, 54, NULL, NULL),
(83, '2024-03-18', 'Pago internet', 605.96, NULL, NULL, 55, NULL, NULL),
(84, '2024-03-18', 'Dobleces de plancha para obra', 598.96, NULL, NULL, 56, NULL, NULL),
(85, '2024-03-18', 'Compra de chapa viro de 50mm', 556.46, NULL, NULL, 57, NULL, NULL),
(86, '2024-03-18', 'Gasolina Auto', 546.46, NULL, NULL, 58, NULL, NULL),
(87, '2024-03-18', 'Anticipo Jesus', 536.46, NULL, NULL, 59, NULL, NULL),
(88, '2024-03-18', 'Renta', 236.06, NULL, NULL, 60, NULL, NULL),
(90, '2024-03-18', 'Primer Anticipo', 1036.06, NULL, 5, NULL, NULL, NULL),
(91, '2024-03-18', 'Abono de Deuda', 886.06, NULL, NULL, NULL, NULL, 1),
(92, '2024-03-18', 'Primer Anticipo', 2386.06, NULL, 6, NULL, NULL, NULL),
(93, '2024-03-19', 'Factura de venta', 2391.06, 14, NULL, NULL, NULL, NULL),
(94, '2024-03-18', 'rol mal calculado de la semana pasada', 2375.76, NULL, NULL, 61, NULL, NULL),
(95, '2024-03-19', 'Anticipo para lentes', 2355.76, NULL, NULL, 62, NULL, NULL),
(96, '2024-03-19', 'Factura megacero', 2137.36, NULL, NULL, 63, NULL, NULL),
(97, '2024-03-19', 'Factura de 1 tubo para obra', 2093.39, NULL, NULL, 64, NULL, NULL),
(98, '2024-03-19', 'Pago del saldo a fernando trelles', 1586.39, NULL, NULL, 65, NULL, NULL),
(100, '2024-03-20', 'Factura Megacero ', 1502.03, NULL, NULL, 67, NULL, NULL),
(101, '2024-03-18', 'Anticipo ', 1482.03, NULL, NULL, 68, NULL, NULL),
(102, '2024-03-20', 'Gasolina', 1472.03, NULL, NULL, 69, NULL, NULL),
(103, '2024-03-21', 'Anticipo para jesus', 1462.03, NULL, NULL, 70, NULL, NULL),
(104, '2024-03-21', 'Factura de venta', 1497.03, 15, NULL, NULL, NULL, NULL),
(105, '2024-03-21', 'Anticipo Martin', 1487.03, NULL, NULL, 71, NULL, NULL),
(106, '2024-03-22', 'Segundo anticipo', 1987.03, NULL, 7, NULL, NULL, NULL),
(107, '2024-03-22', 'Factura Megacero', 1919.42, NULL, NULL, 72, NULL, NULL),
(108, '2024-03-22', 'Factura Megacero Arnoldo', 1897.77, NULL, NULL, 73, NULL, NULL),
(109, '2024-03-22', 'Factura megacero', 1773.17, NULL, NULL, 74, NULL, NULL),
(110, '2024-03-22', 'Sueldo Semanal', 1693.17, NULL, NULL, NULL, 7, NULL),
(111, '2024-03-22', 'Vacunas perros', 1675.17, NULL, NULL, 75, NULL, NULL),
(112, '2024-03-22', 'Abono de Deuda', 1665.17, NULL, NULL, NULL, NULL, 1),
(113, '2024-03-22', 'Pago Semanal', 1600.47, NULL, NULL, NULL, 8, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roldepago`
--

CREATE TABLE `roldepago` (
  `idRol` int(11) NOT NULL,
  `idEmpleado` int(11) NOT NULL,
  `valor` float NOT NULL,
  `anticipo` float DEFAULT NULL,
  `observaciones` varchar(500) NOT NULL,
  `fechaInicio` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roldepago`
--

INSERT INTO `roldepago` (`idRol`, `idEmpleado`, `valor`, `anticipo`, `observaciones`, `fechaInicio`) VALUES
(1, 1, 200, 0, 'Pago de 2 semanas', '2024-02-26'),
(2, 1, 20, 0, 'horas extra', '2024-03-09'),
(3, 1, 20, 0, 'Pago solo lunes', '2024-03-11'),
(4, 1, 80, 0, 'El lunes ya se pagó', '2024-03-12'),
(5, 2, 65.85, 54.15, '', '2024-03-11'),
(6, 3, 20, 12, 'se pagan solo 20 mas', '2024-03-11'),
(7, 1, 80, 20, 'No se abona nada extra', '2024-03-18'),
(8, 2, 64.7, 55.3, 'Cuadre con cuenta equivocada de la semana pasada por error en el sistema', '2024-03-18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `saldo`
--

CREATE TABLE `saldo` (
  `idSaldo` int(11) NOT NULL,
  `idObra` int(11) DEFAULT NULL,
  `idFactura` varchar(20) NOT NULL,
  `valor` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `saldo`
--

INSERT INTO `saldo` (`idSaldo`, `idObra`, `idFactura`, `valor`) VALUES
(1, NULL, '000-000-000000001', 1.25),
(2, NULL, '000-000-000000002', 20),
(3, 5, '000-000-000000003', 600),
(4, NULL, '000-000-000000004', 50),
(5, NULL, '000-000-000000005', 5),
(6, 0, '000-000-000000006', 5),
(7, 0, '000-000-000000007', 4.76),
(8, 0, '000-000-000000008', 1.56),
(9, 0, '000-000-000000009', 11),
(10, 7, '000-000-000000010', 0),
(12, 1, '000-000-000000011', 600),
(13, 0, '000-000-000000012', 11),
(14, 0, '000-000-000000013', 5),
(15, 0, '000-000-000000014', 35);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(10) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `cedula` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `usuario`, `password`, `cedula`) VALUES
(1, 'ELKEVINQ', 'Capernuli12@', '0105108930');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `anticipo`
--
ALTER TABLE `anticipo`
  ADD PRIMARY KEY (`idAnticipo`);

--
-- Indices de la tabla `detallefactura`
--
ALTER TABLE `detallefactura`
  ADD PRIMARY KEY (`idDetalle`);

--
-- Indices de la tabla `deudas`
--
ALTER TABLE `deudas`
  ADD PRIMARY KEY (`idDeuda`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`idEmpleado`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`idFactura`);

--
-- Indices de la tabla `facturacompra`
--
ALTER TABLE `facturacompra`
  ADD PRIMARY KEY (`idFacturaCompra`);

--
-- Indices de la tabla `gastos`
--
ALTER TABLE `gastos`
  ADD PRIMARY KEY (`idGasto`);

--
-- Indices de la tabla `movimientosdeuda`
--
ALTER TABLE `movimientosdeuda`
  ADD PRIMARY KEY (`idMovimiento`);

--
-- Indices de la tabla `obras`
--
ALTER TABLE `obras`
  ADD PRIMARY KEY (`idObra`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`cedula`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`idProveedor`);

--
-- Indices de la tabla `registro`
--
ALTER TABLE `registro`
  ADD PRIMARY KEY (`idRegistro`);

--
-- Indices de la tabla `roldepago`
--
ALTER TABLE `roldepago`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `saldo`
--
ALTER TABLE `saldo`
  ADD PRIMARY KEY (`idSaldo`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD UNIQUE KEY `cedula` (`cedula`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `anticipo`
--
ALTER TABLE `anticipo`
  MODIFY `idAnticipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `detallefactura`
--
ALTER TABLE `detallefactura`
  MODIFY `idDetalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `deudas`
--
ALTER TABLE `deudas`
  MODIFY `idDeuda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `idEmpleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `gastos`
--
ALTER TABLE `gastos`
  MODIFY `idGasto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT de la tabla `movimientosdeuda`
--
ALTER TABLE `movimientosdeuda`
  MODIFY `idMovimiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `obras`
--
ALTER TABLE `obras`
  MODIFY `idObra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `idProveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `registro`
--
ALTER TABLE `registro`
  MODIFY `idRegistro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT de la tabla `roldepago`
--
ALTER TABLE `roldepago`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `saldo`
--
ALTER TABLE `saldo`
  MODIFY `idSaldo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
