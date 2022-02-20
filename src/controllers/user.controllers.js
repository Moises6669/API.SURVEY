const _ = require('underscore');

const User = require('../models/user.models');

const bcrypjs = require('bcryptjs');


exports.GetOneUser = (req, res) => {
    let id = req.params.id;

    User.findOne({ _id: id }, (Err, userDB) => {
        if (Err) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado',
                error: Err
            });
        }
        return res.status(200).json({
            ok: true,
            message: 'Usuario encontrado correctamente',
            userDB
        });
    })
}


exports.GetAllUser = (req, res) => {
   try {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limit = req.query.limite || 5;
    limit = Number(limit);


    User.find({verify:true}, 'name email verify')
        .skip(desde)
        .limit(limit)
        .exec((err, users) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count({ state: true }, (err, conteo) => {

                res.status(200).json({
                    ok: true,
                    users,
                    content: conteo
                });

            });
        });
   } catch (error) {
       
   }

}


exports.PostUser = async (req, res) => {

    let body = req.body;
    let token = req.cookies.auth;
    


    try {

        if (!body.email || !body.name || !body.password) {

            return res.json({ ok: false, message: "Por favor revisa los campos 🙈🙉⚠" }).status(400);

        } else {

            let newUser = new User({
                name: body.name,
                email: body.email,
                password: body.password,
                rols: body.role
            });

            await User.findByToken(token, (Err, user) => {
                if (Err) return res(Err);

                if (user) return res.status(400).json({
                    error: true,
                    message: "Ya se ha autentificado como usuario 🧐😐🤡"
                });

                else {
                    User.findOne({ email: newUser.email }, async (Err, user) => {

                        if (user) {
                            return res.json({ ok: false, message: "Ese email ya existe! 😑😑" });
                        } else {

                            await newUser.save((err, doc) => {
                                if (err) {
                                    return res.json({ ok: false, message: 'Solicitud Incorrecta! 😝😝' })
                                }

                                newUser.generateToken((err, user) => {
                                    if (err) return res.status(400).send(err);
                                    return res.cookie('auth', user.token).json({
                                        isAuth: true,
                                        User: doc
                                    });
                                })
                            });
                        }
                    });
                }
            })

        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}


exports.PutUser = async (req, res) => {
    let id = req.params.id;
    let update = req.body;

    const salt = await bcrypjs.genSaltSync(10);
    req.body.password = await bcrypjs.hash(req.body.password, salt);

    try {
        User.findByIdAndUpdate(id, update, { new: true }, (err, usuarioDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return req.user.deleteToken(req.token, (err, user) => {
                if (err) return res.status(400).json({ ok: false, error: err });
                res.clearCookie("auth");
                res.sendStatus(200);
            });
        });
    } catch (error) {
        res.json({
            ok: false,
            error: error
        });
    }

};


exports.DeleteUser = (req, res) => {
    let id = req.params.id;


    User.findOneAndRemove(id, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Solicitud incorrecta al actualizar 😫😫',
                error: err
            });
        }

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado ☠',
                }
            });
        }

        return res.status(201).json({
            ok: true,
            message: 'Usuario eliminado correctamente 🥳🥳',
            userDB
        });
    });
}