const path=require("path")
const express=require("express")
const hbs=require("hbs")
const geocode=require('./utils/geocode')
const forecase=require('./utils/forecast')
const forecast = require("./utils/forecast")

const app=express()
const port=process.env.PORT ||3000

//define paths
const publicdirectorypath=path.join(__dirname,"../public")
const viewspath=path.join(__dirname,"../templates/views")
const partialspath=path.join(__dirname,"../templates/partials")


//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//setup sttic directory to serve
app.use(express.static(publicdirectorypath))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"Sargam Kalita"
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Sargam Kalita'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        help:'Help me',
        name:'Sargam Kalita',
        title:'Help'
    })
})



app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })

    }
 geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
     if(error){
         return res.send({error})
     }
     forecast(latitude,longitude,(forecastdata,error)=>{
         if(error){
            return res.send({error})
         }
         res.send({
             forecast:forecastdata,
             location,
            address:req.query.address
         })

     })

 })


})

app.get("/products",(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })

})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sargam Kalita',
        errormessage:'help article not found'
    })
})

app.get("*",(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Sargam Kalita',
        errormessage:'page not found'
    })

})




app.listen(port,()=>{
    console.log("Server is up on port "+port)

})