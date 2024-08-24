-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-08-2024 a las 02:59:01
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `psicologia1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id_cita` int(11) NOT NULL,
  `id_psicologo` int(11) DEFAULT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `fecha_cita` date DEFAULT NULL,
  `hora_cita` time DEFAULT NULL,
  `tipo_cita` varchar(50) DEFAULT NULL,
  `estado` varchar(50) DEFAULT 'Pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`id_cita`, `id_psicologo`, `id_paciente`, `fecha_cita`, `hora_cita`, `tipo_cita`, `estado`) VALUES
(1, 1, 1, '2024-08-10', '10:00:00', 'Consulta inicial', 'Confirmada'),
(2, 2, 2, '2024-08-15', '11:30:00', 'Seguimiento', 'Pendiente'),
(3, 3, 3, '2024-08-20', '14:00:00', 'Terapia individual', 'Confirmada'),
(4, 4, 4, '2024-08-25', '09:00:00', 'Evaluación psicológica', 'Cancelada'),
(5, 5, 5, '2024-08-30', '16:00:00', 'Terapia grupal', 'Confirmada'),
(6, 1, 2, '2024-09-06', '11:00:00', 'una cita', 'Pendiente'),
(7, 1, 3, '2024-09-09', '12:00:00', 'no se', 'Pendiente'),
(8, 1, 4, '2024-09-09', '13:00:00', 'no se', 'Pendiente'),
(9, 1, 1, '2024-09-19', '15:30:00', 'no se', 'Pendiente'),
(10, 1, 1, '2024-09-29', '15:30:00', 'no se', 'Pendiente'),
(11, 1, 2, '2024-09-29', '15:30:00', 'no se', 'Pendiente'),
(12, 1, 2, '2024-09-23', '15:30:00', 'no se', 'Pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diagnosticos`
--

CREATE TABLE `diagnosticos` (
  `id_diagnostico` int(11) NOT NULL,
  `id_paciente` int(11) DEFAULT NULL,
  `id_psicologo` int(11) DEFAULT NULL,
  `fecha_diagnostico` date DEFAULT NULL,
  `diagnostico` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `diagnosticos`
--

INSERT INTO `diagnosticos` (`id_diagnostico`, `id_paciente`, `id_psicologo`, `fecha_diagnostico`, `diagnostico`) VALUES
(1, 1, 1, '2024-01-10', 'Trastorno de ansiedad generalizada'),
(2, 2, 2, '2024-02-15', 'Depresión mayor'),
(3, 3, 3, '2024-03-20', 'Trastorno obsesivo-compulsivo'),
(4, 4, 4, '2024-04-25', 'Estrés postraumático'),
(5, 5, 5, '2024-05-30', 'Trastorno por déficit de atención e hiperactividad'),
(6, 6, 1, '2023-08-18', 'Depresion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id_paciente` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `correo_electronico` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `id_psicologo` int(11) DEFAULT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `tarifa` double DEFAULT NULL,
  `nombre_emergencia` varchar(100) DEFAULT NULL,
  `contacto_emergencia` varchar(15) DEFAULT NULL,
  `estado_civil` varchar(50) DEFAULT NULL,
  `ocupacion` varchar(100) DEFAULT NULL,
  `fecha_registro` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id_paciente`, `nombre`, `apellido`, `fecha_nacimiento`, `correo_electronico`, `telefono`, `direccion`, `id_psicologo`, `usuario`, `contrasena`, `tarifa`, `nombre_emergencia`, `contacto_emergencia`, `estado_civil`, `ocupacion`, `fecha_registro`) VALUES
(1, 'Miguel', 'Sánchez', '1985-04-12', 'miguel.sanchez@example.com', '555-1111', 'Calle Falsa 123, Ciudad', 1, 'miguels', 'password1', 150.5, 'Mar?a Garc?a', '1234567890', 'Soltero', 'Ingeniero', '2024-08-01'),
(2, 'Lucía', 'Ramírez', '1992-08-25', 'lucia.ramirez@example.com', '555-2222', 'Avenida Siempre Viva 742, Ciudad', 2, 'luciar', 'password2', 200, 'Luis P?rez', '0987654321', 'Casado', 'Doctor', '2024-08-02'),
(3, 'Fernando', 'Gómez', '1978-11-05', 'fernando.gomez@example.com', '555-3333', 'Boulevard de los Sueños Rotos 456, Ciudad', 3, 'fernandog', 'password3', 180.75, 'Ana G?mez', '1112223333', 'Divorciado', 'Abogado', '2024-08-03'),
(4, 'Sofía', 'Rodríguez', '2000-01-15', 'sofia.rodriguez@example.com', '555-4444', 'Plaza Mayor 789, Ciudad', 4, 'sofiar', 'password4', 220, 'Carlos Ram?rez', '2223334444', 'Viudo', 'Profesor', '2024-08-04'),
(5, 'David', 'Hernández', '1983-07-20', 'david.hernandez@example.com', '555-5555', 'Callejón del Beso 101, Ciudad', 5, 'davidh', 'password5', 175.5, 'Elena Mart?nez', '3334445555', 'Soltero', 'Dise?ador', '2024-08-05'),
(6, 'Jorge', 'López', '1999-11-23', 'jorge.lopez@example.com', '555-4445', 'Avenida Siempre Viva 742, Ciudad', 1, NULL, NULL, 190.25, 'Miguel Torres', '4445556666', 'Casado', 'Arquitecto', '2024-08-06'),
(7, 'Miguel', 'Torres', '1985-04-12', 'miguel.torres@example.com', '1111-1111', 'Calle tomate 345, Ciudad', 1, NULL, NULL, 210, 'Laura Fern?ndez', '5556667777', 'Soltero', 'Enfermera', '2024-08-07'),
(8, 'Mariana', 'Morales', '2004-08-28', 'mariana@example.com', '6188155703', 'en su casa', 1, 'user 8', 'contraseniajaja', 250, 'Lili', '6187189954', 'Soltera', 'Estudiante', '2024-01-03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `psicologos`
--

CREATE TABLE `psicologos` (
  `id_psicologo` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `especialidad` varchar(100) DEFAULT NULL,
  `correo_electronico` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `psicologos`
--

INSERT INTO `psicologos` (`id_psicologo`, `nombre`, `apellido`, `especialidad`, `correo_electronico`, `telefono`, `usuario`, `contrasena`) VALUES
(1, 'Laura', 'García', 'Psicología Clínica', 'laura.garcia@example.com', '555-1234', 'lauragarcia', 'password1'),
(2, 'Carlos', 'Martínez', 'Psicología Educativa', 'carlos.martinez@example.com', '555-5678', 'carlosm', 'password2'),
(3, 'Ana', 'López', 'Psicología Infantil', 'ana@example.com', '555-8765', 'analopez', 'password3'),
(4, 'Juan', 'Pérez', 'Psicología Organizacional', 'juan.perez@example.com', '555-4321', 'juanperez', 'password4'),
(5, 'María', 'Hernández', 'Psicología Deportiva', 'maria.hernandez@example.com', '555-9876', 'mariah', 'password5'),
(6, 'Julio', 'Ortega', 'Psiquiatra', 'Julio@example.com', '1234567789', 'dwen', 'pass123'),
(7, 'Pato', 'Alec', 'Psiquiatra', 'pato@example.com', '844792', 'pat', 'pass123'),
(8, 'Adrian', 'Fulana', 'una especialidad', 'adriana@example.com', '2345789', 'adrianita', 'pass1234');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id_cita`),
  ADD KEY `id_psicologo` (`id_psicologo`),
  ADD KEY `id_paciente` (`id_paciente`);

--
-- Indices de la tabla `diagnosticos`
--
ALTER TABLE `diagnosticos`
  ADD PRIMARY KEY (`id_diagnostico`),
  ADD KEY `id_paciente` (`id_paciente`),
  ADD KEY `id_psicologo` (`id_psicologo`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id_paciente`),
  ADD KEY `id_psicologo` (`id_psicologo`);

--
-- Indices de la tabla `psicologos`
--
ALTER TABLE `psicologos`
  ADD PRIMARY KEY (`id_psicologo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `id_cita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `diagnosticos`
--
ALTER TABLE `diagnosticos`
  MODIFY `id_diagnostico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id_paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `psicologos`
--
ALTER TABLE `psicologos`
  MODIFY `id_psicologo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `Citas_ibfk_1` FOREIGN KEY (`id_psicologo`) REFERENCES `psicologos` (`id_psicologo`),
  ADD CONSTRAINT `Citas_ibfk_2` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`);

--
-- Filtros para la tabla `diagnosticos`
--
ALTER TABLE `diagnosticos`
  ADD CONSTRAINT `Diagnosticos_ibfk_1` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`),
  ADD CONSTRAINT `Diagnosticos_ibfk_2` FOREIGN KEY (`id_psicologo`) REFERENCES `psicologos` (`id_psicologo`);

--
-- Filtros para la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `Pacientes_ibfk_1` FOREIGN KEY (`id_psicologo`) REFERENCES `psicologos` (`id_psicologo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
