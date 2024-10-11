-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS copaMundial;

-- Seleccionar la base de datos
USE copaMundial;

-- Tabla de Confederaciones
CREATE TABLE IF NOT EXISTS confederaciones (
    id_confederacion INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    anio_creacion YEAR,
    descripcion TEXT
);

-- Insertar confederaciones
INSERT INTO confederaciones (nombre, anio_creacion, descripcion) VALUES 
    ('CAF', 1957, 'Confederación Africana de Fútbol'), ('AFC', 1954, 'Confederación Asiática de Fútbol'), ('CONMEBOL', 1916, 'Confederación Sudamericana de Fútbol'), ('CONCACAF', 1961, 'Confederación de Fútbol de América del Norte, América Central y el Caribe'), ('OFC', 1966, 'Confederación de Fútbol de Oceanía'), ('UEFA', 1954, 'Unión de Asociaciones Europeas de Fútbol');

-- Tabla de Sedes
CREATE TABLE IF NOT EXISTS sedes (
    id_sede INT PRIMARY KEY AUTO_INCREMENT,
    nombre_estadio VARCHAR(100),
    ciudad VARCHAR(100),
    anio_inauguracion YEAR,
    capacidad INT,
    equipos TEXT,
    pais_organizador VARCHAR(50)
);

-- Tabla de Selecciones
CREATE TABLE IF NOT EXISTS selecciones (
    id_seleccion INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    ranking_fifa INT,
    primera_participacion YEAR,
    titulos INT,
    id_confederacion INT,
    FOREIGN KEY (id_confederacion) REFERENCES confederaciones(id_confederacion)
);

-- Tabla de Jugadores
CREATE TABLE IF NOT EXISTS jugadores (
    id_jugador INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    posicion VARCHAR(50),
    id_seleccion INT,
    goles_anotados INT,
    fecha_debut DATE,
    FOREIGN KEY (id_seleccion) REFERENCES selecciones(id_seleccion)
);

-- Tabla de Directores Técnicos
CREATE TABLE IF NOT EXISTS directores_tecnicos (
    id_director_tecnico INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    id_seleccion INT,
    fecha_inicio DATE,
    FOREIGN KEY (id_seleccion) REFERENCES selecciones(id_seleccion)
);

-- Tabla de Arbitros
CREATE TABLE IF NOT EXISTS arbitros (
    id_arbitro INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    nacionalidad VARCHAR(50),
    fecha_debut DATE
);

-- Tabla de Roles
CREATE TABLE IF NOT EXISTS roles (
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    nombre_rol VARCHAR(50)
);

-- Insertar roles
INSERT INTO roles (nombre_rol) VALUES 
    ('Administrador'), ('Periodista'), ('Modificador');

-- Tabla de Partidos
CREATE TABLE IF NOT EXISTS partidos (
    id_partido INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE, 
    hora_inicio TIME,
    id_sede INT,
    id_seleccion_local INT,
    id_seleccion_visitante INT,
    id_arbitro INT,
    FOREIGN KEY (id_sede) REFERENCES sedes(id_sede),
    FOREIGN KEY (id_seleccion_local) REFERENCES selecciones(id_seleccion),
    FOREIGN KEY (id_seleccion_visitante) REFERENCES selecciones(id_seleccion),
    FOREIGN KEY (id_arbitro) REFERENCES arbitros(id_arbitro)
);

-- Tabla de Resultados
CREATE TABLE IF NOT EXISTS resultados (
    id_resultado INT PRIMARY KEY AUTO_INCREMENT,
    fase VARCHAR(50),
    id_partido INT,
    resultado_equipo_local INT,
    resultado_equipo_visitante INT,
    FOREIGN KEY (id_partido) REFERENCES partidos(id_partido)
);

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE,
    contraseña VARCHAR(255),
    nombre_completo VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    id_rol INT,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

-- Tabla de Noticias
CREATE TABLE IF NOT EXISTS noticias (
    id_noticia INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    fecha_publicacion DATE,
    descripcion TEXT,
    imagen VARCHAR(255),
    id_periodista INT,
    FOREIGN KEY (id_periodista) REFERENCES usuarios(id_usuario)
);
