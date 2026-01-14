import express from 'express'
import path from 'path'
import { MongoClient, ObjectId } from 'mongodb'

const dbName = "Node-Project"
const collectionName = "TODO"
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)

const connection =async ()=>{
    const connect = await client.connect()
    return await connect.db(dbName)
}

const publicPath = path.resolve('public')
const app = express()

app.use(express.static(publicPath))
app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs')

app.get("/",async(req, resp)=>{
    const db = await connection()
    const collection = db.collection(collectionName)
    const result = await collection.find().toArray()
    resp.render("list",{result})
})

app.get("/add",(req, resp)=>{
    resp.render("add")
})
app.get("/update",(req, resp)=>{
    resp.render("update")
})
app.post("/add",async (req, resp)=>{
    const db = await connection()
    const collection = db.collection(collectionName)
    const result = collection.insertOne(req.body)
    resp.redirect("/")
})
app.post("/update",(req, resp)=>{
    resp.redirect("/")
})

app.get('/delete/:id',async(req, resp)=>{
    const db = await connection()
    const collection = db.collection(collectionName)
    const result = collection.deleteOne({_id: new ObjectId(req.params.id)})
    resp.redirect("/")
})
app.get('/update/:id',async(req, resp)=>{
    const db = await connection()
    const collection = db.collection(collectionName)
    const result = await collection.findOne({_id: new ObjectId(req.params.id)})
    console.log(result)
    if(result){
        resp.render("update",{result})

    }
    else{
        resp.send("/some error")
    }
})

app.listen(3200)