import jwt from 'jsonwebtoken'
export function getProductsMiddleware(req, res, next) {
    // if(10<5) res.status(404).send("Not logged in!")
    // else next()

    let jwtToken = req.headers.authorization
    let jwtArray = jwtToken.split(' ')
    let jwtKey = jwtArray[0]
    let jwtVal = jwtArray[1]
    if(jwtToken){
        // res.json({jwtKey, jwtVal})
        
        jwt.verify(jwtVal, 'home', function(err, decoded) {
            if(err) res.status(404).send("Home token is not matching!")
            console.log(decoded) // bar
            next()
        });
    }
    // else res.send("no token")
}

export function checkPhoneAuth(req, res, next){
    let jwtToken = req.headers.authorization
    if(jwtToken){
        let jwtVal = jwtToken.split(" ")[2]
        jwt.verify(jwtVal, 'phone', (err, decoded) => {
            if(err) return res.status(404).send("Phone token is not matching!")
            console.log(decoded.email);
            return next()
        })
    }
}


export function checkEmailAuth(req, res, next){
    let jwtToken = req.headers.authorization
    if(jwtToken){
        let jwtVal = jwtToken.split(" ")[3]
        jwt.verify(jwtVal, 'email', (err, decoded) => {
            if(err) return res.status(404).send("Email token is not matching!")
            console.log(decoded.email);
            return next()
        })
    }
}
