const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const { error } = require('console');

const app = express();
const port = 3000;

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nivel45',
});

// Middleware para procesar datos JSON en las solicitudes
app.use(bodyParser.json());

// Middleware CORS (habilita CORS para todas las rutas)
app.use(cors());

// Conexión a MySQL
db.connect((err) => {
    if (err) {
        console.log('Error al conectar a MySQL:', err);
    } else {
        console.log('Conexión exitosa a MySQL');
    }
});

// Ruta para la autenticación
app.post('/autenticar', (req, res) => {
    const { usuario, password } = req.body;

    // Consulta a la base de datos para verificar las credenciales
    const consulta = 'SELECT * FROM `usuario` WHERE usuario = ? AND password = ?';

    console.log('Consulta SQL:', consulta);

    db.query(consulta, [usuario, password], (error, resultados) => {
        if (error) {
            console.error('Error en la consulta de autenticación:', error);
            res.json({ success: false });
        } else {
            // Verifica si hay resultados en la consulta
            if (resultados.length > 0) {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        }
    });
});

// Ruta para la inserción de cliente (persona)
app.post('/insertar-cliente', (req, res) => {
    const { cedula, nombres, apellidos, telefono, correo, direccion } = req.body;

    // Consulta SQL para la inserción
    const consulta = 'INSERT INTO `persona` (`cedula`, `nombres`, `apellidos`, `telefono`, `correo`, `direccion`) VALUES (?, ?, ?, ?, ?, ?)';

    console.log('Consulta SQL:', consulta);

    // Ejecuta la consulta con los datos proporcionados
    db.query(consulta, [cedula, nombres, apellidos, telefono, correo, direccion], (error, resultados) => {
        if (error) {
            console.error('Error en la inserción de cliente:', error);
            res.json({ success: false });
        } else {
            console.log('Cliente insertado correctamente');
            res.json({ success: true });
        }
    });
});

app.post('/editar-cliente', (req, res) => {
    const { cedula, nombres, apellidos, telefono, correo, direccion } = req.body;

    const consulta = 'UPDATE `persona` SET `nombres`=? ,`apellidos`=? ,`telefono`=? ,`correo`=? ,`direccion`=? WHERE cedula = ?';

    db.query(consulta, [nombres, apellidos, telefono, correo, direccion, cedula], (error, resultados) => {
        if (error) {
            console.log(consulta)
            console.error('Error en la modificacion del cliente: ', error);
            res.json({ success: false });
        } else {
            console.log('Cliente modificado correctamente');
            res.json({ success: true });
        }
    });
});

// Ruta para la busqueda de cliente (persona)
app.get('/obtener-clientes', (req, res) => {
    // Consulta SQL para obtener todos los clientes
    const consulta = 'SELECT * FROM `persona`';

    console.log('Consulta SQL:', consulta);

    // Ejecuta la consulta
    db.query(consulta, (error, resultados) => {
        if (error) {
            console.error('Error al obtener la lista de clientes:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            // Envia la lista de clientes como respuesta
            res.json(resultados);
        }
    });
});

// Ruta para la busqueda de cliente (persona)
app.get('/obtener-cliente/:cedula', (req, res) => {
    // Recupera la cédula de los parámetros de la URL
    const cedula = req.params.cedula;

    // Consulta SQL para obtener todos los clientes con la cédula dada
    const consulta = 'SELECT * FROM `persona` WHERE cedula = ?';

    console.log('Consulta SQL:', consulta);

    // Ejecuta la consulta con la cédula proporcionada
    db.query(consulta, [cedula], (error, resultados) => {
        if (error) {
            console.error('Error al obtener el cliente:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            // Envia los resultados como respuesta (puede ser un array, incluso si esperas un solo resultado)
            console.log(resultados)
            res.json(resultados);
        }
    });
});

// Ruta para la inserción de deudas
app.post('/insertar-deuda', (req, res) => {
    const { descripcion, propietario, valor, fechaInicio, prestamo } = req.body;

    // Consulta SQL para la inserción en anticipo
    const insertarAnticipoQuery = 'INSERT INTO deudas (descripcion, propietario, valor, fechaInicio, prestamo) VALUES (?, ?, ?, ?, ?)';

    // Ejecuta la consulta para insertar en anticipo
    db.query(insertarAnticipoQuery, [descripcion, propietario, valor, cortarFecha(fechaInicio), prestamo], (error, resultados) => {
        if (error) {
            console.error('Error en la inserción de deuda:', error);
            res.json({ success: false });
        } else {
            console.log('Deuda insertada correctamente', resultados);

            // Obtener el último ID insertado
            const idDeuda = resultados.insertId;

            if (prestamo === true) {
                // Llamar a la función para insertar en registro
                insertarRegistro('idDeuda', cortarFecha(fechaInicio), descripcion, valor, idDeuda, true, (errorRegistro, resultadosRegistro) => {
                    if (errorRegistro) {
                        console.error('Error al insertar en registro:', errorRegistro);
                        res.json({ success: false });
                    } else {
                        console.log('Registro insertado correctamente', resultadosRegistro);
                        res.json({ success: true });
                    } valor
                });
            }
        }
    });
});

// Ruta para la busqueda de deudas
app.get('/obtener-deudas', (req, res) => {
    const consulta = `
        SELECT * FROM deudas`;

    db.query(consulta, (error, resultados) => {
        if (error) {
            console.error('Error al obtener la lista de deudas:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            // Formatear la fecha antes de enviarla como respuesta
            const deudasFormateadas = resultados.map(deudas => ({
                ...deudas,
                fechaInicio: formatarFecha(deudas.fechaInicio),
            }));

            console.log(deudasFormateadas);
            res.json(deudasFormateadas);
        }
    });
});

// Ruta para la inserción de deudas
app.post('/aumentar-deuda', (req, res) => {
    const { idDeuda, valor, prestamo, fechaInicio } = req.body;

    const valorAumentado = valor + prestamo

    // Consulta SQL para la inserción en anticipo
    const insertarAnticipoQuery = 'UPDATE deudas SET valor = ?, fechaInicio = ? WHERE idDeuda = ?';

    // Ejecuta la consulta para insertar en anticipo
    db.query(insertarAnticipoQuery, [valorAumentado, cortarFecha(fechaInicio), idDeuda], (error, resultados) => {
        if (error) {
            console.error('Error en el aumento de deuda:', error);
            res.json({ success: false });
        } else {
            console.log('Deuda aumentada correctamente', resultados);
            insertarRegistro('idDeuda', cortarFecha(fechaInicio), "Deuda Aumentada", prestamo, idDeuda, true, (errorRegistro, resultadosRegistro) => {
                if (errorRegistro) {
                    console.error('Error al insertar en registro:', errorRegistro);
                    res.json({ success: false });
                } else {
                    console.log('Registro insertado correctamente', resultadosRegistro);
                    res.json({ success: true });
                } valor
            });
        }
    });
});

// Ruta para la pago de deudas
app.post('/pagar-deuda', (req, res) => {
    const { fechaPago, valor, idDeuda, estado } = req.body;

    // Consulta SQL para la inserción en anticipo
    const insertarDeudaQuery = 'INSERT INTO movimientosdeuda (fechaPago, valor, idDeuda) VALUES (?, ?, ?)';

    // Ejecuta la consulta para insertar en anticipo
    db.query(insertarDeudaQuery, [cortarFecha(fechaPago), valor, idDeuda], (error, resultados) => {
        if (error) {
            console.error('Error en la inserción del pago:', error);
            res.json({ success: false });
        } else {
            console.log('Pago insertado correctamente', resultados);

            if (estado == 'Pagado') {
                const cambiarEstadoQuery = 'Update deudas SET estado = ? WHERE idDeuda = ?'

                db.query(cambiarEstadoQuery, [estado, idDeuda], (err, res) => {
                    if (error) {
                        console.error('Error en la modificacion del estado:', error);
                        res.json({ success: false })
                    } else {
                        console.log('Deuda pagada correctamente', resultados);
                    }
                })
            }

            // Llamar a la función para insertar en registro
            insertarRegistro('idDeuda', cortarFecha(fechaPago), "Abono de Deuda", valor, idDeuda, false, (errorRegistro, resultadosRegistro) => {
                if (errorRegistro) {
                    console.error('Error al insertar en registro:', errorRegistro);
                    res.json({ success: false });
                } else {
                    console.log('Registro insertado correctamente', resultadosRegistro);
                    res.json({ success: true });
                }
            });
        }
    });
});

// Ruta para la busqueda de movimientos de deudas
app.get('/obtener-movimientos/:idDeuda', (req, res) => {
    const idDeuda = req.params.idDeuda;
    const consulta = `
        SELECT * FROM movimientosdeuda WHERE idDeuda = ?
        `;

    db.query(consulta, [idDeuda], (error, resultados) => {
        if (error) {
            console.error('Error al obtener la lista de movimientos:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            // Formatear la fecha antes de enviarla como respuesta
            const data = resultados.map(movimientosdeuda => ({
                ...movimientosdeuda,
                fechaPago: formatarFecha(movimientosdeuda.fechaPago),
            }));

            console.log(data);
            res.json(data);
        }
    });
});

// Ruta para la inserción de anticipos
app.post('/insertar-anticipo', (req, res) => {
    const { idObra, valor, fecha, descripcion } = req.body;

    // Consulta SQL para la inserción en anticipo
    const insertarAnticipoQuery = 'INSERT INTO `anticipo` (`idObra`, `valor`) VALUES (?, ?)';

    // Ejecuta la consulta para insertar en anticipo
    db.query(insertarAnticipoQuery, [idObra, valor], (error, resultados) => {
        if (error) {
            console.error('Error en la inserción de anticipos:', error);
            res.json({ success: false });
        } else {
            console.log('Anticipo insertado correctamente', resultados);

            // Obtener el último ID insertado
            const idAnticipo = resultados.insertId;

            // Llamar a la función para insertar en registro
            insertarRegistro('idAnticipo', cortarFecha(fecha), descripcion, valor, idAnticipo, null, (errorRegistro, resultadosRegistro) => {
                if (errorRegistro) {
                    console.error('Error al insertar en registro:', errorRegistro);
                    res.json({ success: false });
                } else {
                    console.log('Registro insertado correctamente', resultadosRegistro);
                    res.json({ success: true });
                } valor
            });
        }
    });
});

// Ruta para la búsqueda de anticipos según la obra
app.get('/obtener-anticipos/:idObra', (req, res) => {
    const idObra = req.params.idObra;

    const consulta = `
        SELECT
            anticipo.valor AS valor,
            NULL AS gasto,
            obras.total AS totalObra
        FROM anticipo
        INNER JOIN obras ON anticipo.idObra = obras.idObra
        WHERE anticipo.idObra = ?

        UNION

        SELECT
            NULL AS valor,
            gastos.valor AS gasto,
            obras.total AS totalObra
        FROM gastos
        INNER JOIN obras ON gastos.idObra = obras.idObra
        WHERE gastos.idObra = ?`;

    db.query(consulta, [idObra, idObra], (error, resultados) => {
        if (error) {
            console.error('Error al obtener la lista de anticipos y gastos:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            console.log(resultados);
            res.json(resultados);
        }
    });
});


// Ruta para la inserción de roles
app.post('/insertar-rol', (req, res) => {
    const { idEmpleado, valor, anticipo, fechaFormateada, descripcion, observaciones, fechaPago } = req.body;

    // Consulta SQL para la inserción en anticipo
    const insertarRolQuery = 'INSERT INTO `roldepago` (`idEmpleado`, `valor`, `anticipo`, `observaciones`, `fechaInicio` ) VALUES (?, ?, ?, ?, ?)';

    // Ejecuta la consulta para insertar en anticipo
    db.query(insertarRolQuery, [idEmpleado, valor, anticipo, observaciones, cortarFecha(fechaFormateada)], (error, resultados) => {
        if (error) {
            console.error('Error en la inserción de roles:', error);
            res.json({ success: false });
        } else {
            console.log('Rol de pagos insertado correctamente', resultados);

            // Obtener el último ID insertado
            const idRol = resultados.insertId;

            // Llamar a la función para insertar en registro
            insertarRegistro('idRol', cortarFecha(fechaPago), descripcion, valor, idRol, null, (errorRegistro, resultadosRegistro) => {
                if (errorRegistro) {
                    console.error('Error al insertar en registro:', errorRegistro);
                    res.json({ success: false });
                } else {
                    console.log('Registro insertado correctamente', resultadosRegistro);
                    res.json({ success: true });
                }
            });
        }
    });
});

// Ruta para la inserción de obras
app.post('/insertar-obra', (req, res) => {
    const { cedula, numero, descripcion, total, fechaInicio, estado } = req.body;

    // Consulta SQL para la inserción
    const consulta = 'INSERT INTO `obras` (`cedula`, `numero`, `descripcion`, `total`, `fechaInicio`, `estado`)VALUES (?, ?, ?, ?, ?, ?)';

    // Ejecuta la consulta con los datos proporcionados
    db.query(consulta, [cedula, numero, descripcion, total, cortarFecha(fechaInicio), estado], (error, resultados) => {
        if (error) {
            console.error('Error en la inserción de obra:', error);
            res.json({ success: false });
        } else {
            console.log('Obra insertada correctamente', resultados);
            res.json({ success: true });
        }
    });
});

// Ruta para la busqueda de obras
app.get('/obtener-obras', (req, res) => {
    const consulta = `
        SELECT obras.*, persona.nombres, persona.apellidos
        FROM obras
        JOIN persona ON obras.cedula = persona.cedula`;

    db.query(consulta, (error, resultados) => {
        if (error) {
            console.error('Error al obtener la lista de obras:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            // Formatear la fecha antes de enviarla como respuesta
            const obrasFormateadas = resultados.map(obra => ({
                ...obra,
                fechaInicio: formatarFecha(obra.fechaInicio),
            }));

            console.log(obrasFormateadas);
            res.json(obrasFormateadas);
        }
    });
});

// Ruta para busqueda de obras con cedula
app.get('/obtener-obra/:cedula', (req, res) => {
    const cedula = req.params.cedula;

    // Consulta SQL para obtener la cantidad de obras asociadas a la cédula
    const consulta = 'SELECT COUNT(*) as cantidad FROM obras WHERE cedula = ?';

    db.query(consulta, [cedula], (error, resultados) => {
        if (error) {
            console.error('Error al obtener la cantidad de obras:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            const cantidadObras = resultados[0].cantidad || 0;
            res.json({ cantidadObras });
        }
    });
});

// Ruta para busqueda de obras con cedula
app.get('/obtener-obras-cedula/:cedula', (req, res) => {
    const cedula = req.params.cedula;

    // Consulta SQL para obtener la cantidad de obras asociadas a la cédula
    const consulta = 'SELECT * FROM obras WHERE cedula = ?';

    db.query(consulta, [cedula], (error, resultados) => {
        if (error) {
            console.error('Error al obtener las obras:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            console.log(resultados)
            res.json(resultados);
        }
    });
});

app.post('/modificar-estado-obra', (req, res) => {
    const { idObra, estado } = req.body;

    const consulta = 'UPDATE `obras` SET `estado` = ? WHERE `idObra` = ?';

    db.query(consulta, [estado, idObra], (error, resultados) => {
        if (error) {
            console.error('Error al modificar la obra: ', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor al modificar' });
        } else {
            console.log("Estado modificado correctamente" + estado + idObra);
            res.json({ success: true });
        }
    })
});

// Ruta para obtener los registros de los 4 tipos
app.get('/obtener-registros', (req, res) => {
    const consulta = `
    SELECT
    registro.*,
    TRUNCATE(COALESCE(saldo.valor, anticipo.valor, gastos.valor, roldepago.valor, deudas.valor), 2) AS valor,
    CASE
        WHEN registro.idSaldo > 0 THEN 'Saldo'
        WHEN registro.idAnticipo > 0 THEN 'Anticipo'
        WHEN registro.idGasto > 0 THEN 'Gasto'
        WHEN registro.idRol > 0 THEN 'Rol de Pago'
        WHEN registro.idDeuda > 0 THEN 'Deuda'
    END AS tipo
    FROM registro
        LEFT JOIN saldo ON registro.idSaldo = saldo.idSaldo
        LEFT JOIN anticipo ON registro.idAnticipo = anticipo.idAnticipo
        LEFT JOIN gastos ON registro.idGasto = gastos.idGasto
        LEFT JOIN roldepago ON registro.idRol = roldepago.idRol
        LEFT JOIN deudas ON registro.idDeuda = deudas.idDeuda
        ORDER BY fecha
    `;

    db.query(consulta, (error, resultados) => {
        if (error) {
            console.error('Error al obtener la lista de registros', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            // Formatear la fecha antes de enviarla como respuesta
            const registrosFormateados = resultados.map(registro => ({
                ...registro,
                fecha: formatarFecha(registro.fecha),
            }));

            console.log(registrosFormateados);
            res.json(registrosFormateados);
        }
    });
});

// Ruta para obtener los registros de gasto y anticipo de una obra específica
app.get('/obtener-registro-obra/:idObra', (req, res) => {
    const idObra = req.params.idObra;

    const consulta = `
    SELECT
    registro.idRegistro,
    registro.idGasto,
    registro.idAnticipo,
    gastos.valor AS gasto,
    COALESCE(anticipo.valor, saldo.valor) AS valor
FROM 
    registro
LEFT JOIN 
    gastos ON registro.idGasto = gastos.idGasto AND gastos.idObra = ?
LEFT JOIN 
    anticipo ON registro.idAnticipo = anticipo.idAnticipo AND anticipo.idObra = ?
LEFT JOIN
    saldo ON registro.idSaldo = saldo.idSaldo AND saldo.idObra = ?
WHERE
    (registro.idGasto IS NOT NULL OR registro.idAnticipo IS NOT NULL OR registro.idSaldo IS NOT NULL) AND
    (gastos.valor IS NOT NULL OR anticipo.valor IS NOT NULL OR saldo.valor IS NOT NULL);
    `;

    db.query(consulta, [idObra, idObra, idObra], (error, resultados) => {
        if (error) {
            console.error('Error al obtener los registros de gastos y anticipos', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            // Formatear los resultados antes de enviarlos como respuesta
            const registrosFormateados = resultados.map(registro => ({
                gasto: registro.gasto,
                valor: registro.valor
            }));

            console.log(registrosFormateados);
            res.json(registrosFormateados);
        }
    });
});

// Ruta para la insercion de proveedores
app.post('/insertar-proveedor', (req, res) => {
    const { nombre, telefono, celular, direccion } = req.body;

    // Consulta SQL para la inserción
    const consulta = 'INSERT INTO `proveedor` (`nombre`, `telefono`, `celular`, `direccion`) VALUES (?, ?, ?, ?)';

    console.log('Consulta SQL:', consulta);

    // Ejecuta la consulta con los datos proporcionados
    db.query(consulta, [nombre, telefono, celular, direccion], (error, resultados) => {
        if (error) {
            console.error('Error en la inserción del proveedor:', error);
            res.json({ success: false });
        } else {
            console.log('Proveedor insertado correctamente');
            res.json({ success: true });
        }
    });
});

// Ruta para obtener la lista de proveedores
app.get('/obtener-proveedor/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const consulta = `SELECT * FROM proveedor WHERE nombre = ?`;

    db.query(consulta, [nombre], (error, resultados) => {
        if (error) {
            console.error('Error al obtener la lista de proveedores:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            console.log(resultados);
            res.json(resultados);
        }
    });
});

// Ruta para obtener la lista de proveedores
app.get('/obtener-proveedor-id/:idProveedor', (req, res) => {
    const idProveedor = req.params.idProveedor;
    const consulta = `SELECT * FROM proveedor WHERE idProveedor = ?`;

    db.query(consulta, [idProveedor], (error, resultados) => {
        if (error) {
            console.error('Error al obtener la lista de proveedores:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            console.log(resultados);
            res.json(resultados);
        }
    });
});

app.post('/editar-proveedor', (req, res) => {
    const { idProveedor, nombre, celular, telefono, direccion } = req.body;

    const consulta = 'UPDATE `proveedor` SET `nombre` = ?, `celular` = ?, `telefono` = ?, `direccion` = ? WHERE `idProveedor` = ?';

    db.query(consulta, [nombre, celular, telefono, direccion, idProveedor], (error, resultados) => {
        if (error) {
            console.error('Error al editar el proveedor: ', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor al modificar' });
        } else {
            console.log("Proveedor modificado correctamente");
            res.json({ success: true });
        }
    })
});

// Ruta para obtener la lista de proveedores
app.get('/obtener-proveedores', (req, res) => {
    const consulta = `SELECT * FROM proveedor`;

    db.query(consulta, (error, resultados) => {
        if (error) {
            console.error('Error al obtener la lista de proveedores:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            console.log(resultados);
            res.json(resultados);
        }
    });
});

// Ruta para la insercion de facturas de compra con gastos
app.post('/insertar-factura-compra', (req, res) => {
    const { idFacturaCompra, idProveedor, fecha, valor, descripcion, idObra } = req.body;

    // Consulta SQL para la inserción de la factura de compra
    const consultaFacturaCompra = 'INSERT INTO `facturacompra` (`idFacturaCompra`, `idProveedor`, `fecha`, `valor`) VALUES (?, ?, ?, ?)';

    // Ejecutar la consulta de la factura de compra
    db.query(consultaFacturaCompra, [idFacturaCompra, idProveedor, cortarFecha(fecha), valor], (errorFacturaCompra, resultadosFacturaCompra) => {
        if (errorFacturaCompra) {
            console.error('Error en la inserción de la factura de compra:', errorFacturaCompra);
            res.json({ success: false });
        } else {
            // Consulta SQL para la inserción del gasto
            const consultaGasto = 'INSERT INTO `gastos` (`valor`, `idFacturaCompra`, `idObra`) VALUES (?, ?, ?)';

            // Ejecutar la consulta del gasto
            db.query(consultaGasto, [valor, idFacturaCompra, idObra], (errorGasto, resultadosGasto) => {
                if (errorGasto) {
                    console.error('Error en la inserción del gasto:', errorGasto);
                    res.json({ success: false });
                } else {
                    const idGasto = resultadosGasto.insertId;
                    // Llamar a la función para insertar en registro
                    insertarRegistro('idGasto', cortarFecha(fecha), descripcion, valor, idGasto, null, (errorRegistro, resultadosRegistro) => {
                        if (errorRegistro) {
                            console.error('Error al insertar en registro:', errorRegistro);
                            res.json({ success: false });
                        } else {
                            console.log('Registro insertado correctamente', resultadosRegistro);
                            res.json({ success: true });
                        }
                    });
                }

            });
        }
    });
});

// Ruta para la insercion de facturas de compra
app.post('/insertar-gasto', (req, res) => {
    const { valor, fecha, descripcion, idObra, idEmpleado } = req.body;

    // Consulta SQL para la inserción
    const consulta = 'INSERT INTO `gastos` (`valor`, `idObra`, `idEmpleado`) VALUES (?, ?, ?)';

    console.log('Consulta SQL:', consulta);

    // Ejecuta la consulta con los datos proporcionados
    db.query(consulta, [valor, idObra, idEmpleado], (error, resultados) => {
        if (error) {
            console.error('Error en la inserción del gasto:', error);
            res.json({ success: false });
        } else {
            // Llamar a la función para insertar en registro
            insertarRegistro('idGasto', cortarFecha(fecha), descripcion, valor, resultados.insertId, null, (errorRegistro, resultadosRegistro) => {
                if (errorRegistro) {
                    console.error('Error al insertar en registro:', errorRegistro);
                    res.json({ success: false });
                } else {
                    console.log('Registro insertado correctamente', resultadosRegistro);
                    res.json({ success: true });
                }
            });
        }
    });
});

// Ruta para la insercion de productos
app.post('/insertar-producto', (req, res) => {
    const { nombre, precio, existencias, idProveedor } = req.body;

    // Consulta SQL para la inserción
    const consulta = 'INSERT INTO `producto` (`nombre`, `precio`, `existencias`, `idProveedor`) VALUES (?, ?, ?, ?)';

    console.log('Consulta SQL:', consulta);

    // Ejecuta la consulta con los datos proporcionados
    db.query(consulta, [nombre, precio, existencias, idProveedor], (error, resultados) => {
        if (error) {
            console.error('Error en la inserción del producto:', error);
            res.json({ success: false });
        } else {
            console.log('Productos insertado correctamente');
            res.json({ success: true });
        }
    });
});

//Ruta para obtener productos
app.get('/obtener-productos', (req, res) => {
    const consulta = `SELECT producto.*, proveedor.nombre AS proveedor FROM producto JOIN proveedor ON producto.idProveedor = proveedor.idProveedor`;

    db.query(consulta, (error, resultados) => {
        if (error) {
            console.error('Error al obtener la lista de productos:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            console.log(resultados);
            res.json(resultados);
        }
    });
});

app.get('/obtener-producto/:idProducto', (req, res) => {
    const idProducto = req.params.idProducto;

    // Consulta SQL para obtener la cantidad de obras asociadas a la cédula
    const consulta = 'SELECT * FROM producto WHERE idProducto = ?';

    db.query(consulta, [idProducto], (error, resultados) => {
        if (error) {
            console.error('Error al obtener el producto:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            console.log(resultados);
            res.json(resultados);
        }
    });
});

app.post('/add-existencias-producto', (req, res) => {
    const { idProducto, cantidad } = req.body;
    const consulta = 'UPDATE `producto` SET `existencias` = ? WHERE `idProducto` = ?';

    db.query(consulta, [cantidad, idProducto], (error, resultados) => {
        if (error) {
            console.error('Error al modificar el producto: ', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor al modificar' });
        } else {
            console.log("Producto modificado correctamente");
            res.json({ success: true });
        }
    })
});

app.post('/modificar-precio-producto', (req, res) => {
    const { idProducto, precio } = req.body;
    const consulta = 'UPDATE `producto` SET `precio` = ? WHERE `idProducto` = ?';

    db.query(consulta, [precio, idProducto], (error, resultados) => {
        if (error) {
            console.error('Error al modificar el producto: ', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor al modificar' });
        } else {
            console.log("Producto modificado correctamente");
            res.json({ success: true });
        }
    })
});

// Ruta para la insercion de empleados
app.post('/insertar-empleado', (req, res) => {
    const { cedula, fecha_entrada, sueldo, estado } = req.body;

    // Consulta SQL para la inserción
    const consulta = 'INSERT INTO empleado (cedula, fecha_entrada, sueldo, estado) VALUES (?, ?, ?, ?)';

    console.log('Consulta SQL:', consulta);

    // Ejecuta la consulta con los datos proporcionados
    db.query(consulta, [cedula, cortarFecha(fecha_entrada), sueldo, estado], (error, resultados) => {
        if (error) {
            console.error('Error en la inserción del empleado:', error);
            res.json({ success: false });
        } else {
            console.log('Empleado insertado correctamente');
            res.json({ success: true });
        }
    });
});

//Ruta para obtener empleados
app.get('/obtener-empleados', (req, res) => {
    const consulta = `
        SELECT
        empleado.*,
        CONCAT(persona.nombres, ' ', persona.apellidos) AS nombres
        FROM empleado
        JOIN persona ON empleado.cedula = persona.cedula
    `;

    db.query(consulta, (error, resultados) => {
        if (error) {
            console.error('Error al obtener la lista de empleados:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            console.log(resultados);
            res.json(resultados);
        }
    });
});

//Ruta para obtener un empleado por cedula
app.get('/obtener-empleado/:cedula', (req, res) => {
    // Recupera la cédula de los parámetros de la URL
    const cedula = req.params.cedula;

    const consulta = `
        SELECT
        empleado.*,
        CONCAT(persona.nombres, ' ', persona.apellidos) AS nombres
        FROM empleado
        JOIN persona ON empleado.cedula = persona.cedula WHERE cedula = ?
    `;

    console.log('Consulta SQL:', consulta);

    // Ejecuta la consulta con la cédula proporcionada
    db.query(consulta, [cedula], (error, resultados) => {
        if (error) {
            console.error('Error al obtener el empleado:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            res.json(resultados);
        }
    });
});

app.post('/modificar-estado-empleado', (req, res) => {
    const { cedula, estado, fecha_salida } = req.body;

    const consulta = 'UPDATE `empleado` SET `estado` = ?, `fecha_salida` = ? WHERE `cedula` = ?';

    db.query(consulta, [estado, cortarFecha(fecha_salida), cedula], (error, resultados) => {
        if (error) {
            console.error('Error al modificar el empleado: ', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor al modificar' });
        } else {
            console.log("Empleado modificado correctamente" + estado + cedula);
            res.json({ success: true });
        }
    })
});

app.post('/reincorporar-empleado', (req, res) => {
    const { cedula, estado, fecha_salida, fecha_entrada } = req.body;
    const consulta = 'UPDATE `empleado` SET `estado` = ?, `fecha_salida` = ?, `fecha_entrada` = ? WHERE `cedula` = ?';

    db.query(consulta, [estado, cortarFecha(fecha_salida), cortarFecha(fecha_entrada), cedula], (error, resultados) => {
        if (error) {
            console.error('Error al modificar el empleado: ', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor al modificar' });
        } else {
            console.log("Empleado modificado correctamente" + estado + cedula);
            res.json({ success: true });
        }
    })
});

app.post('/modificar-sueldo-empleado', (req, res) => {
    const { cedula, sueldo } = req.body;
    const consulta = 'UPDATE `empleado` SET `sueldo` = ? WHERE `cedula` = ?';

    db.query(consulta, [sueldo, cedula], (error, resultados) => {
        if (error) {
            console.error('Error al modificar el empleado: ', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor al modificar' });
        } else {
            console.log("Empleado modificado correctamente");
            res.json({ success: true });
        }
    })
});

//Ruta para insertar facturas
app.post('/insertar-factura', (req, res) => {
    const { factura, detalles } = req.body;

    const facturaConsulta = 'INSERT INTO `factura`(`idFactura`, `cedula`, `fecha`, `subtotal`, `iva`, `descuento`, `total`, `estado`, `idObra`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(facturaConsulta, [factura.idFactura, factura.cedula, cortarFecha(factura.fecha), factura.subtotal, factura.iva, 0, factura.total, factura.estado, factura.idObra], (error, resultados) => {
        if (error) {
            console.error('Error en la inserción de la factura:', error);
            res.json({ success: false });
        } else {
            console.log('Factura insertada correctamente');

            if (factura.idObra != null) {
                const finalObraConsulta = 'UPDATE obras SET estado="Completado" WHERE idObra= ?'
                db.query(finalObraConsulta, [factura.idObra], (error, resultados) => {
                    if (error) {
                        console.error('Error en la inserción de la factura:', error);
                        res.json({ success: false });
                    } else {
                        console.log('Obra Modificada Correctamente');
                    }
                });
            }

            ingresarSaldo(factura.idObra, factura.idFactura, factura.valor, cortarFecha(factura.fecha), "Factura de venta", (errorRegistro, resultadosRegistro) => {
                if (errorRegistro) {
                    console.error('Error al insertar en registro:', errorRegistro);
                    res.json({ success: false });
                } else {
                    console.log('Registro insertado correctamente', resultadosRegistro);
                }
            });

            // Ahora insertamos los detalles de la factura
            const detallesConsulta = 'INSERT INTO `detallefactura`(`idFactura`, `numero`, `cantidad`, `descripcion`, `precioTotal`) VALUES (?, ?, ?, ?, ?)';

            detalles.forEach((detalle, index) => {
                const numeroDetalle = index + 1;  // Empieza desde 1

                db.query(detallesConsulta, [factura.idFactura, numeroDetalle, detalle.cantidad, detalle.nombre, detalle.precioTotal], (errorDetalles) => {
                    if (errorDetalles) {
                        console.error('Error en la inserción del detalle de la factura:', errorDetalles);
                        res.json({ success: false });
                    } else {
                        console.log("ingreso correcto");
                    }
                });
            });
            res.json({ success: true });
        }
    });
});

function ingresarSaldo(idObra, idFactura, valor, fecha, descripcion, callback) {
    if (idObra != "" || idObra != null) {
        const consulta = `INSERT INTO saldo(idObra, idFactura, valor) VALUES (?, ?, ?)`
        db.query(consulta, [idObra, idFactura, valor], (error, resultados) => {
            if (error) {
                console.error('Error al ingresar el saldo');
                res.status(500).json({ success: false, error: 'Error interno del servidor' });
            } else {
                console.log("Ingresando el registro de saldo: " + resultados.insertId)
                insertarRegistro('idSaldo', cortarFecha(fecha), descripcion, valor, resultados.insertId, null, (errorRegistro, resultadosRegistro) => {
                    if (errorRegistro) {
                        console.error('Error al insertar en registro:', errorRegistro);
                        res.json({ success: false });
                    } else {
                        console.log('Registro insertado correctamente', resultadosRegistro);
                    }
                });
                console.log(resultados);
            }
        })
    } else {
        const consulta = `INSERT INTO saldo(idFactura, valor) VALUES (?, ?)`
        db.query(consulta, [idFactura, valor], (error, resultados) => {
            if (error) {
                console.error('Error al ingresar el saldo');
                res.status(500).json({ success: false, error: 'Error interno del servidor' });
            } else {
                console.log("Ingresando el registro de saldo: " + resultados.insertId)
                insertarRegistro('idSaldo', cortarFecha(fecha), descripcion, valor, resultados.insertId, null, (errorRegistro, resultadosRegistro) => {
                    if (errorRegistro) {
                        console.error('Error al insertar en registro:', errorRegistro);
                        res.json({ success: false });
                    } else {
                        console.log('Registro insertado correctamente', resultadosRegistro);
                    }
                });
                console.log(resultados);
            }
        })
    }
}

//Ruta para obtener facturas
app.get('/obtener-facturas', (req, res) => {
    const consulta = `
    SELECT factura.*, CONCAT(persona.nombres, ' ', persona.apellidos) AS nombres
    FROM factura
    JOIN persona ON factura.cedula = persona.cedula`;
    db.query(consulta, (error, resultados) => {
        if (error) {
            console.error('Error al obtener la lista de facturas:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            console.log(resultados);
            res.json(resultados);
        }
    });
});

app.get('/obtener-idFactura', (req, res) => {
    const consulta = `
    SELECT MAX(idFactura) AS idFactura FROM factura;
    `;
    db.query(consulta, (error, resultados) => {
        if (error) {
            console.error('Error al obtener el ultimo index:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            console.log(resultados);
            res.json(resultados);
        }
    });
});

app.get('/obtener-detalle-factura/:idFactura', (req, res) => {
    const idFactura = req.params.idFactura;
    const consulta = 'SELECT * FROM `detallefactura` WHERE idFactura = ?';
    db.query(consulta, [idFactura], (error, resultados) => {
        if (error) {
            console.error('Error al obtener el detalle de la factura:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            console.log(resultados)
            res.json(resultados);
        }
    });
});

app.post('/anular-factura', (req, res) => {
    const { idFactura, estado } = req.body;
    const consulta = 'UPDATE `factura` SET `estado` = ? WHERE `idFactura` = ?';

    db.query(consulta, [estado, idFactura], (error, resultados) => {
        if (error) {
            console.error('Error al anular la factura: ', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor al modificar' });
        } else {
            console.log("Factura anulada " + resultados);
            res.json({ success: true });
        }
    })
});


app.get('/obtener-anticipos-empleado', (req, res) => {
    const { idEmpleado, fecha } = req.query;
    const consulta = `SELECT g.valor, r.fecha, r.descripcion FROM gastos g, registro r WHERE g.idEmpleado = ? AND g.idGasto = r.idGasto AND r.fecha >= ?; `;

    db.query(consulta, [idEmpleado, cortarFecha(fecha)], (error, resultados) => {
        if (error) {
            console.error('Error al obtener los gastos del empleado:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            console.log(resultados);
            res.json(resultados);
        }
    });
});

app.get('/obtener-anticipos-entre', (req, res) => {
    const { idEmpleado, fechaInicio, fechaPago } = req.query;
    const consulta = `SELECT g.valor, r.descripcion, r.fecha from gastos g, registro r WHERE g.idGasto = r.idGasto AND g.idEmpleado = ? AND r.fecha BETWEEN ? AND ?`;

    db.query(consulta, [idEmpleado, cortarFecha(fechaInicio), cortarFecha(fechaPago)], (error, resultados) => {
        if (error) {
            console.error('Error al obtener los anticipos del empleado:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            console.log(resultados);
            res.json(resultados);

            console.log(consulta);
        }
    });
});

app.get('/obtener-roles-empleado/:idEmpleado', (req, res) => {
    const idEmpleado = req.params.idEmpleado;
    //valor: any, fechaInicio: any, fechaPago: any, observaciones: any, anticiposSumados: any
    const consulta = `SELECT rol.valor, rol.fechaInicio, rol.observaciones, rol.anticipo, reg.fecha as fechaPago FROM roldepago rol, registro reg WHERE rol.idEmpleado = ? and rol.idRol = reg.idRol`;

    db.query(consulta, [idEmpleado], (error, resultados) => {
        if (error) {
            console.error('Error al obtener la lista de proveedores:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            console.log(resultados);
            res.json(resultados);
        }
    });
});

// Otras rutas y lógica del servidor...
//Funcion especial para ingreso general de registro en las tablas monetarias
function insertarRegistro(tipo, fecha, descripcion, valor, id, suma, callback) {
    // Consulta SQL para obtener el último registro
    const obtenerUltimoRegistroQuery = 'SELECT saldo FROM registro ORDER BY idRegistro DESC LIMIT 1';

    // Ejecutar la consulta para obtener el último registro
    db.query(obtenerUltimoRegistroQuery, (errorUltimoRegistro, resultadosUltimoRegistro) => {
        if (errorUltimoRegistro) {
            console.error('Error al obtener el último registro:', errorUltimoRegistro);
            return callback(errorUltimoRegistro, null);
        }

        // Obtener el saldo del último registro
        const saldoAnterior = resultadosUltimoRegistro[0]?.saldo || 0;

        // Convertir las cadenas a números
        const saldoAnteriorNumero = parseFloat(saldoAnterior);
        const valorNumero = parseFloat(valor);

        // Calcular el nuevo saldo basado en el tipo de operación
        let nuevoSaldo;

        if (tipo === 'idAnticipo' || tipo === 'idSaldo' || (tipo === 'idDeuda' && suma === true)) {
            // Sumar el valor al saldo anterior
            nuevoSaldo = saldoAnteriorNumero + valorNumero;
        } else {
            // Restar el valor al saldo anterior
            nuevoSaldo = saldoAnteriorNumero - valorNumero;
        }

        // Crear la consulta SQL dinámicamente
        const insertRegistroQuery = `INSERT INTO registro(fecha, descripcion, saldo, ${tipo}) VALUES (?, ?, ?, ?)`;

        // Parámetros para la consulta
        const parametros = [fecha, descripcion, nuevoSaldo, id];

        // Ejecutar la consulta para insertar en registro
        db.query(insertRegistroQuery, parametros, (errorInsertarRegistro, resultadosInsertarRegistro) => {
            if (errorInsertarRegistro) {
                console.error(`Error al insertar en registro con tipo ${tipo}:`, errorInsertarRegistro);
                return callback(errorInsertarRegistro, null);
            }

            console.log(`Registro insertado en ${tipo} correctamente`);
            callback(null, resultadosInsertarRegistro);
            console.log(parametros);
        });
    });
}

//Funcion especial para devolver formatos de fecha correctos
function formatarFecha(fecha) {
    const date = new Date(fecha);
    const año = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0');  // Sumar 1 ya que los meses comienzan desde 0
    const dia = String(date.getDate()).padStart(2, '0');

    return `${año}/${mes}/${dia}`;
}

function cortarFecha(str) {
    if (str.length > 10) {
        return str.substring(0, 10);
    } else {
        return str;
    }
}

/*
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
*/
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});