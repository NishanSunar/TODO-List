import express from 'express'
import path from 'path'
const publicPath = path.resolve('public')
const app = express()

app.use(express.static(publicPath))

app.set('view engine','ejs')

app.get("/",(req, resp)=>{
    resp.render("list")
})

app.get("/add",(req, resp)=>{
    resp.render("add")
})
app.get("/update",(req, resp)=>{
    resp.render("update")
})
app.post("/add",(req, resp)=>{
    resp.redirect("/")
})
app.post("/update",(req, resp)=>{
    resp.redirect("/")
})

app.listen(3200)