const {Router} = require('express');
const router = Router();
const { auth } = require('express-oauth2-jwt-bearer');
const checkJwt = auth({
  audience: 'https://juanbunesapirest.herokuapp.com/',
  issuerBaseURL: `https://dev-9ic69wp8.us.auth0.com/`,
});

const { getInicio, getProductos, getProductosByID, getProductosByNombre, getProductosByCategoria, getCategorias, getCategoriaByID, getCategoriaByNombre, getComentariosByProducto, createComentario, deleteComentario, editComentario } = require('../controllers/index.controller');

//Inicio
router.get('/',getInicio);

//Productos
router.get('/productos',getProductos);
router.get('/productos/id/:id',getProductosByID);
router.get('/productos/nombre/:nombre_producto',getProductosByNombre);
router.get('/productos/categoria/:categoria',getProductosByCategoria);

//Categorias
router.get('/categorias',getCategorias);
router.get('/categorias/id/:id',getCategoriaByID);
router.get('/categorias/nombre/:nombre_categoria',getCategoriaByNombre);

//Comentarios
router.get('/comentarios/producto/:producto_id',getComentariosByProducto);
router.post('/comentarios/crear/:producto_id',checkJwt,createComentario);
router.delete('/comentarios/eliminar/:comentario_id',checkJwt,deleteComentario);
router.put('/comentarios/editar/:comentario_id',checkJwt,editComentario);

module.exports = router;