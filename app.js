const express=require('express')





let app=express()
module.exports=app


app.use(express.json())


const moviesRouter=require('./routes/moviesRouter')
app.use('/api/v1/movies',moviesRouter)






