const {Router} = require('express');
const app = Router();

const {auth} =require('../middlewares/auth');

const routes = require('../controllers/login.controller');


/**Inicio de Secion de los Usuarios */
app.post('/api/login',routes.Login);

/**Cierre de sesion y Eliminacion de Token */
app.get('/api/logout',auth,routes.logout);

/**Perfil del Usuario */
app.get('/api/profile',auth,routes.profile);

module.exports = app;