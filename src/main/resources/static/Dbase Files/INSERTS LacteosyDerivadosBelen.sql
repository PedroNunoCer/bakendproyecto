USE lacteosBelen;
INSERT INTO roles (id_rol, nombre_rol) VALUES
(1, 'Administrador'),
(2, 'Cliente'),
(3, 'Cliente'),
(4, 'Cliente'),
(5, 'Cliente'),
(6, 'Cliente');
INSERT INTO usuarios ( id_usuario,id_rol,nombre,email,contraseña,fecha_registro) VALUES
(1,1,'Josue','josue@gmail.com','estanoesmicontraseña123','2025-04-02'),
(2,2,'Eduardo','lalo@gmail.com','contraseña1235678','2025-04-02'),
(3,3,'Edna','edna@gmail.com','123estanoesmicontraseña','2025-04-02'),
(4,4,'Jose','jose@gmail.com','lacabra12345','2025-04-02'),
(5,5,'Edgar','edgar@gmail.com','contraseñaalreves','2025-04-02'),
(6,6,'Jonathan','jona@gmail.com','noescontraseña12','2025-04-02');

-- Fresco Oreado, Seco 
INSERT INTO categorias (id_categoria, nombre_categoria, descripcion) VALUES
(1, 'Fresco', 'Productos frescos'),
(2, 'Oreado', 'Productos oreados'),
(3, 'Seco', 'Productos secos');



INSERT INTO compra (id_compra, id_usuario, fecha_compra, estado_compra, precio_total) VALUES
(2, 2, '2025-04-02', 'completada', 400),
(3, 3, '2025-04-02', 'completada', 600),
(4, 4, '2025-04-02', 'pendiente', 200),
(5, 5, '2025-04-02', 'completada', 100),
(6, 6, '2025-04-02', 'pendiente', 300);

INSERT INTO intento_login (id_intento, id_usuario, fecha_intento, validacion_intento) VALUES
(1, 1, '2025-04-02', 1),
(2, 2, '2025-04-02', 1),
(3, 3, '2025-04-01', 0),
(4, 4, '2025-04-02', 1),
(5, 5, '2025-04-01', 0);

INSERT INTO productos (id_producto, id_categoria, nombre_prod, descripcion, precio, stock, imagen, fecha_creacion)
VALUES 
(1, 1, 'Queso fresco chico', 'Queso fresco en presentación pequeña', 45, 5, NULL, CURRENT_TIMESTAMP),
(2, 1, 'Queso fresco grande', 'Queso fresco en presentación grande', 85, 5, NULL, CURRENT_TIMESTAMP),
(3, 1, 'Jocoque', 'Jocoque tradicional', 35, 5, NULL, CURRENT_TIMESTAMP),
(4, 1, 'Queso botanero', 'Queso para botanas', 55, 5, NULL, CURRENT_TIMESTAMP),
(5, 1, 'Panela chico', 'Queso panela pequeño', 40, 5, NULL, CURRENT_TIMESTAMP);

INSERT INTO detalle_compras (id_detalle, id_compra, id_producto, cantidad) VALUES
(1, 2, 1, 2),
(2, 3, 2, 1),
(3, 4, 3, 2),
(4, 5, 4, 3),
(5, 6, 5, 1);




SELECT * FROM compra;
SELECT * FROM usuarios;
SELECT * FROM roles;
SELECT * FROM categorias;
SELECT * FROM intento_login;
SELECT * FROM productos;
SELECT * FROM detalle_compras;





