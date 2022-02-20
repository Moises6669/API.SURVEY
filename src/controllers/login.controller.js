const User = require('../models/user.models');
const cookieParser=require('cookie-parser');


exports.Login = (req,res) => {
    let token=req.cookies.auth;

    User.findByToken(token,(err,user)=>{
        if(err) return  res(err);
        
        if(user) return res.status(400).json({
            error :true,
            message:"Ya se ha autentificado 🧐😐"
        });

        else{
            User.findOne({'email':req.body.email},function (err,user) {
                if(!user) return res.json({isAuth : false, message : 'Error de autenticación, correo electrónico no encontrado 😥😣'});

                user.comparepassword(req.body.password,(err,isMatch)=>{
                    if(!isMatch) return res.json({ isAuth : false,message : "La contraseña no coincide 🥱🥱"});

                    user.generateToken((err,user)=>{
                        if(err) return res.status(400).send(err);
                        res.cookie('auth',user.token).json({
                            isAuth : true,
                            id : user._id,
                            email:user.email
                        });
                    });
                });
            });
        }
    });
}

exports.logout = (req,res) => {
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).json({ok:false,error:err});
        res.clearCookie("auth");
        res.sendStatus(200);
    });
}

exports.profile = (req,res) => {
    res.status(200).json({
        isAuth: true,
        name:req.user.name,
        email:req.user.email
    });
}