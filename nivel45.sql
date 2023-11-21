-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-10-2023 a las 21:20:51
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
(3, 1, 400),
(4, 1, 600),
(5, 1, 100),
(6, 1, 100),
(10, 1, 100),
(11, 1, 100),
(12, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallefactura`
--

CREATE TABLE `detallefactura` (
  `idDetalle` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `idProducto` int(11) DEFAULT NULL,
  `precioTotal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(2, '', '2023-10-12', '0000-00-00', 'Activo', 500),
(3, '', '2023-10-12', '0000-00-00', 'Activo', 10),
(4, '0105108930', '2023-10-12', '0000-00-00', 'Activo', 500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `idFactura` varchar(20) NOT NULL,
  `fecha` date NOT NULL,
  `subtotal` float NOT NULL,
  `iva` float NOT NULL,
  `descuento` float DEFAULT NULL,
  `total` float NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `idObra` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gastos`
--

CREATE TABLE `gastos` (
  `idGasto` int(11) NOT NULL,
  `valor` float NOT NULL,
  `idProducto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, '0105108930', 1, 'nada', 5000, '2023-10-06', 'En Proceso');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `cedula` varchar(13) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`cedula`, `nombres`, `apellidos`, `telefono`, `correo`, `direccion`) VALUES
('0105108922', 'Karen Viviana', 'Zambrano Valverde', '0985116173', 'kaviana72@hotmail.com', 'Mariscal lamar 21-80'),
('0105108930', 'Kevin Javier', 'Zambrano Valverde', '0963394920', 'kevinvz110@gmail.com', 'Mariscal Lamar 21-80');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `precio` float NOT NULL,
  `existencias` int(11) NOT NULL,
  `idProveedor` int(11) NOT NULL,
  `idFacturaCompra` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'Megacero', '072820119', '0999512440', 'Rafael Maria Arizaga 13-66');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `idRegistro` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `saldo` float NOT NULL,
  `idSaldo` int(11) NOT NULL,
  `idAnticipo` int(11) NOT NULL,
  `idGasto` int(11) NOT NULL,
  `idRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`idRegistro`, `fecha`, `descripcion`, `saldo`, `idSaldo`, `idAnticipo`, `idGasto`, `idRol`) VALUES
(1, '2023-10-12', 'primer anticipo', 500, 0, 1, 0, 0),
(2, '0000-00-00', 'Segundo anticipo', 900, 0, 3, 0, 0),
(3, '0000-00-00', 'Tercer anticipo', 1500, 0, 4, 0, 0),
(4, '0000-00-00', 'Cuarto anticipo', 1600, 0, 5, 0, 0),
(5, '0000-00-00', 'quinto anticipo', 1700, 0, 6, 0, 0),
(6, '0000-00-00', 'no tengo idea', 1800, 0, 10, 0, 0),
(7, '0000-00-00', 'no tengo idea', 1900, 0, 11, 0, 0),
(8, '2023-10-12', 'c', 1901, 0, 12, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roldepago`
--

CREATE TABLE `roldepago` (
  `idRol` int(11) NOT NULL,
  `idEmpleado` int(11) NOT NULL,
  `valor` float NOT NULL,
  `observaciones` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `saldo`
--

CREATE TABLE `saldo` (
  `idSaldo` int(11) NOT NULL,
  `idObra` int(11) NOT NULL,
  `idFactura` int(11) NOT NULL,
  `valor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  MODIFY `idAnticipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `detallefactura`
--
ALTER TABLE `detallefactura`
  MODIFY `idDetalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `idEmpleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `gastos`
--
ALTER TABLE `gastos`
  MODIFY `idGasto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `obras`
--
ALTER TABLE `obras`
  MODIFY `idObra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `idProveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `registro`
--
ALTER TABLE `registro`
  MODIFY `idRegistro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `roldepago`
--
ALTER TABLE `roldepago`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `saldo`
--
ALTER TABLE `saldo`
  MODIFY `idSaldo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;