import jwt from 'jsonwebtoken'
let jwtToken = jwt.sign({email: email}, 'email', {expiresIn: '4m'})

jwt.verify(jwtToken, 'email', (err, decoded) => {
    if(err) res.status(400).send("Error" + err.message)
    console.log(decoded.email);
    next()
})
