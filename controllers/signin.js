const handleSignin = (req,res,db,bcrypt)=>{
    const {email,password} = req.body;
    if(!email ||!password){
        return res.status(404).json('incorrect form submission');
    }
    db.select('email','hash').from('login')
    .where('email','=',email)
    .then(data =>{
        // console.log(data[0].hash);
        const isValid=bcrypt.compareSync(password, data[0].hash); // true

        if(isValid){
            return db.select('*').from('users')
            .where('email','=',req.body.email)
            .then(user => res.json(user[0]))
            .catch(err => res.status(404).json('unable to get user'))
        }else{
            res.status('404'.json('user invalid'))
        }
    }).catch(err => res.status(404).json('invalid credentials'))
    
}

module.exports = {
    handleSignin:handleSignin,
}