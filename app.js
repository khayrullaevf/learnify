const express=require('express')
const cors=require('cors')
const fs=require('fs')



let app=express()
module.exports=app


app.use(express.json())


const moviesRouter=require('./routes/moviesRouter')
app.use('/api/v1/movies',moviesRouter)






