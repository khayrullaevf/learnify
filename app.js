const express=require('express')
const cors=require('cors')
const fs=require('fs')



const app=express()

app.use(express.json())


const PORT=process.env.PORT||5000



const movies=JSON.parse(fs.readFileSync('./data/data.json','utf-8'))


app.get('/',(req,res)=>{
   res.send('Hello form App')
})

app.get('/api/v1/movies',(req,res)=>{
    res.json(movies)
})


app.post('/api/v1/movies',(req,res)=>{
    console.log(req.body);

   const newId=movies[movies.length-1].id+1

   const newMovie=Object.assign({id:newId},req.body)
   console.log(newMovie);

    movies.push(newMovie)
   
    fs.writeFile('./data/data.json', JSON.stringify(movies),(err)=>{
        res.status(201).json({
            newMovie:newMovie
        })
    })
   
   
    
})


// Route parametrs
app.get('/api/v1/movies/:id',(req,res)=>{
    console.log(req.params);
    const id=req.params.id*1
    console.log(id);
    let movie=movies.find((el)=>el.id===id)
    if (!movie) {
       return res.status(404).json({
            status:"not found",
            message:"movie ith this id not found"
        })
    }

        res.status(200).json({
            status:"success",
            movie,
        })
    
    
    
    
})


//Patch methods





app.listen(PORT,()=>{
    console.log(`Running on port https:/localhost/${PORT}`);
    
})