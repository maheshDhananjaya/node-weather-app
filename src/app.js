const path = require('path');
const express = require('express');
const request = require('request');
const util = require('util');
const app = express();
const hbs = require('hbs');

const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../template/views')
const partialPath = path.join(__dirname,'../template/partials')

const requestPromise = util.promisify(request);


app.use(express.static(publicDirPath))

app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
    res.render('index',{
        description:'For Wether Data'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        description:'Help Page'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        description:'About Page'
    })
})

app.get('/weather',async (req,res)=>{
    if(!req.query.address){
      return  res.send({
            error:"please add valid address"
        })
    }
    const url = `https://api.weatherstack.com/current?access_key=f1d4d0b5a586f07978ab0dab9b988185&query=${req.query.address}`;
    let forcast = "";
    let error = "";
try {
    const res = await requestPromise({url:url,json:true})
    if(res.body.error){
        error = "please add a valid address"
    }else{
    const {weather_descriptions="deefault",temperature=0,feelslike=0} = res.body.current??{}
    forcast = (`it is a ${weather_descriptions} day. it is currently ${temperature} and feels like ${feelslike}`);
    console.log("forcast",forcast) 
    }
} catch (error) {
    console.log(error)
}
    res.send({
            forcast,
            location:req.query.address,
            error
    })   
})

app.get('*',(req,res)=>{
res.render('404',{
    title:'404',
    errorMessage:'page not found'
})
})

app.listen('5000',(prop)=>{
    console.log('server started',prop)
})