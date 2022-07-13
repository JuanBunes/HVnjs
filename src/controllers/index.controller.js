const jwt_decode = require('jwt-decode');
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		require: true, 
		rejectUnauthorized: false
	}
});

//Inicios
const getInicio = async (req,res) =>{
	res.json({ mensaje: 'Bienvenido a la API de Huella Verde' });
}

//Productos
const getProductos = async (req,res) =>{
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	const response = await pool.query('SELECT * FROM productos');
	if(response.rows.length==0){
		res.status(404).send({ error: 'Productos no encontrados!' });
	}
	else{
		res.json(response.rows);
	}
}

const getProductosByID = async (req,res) =>{
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	const id = req.params.id;
	if (onlyNumbers(id)){
		const response = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
		if(response.rows.length==0){
			res.status(404).send({ error: 'Producto no encontrado!' });
		}
		else{
			res.json(response.rows);
		}
	}
	else{
		res.status(405).send({ error: 'Entrada Invalida!' });
	}
}

const getProductosByNombre = async (req,res) =>{
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	const nombre_producto = req.params.nombre_producto;
	const response = await pool.query('SELECT * FROM productos WHERE nombre_producto = $1', [nombre_producto]);
	if(response.rows.length==0){
		res.status(404).send({ error: 'Productos no encontrados!' });
	}
	else{
		res.json(response.rows);
	}
}

//El decimal se marca con . (punto) ej: 1500 y 1500.00 son validos pero 1500,00 no es valido.
/*
const getProductosByPrecio = async (req,res) =>{
	const precio = req.params.precio;
	if (onlyNumbers(precio)){
		const response = await pool.query('SELECT * FROM productos WHERE precio = $1', [precio]);
		if(response.rows.length==0){
			res.status(404).send({ error: 'Productos no encontrados!' });
		}
		else{
			res.json(response.rows);
		}
	}
	else{
		res.status(405).send({ error: 'Entrada Invalida!' });
	}

}
*/

const getProductosByCategoria = async (req,res) =>{
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	const categoria = req.params.categoria;
	const response = await pool.query('SELECT * FROM productos WHERE categoria = $1', [categoria]);
	if(response.rows.length==0){
		res.status(404).send({ error: 'Productos no encontrados!' });
	}
	else{
		res.json(response.rows);
	}
}

//Categorias
const getCategorias = async (req,res) =>{
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    
	const response = await pool.query('SELECT * FROM categorias');
	if(response.rows.length==0){
		res.status(404).send({ error: 'Categorias no encontradas!' });
	}
	else{
		res.json(response.rows);
	}
}

const getCategoriaByID = async (req,res) =>{
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    
	const id = req.params.id;
	if (onlyNumbers(id)){
		const response = await pool.query('SELECT * FROM categorias WHERE id = $1', [id]);
		if(response.rows.length==0){
			res.status(404).send({ error: 'Categoria no encontrada!' });
		}
		else{
			res.json(response.rows);
		}
	}
	else{
		res.status(405).send({ error: 'Entrada Invalida!' });
	}
}

const getCategoriaByNombre = async (req,res) =>{
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    
	const nombre_categoria = req.params.nombre_categoria;
	const response = await pool.query('SELECT * FROM categorias WHERE nombre_categoria = $1', [nombre_categoria]);
	if(response.rows.length==0){
		res.status(404).send({ error: 'Categoria no encontrada!' });
	}
	else{
		res.json(response.rows);
	}
}

//Comentarios
const getComentariosByProducto = async (req,res) =>{
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    
	const producto_id = req.params.producto_id;
	if (onlyNumbers(producto_id)){
		const response = await pool.query('SELECT * FROM comentarios WHERE producto_id = $1', [producto_id]);
		if(response.rows.length==0){
			res.status(404).send({ error: 'No existen comentarios!' });
		}
		else{
			res.json(response.rows);
		}
	}
	else{
		res.status(405).send({ error: 'Entrada Invalida!' });
	}
}

const createComentario = async (req,res) =>{
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow', 'GET,POST,OPTIONS,PUT,DELETE');
    
	const {comentario, autor, email} = req.body;
	const producto_id = req.params.producto_id;
	if (onlyNumbers(producto_id)){
		try{
			var today = new Date();
			const response = await pool.query('INSERT INTO comentarios (comentario, autor, email, producto_id, created_at) VALUES ($1, $2, $3, $4, $5)', [comentario, autor, email, producto_id, today]);
			res.status(200).send('Comentario creado');
		}
		catch{
			return res.status(503).send({ error: 'Algo salio mal!' });
		}
	}
	else{
		res.status(405).send({ error: 'Entrada Invalida!' });
	}
}

const deleteComentario = async (req,res) =>{
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    const jsonAuth = jwt_decode(req.headers.authorization);
    const permiso = jsonAuth["permissions"];

    if(permiso[0]=="gestionar:comentario"){
		const comentario_id = req.params.comentario_id;
		if (onlyNumbers(comentario_id)){
			try{
				const response = await pool.query('DELETE FROM comentarios WHERE id = $1', [comentario_id]);
				if(response.rowCount!=0){
					res.status(200).send('Comentario eliminado');
				}
				else{
					res.status(404).send('Comentario no encontrado');
				}
			}
			catch{
				return res.status(503).send({ error: 'Algo salio mal!' });
			}
		}
		else{
			res.status(405).send({ error: 'Entrada Invalida!' });
		}
	}
	else{
		res.status(403).send({ error: 'Sin permisos' });
	}

}

const editComentario = async (req,res) =>{
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    
	const {comentario, autor} = req.body;
	const comentario_id = req.params.comentario_id;
	const jsonAuth = jwt_decode(req.headers.authorization);
    const permiso = jsonAuth["permissions"];

    if(permiso[0]=="gestionar:comentario"){
		if (onlyNumbers(comentario_id)){
			try{
				var today = new Date();
				const response = await pool.query('UPDATE comentarios SET comentario = $1, autor = $2, updated_at = $3 WHERE id = $4', [comentario, autor, today, comentario_id]);
				if(response.rowCount!=0){
					res.status(200).send('Comentario editado');
				}
				else{
					res.status(404).send('Comentario no encontrado');
				}
			}
			catch{
				return res.status(503).send({ error: 'Algo salio mal!' });
			}
		}
		else{
			res.status(405).send({ error: 'Entrada Invalida!' });
		}
	}
	else{
		res.status(403).send({ error: 'Sin permisos' });
	}
}





function onlyNumbers(str) {
	return /^[0-9]+$/.test(str);
}

module.exports = {
	getInicio,
	getProductos,
	getProductosByID,
	getProductosByNombre,
	getProductosByCategoria,
	getCategorias,
	getCategoriaByID,
	getCategoriaByNombre,
	getComentariosByProducto,
	createComentario,
	deleteComentario,
	editComentario
}
