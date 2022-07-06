INSERT INTO regiones (id, nombre) VALUES (1, "Sudamérica");
INSERT INTO regiones (id, nombre) VALUES (2, "Centroamérica");
INSERT INTO regiones (id, nombre) VALUES (3, "Norteamérica");
INSERT INTO regiones (id, nombre) VALUES (4, "Europa");
INSERT INTO regiones (id, nombre) VALUES (5, "Asia");
INSERT INTO regiones (id, nombre) VALUES (6, "Africa");
INSERT INTO regiones (id, nombre) VALUES (7, "Oceanía");
INSERT INTO regiones (id, nombre) VALUES (8, "Antártida");

INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (1, "Andrés", "Guzmán", "andres@mail.com", "2022-06-11");
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (2, "John", "Doe", "john@mail.com", "2022-06-10");
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (4, "Linus", "Torvalds", "linus@mail.com", "2022-06-09");
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (4, "Rasmus", "Leardof", "rasmus@mail.com", "2022-06-08");
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (4, "Erich", "Gamma", "erich@mail.com", "2022-05-11");
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (3, "Richard", "Helm", "richard@mail.com", "2022-05-10");
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (3, "Ralph", "Johnson", "ralph@mail.com", "2022-05-09");
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (1, "Matías", "Blanco", "matias@mail.com", "2022-05-08");
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (5, "Goku", "Son", "goku@mail.com", "2022-04-11");
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (1, "Pepe", "Argento", "pepe@mail.com", "2022-04-10");
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (7, "Juan", "Hernández", "juan@mail.com", "2022-04-09");
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (6, "María", "Soledad", "maria@mail.com", "2022-04-08");

INSERT INTO usuarios (username, password, enabled, nombre, apellido, email) VALUES("andres", "$2a$10$5X4yYKpRXCKmQ6OnzSC3zOSP7H0faSW90j3XHZ1s0qL9rCv9Nz90K", 1, "Andrés", "Guzman", "profesor@mail.com");
INSERT INTO usuarios (username, password, enabled, nombre, apellido, email) VALUES("admin", "$2a$10$oFBxa6QJXFIIGba3JX5U4OgsHcAhlBzkaxja4IlGTgbchORFc89uS", 1, "John", "Doe", "john@mail.com");

INSERT INTO roles (nombre) VALUES("ROLE_USER");
INSERT INTO roles (nombre) VALUES("ROLE_ADMIN");

INSERT INTO user_authorities (user_id, role_id) VALUES(1, 1);
INSERT INTO user_authorities (user_id, role_id) VALUES(2, 2);
INSERT INTO user_authorities (user_id, role_id) VALUES(2, 1);