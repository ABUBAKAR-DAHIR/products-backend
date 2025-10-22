import { Product } from "../models/Product.model.js"

export async function addReview(req, res) {
    try{
        const {productName, rating, comment} = req.body
        if(!productName || !rating || !comment) return res.status(400).send("Missing fields")
            
        let review;
            
        let isComment = await Product.findOne({productName: productName})
        console.log(isComment)
        if(isComment){
            let commentsArray = isComment.comments
            commentsArray.push(comment)
            
            review = {    
                productName: productName,
                rating: rating,
                comment: comment,
                comments: commentsArray
            }
            await Product.updateOne({
                productName: productName,
                rating: rating,
                comment: comment,
                comments: commentsArray
            })
        }
        else{
            await Product.create({
                productName: productName,
                rating: rating,
                comment: comment,
                comments: [comment]
            })
        }
    
        return res.status(200).json({message: "Review added!", review})
    }
    catch(e){
        console.error("Error: " + e.message);
        return res.status(500).send("Error: " + e.message)
    }
}

export async function getProducts(req, res) {
    // const {productName, rating, comment} = req.body
    // if(!productName || !rating || !comment) return res.status(400).send("Missing fields")
    
    // Product.find().then((product)=>{
        
    // })
    let recommended = await Product.find({rating: {$gte: 4}})
    let not_recommended = await Product.find({rating: {$lt: 4}})
    let r_products = recommended.map((recommended) => recommended.productName)
    let nr_products = not_recommended.map((nrecommended) => nrecommended.productName)
    let comment = `Recommended products: \n${r_products}\n\nNot Recommended products: ${nr_products.length!=0? nr_products : 'Empty'}`
    res.send(comment)
}
