import { UserModel } from "../models/User.models.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function getUsers(req, res){
    // let usersdata = await UserModel.find()
    // res.send(usersdata)


    // UserModel.find().then((usersData)=>{
    //     console.log(usersData)
    //    res.send(usersData)
    // }).catch((e)=>{
    //     console.error(e);
    // })

    const {name} = req.query
    if(!name) res.status(404).json({ok: false, message: "No Query!"})
    else{
        const users = await UserModel.find({name: name})
        if(users.length <= 0) res.status(404).json({ok: false, message: "No Users Found!"})
        else res.status(200).json({ok: true, message: "Users found!", users: users})

    }
}

export async function insertUser(req, res){
    try{
        const {name, age, email} = req.body
        if(!name || !age || !email || !req.body){
            res.status(400).json({error: "please fill all fields"})
        }
        else{
            let user = {name, age, email}
            let newUser = await UserModel.create(user)
            res.status(200).send(newUser)
        }
    }catch(e){
        console.error(e);
    }
}

export async function deleteUser(req, res) {
    const {id} = req.query
    if(!id) res.status(400).send("No Id!")
    
        // Using promise
    UserModel.findByIdAndDelete(id).then((user)=>{
        if(!user) res.status(400).send("User not found!")
        else res.status(200).json({message :"User deleted", user: UserModel.findById(id)})
    }).catch((e)=>{
        console.error("error: " + e);
    })

        // using async await
    let user = await UserModel.findByIdAndDelete(id)
    if(!user) res.status(400).send("User not found!")
    else res.status(200).json({message :"User deleted", user: UserModel.findById(id)})

}

export async function updateUser(req, res) {
    const {id, name, age, email} = req.query

    // let version = __v+1
    if(!id) res.status(400).send("No ID!!!")
        // using promise
    // UserModel.findByIdAndUpdate(id, {name, age, email, version})
    // .then((user) => res.status(200).json({message: "User updated", user}))
    // .catch((e)=>res.status(400).send("error: "+e))


        // Using async await
    let user = await UserModel.findByIdAndUpdate(id, {name, age, email})
    if(!user) res.status(400).send("User not found")
    else res.status(200).json({message: "User Updated", user})

}

export function getUser(req, res) {
    // let id = req.query
    // if(!id) res.status(400).send("No ID!!")
    
    UserModel.findById("68e69748005f11fa17186047").then((user)=>{
        if(!user) res.status(400).send("User is not found")
        res.status(200).json({message: "User found", user})
    }).catch((e)=>{
        res.status(500).send("Error: " + e)
    })
    // res.status(400).send("User not found")
}


export async function register(req, res){
    try {
        let {name, email, password} = req.body
        if(!name || !email || !password) res.status(400).send("missing fields!")
        
        let hashedPassword = bcrypt.hashSync(password, 10)

        let user = new UserModel({
            name,
            email,
            password: hashedPassword
        })
    
        await UserModel.insertOne(user).then((insertedUser)=>{
            res.status(200).json({message: "User inserted", insertedUser})
        }).catch((e)=>{
            res.status(400).send("Error: " + e)
        })
    } catch (e) {
        console.error("Oops, error: " + e);
        
        res.status(400).send("Error: " + e)
    }
}


export async function login(req, res) {
    
    let {email, password} = req.body
    if(!email || !password) res.status(400).json({ok: false, message: "Missing fields!!"})
    
    
    UserModel.findOne({email: email}).then((user)=>{
        let isPassword;
        if(!user) res.status(400).json({ok: false, message: "User not found!!", user})
        else{
            console.log(user);
            
            isPassword = bcrypt.compareSync(password, user.password)
            console.log(isPassword);
            console.log(user.password);

            if(!isPassword) return res.status(400).json({ok: false, message: "Incorrect password!"})
            else
            { 
                let jwtToken = jwt.sign({email: email}, 'home', {expiresIn: '4m'})
                
                let jwtTokenPhone = jwt.sign({email: email}, 'phone', {expiresIn: '4m'})
                let jwtTokenEmail = jwt.sign({email: email}, 'email', {expiresIn: '4m'})
                return res.status(200).json({ok: true, message: "Login successfull", user, token:jwtToken, jwtTokenPhone, jwtTokenEmail})
            }
        }
        
    })
}




// find without filter, find with filter and findOne with filter    


// show the token in the frontend
// local storage adding and getting token from the storage