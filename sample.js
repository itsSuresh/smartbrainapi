const isValid=bcrypt.compareSync(req.body.password, data.hash[0]); // true

if(isValid){
    return db.select('*').from('users')
     .where('email','=',req.body.email)
     .then(user => res.json(user[0]))
     .catch(err => res.status(404).json('unable to get user'))
 }else{
     res.status('404'.json('user invalid'))
 }