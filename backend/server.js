const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete CORS

const app = express();

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
            res.json(resultados);
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
            insertarRegistro('idAnticipo', fecha, descripcion, valor, idAnticipo, (errorRegistro, resultadosRegistro) => {
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

// Ruta para la búsqueda de anticipos según la obra
app.get('/obtener-anticipos/:idObra', (req, res) => {
    const idObra = req.params.idObra;

    const consulta = `
        SELECT 
            anticipo.*,
            obras.total AS totalObra
        FROM anticipo
        INNER JOIN obras ON anticipo.idObra = obras.idObra
        WHERE anticipo.idObra = ? ORDER BY anticipo.idAnticipo ASC`;

    db.query(consulta, [idObra], (error, resultados) => {
        if (error) {
            console.error('Error al obtener la lista de anticipos:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        } else {
            console.log(resultados);
            res.json(resultados);
        }
    });
});

// Ruta para la inserción de roles
app.post('/insertar-rol', (req, res) => {
    const { idEmpleado, valor, fecha, descripcion, observaciones } = req.body;

    // Consulta SQL para la inserción en anticipo
    const insertarRolQuery = 'INSERT INTO `roldepago` (`idEmpleado`, `valor`, `observaciones` ) VALUES (?, ?, ?)';

    // Ejecuta la consulta para insertar en anticipo
    db.query(insertarRolQuery, [idEmpleado, valor, observaciones], (error, resultados) => {
        if (error) {
            console.error('Error en la inserción de roles:', error);
            res.json({ success: false });
        } else {
            console.log('Rol de pagos insertado correctamente', resultados);

            // Obtener el último ID insertado
            const idRol = resultados.insertId;

            // Llamar a la función para insertar en registro
            insertarRegistro('idRol', fecha, descripcion, valor, idRol, (errorRegistro, resultadosRegistro) => {
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
    const { cedula, numero, descripcion, total, fechaInicio } = req.body;

    // Consulta SQL para la inserción
    const consulta = 'INSERT INTO `obras` (`cedula`, `numero`, `descripcion`, `total`, `fechaInicio`)VALUES (?, ?, ?, ?, ?)';

    // Ejecuta la consulta con los datos proporcionados
    db.query(consulta, [cedula, numero, descripcion, total, fechaInicio], (error, resultados) => {
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

// Ruta para obtener los registros de los 4 tipos
app.get('/obtener-registros', (req, res) => {
    const consulta = `
    SELECT
    registro.*,
    COALESCE(saldo.valor, anticipo.valor, gastos.valor, roldepago.valor) AS valor,
    CASE
        WHEN registro.idSaldo > 0 THEN 'Saldo'
        WHEN registro.idAnticipo > 0 THEN 'Anticipo'
        WHEN registro.idGasto > 0 THEN 'Gasto'
        WHEN registro.idRol > 0 THEN 'Rol de Pago'
    END AS tipo
    FROM registro
        LEFT JOIN saldo ON registro.idSaldo = saldo.idSaldo
        LEFT JOIN anticipo ON registro.idAnticipo = anticipo.idAnticipo
        LEFT JOIN gastos ON registro.idGasto = gastos.idGasto
        LEFT JOIN roldepago ON registro.idRol = roldepago.idRol
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
    const { idFacturaCompra, idProveedor, fecha, valor, descripcion } = req.body;

    // Consulta SQL para la inserción de la factura de compra
    const consultaFacturaCompra = 'INSERT INTO `facturacompra` (`idFacturaCompra`, `idProveedor`, `fecha`, `valor`) VALUES (?, ?, ?, ?)';

    // Ejecutar la consulta de la factura de compra
    db.query(consultaFacturaCompra, [idFacturaCompra, idProveedor, fecha, valor], (errorFacturaCompra, resultadosFacturaCompra) => {
        if (errorFacturaCompra) {
            console.error('Error en la inserción de la factura de compra:', errorFacturaCompra);
            res.json({ success: false });
        } else {
            // Consulta SQL para la inserción del gasto
            const consultaGasto = 'INSERT INTO `gastos` (`idFacturaCompra`, `valor`) VALUES (?, ?)';

            // Ejecutar la consulta del gasto
            db.query(consultaGasto, [idFacturaCompra, valor], (errorGasto, resultadosGasto) => {
                if (errorGasto) {
                    console.error('Error en la inserción del gasto:', errorGasto);
                    res.json({ success: false });
                }
                // Llamar a la función para insertar en registro
                insertarRegistro('idGasto', fecha, descripcion, valor, resultadosGasto.insertId, (errorRegistro, resultadosRegistro) => {
                    if (errorRegistro) {
                        console.error('Error al insertar en registro:', errorRegistro);
                        res.json({ success: false });
                    } else {
                        console.log('Registro insertado correctamente', resultadosRegistro);
                        res.json({ success: true });
                    }
                });
            });
        }
    });
});

// Ruta para la insercion de facturas de compra
app.post('/insertar-gasto', (req, res) => {
    const { valor, fecha, descripcion } = req.body;

    // Consulta SQL para la inserción
    const consulta = 'INSERT INTO `gastos` (`valor`) VALUES (?)';

    console.log('Consulta SQL:', consulta);

    // Ejecuta la consulta con los datos proporcionados
    db.query(consulta, [valor], (error, resultados) => {
        if (error) {
            console.error('Error en la inserción del gasto:', error);
            res.json({ success: false });
        } else {
            // Llamar a la función para insertar en registro
            insertarRegistro('idGasto', fecha, descripcion, valor, resultados.insertId, (errorRegistro, resultadosRegistro) => {
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

// Ruta para la insercion de empleados
app.post('/insertar-producto', (req, res) => {
    const { nombre, precio, precioIva, existencias, idProveedor } = req.body;

    // Consulta SQL para la inserción
    const consulta = 'INSERT INTO `producto` (`nombre`, `precio`, `precioIva`, `existencias`, `estado`, `idProveedor`) VALUES (?, ?, ?, ?, ?, ?)';

    console.log('Consulta SQL:', consulta);

    // Ejecuta la consulta con los datos proporcionados
    db.query(consulta, [nombre, precio, precioIva, existencias, "Activo", idProveedor], (error, resultados) => {
        if (error) {
            console.error('Error en la inserción del producto:', error);
            res.json({ success: false });
        } else {
            console.log('Empleado insertado correctamente');
            res.json({ success: true });
        }
    });
});

//Ruta para obtener productos
app.get('/obtener-productos', (req, res) => {
    const consulta = `SELECT producto.*, proveedor.nombre AS proveedor FROM producto JOIN proveedor ON producto.idProveedor = proveedor.idProveedor`;

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

// Ruta para la insercion de empleados
app.post('/insertar-empleado', (req, res) => {
    const { cedula, fecha_entrada, sueldo } = req.body;

    // Consulta SQL para la inserción
    const consulta = 'INSERT INTO `empleado` (`cedula`, `fecha_entrada`, `sueldo`) VALUES (?, ?, ?)';

    console.log('Consulta SQL:', consulta);

    // Ejecuta la consulta con los datos proporcionados
    db.query(consulta, [cedula, fecha_entrada, sueldo], (error, resultados) => {
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
// Otras rutas y lógica del servidor...

//Funcion especial para ingreso general de registro en las tablas monetarias
function insertarRegistro(tipo, fecha, descripcion, valor, id, callback) {
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

        if (tipo === 'idAnticipo' || tipo === 'idSaldo') {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
