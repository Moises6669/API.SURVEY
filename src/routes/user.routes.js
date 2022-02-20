const {Router} = require('express');
// const userSchema = require('../schemas/user.schema');
const validate = require('../middlewares/validateData');
const {auth} =require('../middlewares/auth');
const app = Router();

const controllers = require('../controllers/user.controllers');

/**Obtener todos los usuarios de estado activo */
app.get('/api/users',controllers.GetAllUser);

/**Traer unicamnete un usuairo por su Id */
app.get('/api/users/:id',controllers.GetOneUser);

/**Registro de Usuarios */
app.post('/api/signup',controllers.PostUser);


/**Actualizacion de Perfil de usuarios */
app.put('/api/users/:id',auth,controllers.PutUser);

/**Eliminacion de usuario */
app.delete('/api/users/:id',controllers.DeleteUser);


module.exports  = app; 