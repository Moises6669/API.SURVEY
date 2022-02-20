/* eslint-disable eqeqeq */
/* eslint-disable no-array-constructor */
/* eslint-disable no-new-object */

var ObjectId = require('mongodb').ObjectID;

const Poll = require('../models/poll.models');

const User = require('../models/user.models');

exports.getAllPoll = (req,res) => {
    Poll.find({}, (err, polls) => {
        if (err)
          return res.status(500).json({
            message: "Error inesperado al traer toadas las encuestas 🧾🤦‍♂️",
            err
          });

        if (!polls)
          return res.status(404).json({
            message: "No hay encuestas disponibles 💔😯"
          });
    
        res.status(200).json({
          ok:true,
          Poll:polls
        });
      });
}

exports.getPollById = (req, res)  => {
    
    let pollId = req.params.id;

    Poll.findById(pollId, (err, poll) => {
      
        if (err)
        return res.status(500).json({
          message: "Error Al tratar de traer la encuesta 😫😲",
          err,
        });

      if (!poll)
        return res.status(404).json({ message: `No existe la encuesta bajo el id "${pollId} 🙄🙁"` });

      return res.status(200).json({
        ok:true,
        Poll:poll,
      });

  });
}

/**
 * getSimpleQuestions => Result
 * 
 * http://localhost:4000/api/questions/:id
 * 
 * {
 *  {
 *    "name":"Pregunta 1",
 *    "options":["1","2","3"]
 *  
 *  },
 *  {
 *    "name":"Pregunta 1",
 *    "options":["1","2","3"]
 *  }
 *  
 * }
 */



exports.getSimpleQuestions = (req, res)  => {
  let pollId = req.params.id;

   //retorna un array de objetos
  let simpleQuestions = new Array();

  Poll.findById(pollId, (err, poll) => {
    
    if (err)
      return res.status(500).json({message: "Error inesperado al simplificar la encuesta 😳🤕",err});
    if (!poll.questions)
      return res.status(404).json({message: "Esta encuesta no tiene preguntas disponibles 😯😯"});

    /*Por cada pregunta, creamos un nuevo objeto con dos propiedades
      el nombre de la pregunta y el arreglo de opciones*/

  for (var i = 0; i < poll.questions.length; i++) {
      let questions = new Object();
      questions.name = String;
      questions.options = new Array();
      questions.name = poll.questions[i].name;
    
      /* recorremos el arreglo de respuestas que nos regresa el modelo
      y añadimos cada una de las opciones al arreglo que enviaremos al usuario*/

      for (var j = 0; j < poll.questions[i].options.length; j++) {
        questions.options.push(poll.questions[i].options[j].option)
      }
      simpleQuestions.push(questions);
    }

    res.status(200).json(simpleQuestions);
  });
}

/**
 * newPoll => Result
 * 
 * si se utliza Postman usar Body/raw
 * 
 * http://localhost:4000/api/poll
 * 
 * 
 * {
  "created_by": "Id del usario",
  "description": "Nombre de la Encuesta",
  "questions":[
    {
      "name": "Existe la Vida",
      "options": ["si","no"],
    },
    {
      "name": "Que hare de mi vida",
      "options": ["no lo se", "morir"],
    }
  ]
}
* 
*/


exports.newPoll = (req, res)  => {
  if (!req.body.description)
    return res
      .status(403)
      .json({
        message: "Se debe proporcionar una descripcion para la encuesta 😅😅",
      });
  if (!req.body.questions)
    return res
      .status(403)
      .json({
        message: "Se debe proporcionar un arreglo de preguntas valido 😕🙃",
      });
  if (req.body.questions.length == 0)
    return res
      .status(403)
      .json({
        message: "Se debe proporcionar un arreglo de preguntas valido 🤗🤨",
      });

  let poll = new Poll();
  let questionsArray = new Array();

  poll.created_by = req.body.created_by;
  poll.description = req.body.description;

  //Convierte cada pregunta en el formato del modelo.

  User.findOne({ _id: poll.created_by }, (Err, userDB) => {
    
    if(!Err && userDB) poll.author = userDB.name;

    for (var i = 0; i < req.body.questions.length; i++)
      questionsArray.push(convertQuestion(req.body.questions[i]));

    poll.questions = questionsArray;

    poll.save((err, pollStored) => {
      
      if (err)
        return res.status(500).json({
          message: "Error al almacenar en la base de datos 😫🥵",
          err,
        });
      
        return res.status(200).json({
        ok: true,
        message: "La encuesta se ha recibido correctamente 😎💥",
        _id: `${pollStored._id}`,
        user: userDB.name,
      });
    });
  });
}
  

exports.getPollsActive = (req, res)  => {
    Poll.find(
      {
        expired_at: {
          $gte: Date.now(),
        },
      },

      (err, polls) => {

        if (err)
          return res.status(500).json({
            message: "Error inesperado al traer las encuestas activas!! 💔😣",
            err,
          });

        if (!polls)
          return res.status(404).json({
            message: "No existen encuestas activas actualmente 😱😱",
          });

        res.status(200).json({ polls });
      }
    );
}

exports.getPollStats = (req, res)  => {

    let pollId = req.params.id;
    let stats = new Array();

    Poll.findById(pollId, (err, poll) => {
      if (err)
        return res.status(500).json({
          message: "Error inesperado al realizar la peticion 😕😕",
          err,
        });

      if (!poll.questions)
        return res.status(404).json({
          message: "Esta encuesta no tiene preguntas disponibles 😅😅",
        });

      for (var i = 0; i < poll.questions.length; i++) {
        let question = new Object();
        question.question = poll.questions[i].name;
        question.stats = moreVoted(poll.questions[i]);
        stats.push(question);
      }
      res.status(200).json(stats);
    });
}

/**
 * AddQuestion => Result
 * 
 * http://localhost:4000/api/addquestion/:id
 * 
 *  "name":"Prueba de Encuesta 5",
  "user":"id Usuario",
  "questionnaires":[{
      "multi":true,
      "question": "ajajdajdja 5",
      "choices":["1","no"]
  }]
}
* 
*/



exports.addQuestion = (req, res)  => {
    let pollId = req.params.id;

    /* validaciones */
  if (!req.body.name)
    return res
      .status(403)
      .json({ message: "Se debe proporcionar un nombre para la pregunta 😑🤡" });
      
  if (!req.body.options)
    return res
      .status(403)
      .json({ message: "Se debe proporcionar un arreglo de preguntas valido 🧐🧐" });

  if (req.body.options.length == 0)
    return res
      .status(403)
      .json({ message: "Se debe proporcionar un arreglo de preguntas valido 🙉🙉" });

  let newQuestion = convertQuestion(req.body);

  //buscamos la encuesta para extraer el arreglo de preguntas
  Poll.findById(pollId, (err, poll) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error inesperado al realizar la peticion", err });
    if (!poll.questions)
      return res
        .status(404)
        .json({ message: "Esta encuesta no tiene preguntas disponibles" });

    let newArray = poll.questions;
    newArray.push(newQuestion);

    //actualizamos solo el array de quest getPollByIdions, añadiendo la nueva pregunta
    Poll.updateOne(
      { _id: pollId },
      { $set: { questions: newArray } },
      (err, rows) => {
        if (err)
          return res
            .status(500)
            .json({
              message: "Error inesperado al realizar la actualización",
              err,
            });
        res.status(200).json({ok:true,message:"Pregunta Integrada Correctamente 🦾😎🙈",rows});
      }
    );
  });
}

exports.PostReplyPoll = (req, res)  => {

  let id_poll = req.params.id_poll;
  let id_questions = req.body.id_questions;
  let id_options = req.body.id_options;

  let user = req.body.user;
  
  try {
    Poll.collection.update(
        { _id: { $eq: ObjectId(id_poll) } },
        { $inc: { "questions.$[perf].options.$[est].rate":1} },
        {
          arrayFilters: [
            { "perf._id": { $eq: ObjectId(id_questions) } },
            { "est._id": { $eq: ObjectId(id_options) } },
          ],
        },
      )
      .then((resp) => {
        User.findOne({ _id: user }, (Err, userDB) => {
          if (Err) {
            return res.status(404).json({
              ok: false,
              message: "Usuario no encontrado",
              error: Err,
            });
          }
          return res.status(200).json({
            ok: true,
            message: "En cuesta respondida Sastifactoriamente 😁👍❤",
            message2: "Respondida por el Usuario 😎😎:",
            user: userDB.name,
          });
        });
      })
      .catch((error) => {
        return res.status(404).json({
          ok: false,
          message: "Sucedio un error al intentar responder la encuesta 😕🤕💔",
        });
      });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Sucedio un error en el servidor 😯😓",
    });
  }
}


exports.DeletePoll = (req, res)  => {
      let pollId = req.params.id;

      Poll.findById(pollId, (err, poll) => {
        if (err)
          return res.status(500).json({
            message: "Error al localizar encuesta!",
            err,
          });
        
        Poll.deleteOne((err) => {
          res.status(200).json({
            message: "Hecho En cuesta Eliminada! 😎🦾",
          });
        });
      });
}

exports.PostUserAllPoll = (req, res)  => {
    
  let id = req.params.id;

  Poll.find({"created_by":id},(Err, userDB)=>{
    
    console.log(id);
    
    if (Err)
      return res.status(500).json({
        message: "Error al localizar las encuesta! 😭😢🤯",
        Err,
      });

      res.status(200).json({
        ok: true,
        message:"Estas son todas las encuestas de este Usuario 🤓🤓",
        userDB
      });
  }) 

  
}


function moreVoted(array) {

  let m_voted = new Object();
  let answer = String;
  let max = -1000;
  let acum = 0;

  for (var i = 0; i < array.options.length; i++) {
    let rate = array.options[i].rate;
    if (rate > max) {
      max = rate;
      answer = array.options[i].option;
    }
    acum = acum + rate;
  }
  if (acum === 0)
    return (m_voted.error = "Esta pregunta no ha sido respondida aún");

  m_voted.winner_option = answer;
  m_voted.rate = max;
  m_voted.percent = ((max / acum) * 100).toFixed(2);

  return m_voted;
}

  
function convertQuestion(body){

    let question = new Object();
  
    question.name = body.name;
    question.options =  new Array();
  
    for (var i = 0; i < body.options.length; i++){
      let value = new Object();
      value.option = body.options[i];
      question.options.push(value);
    }
    return question;
  }
  