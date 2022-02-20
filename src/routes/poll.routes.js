const {Router} = require('express');
const app = Router();

const {auth} =require('../middlewares/auth');

const Pollcontroller = require('../controllers/poll.controller')

/** Crear Una Nueva Encuesta*/
app.post('/api/poll',auth,Pollcontroller.newPoll);

/**Todas las Encuestas Almacenadas en la Base de Datos */
app.get('/api/allPoll',Pollcontroller.getAllPoll)

/**Dado el id de una encuesta, Regresa un JSON con detalles de la encuesta */
app.get('/api/poll/:id',Pollcontroller.getPollById)

/**Elimina Permanetemente una Encuesta */
app.delete('/api/poll/:id',Pollcontroller.DeletePoll)

/**Añade una nueva pregunta, con sus opciones correspondientes a una encuesta */
app.post('/api/addquestion/:id',auth,Pollcontroller.addQuestion)

/**Dado el Id de una encuesta, regresa un JSON con sus estadisticas */
app.get('/api/polls/stats/:id',Pollcontroller.getPollStats)

/**Todas las encuestas Activas, a un no vencidas */
app.get('/api/polls/active/:id',Pollcontroller.getPollsActive)

/**dado el Id de una encuesta, regresa un JSON con las preguntas y sus correspondientes opciones de forma resumida */
app.get('/api/polls/questions/:id',Pollcontroller.getSimpleQuestions)

//Dado el Id de una encuesta esta obtendra las respuestas para esta ser completada
app.post('/api/answer/Poll/:id_poll',Pollcontroller.PostReplyPoll);

//Pasandole el id de un usuario se obtendran todas las encuestas que este ha creado
app.get('/api/userAllpoll/:id',Pollcontroller.PostUserAllPoll);

module.exports  = app;