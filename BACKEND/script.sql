CREATE DATABASE proyectofinalmodulo8adl;
\c proyectofinalmodulo8adl

CREATE TABLE users (
    id SERIAL,
    email VARCHAR,
    password VARCHAR,
    nombre_completo VARCHAR,
    direccion_de_envio_por_default VARCHAR,
    comuna VARCHAR,
    telefono VARCHAR,
    PRIMARY KEY (id)
);

CREATE TABLE pedidos (
    id SERIAL,
    direccion_de_envio VARCHAR,
    direccion_pedido VARCHAR,
    email_pedido VARCHAR,
    fecha_pedido VARCHAR,
    status_pedido VARCHAR,
    user_id INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE detalle_pedidos (
    id SERIAL,
    precio INT,
    cantidad INT,
    pedido_id INT,
    producto_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

CREATE TABLE productos (
    id SERIAL,
    sku VARCHAR,
    nombre VARCHAR,
    precio VARCHAR,
    descripcion VARCHAR,
    imagen VARCHAR,
    imagen_pequena VARCHAR,
    categoria VARCHAR,
    stock INT,
    galeria VARCHAR,
    PRIMARY KEY (id)
);

CREATE TABLE categoria_producto (
    id SERIAL,
    categoria_id INT,
    producto_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (categoria_id) REFERENCES categoria(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

CREATE TABLE categoria (
    id SERIAL,
    name VARCHAR,
    description VARCHAR,
    imagen_pequena VARCHAR,
    PRIMARY KEY (id)
);