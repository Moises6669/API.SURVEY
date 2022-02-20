module.exports = (validate) => {
  return (req, res, next) => {
    const result = validate(req.body);

    if( result.error ) {
      return res.json({
        message:"Por favor revisa los campos 🙈🙉⚠",
        erros: result.error.details,
      })}
      else {
        if(!req.value) {
          req.value = {}
        }
        req.value['body'] = result.value;
        next();
      }
    }
  };
